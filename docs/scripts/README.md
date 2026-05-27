# ZK09 Demo-Skripts

Pro Bid §3 Sub-Use-Case ein Skript-Dokument. Goldstandard, nicht
Status — beschreibt **wie der Demo-Lauf laufen SOLL**, nicht
zwingend wie er heute läuft.

## Format-Konvention

Jedes Skript folgt dem gleichen Template:

```
# Use Case X.Y — [Kurztitel]

## Bid-Text (wörtlich aus Pflichtenheft §3)
> Originaltext

## Pages zu zeigen
Sequenz mit Beschreibung pro Page.

## Demo-Flow (Sekunden-genau, ~X min)
Tabelle: Zeit | Was passiert | Wer redet | Click

## Talking Points
Bullet-Liste: konkrete Sätze, die der Presenter sagt.

## Bid-Compliance Evidence
Welche Bid-Punkte erfüllt diese Sequenz beweisbar.

## Bekannte Lücken
Wo strict-reading vom Bid eine Lücke aufdeckt.

## Verbesserungen für Freitag
Was noch zu tun ist, priorisiert.

## Sources
Wo die Inhalte/Daten dokumentiert sind.
```

## Sub-Use-Case-Übersicht (40-min-Budget)

| # | Titel | Wer | Min | Datei |
|---|---|---|---|---|
| 1.1 | Verwaltung von Rollen und Berechtigungen | Antoine | 2.0 | [1.1-rollen-berechtigungen.md](1.1-rollen-berechtigungen.md) |
| 1.2 | Doppelrollen / Mehrfachanstellung (Climax) | Antoine | 2.5 | [1.2-doppelrollen.md](1.2-doppelrollen.md) |
| 1.3 | Nutzerprofile intern + extern erstellen | Antoine | 2.0 | [1.3-nutzer-anlegen.md](1.3-nutzer-anlegen.md) |
| 2.1 | Vorlagen erstellen und bearbeiten | Frank | 1.5 | [2.1-vorlagen.md](2.1-vorlagen.md) |
| 2.2 | Angebote inkl. Inhaltserstellung erfassen | Frank | 2.0 | [2.2-angebot-erfassen.md](2.2-angebot-erfassen.md) |
| 2.3 | Übersicht aller Angebote | Frank | 1.0 | [2.3-angebote-uebersicht.md](2.3-angebote-uebersicht.md) |
| 2.4 | Publikation, Terminierung, Freigabeprozess | Frank | 3.0 | [2.4-publikation-freigabe.md](2.4-publikation-freigabe.md) |
| 3.1 | Teilnehmerlisten exportieren und editieren | Antoine | 1.5 | [3.1-teilnehmerlisten.md](3.1-teilnehmerlisten.md) |
| 3.2 | Benachrichtigung der Teilnehmenden | Antoine | 1.5 | [3.2-benachrichtigung.md](3.2-benachrichtigung.md) |
| 4.1 | Anmeldung/Bestätigung/Abmeldung (intern) | Antoine | 3.0 | [4.1-anmeldung-intern.md](4.1-anmeldung-intern.md) |
| 4.2 | Anmeldung/Bestätigung/Abmeldung (kostenpflichtig, extern) | Antoine | 4.0 | [4.2-anmeldung-extern.md](4.2-anmeldung-extern.md) |
| 4.3 | Eintrittskontrolle App + GoShows | Antoine | 0.5 | [4.3-eintrittskontrolle.md](4.3-eintrittskontrolle.md) |
| 5.1 | Dashboards für unterschiedliche Rollen | Frank | 3.0 | [5.1-dashboards.md](5.1-dashboards.md) |
| 5.2 | Personalisierte Empfehlungen + Erläuterung | Frank | 2.0 | [5.2-empfehlungen.md](5.2-empfehlungen.md) |
| 5.3 | Persönliche Lernpfade | Frank | 1.5 | [5.3-lernpfade.md](5.3-lernpfade.md) |
| 5.4 | Gamification (Punkte, Badges, Leaderboards) | Frank | 1.5 | [5.4-gamification.md](5.4-gamification.md) |
| 5.5 | Social-Learning | Frank | 1.5 | [5.5-social-learning.md](5.5-social-learning.md) |
| **Σ** | **17 Sub-Use-Cases** | A/F | **34** | (+ 6 min Opening/Closing/Q&A = 40) |

## Speaker-Aufteilung

- **Antoine** (1, 3, 4): UC1 + UC3 + UC4 = ~17 min
- **Frank** (2, 5): UC2 + UC5 = ~17 min
- 6 min Buffer für Opening + Übergänge + Closing

Lt. User-Entscheidung: ein Presenter führt, der andere übernimmt Q&A
(siehe `FLOWS.md`).

## Konventionen

- Alle Talking-Points in **Deutsch** (Reviewer ist KTZH).
- Click-Sequenzen referenzieren Wizard-Step-IDs (z.B. `r1`, `Step 10`).
- „Bekannte Lücken" sind nur dort, wo das **strict-reading** des Bids
  eine Differenz zur Page aufdeckt. Nicht für stilistische Verbesserungen.
- Verbesserungen-für-Freitag sind **konkrete Tasks**, kein Wunschkonzert.
