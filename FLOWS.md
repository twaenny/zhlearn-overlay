# ZHlearn — Demo-Flow Plan (ZK09 Live-Demo)

Quelle: **§3 "Live-Demo folgender Use Cases"** des Pflichtenhefts.
Letzte Aktualisierung: **2026-05-27**, nach Upstream-Push von Chris
(36 Commits, 10 neue HTML-Seiten, `rollen-berechtigungen.html`
überholt).

**Status-Symbole:**

- ✅ Seite zeigt die Funktion — kann live demonstriert werden
- ⚠️ Seite zeigt die Funktion teilweise — Lücke benennen
- 🚧 Funktion fehlt im Prototyp — Roadmap oder Mini-Mockup
- 🔁 Inter-Page-Bridge fehlt — Wizard-Dropdown überbrückt
- 🆕 Seit 2026-05-27 neu (war in der vorherigen FLOWS-Version 🚧)

Wizard-Position: jede Seite trägt das schwebende KTZH-Logo links
unten; im Panel sind die Use-Cases als Gruppen `1.` bis `5.` sichtbar
— passt 1:1 zum Aufbau hier.

---

## ✅ STAND DER LÜCKEN — was Chris diese Woche geliefert hat

Diese Bid-Punkte waren in der vorherigen FLOWS-Version 🚧 und sind
jetzt mit echten Prototyp-Seiten abgedeckt:

| Bid-Punkt | Bid-Use-Case | Neue Seite |
|---|---|---|
| Admin-Dashboard (Rollen-spezifisch, KPI) | 5.1 | `manager-dashboard.html` (ZHlearn-Manager) |
| Lernpfade / Kompetenzen | 5.3 | `kompetenzen.html` (Meine Entwicklung) |
| Social-Learning-Hub | 5.5 | `social-wall.html` |
| Externer User Dashboard | 5.1 | `meine-buchungen.html` |
| 2FA-Setup im Checkout | 4.2 | `webshop-2fa-setup.html` |
| Reporting / Auswertungen | 3 / 5.1 | `auswertungen.html` |
| Admin-Edit für bestehende Angebote | 2.x | `angebot-bearbeiten.html` |
| Lernplatz nach Persona getrennt | 4.1 | `lernplatz-intern.html` + `lernplatz-extern.html` |

**Verbleibend 🚧:** Leaderboard-Screen (5.4) — nur als Permission-Eintrag
auf `rollen-berechtigungen.html` erwähnt. Vorschlag: verbal als Roadmap.

---

## ⚠️ AKTUELLE STÖRUNGEN

| Issue | Fix | Status |
|---|---|---|
| `lernplatz.html` ist umbenannt → produktion war 404, Wizard-Step 1 broken | nginx-Redirect `/lernplatz.html` → `/lernplatz-intern.html` | ✅ live (overlay commit) |
| Nutzerverwaltungs-Pages waren nicht im Wizard erreichbar | `EXTRA_STEPS` in `walkthrough/wizard.js` füllt Gruppe 1 (r1–r6) | ✅ live |
| 10 neue Seiten waren nicht im Wizard erreichbar | `EXTRA_STEPS` füllt Gruppen 1, 2, 3, 4, 5 mit synthetischen Steps | ✅ live |
| `mein-lernen_claude.html` (52K) existiert im Upstream | Unklarer Status — vermutlich ein versehentlich committetes Claude-Output | bei Chris klären |

---

## 📋 Page → Bid-Use-Case Matrix (35 produktive Pages)

(2 Experiment-Files `experiment-profile-dropdown-*` und das mutmaßlich
versehentlich committete `mein-lernen_claude.html` sind keine
Demo-Surfaces — ignoriert.)

| Page | Bid-Use-Case | Wizard-Step heute | Sichtbar? |
|---|---|---|---|
| `rollen-berechtigungen.html` 🆕 | 1.1 | r1 (extra) | ✅ |
| `rolle-bearbeiten.html` | 1.1 | r2 (extra) | ✅ |
| `nutzeruebersicht.html` | 1.2 | r3 (extra) | ✅ |
| `nutzerprofil-detail.html` | 1.2 (Doppelrolle) | r4 (extra) | ✅ |
| `nutzer-anlegen-intern.html` | 1.3 | r5 (extra) | ✅ |
| `nutzer-anlegen-extern.html` | 1.3 | r6 (extra) | ✅ |
| `vorlagen-uebersicht.html` | 2.1 | Step 10 (tab #2) | ✅ |
| `vorlage-bearbeiten.html` | 2.1 | – (Drill-Down) | ❌ ok |
| `angebot-erfassen.html` | 2.2 | Step 11 | ✅ |
| `lerneditor-light.html` | 2.2 | – (Drill-Down) | ❌ ok |
| `angebote-uebersicht.html` | 2.3 | Step 9 | ✅ |
| `angebot-erstellen-einstieg.html` | 2.x (Entry) | Step 10 (tab #1) | ✅ |
| `angebot-bearbeiten.html` 🆕 | 2.x (Admin-Edit) | a1 (extra) | ✅ |
| `publikation-terminierung.html` | 2.4 | Step 12 | ✅ |
| `freigabeprozess.html` | 2.4 | Step 13 | ✅ |
| `teilnehmerliste-angebot.html` | 3.1 + 3.2 | Step 14 | ✅ |
| `teilnehmende-uebersicht.html` | 3.2 | Step 15 | ✅ |
| `auswertungen.html` 🆕 | 3 / 5.1 | v1 (extra) | ✅ |
| `lernplatz-intern.html` 🆕 | 4.1 (intern) + 5.2 | Step 1 *(via Redirect)* | ✅ |
| `lernplatz-extern.html` 🆕 | 4.1 (extern) | l1 (extra) | ✅ |
| `angebot-detail.html` | 4.1 | Step 2 | ✅ |
| `mein-lernen.html` | 4.1 + 5.1 + 5.3 + 5.4 + 5.5 | Step 3 | ✅ |
| `meine-buchungen.html` 🆕 | 4.1 (Buchungs-Historie) | b1 (extra) | ✅ |
| `mobile-anmelden.html` | 4.1 (Mobile Showcase) | Step 4 | ✅ |
| `webshop-katalog.html` | 4.2 | Step 5 | ✅ |
| `webshop-detail.html` | 4.2 | Step 6 | ✅ |
| `webshop-checkout.html` | 4.2 | Step 7 | ✅ |
| `webshop-2fa-setup.html` 🆕 | 4.2 (2FA) | w1 (extra) | ✅ |
| `webshop-bestaetigung.html` | 4.2 | Step 8 | ✅ |
| `manager-dashboard.html` 🆕 | 5.1 (Admin) | d1 (extra) | ✅ |
| `kompetenzen.html` 🆕 | 5.3 (Lernpfade) | k1 (extra) | ✅ |
| `social-wall.html` 🆕 | 5.5 (Social) | s1 (extra) | ✅ |
| `index.html` | Launcher | – | – |

**Im Wizard sichtbar: alle 30 demonstrationsrelevanten Pages.** Die
beiden Drill-Down-Editoren (`vorlage-bearbeiten`, `lerneditor-light`)
bleiben bewusst "nur via Drill-Down" — sinnvoller Demo-Pfad ist:
Übersicht → Bearbeiten klicken.

---

## 1. Nutzerverwaltung
**Wizard-Gruppe 1 — `stepIds: ['r1','r2','r3','r4','r5','r6']`.**
Komplett neu seit 2026-05-27 — vorher war diese Gruppe leer.

### 1.1 Verwaltung von Rollen und Berechtigungen
- ✅ `rollen-berechtigungen.html` (r1) — **massiv überholt** (Upstream
  +2 787 Zeilen): Matrix-Views, Tile-Grids, Multi-Direktion/Amt-Scope-
  Editor. Enthält Permission-Zeile „Leaderboards anzeigen / steuern"
  (für Use-Case 5.4).
- ✅ `rolle-bearbeiten.html` (r2) — Detail-Editor einer Rolle.
- 🚧 **Roadmap** (siehe Upstream-Spec `WALKTHROUGH-ROUTES-ROLLEN.md`):
  Route A (6 Steps, „Schnellzuweisung") + Route B (9 Steps,
  „Doppelrolle Multi-Scope") sollen als geführte In-Page-Walkthroughs
  realisiert werden. Heute zeigt der Wizard nur die Pages als Liste —
  keine Element-Targets. Adoption in einer separaten PR.

### 1.2 Anzeige Doppelrollen / Mehrfachanstellung
- ✅ `nutzeruebersicht.html` (r3) — Listenansicht.
- ✅ `nutzerprofil-detail.html` (r4) — Chip „Mehrfachanstellung · 2
  Direktionen" + Hinweise „Doppelrolle erkannt / bestätigt".

### 1.3 Erstellung von Nutzerprofilen (intern + extern)
- ✅ `nutzer-anlegen-intern.html` (r5).
- ✅ `nutzer-anlegen-extern.html` (r6).

---

## 2. Erstellungs- und Publikationsprozess
**Wizard-Gruppe 2 — `stepIds: ['9','10','11','a1','12','13']`.**
Neuer Step `a1` zwischen Erfassen (11) und Publikation (12).

### 2.1 Vorlagen erstellen / bearbeiten
- ✅ `vorlagen-uebersicht.html` (Step 10 file-tab).
- ✅ `vorlage-bearbeiten.html` — Drill-Down (nicht im Wizard).

### 2.2 Angebote erfassen
- ✅ `angebot-erfassen.html` (Step 11) — Multi-Section Form.
- ✅ `lerneditor-light.html` — Drill-Down (nicht im Wizard).

### 2.3 Übersicht aller Angebote
- ✅ `angebote-uebersicht.html` (Step 9) — Cross-Angebot Liste.

### 2.4 Publikation + Freigabeprozess
- ✅ `publikation-terminierung.html` (Step 12).
- ✅ `freigabeprozess.html` (Step 13) — 4-Augen-Review.

### 2.x Bestehende Angebote bearbeiten (neu)
- ✅ `angebot-bearbeiten.html` 🆕 (a1) — Admin-Detail-Edit für
  bestehende Angebote (z.B. „Resilienz im Berufsalltag").
  Lückenfüller für den Edit-Workflow nach der Publikation.

---

## 3. Verwaltung bestehender Angebote
**Wizard-Gruppe 3 — `stepIds: ['14','15','v1']`.** Neuer Step `v1`.

### 3.1 Teilnehmerlisten exportieren / editieren
- ✅ `teilnehmerliste-angebot.html` (Step 14) — `.xlsx` + `.csv`
  Export, Edit-Aktionen.

### 3.2 Benachrichtigung der Teilnehmenden
- ✅ `teilnehmerliste-angebot.html` (Step 14) — „E-Mail senden" Button.
- ✅ `teilnehmende-uebersicht.html` (Step 15) — Cross-Angebot Mass-E-Mail.

### 3.x Reporting (neu, Bid 5.1-relevant)
- ✅ `auswertungen.html` 🆕 (v1) — Reporting-Dashboard. Liegt
  thematisch zwischen „Verwaltung" und „Dashboard"; aktuell in
  Gruppe 3 verortet weil der Admin-Workflow dort hingehört.

---

## 4. Anmeldeprozess
**Wizard-Gruppe 4 — `stepIds: ['1','l1','2','3','b1','4','5','6','w1','7','8']`.**

### 4.1 Anmeldung / Bestätigung / Abmeldung (intern)
- ✅ `lernplatz-intern.html` 🆕 (Step 1, via Redirect von `lernplatz.html`).
  Persona-getrennte Discovery-Page für interne Lernende.
- ✅ `lernplatz-extern.html` 🆕 (l1) — Discovery für externe Lernende.
- ✅ `angebot-detail.html` (Step 2) — 5 Anmelde-Varianten.
- ✅ `mein-lernen.html` (Step 3) — persönlicher Hub.
- ✅ `meine-buchungen.html` 🆕 (b1) — Buchungs-Historie (war als
  „Externer User Dashboard" im Bid gefordert).
- ✅ `mobile-anmelden.html` (Step 4).

### 4.2 Kostenpflichtige Anmeldung (extern)
- ✅ `webshop-katalog.html` (Step 5).
- ✅ `webshop-detail.html` (Step 6).
- ✅ `webshop-checkout.html` (Step 7) — 4-Step Wizard.
- ✅ `webshop-2fa-setup.html` 🆕 (w1) — 2FA-Setup-Flow,
  Lückenfüller für den Checkout.
- ✅ `webshop-bestaetigung.html` (Step 8) — Auftrags-Quittung.

### 4.3 Eintrittskontrolle Smartphone-App, GoShows
- 🚫 **„keine TS" laut Bid** — nicht im Scope, nur als Roadmap erwähnen.

---

## 5. Dashboard und Gamification
**Wizard-Gruppe 5 — `stepIds: ['d1','k1','s1','16','17']`.** Drei neue
Steps vor den Roadmap-Einträgen 16+17.

### 5.1 Dashboard-Ansichten für unterschiedliche Rollen
- ✅ `manager-dashboard.html` 🆕 (d1) — **Admin-Dashboard.** ZHlearn-
  Manager-Workspace mit Leader-Metrics. War vorher die größte Lücke.
- ✅ `mein-lernen.html` (Step 3) — Learner-Dashboard.
- ✅ `meine-buchungen.html` 🆕 (b1) — Externer-User-Dashboard.

### 5.2 Personalisierte Empfehlungen
- ✅ `lernplatz-intern.html` (Step 1) — Tooltip + „Empfehlung"-Sort +
  Social-Signal („3 Personen aus dem Bauinspektorat empfehlen").

### 5.3 Persönliche Lernpfade
- ✅ `kompetenzen.html` 🆕 (k1) — „Meine Entwicklung · Kompetenzen
  & Lernpfade". Sowohl Anzeige als auch Editor-Affordances.
- ✅ `mein-lernen.html` (Step 3) — laufender Lernpfad-Beispiel.

### 5.4 Gamification (Punkte, Badges, Leaderboards)
- ✅ Punkte + Badges: `mein-lernen.html` („1247 Punkte", „Mai-Badge").
- 🚧 **Leaderboards** — keine dedizierte Page. Permission-Eintrag in
  `rollen-berechtigungen.html`. Vorschlag: verbal als Roadmap.

### 5.5 Social-Learning (Teilen, Likes, Kommentare)
- ✅ `social-wall.html` 🆕 (s1) — **Social Wall.** Shared Learner-
  Content. War vorher die zweitgrößte Lücke.
- ✅ `mein-lernen.html` („Empfehlen", „Teilen") + `angebot-detail.html`
  (Share-Button).

### 5.x Roadmap-Steps (16, 17)
- ✅ Step 16 — Gamification-Roadmap (Wizard zeigt im Panel).
- ✅ Step 17 — AI-Roadmap (Wizard zeigt im Panel).

---

## 🆕 Upstream bewegt sich — wie wir synchron bleiben

### Neue Specs (Upstream, noch nicht adoptiert)
- `WALKTHROUGH-ROUTES-ROLLEN.md` (Upstream, 287 Zeilen) — definiert
  Route A (6 Steps) + Route B (9 Steps) für die rollen-berechtigungen-
  Surface. Element-Targeting-Spec mit YAML-Step-Map (Zeilen 259–285).
  → Für die ZK09-Demo verbal erwähnen, Adoption als follow-up.
- `ROLLEN-WORKFLOW.md` (Upstream, 189 Zeilen) — Datenmodell-Hintergrund
  zu Routes A/B („Quick-Inline" vs „Deep-Workspace" Flow).

### Auto-Sync
- `ai-zhlearn-autopull` sidecar pullt Upstream alle 120 s.
- Neue Pages erscheinen sofort live, brauchen aber Eintrag in
  `EXTRA_STEPS` (siehe `walkthrough/wizard.js:36-58`) bevor sie im
  Wizard-Panel auftauchen.
- Wenn Upstream `DEMO-FLOW.md` erweitert (z.B. neue `### Step 18`),
  reicht es, die `EXTRA_STEPS`-Einträge zu löschen und die echten
  DEMO-FLOW-IDs in `WALKTHROUGH_STRUCTURE` einzutragen.

---

## Aktions-Liste vor der Demo

| Priorität | Action | Status |
|---|---|---|
| ✅ erledigt | `lernplatz.html`-Redirect (nginx) | `deploy/nginx.conf` |
| ✅ erledigt | 10 neue Pages im Wizard sichtbar machen | `walkthrough/wizard.js` |
| ✅ erledigt | FLOWS.md update | diese Datei |
| P0 | Übersichts-Page (`/walkthrough/overview.html`) um die neuen Pages erweitern (USE_CASES const) | follow-up commit |
| P1 | `mein-lernen_claude.html` mit Chris klären (versehentlich committet?) | Bugherd / Slack |
| P2 | DEMO-FLOW.md-Erweiterung für Nutzerverwaltung als Upstream-PR | nach ZK09-Review |
| P2 | WALKTHROUGH-ROUTES-ROLLEN.md Route A + B adoptieren | nach ZK09-Review |
| P3 | Leaderboard-Mini-Mockup oder verbal als Roadmap | Demo-Skript |

---

## Quellen

- §3 Pflichtenheft (Bid-Document) — Live-Demo Use-Cases.
- `~/projects/platform/tools/zhlearn/DEMO-FLOW.md` (Upstream-SSOT,
  unverändert seit Baseline).
- `~/projects/platform/tools/zhlearn/WALKTHROUGH-ROUTES-ROLLEN.md`
  + `ROLLEN-WORKFLOW.md` (Upstream, neu 2026-05-27).
- `walkthrough/wizard.js:29-58` — `WALKTHROUGH_STRUCTURE` + `EXTRA_STEPS`.
- Upstream-Diff `ae5140d..71673cf` (36 Commits, 10 neue HTML-Files).
