# Reviewer Walkthrough — Overlay Extras

Narrative für Prototyp-Pages, die im Upstream-`DEMO-FLOW.md` (noch)
nicht stehen. Format gespiegelt von `DEMO-FLOW.md`, damit der Parser
beide Dateien gleich behandelt — IDs sind hier alphanumerisch (`r1`,
`d1`, …) statt rein numerisch, um Kollisionen mit Upstream-Step-IDs
zu vermeiden.

Quellen für Inhalte + Demo-Metadaten:
- `docs/Status - Tabellenblatt1.pdf` (Demo-Plan; Spalte 1 für Use-Case-5 Talking Points)
- `WALKTHROUGH-ROUTES-ROLLEN.md` (Upstream-Spec für Rollen-Routen, noch nicht adoptiert)

---

## 1 · Use Case 1 · Nutzerverwaltung (Antoine + Frank, 14 min)

### Step r1 · `rollen-berechtigungen.html` — Rollen & Berechtigungen

**Persona** · Silvia Keller (Admin)
**Award lens** · Governance · Sicherheit

**What you're looking at**

Die zentrale Rollen-Matrix für ZHlearn-Admins. Jede Zeile ist eine
Rolle, jede Spalte eine Berechtigung; rechts der Scope-Editor für
Direktion / Amt. Upstream wurde diese Surface diese Woche stark
überarbeitet (Matrix-View, Tile-Grid, Multi-Direktion-Scope).

**Notable interactions**

- Zwischen Matrix- und Tile-View umschalten (rechts oben)
- Multi-Direktion-Scope für eine Rolle setzen — zeigt, wie zwei
  Direktionen parallel zugewiesen werden können
- Permission „Leaderboards anzeigen / steuern" hervorheben — schafft
  Bezug zu Bid 5.4 (Gamification)

**Design choices to evaluate**

- Reicht die Matrix für 60+ Rollen, oder braucht es Suche / Gruppierung?
- Scope-Editor inline vs. Modal — welche Variante ist klarer?

**Known limitations**

- Rollen-Workflow-Spec (`WALKTHROUGH-ROUTES-ROLLEN.md`) noch nicht
  als geführte Schritt-für-Schritt-Tour adoptiert.

### Step r2 · `rolle-bearbeiten.html` — Rolle bearbeiten

**Persona** · Silvia Keller (Admin)
**Award lens** · Governance

**What you're looking at**

Detail-Editor einer einzelnen Rolle: Berechtigungsblöcke, Scope-Setup,
Audit-Log-Vorschau.

**Notable interactions**

- Berechtigung an/abhaken — sofortige Konsequenz im Permission-Tree
- Direktion + Amt als Scope kombinieren

**Design choices to evaluate**

- Speichern-Modal vs. Inline-Save — Reviewer-Präferenz erfragen.

### Step r3 · `nutzeruebersicht.html` — Nutzerübersicht

**Persona** · Silvia Keller (Admin)
**Award lens** · Discoverability · Effizienz

**What you're looking at**

Cross-Direktion-Liste aller Nutzer mit Filter, Schnell-Aktionen und
Markierungen für Mehrfachanstellung / Doppelrolle.

**Notable interactions**

- Filter nach Direktion / Rolle / Status
- „Schnellzuweisung"-Toolbar auf Selection (Vorbereitung für Route A
  aus `WALKTHROUGH-ROUTES-ROLLEN.md`)
- Tag-Chip „Mehrfachanstellung · 2 Direktionen" auf einem Nutzer
  klicken → springt zur Detail-Page

**Design choices to evaluate**

- Bulk-Edit für 50+ Nutzer — Performance + UI-Pattern.

**Known limitations**

- Sortier-Verhalten bei sehr großen Listen noch nicht final.

### Step r4 · `nutzerprofil-detail.html` — Nutzerprofil Detail (Doppelrolle)

**Persona** · Silvia Keller (Admin)
**Award lens** · Sicherheit · Nachvollziehbarkeit

**What you're looking at**

Detail einer Person mit zwei aktiven Anstellungen + Doppelrolle.
Sichtbar: Chip „Mehrfachanstellung · 2 Direktionen", Hinweis
„Doppelrolle erkannt" / „Doppelrolle bestätigt".

**Notable interactions**

- Tab zwischen Direktion-A-Rollen und Direktion-B-Rollen
- Doppelrolle „bestätigen" → wechselt von erkannt zu bestätigt und
  schreibt ins Audit-Log

**Design choices to evaluate**

- Wie prominent muss „Doppelrolle erkannt" sein? (Banner vs. Chip)
- Erlaubt sein, beide Rollen gleichzeitig auszuüben?

**Known limitations**

- Audit-Log heute nur Mockup, kein echter Datenfluss.

### Step r5 · `nutzer-anlegen-intern.html` — Nutzer anlegen (intern)

**Persona** · Silvia Keller (Admin)
**Award lens** · Onboarding · SSO

**What you're looking at**

Formular für interne KTZH-User. SSO-Lookup nach E-Mail / AD-Konto;
automatische Vorbefüllung von Direktion und Initial-Rolle.

**Notable interactions**

- SSO-Konto suchen → Felder werden ausgefüllt
- Rolle aus Vorschlagsliste auswählen (Default-Rollen pro Direktion)

**Design choices to evaluate**

- Soll Initial-Rolle „Standard-Lerner" automatisch gesetzt werden?

### Step r6 · `nutzer-anlegen-extern.html` — Nutzer anlegen (extern)

**Persona** · Silvia Keller (Admin)
**Award lens** · Onboarding · Externe Zielgruppen

**What you're looking at**

Formular für externe Nutzer (Lehrkräfte anderer Kantone, freie
Mitarbeitende). Manuelle Eingabe + E-Mail-Verifikation + 2FA-Hinweis.

**Notable interactions**

- E-Mail-Eingabe triggert Verifikations-Mail-Vorschau
- 2FA-Setup-Hinweis erscheint nach Eingabe der Telefonnummer

**Design choices to evaluate**

- Selbstregistrierung externer vs. Admin-Anlage — welche ist der
  primäre Pfad für die ZK09-Demo?

---

## 2 · Use Case 2 · Erstellung (Lücken-Stubs)

### Step a1 · `angebot-bearbeiten.html` — Angebot bearbeiten

**What you're looking at**

Admin-Edit für ein bereits publiziertes Angebot (z. B. „Resilienz im
Berufsalltag"). Lückenfüller zwischen Erfassung (Step 11) und
Publikation (Step 12).

**Known limitations**

Detailliertes Narrativ noch nicht erfasst — siehe Demo-Plan-PDF und
ergänzen, sobald Frank die Variante final spezifiziert hat.

---

## 3 · Use Case 3 · Verwaltung (Lücken-Stubs)

### Step v1 · `auswertungen.html` — Auswertungen

**What you're looking at**

Reporting-Dashboard mit Anmeldezahlen, Status-Verteilung,
Wirtschaftlichkeit. Adressiert sowohl Bid 3.x (Reporting auf
Angebots-Ebene) als auch 5.1 (Admin-KPI-Sicht).

**Known limitations**

Detail-Narrativ noch nicht erfasst — verbal als Reporting-Surface
einführen, Cross-Drilldown auf Teilnehmerliste demonstrieren.

---

## 4 · Use Case 4 · Anmeldung (Lücken-Stubs)

### Step l1 · `lernplatz-extern.html` — Lernplatz extern

**What you're looking at**

Discovery-Page speziell für externe Lernende — Komplement zu
`lernplatz-intern.html` (Step 1). Spiegelung der Marc-Steiner-Journey
für die Annika-Weiss-Persona.

**Known limitations**

Narrativ noch nicht ausformuliert; Reviewer kann beide Lernplatz-
Varianten parallel vergleichen.

### Step b1 · `meine-buchungen.html` — Meine Buchungen

**What you're looking at**

Buchungs-Historie für externe Nutzer (Pendant zu „Mein Lernen" für
interne Lernende). Adressiert den im Bid genannten „Externer User
Dashboard"-Punkt.

**Known limitations**

Narrativ noch nicht ausformuliert.

### Step w1 · `webshop-2fa-setup.html` — Webshop · 2FA-Setup

**What you're looking at**

Zwei-Faktor-Setup-Flow im Webshop-Checkout. Klein, fokussiert.

**Known limitations**

Narrativ noch nicht ausformuliert.

---

## 5 · Use Case 5 · Dashboard & Gamification (Frank, 24 min)

### Step d1 · `manager-dashboard.html` — Manager-Dashboard

**Persona** · Silvia Keller (ZHlearn-Manager)
**Award lens** · Operative Steuerung · Übersicht

**What you're looking at**

Manager-Workspace mit KPI-Streifen, Angebot-Review-Queue, Anmeldungen
mit Status, Zahlungs- / Rechnungs-Übersicht und User-Fragen-Inbox.
Erfüllt Bid 5.1 „Admin-Dashboard für unterschiedliche Rollen".

**Notable interactions**

- Angebot aus der Review-Queue freigeben (analog Step 13, aber aus
  Manager-Perspektive)
- Kursteilnehmer akzeptieren / ablehnen
- Zahlungsstatus prüfen + Rechnung kontrollieren
- Lernpfad für eine Direktion „veröffentlichen"
- Community-Sichtbarkeit umschalten

**Design choices to evaluate**

- KPI-Tiles vs. Tabellen — was zeigt der Manager als erstes?
- Wie viele offene Reviews müssen sofort sichtbar sein?

**Known limitations**

- Rechnungs-Detail-Drilldown noch Mockup.
- Communities heute statisch (kein Live-Backend).

### Step k1 · `kompetenzen.html` — Kompetenzen & Lernpfade

**Persona** · Marc Steiner (Lernender)
**Award lens** · Personalisierung · Lernpfade

**What you're looking at**

„Meine Entwicklung": visualisierte Kompetenzen, Lernpfade nach
Amt / Rolle, Empfehlungen mit Erläuterung der Personalisierung
(SAP-Rollenwechsel, Onboarding-Pfad, Kompetenz-Gap-Schließung).
Erfüllt Bid 5.2 + 5.3.

**Notable interactions**

- Kompetenz-Tile öffnen → zugewiesene Lernpfade
- Lernpfad „selber zusammenstellen" → Module-Picker
- Lernpfad veröffentlichen / sharen
- Tooltip „Warum diese Empfehlung?" aufklappen — zeigt Rolle + Org-
  Einheit + Kompetenz-Gap als Begründung

**Design choices to evaluate**

- Empfehlungs-Erläuterung als Tooltip oder dauerhaft sichtbar?
- Self-Service-Lernpfad-Bau — wie viel Zeit verbringt ein Lerner damit?

**Known limitations**

- Lernpfad-Editor ist Drill-Down, kein dedizierter Editor-Modus.

### Step s1 · `social-wall.html` — Social Wall

**Persona** · Marc Steiner (Lernender)
**Award lens** · Engagement · Peer-Learning

**What you're looking at**

Sozialer Activity-Feed: was Kolleg:innen lernen, welche Kurse
empfohlen werden, geteilte Lernpfade, Kommentar-Threads. Erfüllt
Bid 5.5 „Social-Learning-Funktionen".

**Notable interactions**

- Feed nach Direktion / Thema filtern
- Like auf einen Beitrag — sofortiges Update
- Auf geteilten Lernpfad reagieren (in eigenes „Mein Lernen" übernehmen)
- Engagement-Indikator (Streak / Aktivitäts-Level) am Profil

**Design choices to evaluate**

- Wie viel Social darf sein — wann wird's Distraction statt Motivation?
- Moderation: braucht es einen Report-Mechanismus pro Post?

**Known limitations**

- Feed ist heute statisch, nicht über echte Aktivitäten generiert.
