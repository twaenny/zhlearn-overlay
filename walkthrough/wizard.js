// ZHlearn reviewer-walkthrough overlay.
//
// Injected (via nginx sub_filter) into every upstream HTML page. Renders
// a small floating logo button (Next.js dev-tools idiom) at bottom-left;
// clicking it pops a compact panel containing the step's narration and a
// step-list. Navigation between steps is a real browser page navigation
// (the step list items are <a href="/...">), so reviewers are always
// looking at the actual upstream HTML page, not an iframe of it.
//
// SSOT is upstream DEMO-FLOW.md, parsed at runtime per §10.3 of that doc.

(() => {
  'use strict';

  const PANEL_STATE_KEY = 'zhlearn-walkthrough-panel';
  const GROUP_STATES_KEY = 'zhlearn-walkthrough-groups';
  const OLD_NARRATION_KEY = 'zhlearn-walkthrough-narration';
  const OLD_STEP_KEY      = 'zhlearn-walkthrough-step';
  const DOC_URL = '/DEMO-FLOW.md';
  const LOGO_URL = '/assets/logo-ktzh.svg';

  // If a page injects the wizard twice (idempotency), bail.
  if (document.getElementById('wiz-root')) return;

  // Walkthrough structure — mirrors the bid document's "Live-Demo
  // folgender Use Cases" list. Reorders + regroups steps regardless of
  // their order in upstream DEMO-FLOW.md. Set to null to fall back to
  // dynamic parsing of the document's `## ` H2 headings.
  const WALKTHROUGH_STRUCTURE = [
    { label: '1. Nutzerverwaltung — Rollen & Profile', stepIds: ['r1','r2','r3','r4','r5','r6'] },
    { label: '2. Erstellung & Publikation',            stepIds: ['9','10','11','a1','12','13'] },
    { label: '3. Verwaltung bestehender Angebote',     stepIds: ['14','15','v1'] },
    { label: '4. Anmeldeprozess',                      stepIds: ['1','l1','2','3','b1','4','5','6','w1','7','8'] },
    { label: '5. Dashboard & Gamification',            stepIds: ['d1','k1','s1','16','17'] },
  ];

  // Overlay-side narration for pages not (yet) in upstream DEMO-FLOW.md.
  // Same markdown format as DEMO-FLOW.md; ID prefix `r/a/v/l/b/w/d/k/s`
  // distinguishes overlay-defined steps from upstream's numeric IDs.
  // Absolute paths — wizard.js is injected into pages all over the
  // root, so relative URLs (`./extras.md`) would resolve against the
  // page URL and 404 from anything outside /walkthrough/.
  const EXTRAS_URL = '/walkthrough/extras.md';
  // PDF-driven demo metadata (priorität / status / dauer)
  // applied to ANY step ID present, real or synthetic.
  const METADATA_URL = '/walkthrough/demo-metadata.json';

  const META_LABELS = new Set(['Persona', 'Award lens']);

  const LABEL_TRANSLATIONS = {
    'What you\'re looking at': 'Was Sie sehen',
    'Notable interactions': 'Interaktionen zum Ausprobieren',
    'Design choices to evaluate': 'Designentscheidungen — Ihr Urteil ist gefragt',
    'Known limitations': 'Bekannte Grenzen des Prototyps',
  };

  // ------- parser (verbatim from prior wizard) --------------------------

  function parseDemoFlow(md) {
    // ID is `\w+` (digits in upstream DEMO-FLOW.md, letters in
    // overlay-side extras.md) so both files share one parser.
    const headingRe = /^### Step (\w+)(?:\s*·\s*)?(.*?)$/gm;
    const headings = [...md.matchAll(headingRe)];
    const steps = [];
    for (let i = 0; i < headings.length; i++) {
      const m = headings[i];
      const id = m[1];
      const headRest = m[2];
      const bodyStart = m.index + m[0].length;
      const bodyEnd = i + 1 < headings.length ? headings[i + 1].index : md.length;
      let body = md.slice(bodyStart, bodyEnd);
      const h2 = body.search(/^## /m);
      if (h2 >= 0) body = body.slice(0, h2);

      const files = [...headRest.matchAll(/`([^`]+\.html)`/g)].map(x => x[1]);
      const titleMatch = headRest.match(/—\s*(.+)$/);
      const title = titleMatch ? titleMatch[1].trim() : headRest.replace(/[`*]/g, '').trim();

      steps.push({
        id,
        title,
        files,
        sections: parseSections(body),
        isRoadmap: files.length === 0,
      });
    }
    const groups = parseGroups(md, steps);
    return { steps, groups };
  }

  function parseGroups(md, steps) {
    const stepIdSet = new Set(steps.map(s => s.id));
    const h2Re = /^## (.+)$/gm;
    const matches = [...md.matchAll(h2Re)];
    const groups = [];
    for (let i = 0; i < matches.length; i++) {
      const text = matches[i][1].trim();
      const start = matches[i].index + matches[i][0].length;
      const end = i + 1 < matches.length ? matches[i + 1].index : md.length;
      const slice = md.slice(start, end);
      const stepIds = [...slice.matchAll(/^### Step (\w+)/gm)]
        .map(m => m[1])
        .filter(id => stepIdSet.has(id));
      if (!stepIds.length) continue;
      groups.push({ label: groupLabel(text), stepIds });
    }
    return groups;
  }

  function groupLabel(raw) {
    const partMatch = raw.match(/^\d+\s*·\s*Part\s+(\d+)\s*·\s*(.+)$/i);
    if (partMatch) return `Teil ${partMatch[1]} · ${partMatch[2]}`;
    return raw.replace(/^\d+\s*·\s*/, '');
  }

  function parseSections(body) {
    const lines = body.split('\n');
    const sections = [];
    let current = null;
    const flush = () => { if (current) { sections.push(current); current = null; } };
    for (const raw of lines) {
      const labelMatch = raw.match(/^\*\*([^*]+?)\*\*(?:\s*·\s*(.+))?\s*$/);
      if (labelMatch) {
        flush();
        current = { label: labelMatch[1].trim(), inline: (labelMatch[2] || '').trim(), lines: [] };
        continue;
      }
      if (current) current.lines.push(raw);
    }
    flush();
    for (const s of sections) {
      while (s.lines.length && !s.lines[0].trim()) s.lines.shift();
      while (s.lines.length && !s.lines[s.lines.length - 1].trim()) s.lines.pop();
    }
    return sections;
  }

  // ------- markdown → HTML (small inline subset) ------------------------

  const esc = s => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  function inlineMd(text) {
    let s = esc(text);
    s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
    s = s.replace(/\*\*([^*]+?)\*\*/g, (_, c) => `<strong>${c}</strong>`);
    return s;
  }

  function renderBlock(lines) {
    const out = [];
    let para = [];
    let bullets = [];
    const flushPara = () => { if (para.length) { out.push(`<p>${inlineMd(para.join(' '))}</p>`); para = []; } };
    const flushBullets = () => {
      if (bullets.length) {
        out.push(`<ul>${bullets.map(b => `<li>${inlineMd(b)}</li>`).join('')}</ul>`);
        bullets = [];
      }
    };
    for (const line of lines) {
      const t = line.trim();
      if (!t) { flushPara(); flushBullets(); continue; }
      if (t.startsWith('- ') || t.startsWith('* ')) {
        flushPara();
        bullets.push(t.slice(2).trim());
      } else {
        flushBullets();
        para.push(t);
      }
    }
    flushPara();
    flushBullets();
    return out.join('\n');
  }

  // ------- persistence --------------------------------------------------

  function readPanelState() {
    try {
      const v = localStorage.getItem(PANEL_STATE_KEY);
      if (v === 'open' || v === 'closed') return v;
      // one-time migration from the previous narration storage key
      const old = localStorage.getItem(OLD_NARRATION_KEY);
      if (old != null) {
        const next = old === 'open' ? 'open' : 'closed';
        localStorage.setItem(PANEL_STATE_KEY, next);
        localStorage.removeItem(OLD_NARRATION_KEY);
        return next;
      }
      return 'closed';
    } catch { return 'closed'; }
  }
  function writePanelState(v) { try { localStorage.setItem(PANEL_STATE_KEY, v); } catch {} }
  function readGroupStates() { try { return JSON.parse(localStorage.getItem(GROUP_STATES_KEY) || '{}'); } catch { return {}; } }
  function writeGroupStates(o) { try { localStorage.setItem(GROUP_STATES_KEY, JSON.stringify(o)); } catch {} }

  // ------- state --------------------------------------------------------

  const state = {
    steps: [],
    groups: [],
    currentStep: null,    // step matched to location.pathname (may be null)
    roadmapView: null,    // when user clicked a roadmap step from the list
    panelOpen: false,
    selectorOpen: false,  // top-of-panel step dropdown — collapsed by default
    ui: null,
  };

  function currentFileName() {
    return location.pathname.replace(/^\//, '');
  }
  function findStepForPath(steps) {
    const f = currentFileName();
    if (!f) return null;
    return steps.find(s => s.files.includes(f)) || null;
  }

  // ------- dead-link intercept + toast ---------------------------------

  function isDeadLink(el) {
    if (!el || el.tagName !== 'A') return false;
    if (el.closest('#wiz-root')) return false;        // never our chrome
    if (el.closest('[data-wiz-allow]')) return false; // explicit opt-out
    const href = el.getAttribute('href');
    if (href === null) return true;
    if (href === '' || href === '#') return true;
    if (/^javascript:/i.test(href)) return true;
    return false;
  }

  function showToast(message) {
    const root = state.ui && state.ui.root;
    if (!root) return;
    let stack = root.querySelector('#wiz-toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'wiz-toast-stack';
      root.appendChild(stack);
    }
    // cap at 3 visible — drop oldest first
    const live = stack.querySelectorAll('.wiz-toast');
    for (let i = 0; i <= live.length - 3; i++) live[i].remove();

    const toast = document.createElement('div');
    toast.className = 'wiz-toast';
    toast.textContent = message;
    toast.addEventListener('click', () => dismissToast(toast));
    stack.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('wiz-toast--shown'));
    setTimeout(() => dismissToast(toast), 3000);
  }
  function dismissToast(toast) {
    if (!toast.isConnected) return;
    toast.classList.remove('wiz-toast--shown');
    setTimeout(() => toast.remove(), 180);
  }

  // ------- DOM construction --------------------------------------------

  function buildChrome() {
    const root = document.createElement('div');
    root.id = 'wiz-root';
    root.innerHTML = `
      <button id="wiz-logo" type="button" aria-label="Reviewer-Walkthrough öffnen" aria-expanded="false">
        <img src="${esc(LOGO_URL)}" alt="" />
        <span id="wiz-logo-badge" hidden></span>
      </button>
      <aside id="wiz-panel" hidden aria-label="Reviewer-Walkthrough">
        <div id="wiz-panel-body"></div>
      </aside>
    `;
    document.body.appendChild(root);
    return {
      root,
      logo:  root.querySelector('#wiz-logo'),
      badge: root.querySelector('#wiz-logo-badge'),
      panel: root.querySelector('#wiz-panel'),
      body:  root.querySelector('#wiz-panel-body'),
    };
  }

  // ------- rendering ----------------------------------------------------

  function setBadge(text) {
    if (!state.ui) return;
    state.ui.badge.textContent = text || '';
    state.ui.badge.hidden = !text;
  }

  function statusClass(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('abgeschlossen')) return 'wiz-chip--status-done';
    if (s.includes('bearbeitung'))   return 'wiz-chip--status-doing';
    if (s.includes('planung'))       return 'wiz-chip--status-plan';
    return 'wiz-chip--mono';
  }

  function renderChips(step) {
    const meta = step.sections.filter(s => META_LABELS.has(s.label));
    const chips = [];
    const personaSec = meta.find(s => s.label === 'Persona');
    if (personaSec && personaSec.inline) {
      chips.push(`<span class="wiz-chip wiz-chip--accent">${inlineMd(personaSec.inline)}</span>`);
    }
    const awardSec = meta.find(s => s.label === 'Award lens');
    if (awardSec && awardSec.inline) {
      for (const facet of awardSec.inline.split(/\s+·\s+/)) {
        chips.push(`<span class="wiz-chip wiz-chip--mono">${inlineMd(facet.trim())}</span>`);
      }
    }

    // Demo-plan PDF metadata: render priority / status /
    // duration / coverage as small mono chips. Each is optional —
    // missing fields just skip their chip.
    const m = (state.demoMeta || {})[step.id];
    if (m) {
      if (m.subUC)    chips.push(`<span class="wiz-chip wiz-chip--bid" title="Bid §3 Use-Case">§3 · ${esc(m.subUC)}</span>`);
      if (m.priority) chips.push(`<span class="wiz-chip wiz-chip--pri-${esc(m.priority.toLowerCase())}" title="Demo-Priorität">${esc(m.priority)}</span>`);
      if (m.status)   chips.push(`<span class="wiz-chip ${statusClass(m.status)}" title="Status">${esc(m.status)}</span>`);
      if (m.minutes != null) chips.push(`<span class="wiz-chip wiz-chip--mono" title="Dauer">${esc(String(m.minutes))} min</span>`);
      if (m.coverage === 'partial') chips.push(`<span class="wiz-chip wiz-chip--cov-partial" title="Audit: nur teilweise abgedeckt">⚠️ teilw.</span>`);
      if (m.coverage === 'missing') chips.push(`<span class="wiz-chip wiz-chip--cov-missing" title="Audit: nicht im Prototyp gebaut">🚧 fehlt</span>`);
    }

    return chips.length ? `<div class="wiz-chips">${chips.join('')}</div>` : '';
  }

  function renderMetaCallouts(step) {
    // Surface PDF-driven warnings (verbal-only roadmap items, demo
    // hints) as prominent boxes BEFORE the narration sections, so
    // the demo-driver sees them before reading the talking points.
    const m = (state.demoMeta || {})[step.id];
    if (!m) return '';
    const out = [];
    if (m.demoHint) {
      out.push(`<div class="wiz-callout wiz-callout--hint" role="note">
        <strong>Demo-Hinweis</strong> · ${inlineMd(m.demoHint)}
      </div>`);
    }
    if (m.verbalRoadmap) {
      out.push(`<div class="wiz-callout wiz-callout--roadmap" role="note">
        <strong>Verbal als Roadmap erwähnen</strong> · ${inlineMd(m.verbalRoadmap)}
      </div>`);
    }
    return out.join('');
  }

  function renderFileRow(step) {
    if (step.files.length <= 1) {
      if (!step.files.length) return '';
      const f = step.files[0];
      return `
        <div class="wiz-file-row">
          <span class="wiz-file-label">
            <span class="wiz-file-label__prefix">Datei</span>
            <code>${esc(f)}</code>
          </span>
          <a class="wiz-link" href="/${esc(f)}" target="_blank" rel="noopener">In neuem Tab öffnen ↗</a>
        </div>
      `;
    }
    const activeFile = currentFileName();
    const tabs = step.files.map(f => {
      const pressed = f === activeFile ? 'true' : 'false';
      return `<a class="wiz-file-tab" aria-pressed="${pressed}" href="/${esc(f)}">${esc(f)}</a>`;
    }).join('');
    const openLink = activeFile && step.files.includes(activeFile) ? activeFile : step.files[0];
    return `
      <div class="wiz-file-row">
        <div class="wiz-file-tabs">${tabs}</div>
        <a class="wiz-link" href="/${esc(openLink)}" target="_blank" rel="noopener">In neuem Tab öffnen ↗</a>
      </div>
    `;
  }

  function renderNarrationSections(step) {
    const body = step.sections.filter(s => !META_LABELS.has(s.label));
    return body.map(s => {
      const heading = LABEL_TRANSLATIONS[s.label] || s.label;
      const inline = s.inline ? `<p>${inlineMd(s.inline)}</p>` : '';
      return `<section><h3>${esc(heading)}</h3>${inline}${renderBlock(s.lines)}</section>`;
    }).join('');
  }

  function renderStepBody(step) {
    // Synthetic step with no narration body? Render the chips + file
    // row + a placeholder. Steps that DO have extras.md narration just
    // fall through to the normal renderer below.
    const bodySections = step.sections.filter(s => !META_LABELS.has(s.label));
    if (step.isExtra && !bodySections.length) {
      const file = step.files[0] || '';
      return `
        <div class="wiz-narration">
          ${renderChips(step)}
          ${renderMetaCallouts(step)}
          ${renderFileRow(step)}
          <p style="margin-top:8px;color:var(--wiz-text-soft);font-size:12.5px;">
            Narration noch nicht erfasst. Demo-Kontext: siehe
            <code>docs/Status - Tabellenblatt1.pdf</code>.
            ${file ? `Page direkt: <a href="/${esc(file)}"><code>${esc(file)}</code></a>` : ''}
          </p>
        </div>
      `;
    }
    return `
      <div class="wiz-narration">
        ${renderChips(step)}
        ${renderMetaCallouts(step)}
        ${renderFileRow(step)}
        ${renderNarrationSections(step)}
      </div>
    `;
  }

  function renderRoadmapBody(step) {
    const body = step.sections.filter(s => !META_LABELS.has(s.label));
    const meta = step.sections.filter(s => META_LABELS.has(s.label));
    const chips = meta.map(s => `<span class="wiz-chip wiz-chip--mono">${inlineMd(s.label)}: ${inlineMd(s.inline || '—')}</span>`).join(' ');
    const sectionsHtml = body.map(s => {
      const heading = s.label;
      return `<section><h3>${esc(heading)}</h3>${s.inline ? `<p>${inlineMd(s.inline)}</p>` : ''}${renderBlock(s.lines)}</section>`;
    }).join('');
    return `
      <div class="wiz-narration wiz-narration--roadmap">
        ${chips ? `<div class="wiz-chips">${chips}</div>` : ''}
        ${sectionsHtml}
        <div class="wiz-roadmap__placeholder">
          Für diesen Schritt existiert noch kein Screen — die Surfaces sind durch
          offene Designentscheidungen blockiert (siehe <code>OPEN-QUESTIONS.md</code>).
          Der Walkthrough nennt sie bewusst, damit Sie wissen, dass die Roadmap-Punkte
          nicht vergessen sind.
        </div>
      </div>
    `;
  }

  function renderEmptyBody() {
    return `
      <div class="wiz-narration">
        <p>Wählen Sie einen Schritt aus dem Auswahlmenü oben, um direkt zum
        passenden Prototyp-Screen zu springen.</p>
      </div>
    `;
  }

  function isGroupOpen(label, containsCurrent, groupStates) {
    const explicit = groupStates[label];
    if (explicit === 'open') return true;
    if (explicit === 'closed') return false;
    return containsCurrent;
  }

  function renderSelector() {
    const active = state.roadmapView || state.currentStep;
    const total = state.steps.length;
    const labelText = active
      ? `Schritt ${active.id} · ${active.title}`
      : `Schritt auswählen (${total} insgesamt)`;
    const open = state.selectorOpen ? 'open' : 'closed';
    return `
      <div id="wiz-selector" data-state="${open}">
        <button type="button" id="wiz-selector-btn" aria-expanded="${state.selectorOpen ? 'true' : 'false'}" aria-controls="wiz-selector-list">
          <span class="wiz-selector__text">${esc(labelText)}</span>
          <span class="wiz-selector__chev" aria-hidden="true">▾</span>
        </button>
        <div id="wiz-selector-list" class="wiz-selector__list">${renderStepList()}</div>
      </div>
    `;
  }

  function renderStepList() {
    const currentId = state.roadmapView?.id || state.currentStep?.id;
    const groupStates = readGroupStates();
    let html = '<div class="wiz-menu">';
    for (const g of state.groups) {
      const stepsInGroup = g.stepIds
        .map(id => state.steps.find(s => s.id === id))
        .filter(Boolean);
      const isEmpty = stepsInGroup.length === 0;
      const containsCurrent = stepsInGroup.some(s => s.id === currentId);
      const open = !isEmpty && isGroupOpen(g.label, containsCurrent, groupStates);

      const chev = isEmpty ? '○' : '▸';
      const badge = isEmpty ? 'Roadmap' : `${stepsInGroup.length}`;
      const headerTag = isEmpty ? 'div' : 'button';
      const headerAttrs = isEmpty
        ? ''
        : `type="button" aria-expanded="${open ? 'true' : 'false'}"`;

      html += `<div class="wiz-menu__group${isEmpty ? ' wiz-menu__group--empty' : ''}" data-label="${esc(g.label)}" data-state="${open ? 'open' : 'closed'}">`;
      html += `<${headerTag} class="wiz-menu__group-header" ${headerAttrs}>
        <span class="wiz-menu__chev" aria-hidden="true">${chev}</span>
        <span class="wiz-menu__group-label">${esc(g.label)}</span>
        <span class="wiz-menu__group-count">${badge}</span>
      </${headerTag}>`;

      if (!isEmpty) {
        html += `<div class="wiz-menu__items">`;
        for (const s of stepsInGroup) {
          const fileLabel = s.files.length
            ? esc(s.files[0]) + (s.files.length > 1 ? ' + …' : '')
            : '— Roadmap';
          const isCurrent = s.id === currentId ? ' aria-current="true"' : '';
          if (s.isRoadmap) {
            html += `<button class="wiz-menu__item wiz-menu__item--roadmap" type="button" data-id="${esc(s.id)}"${isCurrent}>
              <span class="wiz-menu__title">${esc(s.title)}</span>
              <span class="wiz-menu__file">${fileLabel}</span>
            </button>`;
          } else {
            html += `<a class="wiz-menu__item" href="/${esc(s.files[0])}" data-id="${esc(s.id)}"${isCurrent}>
              <span class="wiz-menu__title">${esc(s.title)}</span>
              <span class="wiz-menu__file">${fileLabel}</span>
            </a>`;
          }
        }
        html += `</div>`;
      }
      html += `</div>`;
    }
    html += '</div>';
    return html;
  }

  function renderPanel() {
    if (!state.ui) return;
    let body;
    if (state.roadmapView) body = renderRoadmapBody(state.roadmapView);
    else if (state.currentStep) body = renderStepBody(state.currentStep);
    else body = renderEmptyBody();
    state.ui.body.innerHTML = renderSelector() + body;
    attachPanelHandlers();
  }

  function attachPanelHandlers() {
    if (!state.ui) return;

    const selBtn = state.ui.body.querySelector('#wiz-selector-btn');
    const selWrap = state.ui.body.querySelector('#wiz-selector');
    if (selBtn && selWrap) {
      selBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.selectorOpen = !state.selectorOpen;
        selWrap.dataset.state = state.selectorOpen ? 'open' : 'closed';
        selBtn.setAttribute('aria-expanded', state.selectorOpen ? 'true' : 'false');
      });
    }

    const menu = state.ui.body.querySelector('.wiz-menu');
    if (!menu) return;

    for (const groupEl of menu.querySelectorAll('.wiz-menu__group')) {
      if (groupEl.classList.contains('wiz-menu__group--empty')) continue;
      const hdr = groupEl.querySelector('.wiz-menu__group-header');
      if (!hdr) continue;
      hdr.addEventListener('click', (e) => {
        e.stopPropagation();
        const next = groupEl.dataset.state === 'open' ? 'closed' : 'open';
        groupEl.dataset.state = next;
        hdr.setAttribute('aria-expanded', next === 'open' ? 'true' : 'false');
        const states = readGroupStates();
        states[groupEl.dataset.label] = next;
        writeGroupStates(states);
      });
    }

    // Roadmap step click: stay on current page, swap panel to roadmap view.
    for (const btn of menu.querySelectorAll('.wiz-menu__item--roadmap')) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const step = state.steps.find(s => s.id === id);
        if (!step) return;
        state.roadmapView = step;
        state.selectorOpen = false;
        setBadge(step.id);
        renderPanel();
      });
    }

    // Real step links navigate via the browser; mark the panel closed
    // first so the next page boots with the panel collapsed (don't
    // surprise the reviewer with an open overlay on the screen they
    // just chose to look at).
    for (const link of menu.querySelectorAll('a.wiz-menu__item')) {
      link.addEventListener('click', () => writePanelState('closed'));
    }
  }

  // ------- panel show/hide ---------------------------------------------

  function setPanelState(open) {
    state.panelOpen = !!open;
    state.ui.panel.hidden = !state.panelOpen;
    state.ui.panel.dataset.state = state.panelOpen ? 'open' : 'closed';
    state.ui.logo.setAttribute('aria-expanded', state.panelOpen ? 'true' : 'false');
    writePanelState(state.panelOpen ? 'open' : 'closed');
    if (state.panelOpen) {
      state.selectorOpen = false; // fresh panel: dropdown starts collapsed
      renderPanel();
    }
  }
  function togglePanel() { setPanelState(!state.panelOpen); }

  // ------- boot --------------------------------------------------------

  async function boot() {
    let md;
    try {
      const res = await fetch(DOC_URL, { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      md = await res.text();
    } catch {
      // No DEMO-FLOW.md reachable — wizard stays invisible (don't pollute
      // upstream pages with broken chrome).
      return;
    }

    const parsed = parseDemoFlow(md);
    if (!parsed.steps.length) return;

    // Pull overlay narration (extras.md) and PDF demo metadata in
    // parallel. Both are optional — wizard works without them.
    const [extrasText, metaJson] = await Promise.all([
      fetch(EXTRAS_URL, { cache: 'no-cache' }).then(r => r.ok ? r.text() : '').catch(() => ''),
      fetch(METADATA_URL, { cache: 'no-cache' }).then(r => r.ok ? r.json() : null).catch(() => null),
    ]);

    const extraSteps = extrasText ? parseDemoFlow(extrasText).steps : [];
    extraSteps.forEach(s => { s.isExtra = true; });
    state.demoMeta = (metaJson && metaJson.stepMeta) || {};
    state.useCases = (metaJson && metaJson.useCases) || {};

    const allSteps = [...parsed.steps, ...extraSteps];

    if (WALKTHROUGH_STRUCTURE) {
      state.groups = WALKTHROUGH_STRUCTURE;
      const seen = new Set();
      const ordered = [];
      for (const g of WALKTHROUGH_STRUCTURE) {
        for (const id of g.stepIds) {
          const s = allSteps.find(x => x.id === id);
          if (s && !seen.has(s.id)) { ordered.push(s); seen.add(s.id); }
        }
      }
      for (const s of allSteps) {
        if (!seen.has(s.id)) { ordered.push(s); seen.add(s.id); }
      }
      state.steps = ordered;
    } else {
      state.steps = allSteps;
      state.groups = parsed.groups;
    }

    state.currentStep = findStepForPath(state.steps);
    state.ui = buildChrome();

    if (state.currentStep) {
      setBadge(state.currentStep.id);
    } else {
      setBadge('');
    }

    state.ui.logo.addEventListener('click', (e) => { e.stopPropagation(); togglePanel(); });
    document.addEventListener('click', (e) => {
      if (!state.panelOpen) return;
      if (state.ui.panel.contains(e.target)) return;
      if (state.ui.logo.contains(e.target)) return;
      setPanelState(false);
    });

    // Dead-link interceptor: catch upstream <a> tags with no real
    // destination (href="#" / "" / "javascript:" / missing) and show a
    // toast instead of leaving stakeholders on a silent non-event.
    // Capture phase so we run before any in-page handlers; skip our
    // own chrome and anything explicitly opted out via data-wiz-allow.
    document.addEventListener('click', (e) => {
      const link = e.target && e.target.closest && e.target.closest('a');
      if (!isDeadLink(link)) return;
      e.preventDefault();
      e.stopPropagation();
      showToast('Diese Funktion ist nicht Teil der ZK09-Bewertung');
    }, true);

    // Clean up storage keys that are no longer used (current step is now
    // implied by location.pathname).
    try { localStorage.removeItem(OLD_STEP_KEY); } catch {}

    setPanelState(readPanelState() === 'open');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
