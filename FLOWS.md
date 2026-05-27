# ZHlearn — Demo-Flow Plan + ZK09-Audit (Stand 2026-05-27)

Quelle: **§3 „Live-Demo folgender Use Cases"** des Pflichtenhefts,
**`docs/2026-05-27_ZK09-Demo-Plan-Status.pdf`** (Demo-Plan-Status), Upstream-
Specs (`DEMO-FLOW.md`, `WALKTHROUGH-ROUTES-ROLLEN.md`, `OPEN-QUESTIONS.md`,
`pflichtenheft-extracted.md`).

> **🎬 Per-Sub-Point Demo-Scripts:** `docs/scripts/` enthält pro Bid §3
> Sub-Point ein eigenes Skript (Bid-Text → Pages → Demo-Flow Sekunden-genau
> → Talking Points → Bid-Compliance-Evidence → Lücken → Verbesserungen).
> Siehe [`docs/scripts/README.md`](docs/scripts/README.md) für Übersicht.

Demo-Deadline: **2026-05-31**. Gesamt-Demo-Dauer laut PDF: **88 min**
(14 + 28 + 7 + 15 + 24).

**Status-Symbole:**

- ✅ Page existiert UND zeigt die Funktion — direkt demonstrierbar
- ⚠️ Page existiert, deckt aber nur Teil der Bid-Anforderung ab —
  Lücke verbal als Roadmap erwähnen
- 🚧 Funktion fehlt komplett im Prototyp — entweder Mini-Mockup oder
  reine Roadmap-Erwähnung
- 🔁 Inter-Page-Bridge fehlt — Wizard-Dropdown überbrückt
- 🆕 Neu seit 2026-05-27 (Upstream-Round)

Demo-Hilfen, die im Wizard live verfügbar sind: Persona/Award-lens
Chips, Bid-§3-Sub-UC-Chip, Demo-Priorität, Owner, Status, Dauer in
Minuten, ⚠️-Coverage-Chip, „Demo-Hinweis" + „Verbal als Roadmap"
Callouts (aus `walkthrough/demo-metadata.json`).

---

## 🚨 AUDIT-ERGEBNIS (2026-05-27)

| Use-Case | Status | Was ist konkret das Problem? |
|---|---|---|
| **1 Nutzerverwaltung** | ✅ 6/6 demonstrierbar | Komplett wired, Narration in `extras.md`. Kein Handlungsbedarf. |
| **2 Erstellung & Publikation** | ✅ 6/6 demonstrierbar | Existierende Steps 9–13 + neuer `a1` decken alle Bid-Punkte ab. |
| **3 Verwaltung bestehender Angebote** | ⚠️ 2/3 ok, 1 partial | Step 15 „Benachrichtigung" hat nur Button, keine Vorlagen-getriebene Outbox. **Verbal:** Bid §8 Vorlagen-Taxonomie als Roadmap erwähnen. |
| **4 Anmeldeprozess** | ✅ 4/4 demo-relevant ok | (4.3 GoShows „keine TS" lt. Bid — bewusst out-of-scope). |
| **5 Dashboard & Gamification** | ⚠️ 3/5 partial, 1 missing | Hier liegt der größte Demo-Risk — siehe Detail unten. |

**Wichtigste Erkenntnis:** Use-Cases 1–4 sind demo-ready. **Use-Case 5
ist die Schwachstelle** und braucht entweder verbale Framing-Sätze
oder bis Freitag noch zusätzliche Build-Arbeit.

---

## 🚧 USE-CASE 5 — die Schwachstellen im Detail

### 5.1 Dashboard-Ansichten — ⚠️ partial
**Page:** `manager-dashboard.html` (d1)
**Bid-Ask:** „Angebot Review, Akzeptieren von Kursteilnehmern, Rechnung
kontrollieren, Zahlungsstatus, Fragen von Usern, Lernpfad Posten,
Community-Sichtbarkeit" — laut PDF Spalte 1.
**Tatsächlich:** Review-Queue ✅, „Zahlungschecks vor Frist"-KPI vorhanden
(als Label), Manager-Inbox CSS-Klassen existieren ABER ohne HTML-Content.
**Demo-Strategie:**
- KPI-Tiles zeigen, Review-Queue durchklicken
- Zahlungsstatus + User-Inbox **verbal** als „im Q3-Backoffice-Sprint"
  positionieren
- **NICHT durchklicken lassen** — Page hat **~20 Dead-Clicks** (siehe Warnung unten).

### 5.2 Personalisierte Empfehlungen — ⚠️ partial
**Page:** `kompetenzen.html` (k1)
**Bid-Ask:** „SAP Rollenwechsel, Onboarding-Pfad, Kompetenzen-Gaps
schliessen, Org-Einheit, Lernpfade zuweisen"
**Tatsächlich:** Kompetenzmodell-Karten ✅, Empfehlungs-Logik teilweise
in `lernplatz-intern.html` (Tooltip + „Empfehlung"-Sort). Konkrete
Gap-Visualisierung fehlt, SAP-Rollenwechsel-Trigger fehlt.
**Demo-Strategie:** Kompetenzen-Karten zeigen, Tooltip in lernplatz öffnen,
**verbal:** „Gap-Visualisierung + SAP-Trigger kommen mit dem
Self-Service-Sprint".

### 5.3 Persönliche Lernpfade — ⚠️ partial
**Page:** `kompetenzen.html` (k1)
**Bid-Ask:** „selber zusammenstellen, Veröffentlichen, Sharen"
**Tatsächlich:** `<aside class="kp-builder">` existiert im HTML, ist
aber `display: none`. Lernpfad-ANZEIGE vorhanden, EDITOR nicht aktiv.
**Demo-Strategie:** Verbal als „Builder-UI nicht aktiviert für ZK09 —
Spec ist da, Implementierung Q3".

### 5.4 Gamification (Punkte, Badges, Leaderboards) — 🚧 missing
**Page:** keine eigene
**Bid-Ask:** „Streak Leaderboard, Aktivitäts-Level"
**Tatsächlich:** Punkte + Badges sichtbar auf `mein-lernen.html`
(„1247 Punkte", „Mai-Badge"). Leaderboard / Streak / Activity-Level UI
existiert nirgends. Permission-Eintrag „Leaderboards anzeigen / steuern"
in `rollen-berechtigungen.html` als einziger Anker.
**Demo-Strategie:** Auf mein-lernen Punkte + Badges zeigen, dann verbal:
„Leaderboard ist als Roadmap-Item §5.4 — Permission-Eintrag in der
Rollen-Matrix als Vorbereitung". Step 16 (Gamification-Roadmap)
unterstützt das.

### 5.5 Social-Learning — ⚠️ partial
**Page:** `social-wall.html` (s1)
**Bid-Ask:** „Social Feed automatisiert über Aktivitäten zum schauen,
filtern, sich beteiligen, Engagement"
**Tatsächlich:** Post-Karten als statisches Mockup. Keine JavaScript-
Logik, die echte Events einspielt.
**Demo-Strategie:** Feed durchscrollen, **verbal:** „heute Mockup,
Backend-Anbindung in Sprint X".

---

## 🚨 DEMO-PRE-FLIGHT-WARNUNGEN

### 1. `manager-dashboard.html` hat 20 Dead-Clicks
Reviewer landen mit jedem Klick im Dead-Link-Toast („Diese Funktion
ist nicht Teil der ZK09-Bewertung"). Sieht unsauber aus für genau die
Page, die im Bid §5.1 die wichtigste Admin-Surface ist. **Empfehlung:**
Page nur als „Übersicht" zeigen, NICHT als „Klick-Tour".

Weitere Pages mit vielen Dead-Clicks:
- `lernplatz-extern.html`: 8
- `lernplatz-intern.html`: 7
- `nutzer-anlegen-extern.html`: 6

### 2. Fehlende Inter-Page-Bridges (Wizard-Dropdown muss überbrücken)
- 1.2 → 1.3: `nutzerprofil-detail` → `nutzer-anlegen-intern` (🔁)
- 2.4 → 3.1: `freigabeprozess` → `teilnehmerliste-angebot` (🔁)
- 4.1 → 4.2: irgendein internal-Page → `webshop-katalog` (🔁)
- 5.2 → 5.3: `kompetenzen` → `social-wall` (🔁)

Wizard ist genau dafür da — kein Problem, aber Demo-Driver muss aktiv
zum Dropdown greifen statt im UI klicken.

### 3. Daten-Inkonsistenzen (user-flagged „später" — nur FYI)
- **5 verschiedene Marc-Nachnamen** auf den Pages: Baumann, Brunner,
  Keller, Schmid, Steiner. PDF + Persona-Doku nennt **Marc Steiner**
  als Kanon. Wenn Reviewer wechselnde Namen sieht, wirkt es wie
  unfertige Demo-Daten.
- Direktion JI vs. „Direktion Justiz und Inneres" — gemischt benutzt.
- Die Bid-Beilage erwähnt zudem KK1/KK2/KK3 Konsolidierungskreise,
  6 Direktionen mit Angebots-Zahlen, 8 Lernkategorien mit Farben — auf
  den Pages noch nicht durchgehend konsistent.

Daten-Unifizierung laut User für späteren Round geplant.

---

## 🆕 Bid-Anforderungen, die NICHT im PDF-Demo-Plan stehen

Aus `pflichtenheft-extracted.md` + `WALKTHROUGH-ROUTES-ROLLEN.md`
extrahiert. Diese sind im Bid genannt, aber nicht als eigene PDF-
Demo-Zeile geplant. Empfehlung: **verbal als „weitere Funktionen, die
wir bauen werden" einstreuen**, nicht explizit demonstrieren.

| Bid-Punkt | Aktueller Stand | Demo-Strategie |
|---|---|---|
| Jahresplanung-Dashboard (§4.1) | keine Page | verbal in Use-Case 3 (Verwaltung) erwähnen |
| Vorlagen-Taxonomie (§8 — 5 Kategorien) | nur via vorlagen-uebersicht | verbal in Use-Case 2.1 streuen |
| Status-Workflow Vollständig (Entwurf → … → Archiviert) | nur Entwurf→Aktiv sichtbar | verbal in Use-Case 2.4 |
| Bulk-Role-Toolbar | Spec in WALKTHROUGH-ROUTES-ROLLEN.md (Route A) | verbal in Use-Case 1.1 |
| Doppelrollen Critical-Warning Panel | Spec da, UI nicht | verbal in Use-Case 1.2 |
| Pending-Bar Datenschutzbeauftragte | offen | nicht erwähnen (zu unklar) |
| Mobile native Patterns | mobile-anmelden.html als Showcase | OK |
| GoShow Tablet-App | „keine TS" lt. Bid | bewusst weglassen |

---

## 📋 Page → Bid-Use-Case Matrix (35 produktive Pages)

| Page | Bid-Use-Case | Wizard-Step | Coverage |
|---|---|---|---|
| `rollen-berechtigungen.html` 🆕 | 1.1 | r1 | ✅ |
| `rolle-bearbeiten.html` | 1.1 | r2 | ✅ |
| `nutzeruebersicht.html` | 1.2 | r3 | ✅ |
| `nutzerprofil-detail.html` | 1.2 (Doppelrolle) | r4 | ✅ |
| `nutzer-anlegen-intern.html` | 1.3 | r5 | ✅ |
| `nutzer-anlegen-extern.html` | 1.3 | r6 | ✅ |
| `vorlagen-uebersicht.html` | 2.1 | Step 10 (tab #2) | ✅ |
| `vorlage-bearbeiten.html` | 2.1 | – (Drill-Down) | ✅ |
| `angebot-erstellen-einstieg.html` | 2.x (Entry) | Step 10 (tab #1) | ✅ |
| `angebot-erfassen.html` | 2.2 | Step 11 | ✅ |
| `lerneditor-light.html` | 2.2 | – (Drill-Down) | ✅ |
| `angebote-uebersicht.html` | 2.3 | Step 9 | ✅ |
| `angebot-bearbeiten.html` 🆕 | 2.x (Admin-Edit) | a1 | ✅ |
| `publikation-terminierung.html` | 2.4 | Step 12 | ✅ |
| `freigabeprozess.html` | 2.4 | Step 13 | ✅ |
| `teilnehmerliste-angebot.html` | 3.1 + 3.2 | Step 14 | ✅ |
| `teilnehmende-uebersicht.html` | 3.2 | Step 15 | ⚠️ Mail-System fehlt |
| `auswertungen.html` 🆕 | 3.x / 5.1 | v1 | ✅ |
| `lernplatz-intern.html` 🆕 | 4.1 + 5.2 | Step 1 *(via Redirect)* | ✅ |
| `lernplatz-extern.html` 🆕 | 4.1 (extern) | l1 | ✅ |
| `angebot-detail.html` | 4.1 | Step 2 | ✅ |
| `mein-lernen.html` | 4.1 + 5.1/5.3/5.4/5.5 | Step 3 | ✅ |
| `meine-buchungen.html` 🆕 | 4.1 (Buchungs-Hist.) | b1 | ✅ |
| `mobile-anmelden.html` | 4.1 (Mobile) | Step 4 | ✅ |
| `webshop-katalog.html` | 4.2 | Step 5 | ✅ |
| `webshop-detail.html` | 4.2 | Step 6 | ✅ |
| `webshop-checkout.html` | 4.2 | Step 7 | ✅ |
| `webshop-2fa-setup.html` 🆕 | 4.2 (2FA) | w1 | ✅ |
| `webshop-bestaetigung.html` | 4.2 | Step 8 | ✅ |
| `manager-dashboard.html` 🆕 | 5.1 (Admin-DB) | d1 | ⚠️ Zahl. + Inbox fehlen |
| `kompetenzen.html` 🆕 | 5.2 + 5.3 | k1 | ⚠️ Gap+Builder fehlen |
| `social-wall.html` 🆕 | 5.5 | s1 | ⚠️ Auto-Feed fehlt |
| `index.html` | Launcher | – | – |
| `mein-lernen_claude.html` | (Variante / Versehen?) | – | bei Chris klären |
| 2× experiment-profile-dropdown-* | – | – | ignoriert |

---

## 🎯 Offene Build-Tasks (bis 2026-05-31 wünschenswert)

Konkrete Tasks um die ⚠️/🚧-Items zu schließen.
Reihenfolge nach Bid-Impact:

1. **5.4 Leaderboard-Mini-Page** (`leaderboard.html`) — Top-10 Liste,
   eigene Position hervorgehoben, Streak-Spalte. ~2h Aufwand. Schließt
   das einzige 🚧 in Use-Case 5.
2. **5.1 manager-dashboard.html: Zahlungsstatus-Card + User-Fragen-
   Inbox-Content** — CSS-Klassen sind da, nur Mockup-Daten fehlen.
   ~1h Aufwand. Reduziert verbal-Roadmap-Anteil deutlich.
3. **5.3 kompetenzen.html: Builder-Sidebar aktivieren** (`display:none`
   entfernen, 3 Module rein-mocken). ~1h. Macht „Lernpfad selber
   zusammenstellen" demonstrierbar.
4. **5.5 social-wall.html: 2-3 zusätzliche dynamisch-aussehende Posts**
   (Avatare, Timestamps, Engagement-Counter). ~30min. Hebt den
   Mockup-Charakter ab.
5. **5.2 kompetenzen.html: Kompetenz-Gap-Visualisierung** (Balken
   target vs. current). ~1.5h. Schließt SAP-Empfehlungs-Story.

Alles in Use-Case 1 + 2 + 3.1 + 4.x ist demo-ready — **nicht
nachbessern**.

---

## ✅ Aktions-Liste vor der Demo

| Priorität | Action | Status |
|---|---|---|
| ✅ | nginx-Redirect `/lernplatz.html` → `/lernplatz-intern.html` | live |
| ✅ | 10 neue Pages im Wizard sichtbar (`EXTRA_STEPS` → `extras.md`) | live |
| ✅ | PDF-Metadata-Chips (Prio, Owner, Status, Dauer) auf jedem Step | live |
| ✅ | Coverage-Chip (⚠️ teilw. / 🚧 fehlt) + verbal-Roadmap-Callouts | live |
| ✅ | Volle Narration für Use-Case 1 + 5 in `extras.md` | live |
| ✅ | Stub-Narration für a1, v1, l1, b1, w1 ausformuliert | live |
| ✅ | FLOWS.md auf Audit-Stand 2026-05-27 aktualisiert | live |
| P0 | 5 Items aus „Offene Build-Tasks" priorisieren | offen |
| P1 | `mein-lernen_claude.html` mit Chris klären (Versehen?) | offen (Bugherd?) |
| P2 | Daten-Konsistenz (5 Marc-Nachnamen → Marc Steiner) | „später" lt. User |
| P3 | WALKTHROUGH-ROUTES-ROLLEN.md Route A + B als geführte Tour | nach ZK09 |

---

## Quellen

- §3 + §4 + §5 + §8 Pflichtenheft (Bid-Document, Upstream `pflichtenheft-extracted.md`).
- `docs/2026-05-27_ZK09-Demo-Plan-Status.pdf` (Demo-Plan, Stand User 2026-05-27).
- Upstream `DEMO-FLOW.md` (SSOT für Steps 1–17, unverändert seit Baseline).
- Upstream `WALKTHROUGH-ROUTES-ROLLEN.md` + `ROLLEN-WORKFLOW.md` (neu 2026-05-27, noch nicht adoptiert).
- Upstream `OPEN-QUESTIONS.md` (Demo-Blocker: GoShow, AI-Labeling, Leaderboard-Default).
- ZK09-Audit-Lauf 2026-05-27 (3 parallele Explore-Agents: Bid-Scope / Coverage-Matrix / Page-Level).
- `walkthrough/wizard.js:29-58` (`WALKTHROUGH_STRUCTURE`), `walkthrough/demo-metadata.json`, `walkthrough/extras.md`.
