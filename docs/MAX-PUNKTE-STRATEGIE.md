# ZK09 — Max-Punkte-Strategie pro Block

Wo verdienen wir Punkte, wo verlieren wir sie, was tun bis 2026-05-31.

**Bid-Scoring-Gewichte (45 % qualitativ, Rest ist Preis + Tech-Specs):**

| Kriterium | Gewicht | Wo demonstriert |
|---|---|---|
| **UX (User Experience)** | **15 %** | Block 4 (intern), Block 5 (Lerner-Hub) |
| **Gamification** | **15 %** | Block 5 (Punkte, Badges, Leaderboards, Social) |
| **KI** | **10 %** | Block 5 (Empfehlungen, Lernpfade) |
| **Externe Buchbarkeit** | **5 %** | Block 4 (Webshop-Flow) |
| **Verwaltung (Tablestakes)** | **kein Bonus, aber Fail = K.O.** | Blocks 1, 2, 3 |

**Implikation**: Block 1–3 müssen *einwandfrei laufen* (keine Punkte zu gewinnen, aber Bid-Disqualifikation bei Lücken). Block 4 + 5 sind wo wir **Punkte gewinnen oder verlieren**.

---

## Block 1 · Nutzerverwaltung — Tablestakes, KTZH-Differenzierung

**Sub-Points**: 1.1 Rollen+Berechtigungen · 1.2 Doppelrollen/Mehrfachanstellung · 1.3 Profil-Erstellung intern+extern

**Gewicht**: keines direkt — aber **1.2 ist unser stärkstes KTZH-Differenzierungs-Argument** und sollte als Demo-Climax inszeniert werden.

### Max-Punkte-Actions

| Sub-Point | Was zeigt Max-Punkte | Status | Action bis Freitag |
|---|---|---|---|
| 1.1 | Matrix sichtbar + „Rollen systemseitig fix"-Banner + Multi-Direktion-Scope-Editor + Audit-Trail-Hint | ✅ ready | — |
| **1.2** | **„Mehrfachanstellung · 2 Direktionen"-Chip + „Doppelrolle erkannt"-Banner + Context-Cards pro Anstellung + „User-Sicht einnehmen"-Action** | ✅ ready | Optional: zweiten Doppelrolle-Nutzer in Demo-Datensatz (~30 min) |
| 1.3 | Intern: SSO-Lookup → Auto-Felder · Extern: E-Mail-Verifikation + 2FA-Hinweis | ✅ ready | — |

**Max-Punkte-Verbal**: *„Hier scheitert ein Standard-LMS. Eine Person, mehrere Direktionen, mehrere Rollen — getrennt modelliert, nicht in eine Hauptrolle gezwungen. Genau die KTZH-Realität."*

**Risiko**: keine offenen Lücken. Reviewer könnte fragen warum r1–r6 IDs (statt 1, 2, …) — Antwort: „die echten DEMO-FLOW.md Steps sind 1–17, unsere Erweiterung beginnt mit r/d/k/s-Präfixen."

📖 **Details pro Sub-Point**: [`docs/scripts/1.1`](scripts/1.1-rollen-berechtigungen.md), [`1.2`](scripts/1.2-doppelrollen.md), [`1.3`](scripts/1.3-nutzer-anlegen.md)

---

## Block 2 · Erstellungsprozess — Tablestakes, „Enterprise-ready"-Signal

**Sub-Points**: 2.1 Vorlagen · 2.2 Erfassen · 2.3 Übersicht · 2.4 Publikation+Freigabe

**Gewicht**: keines direkt — aber **2.4 (Vier-Augen-Freigabe + 3 Approval-Verben)** ist unser stärkstes „Enterprise-Governance"-Argument für Procurement-Käufer.

### Max-Punkte-Actions

| Sub-Point | Was zeigt Max-Punkte | Status | Action bis Freitag |
|---|---|---|---|
| 2.1 | Default-to-Template-Pattern + 5-Kategorien-Filter (E-Mails, Umfragen, Zertifikate, …) | ✅ ready | — |
| 2.2 | Live-Preview rechts (Lernplatz-Card-Mirror) + Verbindlichkeit-Toggle (Wahl/Pflicht/Genehmigung) ändert Felder | ✅ ready | — |
| 2.3 | 684 Angebote + 5 Quick-Actions pro Zeile + Mandant-Scoping-Chip | ✅ ready | — |
| **2.4** | **3 Approval-Verben (Freigeben / Mit Auflage / Zurückweisen) + Status-Timeline + Approval-Routing-Tabelle aus Bid Beilage V** | ✅ ready | — |

**Max-Punkte-Verbal**: *„Standard im Markt sind 2 Verben — approve/reject. KTZH-Realität braucht ‚Mit Auflage freigeben' — der Reviewer schreibt ‚bitte Titel kürzen' und der Workflow läuft weiter ohne Re-Submission-Round."*

**Risiko**: 2.2 Bid §7 hat 17 Pflichtfelder — wenn Reviewer einzeln durchgeht, könnte er fragen warum ein bestimmtes Feld fehlt. Hint: alle 17 sind drin, aber nicht alle expanded sichtbar.

📖 **Details**: [`2.1`](scripts/2.1-vorlagen.md), [`2.2`](scripts/2.2-angebot-erfassen.md), [`2.3`](scripts/2.3-angebote-uebersicht.md), [`2.4`](scripts/2.4-publikation-freigabe.md)

---

## Block 3 · Verwaltung bestehender Angebote — Tablestakes

**Sub-Points**: 3.1 Teilnehmerlisten Export+Edit · 3.2 Benachrichtigung

**Gewicht**: keines — aber **3.2 (Composer mit Live-Preview)** ist ein unterschätzbares „we sweat the details"-Signal für Admin-Power-User in der Reviewer-Group.

### Max-Punkte-Actions

| Sub-Point | Was zeigt Max-Punkte | Status | Action bis Freitag |
|---|---|---|---|
| 3.1 | 5-State-Pill-Modell (Angemeldet/Warteliste/Abgemeldet/Teilgenommen/No-Show) + Export `.xlsx`+`.csv` + Add/Move/Remove-Actions | ✅ ready | — |
| **3.2** | **E-Mail-Composer-Modal mit Live-Preview rechts + Template-Picker links + Personalisierungs-Variablen (`{{Vorname}}`, `{{Angebot}}`, `{{Termin}}`)** | ✅ ready | — |

**Max-Punkte-Verbal**: *„Vor dem Send sieht Silvia genau, was Marc im Posteingang sieht. Reduziert Email-Pannen drastisch."*

**Risiko**: Mass-Mail über mehrere Angebote (Bulk-Composer in Step 15) ist narratisiert, nicht gebaut → verbal als „Q3" positionieren. Reporting (`auswertungen.html`) bonus-mention, da er nicht im Bid §3 PDF-Plan ist, sondern §4.1 Jahresplanung.

📖 **Details**: [`3.1`](scripts/3.1-teilnehmerlisten.md), [`3.2`](scripts/3.2-benachrichtigung.md)

---

## Block 4 · Anmeldeprozess — **UX 15 % + Externe Buchbarkeit 5 % = 20 % der Bewertung**

**Sub-Points**: 4.1 Intern (UX 15 %) · 4.2 Extern Kostenpflichtig (Externe Buchbarkeit 5 %) · 4.3 GoShows (keine TS)

**Hier verdienen wir 20 % der gesamten Bid-Punkte.** Block 1–3 müssen funktionieren, aber DIESER Block ist wo wir scoren.

### Max-Punkte-Actions

| Sub-Point | Was zeigt Max-Punkte | Status | Action bis Freitag |
|---|---|---|---|
| **4.1** UX 15 % | **5 Anmelde-Modal-Varianten zeigen** (Präsenz · Selbststudium · Genehmigung · Pflicht · Warteliste) — *konsolidiertes Pattern mit adaptiver Copy/Feldgruppe pro Variante* | ✅ ready | — |
| 4.1 | Pflicht-Treatment via `.binding--pflicht` (rote Pille, bestehender App-Token — *keine eigene Farbe erfunden*) | ✅ ready | — |
| 4.1 | mein-lernen Pflicht-offen-Hierarchie oben + Abmelde-Dialog mit Deadline-Logik | ✅ ready | — |
| **4.2** Externe Buchb. 5 % | **Komplette Webshop-Chain (Katalog → Detail → 4-Step Checkout mit Self-Reg → 2FA-Setup → Bestätigung mit `WEB-2026-001247`)** | ✅ ready | — |
| 4.2 | Rechnung als Default-Payment + KK2/KK3-Differenzierung sichtbar + Footer mit Org-Adresse | ✅ ready | — |
| 4.3 | „keine TS" verbal — explizit per Bid out-of-scope | ✅ ready (verbal) | — |

**Max-Punkte-Verbal 4.1**: *„Ein Standard-LMS hat 1 Anmelde-Flow. KTZH-Realität hat 5 — Präsenz braucht Termin, Genehmigung braucht Begründung, Pflicht ist Auto-Enroll, Warteliste zeigt Position. Wir konsolidieren das in EIN Pattern mit adaptiver Copy. Konsistent zu lernen, aber jede Variante stimmt."*

**Max-Punkte-Verbal 4.2**: *„Externe Buchung ist nicht eine Webshop-Bolt-On — eigenes Shell-Pattern (3. Variante neben Admin + Lerner), eigene IA, Selbst-Registrierung im Checkout-Flow gehalten damit Annika nicht den Buy-Context verlässt."*

**Risiko**: KK2/KK3-Payment-Flow hat 5 offene Sub-Qs (OPEN-QUESTIONS.md #2) — wir haben PR C als Default-Annahme geshipped (inline-Registration). Falls Reviewer fragt: „kommt mit Finance-Workshop in Q3".

📖 **Details**: [`4.1`](scripts/4.1-anmeldung-intern.md), [`4.2`](scripts/4.2-anmeldung-extern.md), [`4.3`](scripts/4.3-eintrittskontrolle.md)

---

## Block 5 · Dashboard + Gamification — **15 % Gamification + 10 % KI + UX-Beitrag = bis zu 25 % der Bewertung**

**Hier ist das meiste Punkte-Potential.** Aber auch das **größte Risiko** — Use-Case 5 hat die meisten ⚠️/🚧 Items aus dem Audit.

### Max-Punkte-Actions

| Sub-Point | Was zeigt Max-Punkte | Status | Action bis Freitag |
|---|---|---|---|
| **5.1** | **3 Rollen-Dashboards demonstrieren** (Lerner mein-lernen + Manager manager-dashboard + Externer meine-buchungen) — *strict-reading: PLURAL Rollen* | ✅ ready | Manager-DB Dead-Clicks reduzieren (~30 min, Upstream) |
| 5.1 KI 10 % | Manager-DB Inbox + Zahlungschecks-KPI als operative Effizienz-Story | ✅ ready (refactored 2026-05-27) | — |
| **5.2** KI 10 % | **Tooltip-Erläuterung der Personalisierung** (Filter + Suche + Lernprofil-Daten als Gewichtung) + Social-Signal („3 Personen aus Bauinspektorat empfehlen") + Kompetenz-Gap-Anker | ⚠️ Gap-Viz fehlt | (Optional, ~1.5 h Upstream): Gap als Balken-Chart |
| **5.3** | **Persönlicher Lernpfad-Builder** in kompetenzen.html | ⚠️ display:none | **🔴 P1 Upstream-Task**: Builder aktivieren (~1 h) — siehe UPSTREAM-CHANGES-TODO.md Task 2 |
| 5.3 | mein-lernen zeigt laufenden Lernpfad mit Progress + Note + Zertifikat | ✅ ready | — |
| **5.4** Gamification 15 % | **Punkte + Badges + Leaderboards** — Punkte+Badges live auf mein-lernen, Leaderboards 🚧 | 🚧 Leaderboard fehlt | **🔴 KRITISCH P1 Upstream-Task**: leaderboard.html bauen (~2 h) — siehe UPSTREAM-CHANGES-TODO.md Task 1 |
| **5.5** Gamification 15 % | **4 Verben gemapped**: Teilen (Share-Button) · Likes (Engagement-Counter) · Kommentare (Tab) · Lernpfade (Social-Wall) | ✅ ready (Mockup-Content) | (Optional, ~30 min): 2-3 dynamisch-aussehende Posts in social-wall |

**Max-Punkte-Verbal 5.1**: *„Multiple Rollen erfordern multiple Dashboards. Hier 3 Variants: Lerner sieht Lernfortschritt, Manager sieht Worklist + Zahlungsstatus + Inbox, Externer sieht Buchungs-Historie. Gleiches Datenmodell, role-scope-gated Views."*

**Max-Punkte-Verbal 5.2**: *„Personalisierung ist ein Versprechen. Wir machen es prüfbar — Tooltip am Sort-Selektor zeigt genau WAS gewichtet wird (Filter, Suche, freigegebene Lernprofil-Daten). Transparenz, nicht Black-Box."*

**Max-Punkte-Verbal 5.4**: *„Gamification mit KTZH-Tone — Schweizerische Auszeichnungen, nicht Video-Game-Loot. Leaderboards opt-in und anonymisierbar per IDG ZH §16."*

**Risiken** (alle Verbal-Risiken sind im Wizard als „Verbal als Roadmap"-Callouts auto-aufgepoppt sobald man die Page besucht):

| Risiko | Mitigation |
|---|---|
| 🚧 **Leaderboard fehlt** = strict-reading Bid §5.4 ungeklärt | Frank baut leaderboard.html bis Donnerstag (UPSTREAM-CHANGES Task 1) |
| ⚠️ **Lernpfad-Builder display:none** = strict-reading Bid §5.3 ungeklärt | Frank entfernt CSS-hide (UPSTREAM-CHANGES Task 2) |
| ⚠️ Personalisierung statisch (Q1 2027 Backend) | Tooltip ist ehrlich; verbal: „Embedding-Model + Backend kommt mit ZK04-roadmap" |
| OPEN-QUESTIONS.md #10 Badge-Stil offen | Vorhandene Badge auf mein-lernen reicht für Demo |
| OPEN-QUESTIONS.md #11 Leaderboard-Default | Empfehlung: anonymisierter Default + Toggle |

📖 **Details**: [`5.1`](scripts/5.1-dashboards.md), [`5.2`](scripts/5.2-empfehlungen.md), [`5.3`](scripts/5.3-lernpfade.md), [`5.4`](scripts/5.4-gamification.md), [`5.5`](scripts/5.5-social-learning.md)

---

## Punkte-Risiko-Matrix (gesamt)

| Risiko | Block | Gewicht-Impact | Action |
|---|---|---|---|
| 🔴 **Leaderboard fehlt** | 5.4 | bis 5 von 15 % Gamification | UPSTREAM Task 1 (~2 h) |
| 🟡 **Lernpfad-Builder hidden** | 5.3 | bis 3 von 15 % Gamification | UPSTREAM Task 2 (~1 h) |
| 🟡 Personalisierung statisch | 5.2 | bis 3 von 10 % KI | verbal als Q1 2027 |
| 🟡 Social-Feed-Aggregation Mockup | 5.5 | bis 2 von 15 % Gamification | verbal als „kommt mit Backend" |
| 🟢 Manager-DB Dead-Clicks | 5.1 | wenig — wirkt unsauber | UPSTREAM Task 6 (~30 min) |
| 🟢 Marc-Surname-Inkonsistenz | UC-übergreifend | wenig — wirkt unsauber | UPSTREAM Task 3 (~30 min) |

**Wenn nur 1 Task vor Demo durchkommt**: **Task 1 Leaderboard**. Schließt die einzige `🚧 missing` der ganzen 17er-Liste.

**Wenn 2**: + Task 2 Lernpfad-Builder. Schließt das andere Strict-Reading-Gap.

**Wenn 3**: + Task 3 Marc-Surname-Unification. Visuelle Politur.

---

## Wie der Wizard das während der Demo unterstützt

Auf JEDER Page (durch Wizard injiziert):

- **Logo links unten** → Click öffnet Panel mit der Step-Narration (Persona + Award-lens + Bid-§-Code + Status-Chip + Coverage-Chip + Minuten)
- **„Demo-Hinweis"** Callout (rot) — auf Pages mit Dead-Click-Density oder Live-Gotchas
- **„Verbal als Roadmap"** Callout (gelb) — auf Pages wo verbal-Roadmap-Sätze einzuwerfen sind, statt zu klicken

→ Demo-Driver muss nicht alles auswendig wissen — der Wizard zeigt's pro Page auf.

📖 **Index aller Sub-Point-Scripts**: [`docs/scripts/README.md`](scripts/README.md)
📖 **Live-Overview mit Bugherd-Integration**: https://zhlearn.ai.srmedia.ch/walkthrough/overview.html
📖 **Upstream-Tasks zum Builden**: [`docs/UPSTREAM-CHANGES-TODO.md`](UPSTREAM-CHANGES-TODO.md)
📖 **Detaillierter Audit** (was fehlt/funktioniert): [`FLOWS.md`](../FLOWS.md)

---

## Sources

- §3 Live-Demo Pflichtenheft + Beilage V (Bid-Gewichte)
- `bid/ZK06-external-access.md` (Externe Buchbarkeit 5 %)
- `bid/ZK07-gamification.md` (Gamification 15 %)
- `bid/ZK08-ai.md` (KI 10 %)
- `bid/ZK03-ux-overfulfillment.md` (UX 15 %)
- 17 per-sub-point Scripts unter [`docs/scripts/`](scripts/)
- ZK09-Audit 2026-05-27 (3 parallele Explore-Agents)
