# ZHlearn — Demo-Flow Plan (ZK09 Live-Demo)

Quelle: **§3 "Live-Demo folgender Use Cases"** des Pflichtenhefts.
Dieses Dokument bildet pro Bid-Use-Case ab, welche Prototype-Seite(n)
die Funktion zeigen, ob das so funktioniert oder nicht, und was wir
für die Live-Demo noch tun sollten.

**Status-Symbole:**

- ✅ Seite zeigt die Funktion — kann live demonstriert werden.
- ⚠️ Seite zeigt die Funktion teilweise — Lücke benennen.
- 🚧 Funktion fehlt im Prototyp — entscheiden ob Roadmap-Erwähnung
  oder Mini-Mockup nachgezogen wird.
- 🔁 Inter-Page-Bridge fehlt — die nächste Demo-Seite ist nicht
  natürlich verlinkt, Wizard-Dropdown muss überbrücken.

Wizard-Position: jede Seite trägt das schwebende KTZH-Logo (links
unten); im Panel sind die Use-Cases als Gruppen `1.` bis `5.`
sichtbar — passt 1:1 zum Aufbau hier.

---

## 🚨 WAS FEHLT — auf einen Blick

Diese Funktionen sind im Bid (§3) gefordert, haben aber **keine
Prototyp-Seite**. Für jede entscheiden: Roadmap-Erwähnung, Mini-
Mockup-Seite nachziehen, oder verbal erklären?

| Bid-Punkt | Bid-Use-Case | Vorschlag | Aufwand |
|---|---|---|---|
| **Admin-Dashboard** (Rollen-spezifisch, KPI-Übersicht) | 5.1 | Mini-Mockup-Seite `admin-dashboard.html` mit 4–6 KPI-Tiles, oder verbal an `angebote-uebersicht`-Header anknüpfen | mittel (Mockup) / 0 (verbal) |
| **Lernpfad-Editor** (Admin baut Pfade aus Modulen) | 5.3 | Mini-Mockup-Seite `lernpfad-editor.html` mit Drag-Liste + Sequenz | mittel |
| **Leaderboard-Screen** | 5.4 | Mini-Mockup `leaderboard.html` (Top-10 Tabelle + eigene Position) | klein |
| **Social-Learning-Hub** (Likes, Kommentare, geteilte Lernpfade) | 5.5 | Mini-Mockup `social-feed.html` ODER nur die vorhandenen Sharing-Affordances zeigen + Roadmap | groß / 0 |
| **Externer User Dashboard** ("Meine Bestellungen" für Webshop-Käufer) | 5.1 | nicht explizit im Bid — als Roadmap erwähnen | 0 |
| **5 Nutzerverwaltungs-Steps im Wizard** (Use-Case 1) | 1.1–1.3 | DEMO-FLOW.md um Silvia-Sub-Journey erweitern: rollen-berechtigungen → rolle-bearbeiten → nutzeruebersicht → nutzerprofil-detail → nutzer-anlegen-{intern,extern} | klein (Doku) |

**P0 unter den P0s**: Use-Case 1 (Nutzerverwaltung) hat zwar Pages,
aber Wizard-Gruppe 1 ist leer — Reviewer würden die Pages nur
zufällig finden. **Ohne DEMO-FLOW.md-Erweiterung fehlt der gesamte
Bid-Use-Case 1 in der Demo.**

---

## 📋 Page → Bid-Use-Case Matrix (alle 25 produktiven Pages)

(2 Experiment-Files (`experiment-profile-dropdown-*`) sind keine
Demo-Surfaces — ignoriert.)

| Page | Bid-Use-Case | Wizard-Step heute | Im Wizard sichtbar? |
|---|---|---|---|
| `rollen-berechtigungen.html` | 1.1 | – | ❌ |
| `rolle-bearbeiten.html` | 1.1 | – | ❌ |
| `nutzerprofil-detail.html` | 1.2 | – | ❌ |
| `nutzeruebersicht.html` | 1.2 | – | ❌ |
| `nutzer-anlegen-intern.html` | 1.3 | – | ❌ |
| `nutzer-anlegen-extern.html` | 1.3 | – | ❌ |
| `vorlagen-uebersicht.html` | 2.1 | Step 10 (tab #2) | ✅ |
| `vorlage-bearbeiten.html` | 2.1 | – | ❌ (nur via Drill-Down) |
| `angebot-erfassen.html` | 2.2 | Step 11 | ✅ |
| `lerneditor-light.html` | 2.2 | – | ❌ (nur via Drill-Down) |
| `angebote-uebersicht.html` | 2.3 | Step 9 | ✅ |
| `angebot-erstellen-einstieg.html` | 2.x (Entry-Point) | Step 10 (tab #1) | ✅ |
| `publikation-terminierung.html` | 2.4 | Step 12 | ✅ |
| `freigabeprozess.html` | 2.4 | Step 13 | ✅ |
| `teilnehmerliste-angebot.html` | 3.1 + 3.2 | Step 14 | ✅ |
| `teilnehmende-uebersicht.html` | 3.2 | Step 15 | ✅ |
| `lernplatz.html` | 4.1 + 5.2 | Step 1 | ✅ |
| `angebot-detail.html` | 4.1 | Step 2 | ✅ |
| `mein-lernen.html` | 4.1 + 5.1 + 5.3 + 5.4 + 5.5 | Step 3 | ✅ |
| `mobile-anmelden.html` | 4.1 (mobile showcase) | Step 4 | ✅ |
| `webshop-katalog.html` | 4.2 | Step 5 | ✅ |
| `webshop-detail.html` | 4.2 | Step 6 | ✅ |
| `webshop-checkout.html` | 4.2 | Step 7 | ✅ |
| `webshop-bestaetigung.html` | 4.2 | Step 8 | ✅ |
| `index.html` | Launcher | – | – (nicht Teil der Personas) |

**Im Wizard fehlend: 8 von 25 Pages** — alle 6 Nutzerverwaltungs-
Seiten + 2 Drill-Down-Editoren (`vorlage-bearbeiten`,
`lerneditor-light`). Beide Editoren sind ok als „Drill-Down von
Step X" — Nutzerverwaltung dagegen ist Use-Case 1, fehlt komplett.

---

---

## 1. Nutzerverwaltung
**Wizard-Gruppe 1 — heute leer (`stepIds: []` in
`walkthrough/wizard.js:30`).**

### 1.1 Verwaltung von Rollen und Berechtigungen
- ✅ `rollen-berechtigungen.html` — Rollenliste mit Berechtigungs-
  Matrix (inkl. Eintrag „Leaderboards anzeigen / steuern", relevant
  für Use-Case 5).
- ✅ `rolle-bearbeiten.html` — Detail-Editor einer Rolle.
- 🔁 Beide Seiten sind heute NICHT im Wizard. Für die Demo: Steps
  in `DEMO-FLOW.md` ergänzen ODER (kleinerer Eingriff) die Step-IDs
  in `WALKTHROUGH_STRUCTURE[0].stepIds` setzen, damit sie als
  „Schritt N · Rollen" im Dropdown erscheinen.

### 1.2 Anzeige von Nutzenden mit Doppelrollen / Mehrfachanstellung
- ✅ `nutzerprofil-detail.html` — Profil zeigt Chip
  „Mehrfachanstellung · 2 Direktionen" + Hinweis „Doppelrolle
  erkannt" / „Doppelrolle bestätigt". **Genau der Bid-Punkt.**
- ✅ `nutzeruebersicht.html` — Listenansicht, von der aus zum
  Detail navigiert wird.
- 🔁 Weder Übersicht noch Detail sind aktuell im Wizard.

### 1.3 Erstellung von Nutzerprofilen (intern + extern)
- ✅ `nutzer-anlegen-intern.html` — Anlage interner Nutzer (SSO).
- ✅ `nutzer-anlegen-extern.html` — Anlage externer Nutzer
  (Selbstregistrierung / Adminform).
- 🔁 Heute nicht im Wizard.

**Empfehlung Use-Case 1:**
Die Pages stehen — der Bid-Punkt ist demonstrierbar. Die einzige
Arbeit ist, **vier IDs in `WALKTHROUGH_STRUCTURE[0].stepIds`
einzutragen** (oder neue Steps in `DEMO-FLOW.md` zu schreiben, was
sauberer ist, da die Personas Silvia/Marc dort beschrieben sind).
Ohne diese Eintragung ist Gruppe 1 leer und die Reviewer landen via
Dropdown nicht auf den Seiten.

---

## 2. Erstellungs- und Publikationsprozess
**Wizard-Gruppe 2 — `stepIds: ['9','10','11','12','13']`.**
Marc ist hier nicht aktiv; das ist Silvias Admin-Journey.

### 2.1 Vorlagen für Angebote erstellen / bearbeiten
- ✅ `vorlagen-uebersicht.html` (Wizard-Step 10, file-tab #2).
- ✅ `vorlage-bearbeiten.html` — Detail-Editor einer Vorlage.
- ⚠️ `vorlage-bearbeiten.html` ist NICHT im Wizard, nur via
  `vorlagen-uebersicht.html → "Bearbeiten"` erreichbar — als
  „Drill-Down" demonstrierbar.

### 2.2 Angebote inkl. Inhaltserstellung erfassen
- ✅ `angebot-erfassen.html` (Wizard-Step 11) — Multi-Section Form.
- ✅ `lerneditor-light.html` — Inhalts-Editor (Lerneditor light).
- ⚠️ `lerneditor-light.html` nicht im Wizard; nur via
  `angebot-erstellen-einstieg → "Lerneditor"`. Für Demo entscheiden,
  ob explizit zeigen.

### 2.3 Übersicht aller Angebote
- ✅ `angebote-uebersicht.html` (Wizard-Step 9) — Cross-Angebot Liste.

### 2.4 Publikation, Terminierung, Freigabeprozess
- ✅ `publikation-terminierung.html` (Wizard-Step 12).
- ✅ `freigabeprozess.html` (Wizard-Step 13) — 4-Augen-Review.
- 🔁 `freigabeprozess.html` hat nur Self-Link + Index, keinen Forward
  zum nächsten Bid-Use-Case. Wizard-Dropdown übernimmt.

**Empfehlung Use-Case 2:**
Bid-Punkte vollständig abgedeckt. Wizard-Reihenfolge bereits korrekt
sortiert (`9, 10, 11, 12, 13` — chronologisch der Admin-Workflow).
Eine Demo-Anweisung pro Step in `DEMO-FLOW.md` ist schon vorhanden
(Silvia-Persona).

---

## 3. Verwaltung bestehender Angebote
**Wizard-Gruppe 3 — `stepIds: ['14','15']`.**

### 3.1 Teilnehmerlisten exportieren und editieren
- ✅ `teilnehmerliste-angebot.html` (Wizard-Step 14) — hat sowohl
  Export-Buttons (`.xlsx`, `.csv`) als auch Edit-Affordances
  (hinzufügen, verschieben, Status korrigieren).

### 3.2 Benachrichtigung der Teilnehmenden
- ✅ `teilnehmerliste-angebot.html` — „E-Mail senden"-Button
  vorhanden (gleiche Page wie 3.1).
- ✅ `teilnehmende-uebersicht.html` (Wizard-Step 15) — Cross-Angebot
  Sicht, bietet auch Mass-E-Mail.

**Empfehlung Use-Case 3:**
Vollständig abgedeckt mit zwei Pages. Beide im Wizard. Nichts zu tun.

---

## 4. Anmeldeprozess
**Wizard-Gruppe 4 — `stepIds: ['1','2','3','4','5','6','7','8']`.**
Hier laufen Marc (1–4) und Annika (5–8) hintereinander; das ist die
größte Gruppe.

### 4.1 Anmeldung / Bestätigung / Abmeldung (interne Nutzer)
- ✅ `lernplatz.html` (Wizard-Step 1) — Discovery + Browse.
- ✅ `angebot-detail.html` (Wizard-Step 2) — fünf Anmelde-Varianten
  (Selbststudium / Präsenz / Genehmigung / Pflicht / Warteliste) in
  Modals; Bestätigung & Abmelde-Dialog vorhanden.
- ✅ `mein-lernen.html` (Wizard-Step 3) — persönlicher Hub inkl.
  Abmelde-Dialog.
- ⚠️ Drei `.angebot-card`-Container im Tab „Laufend" sind nicht
  klickbar (siehe Dead-Click-Audit). **Dead-Click-Toast
  (Deliverable A) fängt das ab** — Reviewer sieht
  „Diese Funktion ist nicht Teil der ZK09-Bewertung", was unsauber
  wirkt, weil die Funktion eigentlich Teil ist (die Karten SOLLTEN
  klickbar sein).
  → Entscheidung: **entweder** das Toast für diese spezifische Karten
  unterdrücken (CSS-Selector `data-wiz-allow` an die `<article>`
  setzen via wizard.js + dann passiert beim Klick gar nichts — auch
  doof), **oder** im Wizard-JS für `/mein-lernen.html` einen
  Click-Handler auf die Karten injizieren, der auf
  `/angebot-detail.html` springt (kleiner Eingriff, fühlt sich
  richtig an).

### 4.2 Kostenpflichtige Anmeldung (externe User)
- ✅ `webshop-katalog.html` (Step 5).
- ✅ `webshop-detail.html` (Step 6).
- ✅ `webshop-checkout.html` (Step 7) — 4-Step Wizard inkl. 2FA.
- ✅ `webshop-bestaetigung.html` (Step 8) — Auftrags-Quittung.
- ⚠️ Step 6 → 7: prüfen ob „In den Warenkorb"-Button auf
  `webshop-detail` tatsächlich zu `webshop-checkout` führt. Falls
  nicht: Overlay-Hint „weiter → Checkout".

### 4.3 Eintrittskontrolle Smartphone-App, Erfassung von GoShows
- 🚫 **„keine TS"** — laut Bid-Wortlaut explizit kein Test-Szenario
  zu zeigen. Im Demo nur als Roadmap-Punkt erwähnen.

**Empfehlung Use-Case 4:**
Internal (Marc) + external (Annika) komplett. Drei kleine Punkte:
1. Mein-Lernen-Kartenklick (siehe oben).
2. Webshop-Detail → Checkout-Bridge prüfen.
3. Eintrittskontrolle nur verbal als Roadmap erwähnen.

---

## 5. Dashboard und Gamification
**Wizard-Gruppe 5 — `stepIds: ['16','17']`.**
Heute sind 16 + 17 als „Roadmap" markiert (keine Screens).
**Aber**: viel von dem, was der Bid hier verlangt, ist BEREITS in
existierenden Pages gezeigt — wir verkaufen es nur nicht.

### 5.1 Dashboard-Ansichten für unterschiedliche Rollen
- ✅ Learner-Dashboard: `mein-lernen.html` — persönlicher Lernfortschritt,
  Statistiken, Punkte, nächste Termine. Das IST das Learner-Dashboard.
- 🚧 Admin-Dashboard: existiert NICHT als dedizierte Seite. Admin-
  Pages sind operative Listen (`angebote-uebersicht`,
  `teilnehmende-uebersicht`, `nutzeruebersicht`). Für die Demo
  vorschlagen: a) verbal erklären „Admin sieht KPI-Streifen oben in
  der Liste" und auf `angebote-uebersicht`-Header zeigen, b) als
  Roadmap markieren, c) Mini-Mockup-Screen nachziehen.
- 🚧 Externer-User-Dashboard: existiert nicht als eigene Seite;
  Webshop hat keinen Login-Bereich „Meine Bestellungen".

### 5.2 Personalisierte Empfehlungen
- ✅ `lernplatz.html` — Tooltip-Erklärung der Personalisierung
  (Filter + Suche + freigegebene Lernprofil-Daten als Gewichtung),
  „Empfehlung"-Option im Sort-Selektor, „3 Personen aus dem
  Bauinspektorat empfehlen" als Social-Signal. **Sehr demobar.**

### 5.3 Erstellung von persönlichen Lernpfaden
- ✅ `mein-lernen.html` — zeigt „Lernpfad · 4 Module · Note 5.2 / 6"
  als laufenden Lernpfad. **Erstellung selbst** (wo baue ich einen
  Lernpfad zusammen?) ist nicht als Editor sichtbar.
- 🚧 Lernpfad-EDITOR (Drag-Module, sequenzieren, zuweisen): keine
  Seite. Demo-Strategie: in `mein-lernen` das laufende Lernpfad-Beispiel
  zeigen + verbal erläutern, dass Admin per Lerneditor zusammenstellt.

### 5.4 Gamification (Punkte, Badges, Leaderboards)
- ✅ Punkte: `mein-lernen.html` — „1'247 Punkte" Anzeige.
- ✅ Badges: `mein-lernen.html` — „Noch 2 Module bis zum Mai-Badge".
- 🚧 Leaderboards: nur in `rollen-berechtigungen.html` als
  Berechtigungs-Eintrag „Leaderboards anzeigen / steuern" — kein
  echter Leaderboard-Screen. Demo-Strategie: verbal als Roadmap
  oder Mini-Mockup.

### 5.5 Social-Learning (Teilen, Likes, Kommentare, Lernpfade)
- ✅ „Empfehlen"-Button: `mein-lernen.html`.
- ✅ „Alle teilen / exportieren →": `mein-lernen.html` (allerdings
  href="#" → Dead-Click-Toast schlägt zu — siehe Hinweis unten).
- ✅ Social-Signal: `lernplatz.html` „3 Personen aus dem
  Bauinspektorat empfehlen".
- ✅ Share-Button auf `angebot-detail.html`.
- 🚧 Likes, Kommentar-Threads, Lernpfade als Social-Element: keine
  Pages. Demo: vorhandene Sharing-Affordances zeigen, Rest als
  Roadmap.

**Empfehlung Use-Case 5:**
Die wichtigste strategische Entscheidung — Gruppe 5 ist mit der
Roadmap-only-Klassifizierung der Steps 16+17 **unter Wert verkauft**.
Konkret:

- **Step 3 (`mein-lernen.html`)** als Demonstrations-Anker für
  Dashboard + Personalisierung + Gamification umetikettieren.
- **Step 1 (`lernplatz.html`)** als Anker für Personalisierte
  Empfehlungen.
- Steps 16+17 bleiben Roadmap (Gamification-Dashboard,
  Social-Learning-Hub, Leaderboards) — aber wir erwähnen klar, was
  schon LIVE in den anderen Steps zu sehen ist.

→ Dafür braucht es **keine Page-Änderung** — nur Anpassung des
Wizard-Narratives in `DEMO-FLOW.md` für Step 1 + Step 3 (zusätzliche
Sektion „Was Sie hier auch zu Use-Case 5 sehen können").

---

## Cross-cutting

### Wizard-Gruppe-1 ist leer
Gruppe 1 hat `stepIds: []` in `walkthrough/wizard.js:30`. Solange das
so bleibt, ist Use-Case 1 (Nutzerverwaltung) im Wizard-Dropdown nur
als Überschrift mit Roadmap-Badge sichtbar — Reviewer können die
existierenden Pages (`rollen-berechtigungen`, `nutzerprofil-detail`
etc.) nur via Wizard nicht erreichen.

**Zwei Wege:**
1. **Pages neu in `DEMO-FLOW.md` als Steps 18–22 erfassen** (mit
   Marc/Annika/Silvia-Narrative à la Bid). Wizard-Parser zieht sie
   automatisch.
2. **Existierende Page-IDs in `WALKTHROUGH_STRUCTURE[0].stepIds`
   eintragen.** Das geht nur, wenn die Pages in `DEMO-FLOW.md` als
   Steps vorhanden sind — aktuell sind sie es nicht.

→ Weg 1 ist also der einzig saubere. Empfehlung: DEMO-FLOW.md um
fünf neue Silvia-Steps für Nutzerverwaltung erweitern.

### Dead-Link-Toast
Der Toast (Deliverable A) feuert auf jeden `href="#"` /
`javascript:` / fehlenden Href. **Konsequenzen** bei den Bid-Use-Cases:

- Sidebar-Geister (Teilnehmende/Dashboard/Berichte/…): erwünscht.
- `mein-lernen.html` „Alle teilen / exportieren →" (`href="#"`):
  feuert. Falls wir Social-Learning demonstrieren wollen, sollten
  wir die Karte ENTWEDER mit `data-wiz-allow` taggen (Klick zeigt
  Modal? Nein, dann passiert nichts) ODER in der Wizard-JS einen
  Click-Handler injizieren, der ein „Coming soon"-Modal zeigt.

### Inter-Use-Case-Bridges
Heute gibt es keine. Reviewer benutzen den Wizard-Dropdown. Akzeptabel
für ZK09; das ist genau der Zweck des Wizards.

---

## Aktions-Liste vor der Demo

| Priorität | Action | Aufwand | File(s) |
|---|---|---|---|
| P0 | Nutzerverwaltung-Steps in `DEMO-FLOW.md` erfassen (5 Steps) | mittel | `DEMO-FLOW.md` (upstream PR!) |
| P1 | Mein-Lernen-Kartenklick → angebot-detail (Wizard-Injektion) | klein | `walkthrough/wizard.js` |
| P1 | Webshop-Detail → Checkout-Link prüfen / fixen | klein | Upstream PR oder Wizard-Injektion |
| P2 | Step 1 + Step 3 Narrative um „Use-Case 5"-Hinweis ergänzen | klein | `DEMO-FLOW.md` (upstream PR) |
| P3 | Admin-Dashboard als Roadmap erwähnen, kein Mockup nachziehen | – | Demo-Skript |
| P3 | Leaderboard / Lernpfad-Editor / Social-Hub als Roadmap | – | Demo-Skript |

P0 ist der größte Blocker: ohne Nutzerverwaltungs-Steps fehlt
Use-Case 1 komplett im Wizard.

---

## Quellen

- §3 Pflichtenheft (Bid-Document) — Live-Demo Use-Cases.
- `~/projects/platform/tools/zhlearn/DEMO-FLOW.md` — aktueller Stand
  der Steps.
- `walkthrough/wizard.js:28-34` — `WALKTHROUGH_STRUCTURE`.
- Outbound-Link-Audit aller 27 Pages (2026-05-26).
