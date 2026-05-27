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
Tabelle: Zeit | Was passiert | Click

## Talking Points
Bullet-Liste: konkrete Sätze als Lese-Skript / Begleittext.

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

Pro Sub-Use-Case ein eigenes Skript. Reviewer können sie eigenständig
durchgehen (Self-Walkthrough via Wizard-Logo links unten) oder als
Vorbereitungs-Material lesen. Zeitangaben sind Richtwert für die
Click-Sequenz, keine harte Vorgabe.

| # | Titel | Min | Datei |
|---|---|---|
| 1.1 | Verwaltung von Rollen und Berechtigungen | 2.0 | [1.1-rollen-berechtigungen.md](1.1-rollen-berechtigungen.md) |
| 1.2 | Doppelrollen / Mehrfachanstellung (Climax) | 2.5 | [1.2-doppelrollen.md](1.2-doppelrollen.md) |
| 1.3 | Nutzerprofile intern + extern erstellen | 2.0 | [1.3-nutzer-anlegen.md](1.3-nutzer-anlegen.md) |
| 2.1 | Vorlagen erstellen und bearbeiten | 1.5 | [2.1-vorlagen.md](2.1-vorlagen.md) |
| 2.2 | Angebote inkl. Inhaltserstellung erfassen | 2.0 | [2.2-angebot-erfassen.md](2.2-angebot-erfassen.md) |
| 2.3 | Übersicht aller Angebote | 1.0 | [2.3-angebote-uebersicht.md](2.3-angebote-uebersicht.md) |
| 2.4 | Publikation, Terminierung, Freigabeprozess | 3.0 | [2.4-publikation-freigabe.md](2.4-publikation-freigabe.md) |
| 3.1 | Teilnehmerlisten exportieren und editieren | 1.5 | [3.1-teilnehmerlisten.md](3.1-teilnehmerlisten.md) |
| 3.2 | Benachrichtigung der Teilnehmenden | 1.5 | [3.2-benachrichtigung.md](3.2-benachrichtigung.md) |
| 4.1 | Anmeldung/Bestätigung/Abmeldung (intern) | 3.0 | [4.1-anmeldung-intern.md](4.1-anmeldung-intern.md) |
| 4.2 | Anmeldung/Bestätigung/Abmeldung (kostenpflichtig, extern) | 4.0 | [4.2-anmeldung-extern.md](4.2-anmeldung-extern.md) |
| 4.3 | Eintrittskontrolle App + GoShows | 0.5 | [4.3-eintrittskontrolle.md](4.3-eintrittskontrolle.md) |
| 5.1 | Dashboards für unterschiedliche Rollen | 3.0 | [5.1-dashboards.md](5.1-dashboards.md) |
| 5.2 | Personalisierte Empfehlungen + Erläuterung | 2.0 | [5.2-empfehlungen.md](5.2-empfehlungen.md) |
| 5.3 | Persönliche Lernpfade | 1.5 | [5.3-lernpfade.md](5.3-lernpfade.md) |
| 5.4 | Gamification (Punkte, Badges, Leaderboards) | 1.5 | [5.4-gamification.md](5.4-gamification.md) |
| 5.5 | Social-Learning | 1.5 | [5.5-social-learning.md](5.5-social-learning.md) |
| **Σ** | **17 Sub-Use-Cases** | **34** | (+ 6 min Opening / Übergänge / Closing = 40) |

## Konventionen

- Alle Talking-Points in **Deutsch** (Reviewer ist KTZH).
- Click-Sequenzen referenzieren Wizard-Step-IDs (z.B. `r1`, `Step 10`).
- „Bekannte Lücken" sind nur dort, wo das **strict-reading** des Bids
  eine Differenz zur Page aufdeckt. Nicht für stilistische Verbesserungen.
- Verbesserungen-für-Freitag sind **konkrete Tasks**, kein Wunschkonzert.
