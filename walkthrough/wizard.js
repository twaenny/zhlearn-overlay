// ZHlearn reviewer-walkthrough overlay.
//
// Implements the wizard contract from DEMO-FLOW.md §10:
// - parses DEMO-FLOW.md at runtime (SSOT, no derived build artefact)
// - loads the per-step HTML into an iframe; reviewers may click freely
// - persists step position in localStorage; restores on reload
// - syncs current step with the URL hash for shareable links
// - 15 walkthrough steps + 2 roadmap-only steps (no iframe)

(() => {
  'use strict';

  const STORAGE_KEY = 'zhlearn-walkthrough-step';
  const DOC_URL = '../DEMO-FLOW.md';
  const REPO_BASE = '../'; // step files live one level above /walkthrough/

  // Labels that the reviewer-step blocks consistently use. Anything else
  // we encounter (Tone commitment, Governance commitment, …) is rendered
  // verbatim — the parser stays generic on purpose.
  const META_LABELS = new Set(['Persona', 'Award lens']);

  // German display labels for the four canonical reviewer sub-blocks.
  // Falls through to the upstream label for anything else (roadmap steps).
  const LABEL_TRANSLATIONS = {
    'What you\'re looking at': 'Was Sie sehen',
    'Notable interactions': 'Interaktionen zum Ausprobieren',
    'Design choices to evaluate': 'Designentscheidungen — Ihr Urteil ist gefragt',
    'Known limitations': 'Bekannte Grenzen des Prototyps',
  };

  // ------- parser -------------------------------------------------------

  function parseDemoFlow(md) {
    const headingRe = /^### Step (\d+)(?:\s*·\s*)?(.*?)$/gm;
    const headings = [...md.matchAll(headingRe)];
    const steps = [];
    for (let i = 0; i < headings.length; i++) {
      const m = headings[i];
      const id = m[1];
      const headRest = m[2];
      const bodyStart = m.index + m[0].length;
      const bodyEnd = i + 1 < headings.length ? headings[i + 1].index : md.length;
      let body = md.slice(bodyStart, bodyEnd);
      // Stop at the next H2 (`## `) — that's the next part of the doc.
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
    return steps;
  }

  function parseSections(body) {
    const lines = body.split('\n');
    const sections = [];
    let current = null;
    const flush = () => { if (current) { sections.push(current); current = null; } };
    for (const raw of lines) {
      const line = raw;
      // A label line is **Label** at start, optionally followed by `· inline text`.
      // Tolerant: trailing whitespace is fine. Anything bold-mid-sentence stays
      // inside the previous section because it doesn't start at column 0.
      const labelMatch = line.match(/^\*\*([^*]+?)\*\*(?:\s*·\s*(.+))?\s*$/);
      if (labelMatch) {
        flush();
        current = { label: labelMatch[1].trim(), inline: (labelMatch[2] || '').trim(), lines: [] };
        continue;
      }
      if (current) {
        current.lines.push(line);
      }
    }
    flush();
    // Trim leading/trailing blank lines on each section body.
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
    // code spans before bold so we don't try to bold inside code
    s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
    s = s.replace(/\*\*([^*]+?)\*\*/g, (_, c) => `<strong>${c}</strong>`);
    return s;
  }

  function renderBlock(lines) {
    // Group consecutive bullet lines into a <ul>; consecutive non-bullet,
    // non-blank lines into a <p>. Blank lines are paragraph separators.
    const out = [];
    let para = [];
    let bullets = [];
    const flushPara = () => {
      if (para.length) { out.push(`<p>${inlineMd(para.join(' '))}</p>`); para = []; }
    };
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

  // ------- renderer -----------------------------------------------------

  const ui = {
    narration: document.getElementById('wiz-narration-body'),
    iframe:    document.getElementById('wiz-iframe'),
    roadmap:   document.getElementById('wiz-roadmap-panel'),
    fileName:  document.getElementById('wiz-file-name'),
    fileTabs:  document.getElementById('wiz-file-tabs'),
    openDirect:document.getElementById('wiz-open-direct'),
    stepNow:   document.getElementById('wiz-step-now'),
    stepTotal: document.getElementById('wiz-step-total'),
    progress:  document.getElementById('wiz-progress-bar'),
    prev:      document.getElementById('wiz-prev'),
    next:      document.getElementById('wiz-next'),
    listBtn:   document.getElementById('wiz-step-list'),
    menu:      document.getElementById('wiz-step-menu'),
  };

  let state = {
    steps: [],
    currentIndex: 0,
    activeFileByStep: {}, // for steps with multiple files: id → active filename
  };

  function buildStepMenu() {
    const groups = [
      { label: 'Teil 1 · Marc — interne Lernreise', range: [1, 4] },
      { label: 'Teil 2 · Annika — externe Buchung', range: [5, 8] },
      { label: 'Teil 3 · Silvia — Verwaltung', range: [9, 15] },
      { label: 'Teil 4 · Roadmap (kein Screen)',   range: [16, 17] },
    ];
    const frag = document.createDocumentFragment();
    for (const g of groups) {
      const stepsInGroup = state.steps.filter(s => +s.id >= g.range[0] && +s.id <= g.range[1]);
      if (!stepsInGroup.length) continue;
      const header = document.createElement('div');
      header.className = 'wiz-menu__group';
      header.textContent = g.label;
      frag.appendChild(header);
      for (const s of stepsInGroup) {
        const btn = document.createElement('button');
        btn.className = 'wiz-menu__item';
        btn.type = 'button';
        btn.setAttribute('role', 'menuitem');
        btn.dataset.id = s.id;
        btn.innerHTML = `
          <span class="wiz-menu__num">${s.id}.</span>
          <span class="wiz-menu__title">${esc(s.title)}</span>
          <span class="wiz-menu__file">${s.files.length ? esc(s.files[0]) + (s.files.length > 1 ? ' + …' : '') : '— Roadmap'}</span>
        `;
        btn.addEventListener('click', () => { hideMenu(); goTo(s.id); });
        frag.appendChild(btn);
      }
    }
    ui.menu.innerHTML = '';
    ui.menu.appendChild(frag);
  }

  function updateMenuCurrent() {
    const id = state.steps[state.currentIndex].id;
    [...ui.menu.querySelectorAll('.wiz-menu__item')].forEach(el => {
      el.toggleAttribute('aria-current', el.dataset.id === id);
      if (el.dataset.id === id) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    });
  }

  function hideMenu() {
    ui.menu.hidden = true;
    ui.listBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const open = !ui.menu.hidden;
    if (open) hideMenu();
    else {
      ui.menu.hidden = false;
      ui.listBtn.setAttribute('aria-expanded', 'true');
      updateMenuCurrent();
      const current = ui.menu.querySelector('[aria-current="true"]');
      if (current) current.scrollIntoView({ block: 'nearest' });
    }
  }

  function renderStep() {
    const step = state.steps[state.currentIndex];
    if (!step) return;

    // header counter + progress
    ui.stepNow.textContent = step.id;
    ui.stepTotal.textContent = state.steps.length;
    const pct = Math.round(((state.currentIndex + 1) / state.steps.length) * 100);
    ui.progress.style.setProperty('--p', pct + '%');

    // narration
    ui.narration.innerHTML = renderNarration(step);

    // stage: iframe (with optional file tabs) OR roadmap panel
    if (step.isRoadmap) {
      ui.iframe.hidden = true;
      ui.iframe.removeAttribute('src');
      ui.roadmap.hidden = false;
      ui.roadmap.innerHTML = renderRoadmap(step);
      ui.fileName.textContent = '— (kein Screen, Roadmap-Schritt)';
      ui.fileTabs.hidden = true;
      ui.fileTabs.innerHTML = '';
      ui.openDirect.style.visibility = 'hidden';
    } else {
      ui.roadmap.hidden = true;
      ui.iframe.hidden = false;
      ui.openDirect.style.visibility = 'visible';

      const activeFile = state.activeFileByStep[step.id] || step.files[0];
      const iframeSrc = REPO_BASE + activeFile;
      if (ui.iframe.dataset.src !== iframeSrc) {
        ui.iframe.src = iframeSrc;
        ui.iframe.dataset.src = iframeSrc;
      }
      ui.fileName.textContent = activeFile;
      ui.openDirect.href = iframeSrc;

      if (step.files.length > 1) {
        ui.fileTabs.hidden = false;
        ui.fileTabs.innerHTML = step.files.map(f => {
          const pressed = f === activeFile ? 'true' : 'false';
          return `<button class="wiz-file-tab" type="button" aria-pressed="${pressed}" data-file="${esc(f)}">${esc(f)}</button>`;
        }).join('');
        [...ui.fileTabs.querySelectorAll('.wiz-file-tab')].forEach(b => {
          b.addEventListener('click', () => {
            state.activeFileByStep[step.id] = b.dataset.file;
            renderStep();
          });
        });
      } else {
        ui.fileTabs.hidden = true;
        ui.fileTabs.innerHTML = '';
      }
    }

    // footer button states
    ui.prev.disabled = state.currentIndex === 0;
    ui.next.disabled = state.currentIndex === state.steps.length - 1;
    ui.next.textContent = state.currentIndex === state.steps.length - 1 ? 'Fertig ✓' : 'Weiter →';

    // persistence + URL hash
    try { localStorage.setItem(STORAGE_KEY, step.id); } catch { /* private mode etc. */ }
    if (location.hash !== '#step-' + step.id) {
      history.replaceState(null, '', '#step-' + step.id);
    }
    document.title = `ZHlearn · Schritt ${step.id} — ${step.title}`;

    updateMenuCurrent();
  }

  function renderNarration(step) {
    const meta = step.sections.filter(s => META_LABELS.has(s.label));
    const body = step.sections.filter(s => !META_LABELS.has(s.label));

    const chips = [];
    const personaSec = meta.find(s => s.label === 'Persona');
    if (personaSec && personaSec.inline) {
      chips.push(`<span class="wiz-chip wiz-chip--accent">${inlineMd(personaSec.inline)}</span>`);
    }
    const awardSec = meta.find(s => s.label === 'Award lens');
    if (awardSec && awardSec.inline) {
      // Award lens has multiple `·`-separated facets — split into chips.
      for (const facet of awardSec.inline.split(/\s+·\s+/)) {
        chips.push(`<span class="wiz-chip wiz-chip--mono">${inlineMd(facet.trim())}</span>`);
      }
    }

    const sectionsHtml = body.map(s => {
      const heading = LABEL_TRANSLATIONS[s.label] || s.label;
      const block = renderBlock(s.lines);
      const inline = s.inline ? `<p>${inlineMd(s.inline)}</p>` : '';
      return `<section><h3>${esc(heading)}</h3>${inline}${block}</section>`;
    }).join('');

    return `
      <span class="wiz-step-eyebrow">Schritt ${esc(step.id)} von ${state.steps.length}</span>
      <h2>${esc(step.title)}</h2>
      <div class="wiz-chips">${chips.join('')}</div>
      ${sectionsHtml}
    `;
  }

  function renderRoadmap(step) {
    const body = step.sections.filter(s => !META_LABELS.has(s.label));
    const meta = step.sections.filter(s => META_LABELS.has(s.label));
    const chips = meta.map(s => `<span class="wiz-chip wiz-chip--mono">${inlineMd(s.label)}: ${inlineMd(s.inline || '—')}</span>`).join(' ');
    const sectionsHtml = body.map(s => {
      const heading = s.label;
      return `<section><h3>${esc(heading)}</h3>${s.inline ? `<p>${inlineMd(s.inline)}</p>` : ''}${renderBlock(s.lines)}</section>`;
    }).join('');
    return `
      <h2>${esc(step.title)}</h2>
      <div class="wiz-chips">${chips}</div>
      ${sectionsHtml}
      <div class="wiz-roadmap__placeholder">
        Für diesen Schritt existiert noch kein Screen — die Surfaces sind durch
        offene Designentscheidungen blockiert (siehe <code>OPEN-QUESTIONS.md</code>).
        Der Walkthrough nennt sie bewusst, damit Sie wissen, dass die Roadmap-Punkte
        nicht vergessen sind.
      </div>
    `;
  }

  // ------- navigation ---------------------------------------------------

  function goTo(idOrIndex) {
    let idx;
    if (typeof idOrIndex === 'number') idx = idOrIndex;
    else idx = state.steps.findIndex(s => s.id === String(idOrIndex));
    if (idx < 0 || idx >= state.steps.length) return;
    state.currentIndex = idx;
    renderStep();
  }

  function attachHandlers() {
    ui.prev.addEventListener('click', () => goTo(state.currentIndex - 1));
    ui.next.addEventListener('click', () => goTo(state.currentIndex + 1));
    ui.listBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    document.addEventListener('click', (e) => {
      if (!ui.menu.hidden && !ui.menu.contains(e.target) && e.target !== ui.listBtn) hideMenu();
    });
    window.addEventListener('hashchange', () => {
      const m = location.hash.match(/^#step-(\d+)$/);
      if (m) goTo(m[1]);
    });
    window.addEventListener('keydown', (e) => {
      // Ignore typing inside form fields (none today, but cheap to guard).
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'j' || e.key === 'J') {
        if (state.currentIndex < state.steps.length - 1) goTo(state.currentIndex + 1);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'k' || e.key === 'K') {
        if (state.currentIndex > 0) goTo(state.currentIndex - 1);
        e.preventDefault();
      } else if (e.key === 'l' || e.key === 'L') {
        toggleMenu();
        e.preventDefault();
      } else if (e.key === 'Escape') {
        if (!ui.menu.hidden) hideMenu();
      }
    });
  }

  // ------- bootstrap ----------------------------------------------------

  async function boot() {
    let md;
    try {
      const res = await fetch(DOC_URL, { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      md = await res.text();
    } catch (err) {
      ui.narration.innerHTML = `
        <h2>Walkthrough konnte nicht geladen werden</h2>
        <p>Der Begleittext liegt in <code>DEMO-FLOW.md</code> im Repo-Root.
        Fehler beim Laden: <code>${esc(String(err))}</code></p>
        <p>Sie können die Screens direkt über
        <a href="../index.html">die Launcher-Übersicht</a> aufrufen.</p>`;
      return;
    }

    state.steps = parseDemoFlow(md);
    if (!state.steps.length) {
      ui.narration.innerHTML = `<p>Keine Schritte in DEMO-FLOW.md gefunden.</p>`;
      return;
    }

    buildStepMenu();
    attachHandlers();

    // Restore: URL hash wins; else localStorage; else step 1.
    const hashMatch = location.hash.match(/^#step-(\d+)$/);
    let startId = null;
    if (hashMatch) startId = hashMatch[1];
    else {
      try { startId = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
    }
    const startIdx = startId
      ? Math.max(0, state.steps.findIndex(s => s.id === startId))
      : 0;
    state.currentIndex = startIdx >= 0 ? startIdx : 0;

    renderStep();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
