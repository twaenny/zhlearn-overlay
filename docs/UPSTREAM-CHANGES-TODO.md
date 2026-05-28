# ZHlearn Upstream — Demo-Prep Changes (Stand 2026-05-28)

## ✅ ERLEDIGT 2026-05-28

- **Revert `8f67ca1`** (commit `1d1b961`, gepusht direkt auf main): Codex hat in PR #64 die ganze `nutzeruebersicht.html` mit dem Literal `@nutzeruebersicht.html` überschrieben (-1378 Zeilen, +2 Garbage). Hub-Stand aus `77821a5` wiederhergestellt. Frank muss seine „add external user creation context"-Absicht in einem neuen sauberen PR re-implementieren.

---


**Quelle**: ZK09-Bid-Audit + Demo-Plan-PDF + Strict-Reading des Pflichtenhefts §3, durchgeführt im Overlay-Repo `twaenny/zhlearn-overlay`.

**Ziel-Repo (HIER)**: `github.com/Digital4Health/ZHlearn`.

**Deadline**: 2026-05-31 (ZK09 Live-Demo).

**Wie dieses Dokument benutzen**: dropp es ins Upstream-Repo (z.B. als `UPSTREAM-CHANGES-TODO.md` im Root), öffne eine Claude-Code-Session dort, sage *„Arbeite die Tasks in UPSTREAM-CHANGES-TODO.md ab, Priority 1 zuerst, jeden Task als eigenen Commit mit dem unten genannten Commit-Message-Format."* Oder manuell durchgehen.

---

## ⚠️ Kontext / Architektur — lies das ZUERST

Es gibt **zwei sibling-Repos**:
- `Digital4Health/ZHlearn` (DIESES Repo) — Prototyp-HTML + Bid-Doku, Quelle aller sichtbaren Designs
- `twaenny/zhlearn-overlay` (separat) — Wizard-Chrome (`walkthrough/`), nginx-Config, Demo-Doku. **NICHT IM KONTEXT HIER**

**Live-Deployment**: `https://zhlearn.ai.srmedia.ch` zieht dieses Repo per Auto-Pull alle 120 s. Jeder Push hier ist nach ~2 min live.

**Was DU machst**: HTML / CSS / Markdown in diesem Upstream-Repo. **Niemals** im Overlay-Repo.

**Was DU NICHT machst**: keine Wizard-Chrome-Änderungen, keine nginx-Config, keine Overlay-Doku. Das macht ein anderes Team.

**Konsequenz für jeden Edit**:
- Page-File-Renames brechen ggf. den Wizard (der referenziert HTML-Filenames via DEMO-FLOW.md + extras.md im Overlay). Bei Rename → DEMO-FLOW.md **muss** mit-aktualisiert werden.
- Neue Pages, die im Wizard sichtbar sein sollen, brauchen einen `### Step N · 'page.html' — Titel`-Eintrag in DEMO-FLOW.md (siehe §10.3 dort).
- KK-Sichtbarkeit (KK1/KK2/KK3) ist im Bid 1st-class, nicht nur Visual.

**KTZH Design-Konstanten** (aus DESIGN.md), gelten für ALLE Edits:
- Inter, zwei Weights only: Regular (400) + Black (900). **Nie** andere Weights.
- Square edges (`border-radius: 1px`), keine Pillen außer Status-Tags.
- Achromatic foundation + EIN cv-Accent (cv-blue ist default). Nie Rainbow-Gradients, nie Emoji-Icons in der UI.
- Pflicht-Treatment: bestehender `.binding--pflicht` Token (rot, weiss Text). Nie eine neue Farbe erfinden.
- Tone: Schweizerisch-formal. Kein „+10 XP!"-Popup, keine Game-Loot-Ästhetik.

---

## Priority 1 — BLOCKING (vor 2026-05-31)

Diese zwei Tasks schliessen die einzigen **strict-reading Gaps** im Bid §3 Live-Demo.

### Task 1 · `leaderboard.html` als neue Mini-Page bauen

**Bid-Bezug**: §3 Use-Case 5.4 *„Darstellung von Gamification-Elementen (Punkte, Badges, **Leaderboards**)"* — Leaderboards ist PLURAL, und es existiert heute **keine einzige** Leaderboard-Surface. Nur ein Permission-Eintrag in `rollen-berechtigungen.html` („Leaderboards anzeigen / steuern").

**Bid-Constraints** (aus `bid/ZK07-gamification.md`):
- **Opt-in + anonymisierbar** per IDG ZH §16
- Default-Anzeige unentschieden (OPEN-QUESTIONS.md #11) — **Empfehlung: anonymisierte Default-View** mit Toggle „Klarnamen anzeigen" für die, die opt-in sind
- **Group-scoped** (team / amt / direktion), nicht global
- Visual: Schweizerische Auszeichnungen-Ästhetik, nicht Video-Game

**Page-Spec** (Minimum-Viable für die Demo):

```
URL: /leaderboard.html
Persona: Marc Steiner (interner Lerner), Topbar wie mein-lernen
Chrome: blue cv-darkblue topbar + role-strip + news-rail (User-Shell)

Layout:
┌────────────────────────────────────────────┐
│ ZHlearn · Lernen   [Marc Steiner]          │
├────────────────────────────────────────────┤
│ < Zurück zu Mein Lernen                    │
│                                            │
│ Leaderboard · Persönliche Entwicklung      │
│                                            │
│ ┌──────────────────────────────────────┐   │
│ │ Opt-In-Banner:                       │   │
│ │ „Sie sehen Klarnamen, weil Sie + Ihr │   │
│ │ Team sich für die offene Anzeige     │   │
│ │ entschieden haben. [Anonymisieren]"  │   │
│ │ — Anonymisiert-Modus: pseudo-namen   │   │
│ │   wie 'Lernerin #04 · Personalamt'   │   │
│ └──────────────────────────────────────┘   │
│                                            │
│ Filter: [Mein Team ▾] [Letzte 30 Tage ▾]   │
│                                            │
│ ┌──────────────────────────────────────┐   │
│ │ Rang  Person                Punkte   │   │
│ │ 1     Stefan Iten              2'140 │   │
│ │ 2     Lukas Bühler             1'872 │   │
│ │ 3     Annika Weiss             1'654 │   │
│ │ …                                    │   │
│ │ 8     SIE · Marc Steiner       1'247 │← hervorgehoben (cv-darkblue Hintergrund)
│ │ 9     Petra Hofmann            1'180 │   │
│ │ 10    Daniel Schmid            1'050 │   │
│ └──────────────────────────────────────┘   │
│                                            │
│ Sidebar rechts:                            │
│ - Aktivitäts-Level (Tile)                  │
│ - Streak: 12 Tage in Folge                 │
│ - Nächstes Badge: noch 2 Module zum Mai-Badge │
└────────────────────────────────────────────┘
```

**Files**:
- Neu: `leaderboard.html` (im Root)
- DEMO-FLOW.md erweitern (siehe Task 6 unten — kann gemeinsam mit Task 1 in einem Commit, oder separat)
- Verlinkung: `mein-lernen.html` Punkte-Tile bekommt einen `[Leaderboard anzeigen →]`-Link

**Bestehende Components recyceln** (nicht neu erfinden):
- Topbar + sidebar aus `mein-lernen.html` Pattern
- Tabellen-Grammatik aus `nutzeruebersicht.html` (5-Pill-Header etc.)
- Status-Banner-Pattern aus `freigabeprozess.html`
- Demo-Daten kompatibel mit den existierenden Personen-Mocks (Stefan, Lukas, Annika, Marc, Petra, Daniel — schon irgendwo im Repo benutzt)

**Aufwand**: ~2 h

**Commit-Message**: `feat(zhlearn): add leaderboard page for Bid §3 UC 5.4`

**Verification**:
- `https://zhlearn.ai.srmedia.ch/leaderboard.html` lädt nach Auto-Pull (~2 min)
- Layout passt zum mein-lernen-Pattern (blue topbar, KTZH Design-Tokens)
- Anonymisierungs-Toggle funktioniert (optional kann er nur visuell sein, kein Backend)
- Marc's Position (Rank 8) ist hervorgehoben

---

### Task 2 · `kompetenzen.html` — Lernpfad-Builder-Sidebar aktivieren

**Bid-Bezug**: §3 Use-Case 5.3 *„Erstellung von persönlichen Lernpfaden"* — der HTML-Block `<aside class="kp-builder" aria-label="Persönlichen Lernpfad zusammenstellen">` existiert bereits in `kompetenzen.html`, ist aber via CSS auf `display: none`.

**Task**:

1. Im CSS-Block von `kompetenzen.html` die `display: none` Regel für `.kp-builder` entfernen ODER auf `display: block` ändern.
2. Innerhalb des Builders **3 Mock-Module** einsetzen (oder mehr, wenn da ist):

```html
<aside class="kp-builder" aria-label="Persönlichen Lernpfad zusammenstellen">
  <h3>Mein Lernpfad zusammenstellen</h3>
  <p class="kp-builder__sub">Ziehen Sie Module in die gewünschte Reihenfolge.</p>
  <ol class="kp-builder__sequence">
    <li class="kp-module" data-order="1">
      <span class="kp-module__drag" aria-hidden="true">⋮⋮</span>
      <span class="kp-module__title">Resilienz im Berufsalltag — Grundlagen</span>
      <span class="kp-module__meta">Modul 1 · 45 min · Selbststudium</span>
    </li>
    <li class="kp-module" data-order="2">
      <span class="kp-module__drag" aria-hidden="true">⋮⋮</span>
      <span class="kp-module__title">Agile Methoden — Einführung</span>
      <span class="kp-module__meta">Modul 2 · 60 min · Präsenz</span>
    </li>
    <li class="kp-module" data-order="3">
      <span class="kp-module__drag" aria-hidden="true">⋮⋮</span>
      <span class="kp-module__title">Datenschutz IDG ZH — Refresher</span>
      <span class="kp-module__meta">Modul 3 · 30 min · Pflicht</span>
    </li>
  </ol>
  <div class="kp-builder__actions">
    <button class="btn btn--secondary" type="button">+ Modul hinzufügen</button>
    <button class="btn btn--primary" type="button">Lernpfad veröffentlichen</button>
    <button class="btn btn--ghost" type="button">Mit Team teilen</button>
  </div>
</aside>
```

3. CSS-Tweaks falls nötig damit der Builder visuell zur Page passt (KTZH-Tokens, square edges).

**Bid-Constraint**: persönliche Lernpfade sind **visible only to creator** (Bid §4.2) — kein Freigabe-Workflow. „Veröffentlichen" hier meint „in eigenes Mein-Lernen übernehmen", nicht „für andere sichtbar machen". „Mit Team teilen" ist UC 5.5 Crossover.

**Aufwand**: ~1 h

**Commit-Message**: `feat(zhlearn): activate kompetenzen Lernpfad-Builder (Bid §3 UC 5.3)`

**Verification**:
- `https://zhlearn.ai.srmedia.ch/kompetenzen.html` zeigt den Builder im Layout
- 3 Mock-Module sichtbar mit Drag-Handle (auch ohne JS-Drag funktional als statisches Mockup)
- Buttons sichtbar mit KTZH-Styling

---

## Priority 2 — Demo-Cosmetics

### Task 3 · Daten-Konsistenz: „Marc Steiner" überall

**Problem**: 5 verschiedene Marc-Nachnamen im Prototyp — *Baumann, Brunner, Keller, Schmid, Steiner*. PDF + Bid-Doku nennt **Marc Steiner** als Kanon-Persona.

**Task**: Find-replace über alle 35 HTML-Files:

```sh
cd ~/projects/platform/tools/zhlearn   # adjust path
grep -rl 'Marc Baumann\|Marc Brunner\|Marc Keller\|Marc Schmid' *.html | while read f; do
  sed -i 's/Marc Baumann/Marc Steiner/g; s/Marc Brunner/Marc Steiner/g; s/Marc Keller/Marc Steiner/g; s/Marc Schmid/Marc Steiner/g' "$f"
done
```

**Achtung**: nur Vorname+Nachname-Kombinationen ersetzen. Stand-alone Vorname „Marc" ist OK. „Stefan Iten" bleibt — andere Personen sind ihre eigenen Personas.

**Aufwand**: ~30 min (inkl. Manual-Check 2-3 Stellen)

**Commit-Message**: `fix(zhlearn): unify Marc to Steiner across all pages (demo data consistency)`

**Verification**:
- `grep -hoE 'Marc [A-Z][a-z]+' *.html | sort -u` → nur noch `Marc Steiner`

### Task 4 · Direktions-Namen konsistent

**Problem**: gemischt — „Direktion JI" + „Direktion Justiz und Inneres" + bare „JI" tauchen auf.

**Empfehlung**: für die Demo bei *vollen Namen* bleiben („Direktion Justiz und Inneres"), Abkürzungen nur in dichten Tabellen-Spalten (Tooltip mit Vollnamen).

**Files vermutlich betroffen**: `nutzerprofil-detail.html`, `nutzeruebersicht.html`, `manager-dashboard.html`, `angebote-uebersicht.html`.

**Aufwand**: ~30 min (manueller Check)

**Commit-Message**: `fix(zhlearn): unify Direktion naming (Justiz und Inneres in long form)`

### Task 5 · Sidebar-Geist-Links in `index.html`

**Problem**: `index.html` Sidebar (Zeilen ~236–268) hat 7× `<a href="#" class="sidebar__item">` — Teilnehmende · Dashboard · Berichte · Einstellungen · Audit-Log · Hilfe · Statusseite. Klick darauf führt nichts → Overlay-Wizard zeigt einen „Diese Funktion ist nicht Teil der ZK09-Bewertung"-Toast.

**Optionen** (eine wählen):

**Option A (empfohlen — sauberer)**: Echte Verlinkung zu existierenden Pages wo möglich:
- `Teilnehmende` → `teilnehmende-uebersicht.html`
- `Dashboard` → `manager-dashboard.html`
- `Berichte` → `auswertungen.html`
- `Einstellungen` / `Audit-Log` / `Hilfe` / `Statusseite` → bleiben `href="#"`, aber bekommen `data-wiz-allow` Attribut (unterdrückt den Toast)

```html
<!-- Beispiel -->
<a href="./teilnehmende-uebersicht.html" class="sidebar__item">Teilnehmende</a>
<a href="./manager-dashboard.html" class="sidebar__item">Dashboard</a>
<a href="./auswertungen.html" class="sidebar__item">Berichte</a>
<a href="#" class="sidebar__item" data-wiz-allow>Einstellungen</a>
<a href="#" class="sidebar__item" data-wiz-allow>Audit-Log</a>
<a href="#" class="sidebar__item" data-wiz-allow>Hilfe</a>
<a href="#" class="sidebar__item" data-wiz-allow>Statusseite</a>
```

**Option B (quick win)**: alle 7 nur mit `data-wiz-allow` taggen — Klicks tun nichts, kein Toast.

**Aufwand**: A: ~30 min · B: ~10 min

**Commit-Message**: `fix(zhlearn): wire 3 sidebar items + suppress dead-click toast on remaining 4`

### Task 6 · `manager-dashboard.html` Dead-Clicks reduzieren

**Problem**: ~20 `href="#"` in dieser Page. Jede produziert einen Wizard-Toast wenn ein Reviewer durchklickt.

**Task**: Inbox-Items + Worklist-Buttons die zu existierenden Pages drillen (z.B. `data-target-href="./angebot-bearbeiten.html"`) tatsächlich als `href` setzen ODER mit `data-wiz-allow` taggen. Die Items haben ja schon ein `data-target-href` Attribut — das nur ins `href` heben.

**Aufwand**: ~30 min

**Commit-Message**: `fix(zhlearn): wire manager-dashboard inbox+worklist items to their target pages`

---

## Priority 3 — DEMO-FLOW.md Synchronisation (würde das Overlay vereinfachen)

### Task 7 · DEMO-FLOW.md um neue Pages erweitern

**Hintergrund**: das Overlay hat heute eine „extras.md"-Datei mit 14 zusätzlichen Steps für Pages, die nicht in DEMO-FLOW.md stehen (`manager-dashboard`, `kompetenzen`, `social-wall`, alle 6 Nutzerverwaltungs-Pages, etc.). Sobald DEMO-FLOW.md diese Pages enthält, kann das Overlay die extras.md löschen → Single Source of Truth.

**Task**: Erweitere `DEMO-FLOW.md` um neue Steps (IDs **18 aufwärts** um Kollisionen mit existierenden 1–17 zu vermeiden):

```markdown
### Step 18 · `rollen-berechtigungen.html` — Rollen & Berechtigungen

**Persona** · Silvia Keller
**Award lens** · Governance · Sicherheit

**What you're looking at**
[Inhalt aus overlay extras.md Step r1 — kopieren]

**Notable interactions**
[…]

**Design choices to evaluate**
[…]

**Known limitations**
[…]

### Step 19 · `rolle-bearbeiten.html` — Rolle bearbeiten
[…]

### Step 20 · `nutzeruebersicht.html` — Nutzerübersicht
[…]

(Weitere Steps für: nutzerprofil-detail, nutzer-anlegen-intern, nutzer-anlegen-extern,
angebot-bearbeiten, auswertungen, lernplatz-extern, meine-buchungen, webshop-2fa-setup,
manager-dashboard, kompetenzen, social-wall, leaderboard)
```

Den Narration-Content für jede Page findest du in `twaenny/zhlearn-overlay`-Repo unter `walkthrough/extras.md` — direkt 1:1 kopieren, IDs umnummerieren.

**Aufwand**: ~1 h (mostly copy-paste)

**Commit-Message**: `feat(demo-flow): extend with 14 new pages (Steps 18-31)`

### Task 8 · `lernplatz.html` Referenzen in DEMO-FLOW.md aufräumen

**Problem**: DEMO-FLOW.md referenziert noch 8× `lernplatz.html`, aber diese Datei existiert nicht mehr (wurde umbenannt zu `lernplatz-intern.html` + `lernplatz-extern.html`).

**Task**: alle 8 Vorkommen ersetzen durch `lernplatz-intern.html` (das ist der Marc-Steiner-Pfad, der in DEMO-FLOW.md gemeint war).

```sh
sed -i 's/`lernplatz\.html`/`lernplatz-intern.html`/g' DEMO-FLOW.md
```

**Aufwand**: ~5 min

**Commit-Message**: `fix(demo-flow): update lernplatz.html refs to lernplatz-intern.html after rename`

### Task 9 · AI-Output-Varianten entscheiden

**Problem**: 3 Varianten von „mein-lernen" im Repo:
- `mein-lernen.html` (kanonisch, im Wizard sichtbar)
- `mein-lernen_claude.html` (~52 KB, AI-Output von einem früheren Lauf)
- `mein-lernen_CODEX.html` (~83 KB, AI-Output, **enthält Beitragsboard**)

**Task** (eine wählen):
- **Wenn _CODEX besser ist**: rename `mein-lernen.html` → `mein-lernen_old.html`, dann `mein-lernen_CODEX.html` → `mein-lernen.html`. Beitragsboard wird canonical. _claude.html archivieren oder löschen.
- **Wenn der canonical OK ist**: beide Varianten als `.html` umbenennen zu `.html.draft` oder ins `experiments/`-Verzeichnis verschieben damit Reviewer sie nicht zufällig finden.

**Aufwand**: ~10 min (Entscheidung + git-Operationen)

**Commit-Message**: `chore(zhlearn): consolidate mein-lernen variants (chose <X>, archived rest)`

---

## Constraints Summary (für jeden Edit)

| Constraint | Quelle |
|---|---|
| Inter 400 + 900 only | DESIGN.md §9 |
| Square edges (`border-radius: 1px`) | DESIGN.md §9 |
| Achromatic + ein cv-Accent | DESIGN.md §9 |
| Pflicht-Treatment via `.binding--pflicht` | OPEN-QUESTIONS.md #3 RESOLVED |
| Mandant-Scoping default = own | Beilage V §3.2.2 |
| Audit-Trail bei Rollen-Edit | ROLLEN-WORKFLOW.md |
| Keine Emoji-Icons, keine Rainbow-Gradients | bid/ZK07-gamification.md Tone |
| KK1/KK2/KK3 als separate Toggles | bid/ZK06-external-access.md |
| 9 kanonische Rollen | pflichtenheft §2 |
| Status-Vokabular (9 States) | pflichtenheft §5 |

## Sources / Querverweise

- `pflichtenheft-extracted.md` — Pflichtenheft + Beilage V Synthese
- `DEMO-FLOW.md` — SSOT für Wizard-Steps (deine Edits hier landen im Wizard via Auto-Pull)
- `OPEN-QUESTIONS.md` — offene Design-Entscheidungen
- `DESIGN.md` — Design-Tokens + Shell-Patterns
- `bid/ZK06-external-access.md` — externe Anmeldung, 2FA
- `bid/ZK07-gamification.md` — Gamification + Tone-Commitments
- `WALKTHROUGH-ROUTES-ROLLEN.md` — geführte Touren für Rollen-Surface (Post-ZK09)
- `ROLLEN-WORKFLOW.md` — Datenmodell + Audit-Trail

## Wenn du fertig bist

Pinge die Antoine-/Overlay-Seite, damit:
- Die Wizard-`extras.md` aufgeräumt wird (Steps die jetzt in DEMO-FLOW.md stehen, müssen aus extras.md raus)
- Die Overlay-`overview.html` aktualisiert wird (Leaderboard wird von 🚧 missing zu ✅ wizard-step)
- Demo-Metadata-JSON aktualisiert wird (Coverage-Flags von „partial"/„missing" auf „ok")

Idealerweise pro Task ein Commit. Auto-Pull zieht alles automatisch nach ~2 min auf `zhlearn.ai.srmedia.ch`.
