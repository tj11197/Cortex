# Changelog

Format orientiert an „Keep a Changelog"; Versionierung nach SemVer.

## [1.11.0] — 2026-06-17
### Added
- **Neuer Bereich „CFA Level 1 Quick Prep"** – kurze, pendlertaugliche Multiple-Choice-Fragen ohne Taschenrechner, mit Tipp und Erklärung. Sechs Unterkategorien mit je 10 eigens formulierten Übungsfragen (insgesamt 60, keine offiziellen CFA-Fragen):
  - **Returns & Renditen**, **Time Value of Money**, **Statistik Basics**, **Wahrscheinlichkeit & Erwartungswert**, **Portfolio-Mathe Light**, **Hypothesentests & Regression**.
- Drei Fragetypen quer durch alle Bänke: **Konzeptfragen** (kein Rechnen), **Mini-Rechnungen** (1–2 Schritte im Kopf) und **Formel-/Setup-Fragen** („welche Formel/welcher Ansatz passt?"). Verteilung ca. 70 % Konzept/Interpretation/Formel und 30 % Mini-Rechnung. Jede Frage hat Schwierigkeit 1–4 als Metadaten; gezogen wird ohne Wiederholung, sodass alle zehn Fragen je Thema vorkommen.
- Eigenes, von der Mathe-Diagnose getrenntes **`cfaProfile`** im Store: `attempts`, `correct`, `errorRate`, `weakTopics` (schwache Themen ab genügend Versuchen), `reviewQueue` (falsche Themen, auf 30 begrenzt) und `lastPracticed`. Wird in Export/Import automatisch mitgesichert.
- CFA ist vollständig integriert: eigene Startkachel, Einführungen, gestufte Tipps, Erklärungen, Fehlerübersicht nach Level und adaptive Schwierigkeit – unabhängig von `mathProfile`.
- **Tagestraining:** CFA ist als Bereich in der Subkategorie-Auswahl wählbar und standardmäßig aktiv. Wird CFA dort abgewählt, erscheinen keine CFA-Fragen mehr im Tagesset; die kurzen Multiple-Choice-Fragen halten die Pendler-Sessions knapp.

### Notes
- Die Level-Auswahl (1–4 / Adaptiv) steuert bei den kuratierten CFA-Bänken die Auswahl nicht; sie sorgt nur für abwechslungsreiches Ziehen aus dem vollen Fragensatz. Die hinterlegte Schwierigkeit dient der späteren Auswertung.

## [1.10.0] — 2026-06-16
### Added
- **Neues Lernfeld „Elektrotechnik"** mit fünf Themen und gestuften Tipps + Einführungen:
  - **Grundbegriffe** – Größen, Einheiten und Bauteile (Strom/Spannung/Widerstand/Leistung, Atombau, Mess­geräte, Ohmsches Gesetz als Definition).
  - **Ohmsches Gesetz** – Rechenaufgaben: Widerstand, Strom oder Spannung aus den jeweils anderen beiden Größen (U = R · I, I = U/R, R = U/I), Schwierigkeit über die vier Level (bis zu Dezimalwerten wie 0,2 A → 1.800 Ω).
  - **Leistung & Ladung** – P = U · I, Ladung Q = I · t sowie Elektrolyse-Aufgaben mit proportionaler Masse (I · t).
  - **Reihe & Parallel** – Grundschaltung erkennen, Gesamtwiderstand berechnen (Reihe R1 + R2, parallel (R1·R2)/(R1+R2)) sowie die Strom-/Spannungsregeln.
  - **Schaltungs-Logik** – Schalter in Reihe (UND) bzw. parallel (ODER), Ausfallverhalten bei Reihen-/Parallelschaltung und Helligkeitsvergleich.
- Alle Aufgaben sind Multiple-Choice mit gemischten Antwortpositionen, ausführlicher Erklärung und ein bis zwei gestuften Tipps. Konzeptfragen ziehen ohne Wiederholung aus kuratierten Sätzen; Rechenfragen werden prozedural mit sauber aufgehenden Zahlen erzeugt.
- Elektrotechnik ist als eigener Bereich vollständig integriert: eigene Startkachel, Einführungen, adaptive Schwierigkeit (Level 1–4 / Adaptiv), Fehlerübersicht und **Subkategorie-Auswahl im Tagestraining** (an-/abwählbar wie die übrigen Bereiche).

### Notes
- Die Schaltungsaufgaben sind bewusst textbasiert formuliert (klare Beschreibung der Topologie) statt als gezeichnete Schaltpläne; die Screenshots dienten als inhaltliche Vorlage. Schaltplan-Grafiken können später ergänzt werden.

## [1.9.0] — 2026-06-16
### Added
- **Diagnose-Level steuert jetzt das Üben.** Nach abgeschlossenem Eingangstest gibt es im Kopfrechnen-Bereich die neue Schwierigkeitsoption **„Mein Niveau"**, die standardmäßig vorausgewählt ist. Sie startet jede Kategorie auf ihrem gemessenen Level 1–12, übersetzt über das bestehende 3:1-Mapping in die Generatorstufe 1–4. Die festen Level 1–4 und „Adaptiv" bleiben erhalten; ohne abgeschlossenen Test wird „Mein Niveau" gar nicht erst angezeigt.
- **Normale Mathe-Übungen aktualisieren `mathProfile`.** Jede beantwortete Mathe-Aufgabe pflegt zusätzlich zum bestehenden Adaptivprofil `categoryStats[cat]`: θ/RD (bestehendes Modell), Level 1–12, attempts, correct, errorRate, avgTimeMs, lastPracticed, ein gleitendes 10er-Fenster, missedTypes (wo vorhanden) und nextRec. Leveländerungen sind stabilisiert: Fenster-Hysterese plus **maximal ±1 sichtbares Level pro Session**, keine Sprünge nach einer Einzelaufgabe.
- **Tagestraining gewichtet nach Diagnose.** Liegt ein `mathProfile` vor, kommen schwache/unsichere Mathe-Kategorien häufiger, starke/gemeisterte seltener (aber nie nie). Mathe-Aufgaben im Tagesset nutzen das Diagnose-Generatorlevel der jeweiligen Kategorie. Die Subkategorie-Auswahl bleibt strikt maßgeblich – gewichtet wird nur innerhalb der aktivierten Kategorien. Ohne `mathProfile` greift weiterhin der bisherige Fallback.
- **Einfache Mathe-Review-Queue.** Falsch beantwortete Mathe-Aufgaben landen in `mathProfile.reviewQueue` (Kategorie, ggf. Typ, `dueAt`, `tries`), begrenzt auf 30 Einträge. Fällige Einträge aktivierter Kategorien werden im Tagestraining bevorzugt (frisch generierte Aufgabe derselben Kategorie/Schwierigkeit); eine richtige Antwort löst den Eintrag wieder auf.
- **Lerneinheit-Empfehlung.** Bei hoher Fehlerquote oder gehäuften Fehlern eines Typs wird `nextRec = "lesson"` gesetzt; im Kopfrechnen-Hub erscheint dann dezent der Hinweis „Einführung empfohlen" (kein Pop-up).
- **Ergebnis nach Mathe-Sessions** zeigt jetzt, ob das Level je Kategorie gehalten/gestiegen/gesunken ist, und frischt Gesamtniveau, Cluster-Level und Fokus-Empfehlung auf.

### Notes
- Die Level 1–12 sind damit nicht mehr nur informativ, sondern steuern Schwierigkeit und Gewichtung. Das Üben aus dem Hub kann weiterhin manuell auf feste Level 1–4 oder „Adaptiv" umgestellt werden.

## [1.8.1] — 2026-06-16
### Fixed
- **Eingangstest-Treppe berücksichtigt jetzt das Zeitband** (gemäß Spezifikation): richtig **und** im Zeitband → Generator-Level steigt; **richtig, aber langsam → Level bleibt**; falsch → Level sinkt. Bisher stieg jede richtige Antwort unabhängig vom Tempo.
### Added
- **Sofortiges Speichern beim Backgrounding.** Beim Wechsel in den Hintergrund (`visibilitychange`/`pagehide`) wird der Store sofort geschrieben (`Store.flush()`), statt auf den 150-ms-Sammelschreiber zu warten. Das macht insbesondere das Pausieren/Fortsetzen des Eingangstests verlustsicher.
### Notes
- **N-Back** bleibt bewusst **Hub-only**: erreichbar unter „Working Memory & Konzentration", aber nicht im Tagestraining-Pool und nicht im Subkategorie-Selektor (N-Back ist ein eigener Sitzungstyp mit Countdown/Stream, kein Einzel-Item). Es existiert kein toter `wm:nback`-Kategorie-Key; das Adaptivprofil `wm:nback` wird weiterhin nur von der N-Back-Sitzung gepflegt.

## [1.8.0] — 2026-06-16
### Added
- **Mathe-Eingangstest (Niveau-Bestimmung).** Über die Karte „Matheniveau bestimmen" im Kopfrechnen-Bereich startet ein kurzer, adaptiver Einstufungstest: **20 Aufgaben** über fünf Themen-Cluster (Grundrechnen · Brüche/Prozent/Verhältnis · Potenzen/Wurzeln/Log · Geometrie/Trigonometrie · Folgen/Funktionen/Kombinatorik). Die Schwierigkeit passt sich pro Cluster als Treppe an, es gibt kein Richtig/Falsch zwischendurch. Der Test ist **jederzeit pausierbar und fortsetzbar** (Fortschritt wird nach jeder Antwort gespeichert) und kann neu begonnen werden.
- **θ/RD-Scoring (Elo-lite) & 12 Level.** Pro Cluster und Kategorie werden ein Können-Wert (θ, 0–100) und eine Unsicherheit (RD) geführt. Daraus ergeben sich **Fortschritts-/Mastery-Level 1–12** je Thema sowie ein Gesamt-Matheniveau. Das angezeigte Level ändert sich nicht durch eine Einzelantwort (gedämpfter Update mit sinkendem Einfluss).
- **Ergebnisbildschirm** nach dem Test: Gesamt-Matheniveau, Balken je Cluster, stärkste und schwächste Themen sowie eine **empfohlene Fokus-Auswahl**.
- **Kategorie-Level im Kopfrechnen-Hub.** Jede Mathe-Zeile zeigt nach dem Test ihr Level (L1–L12) und ein Mastery-Symbol (○ neu · ◐ in Arbeit · ● gemeistert).
- **Tagestraining: Auswahl einzelner Subkategorien.** Statt nur ganzer Bereiche lassen sich jetzt einzelne Subkategorien (Mathe, Logik, GMAT, Working Memory & Konzentration, Deutsch) für das Tagesset an- und abwählen. Mindestens eine bleibt immer aktiv; adaptive Schwierigkeit gilt nur für die ausgewählten. Gespeichert unter `settings.dailySettings.enabledSubcategories`.

### Changed
- **„Konzentration" und „Working Memory" zusammengeführt** zu einem gemeinsamen Bereich **„Working Memory & Konzentration"**. Zahlenspanne, N-Back und b/d/p/q bleiben erhalten; die Konzentrationsübung „Wochentage" erscheint dort als Subkategorie. Das Tagestraining behandelt alles als eine Gruppe.
- Klarstellung im UI: Level 1–12 ist ein Fortschritts-/Mastery-Level; die Aufgaben werden weiterhin über die bestehenden vier Generatorstufen erzeugt (Mapping 3:1).

### Migration
- Neues, abwärtskompatibles Feld `mathProfile` im Store (Standard `null`); alte Daten ohne dieses Feld laden unverändert, Export/Import enthält es automatisch.
- Bestehende Konzentrations-Fortschritte und abgeschlossene Einführungen (`konz:wochentage`) werden verlustfrei nach `wm:wochentage` übernommen.
- Frühere Tagestrainings-Bereichsauswahl (`settings.dailyGroups`) wird einmalig in die neue Subkategorie-Auswahl überführt und ersetzt (keine parallele Datenstruktur).

## [1.7.0] — 2026-06-16
### Added
- **Neue Rubrik „Konzentration"** mit dem Aufgabentyp **Wochentage** (Tagesrechnen unter Zeitdruck): vier Stufen vom einfachen „in N Tagen" bis zu Verbundaufgaben mit Wochen-Ablenkung (ganze Wochen ändern den Wochentag nicht). Auswahl aus allen sieben Wochentagen, mit Einführung, Tipps und Schritt-für-Schritt-Erklärung.
- **Neue Rubrik „Deutsch"** mit drei Aufgabentypen, jeweils mit Einführung, Tipps und Regel-Erklärung:
  - **Kommasetzung** – korrekt zeichengesetzte Variante wählen (Nebensätze, Relativsätze, Infinitivgruppen, Aufzählungen).
  - **Groß-/Kleinschreibung** – richtige Schreibung wählen (Nomen, substantivierte Verben/Adjektive, Tageszeiten, feste Wendungen).
  - **Rechtschreibung** – korrekt geschriebenes Wort aus vier Varianten erkennen (20 kuratierte Stolperwörter).
- **Tagestraining: Bereichsauswahl** – per Chips lässt sich festlegen, welche Gebiete (Kopfrechnen, Logik, Konzentration, Working Memory, Deutsch, GMAT) ins adaptive Tagesset einfließen. Die Auswahl wird gespeichert.

### Changed
- Antwort-Renderer unterstützt jetzt bis zu sieben Auswahloptionen (A–G), z. B. für die Wochentage.

## [1.6.0] — 2026-06-16
### Added
- **Kopfrechnen erweitert um drei Aufgabentypen** (generiert, mit Einführung, gestuften Tipps und Erklärung):
  - **Dreisatz** – gerader (proportionaler) und ab L3/L4 umgekehrter Dreisatz, in Alltagskontexten (Preise, Strecke, Arbeiter·Zeit). Antworten bleiben ganzzahlig.
  - **Geometrie** – Umfang (Rechteck/Quadrat), Kreis-Umfang/-Fläche, Volumen (Quader/Würfel/Zylinder) und Satz des Pythagoras (mit pythagoreischen Tripeln, ganzzahlig). Bei Kreis/Zylinder bleibt π als Faktor stehen – gefragt ist die Zahl vor π.
  - **Trigonometrie** – Sinus/Kosinus/Tangens als Seitenverhältnis (SOH-CAH-TOA, als Bruch eingebbar), besondere Winkel (30/45/60/90°), Seiten- und Winkelbestimmung. Bewusst auf saubere, exakt eingebbare Lösungen ausgelegt.
- Startkachel „Kopfrechnen" zeigt nun 16 Themen.

## [1.5.0] — 2026-06-16
### Added
- **Working Memory erweitert um den b-d-p-q-Test** (Konzentration): In einer zufälligen Reihe aus
  b, d, p und q wird gezählt, wie oft ein bestimmter Buchstabe vorkommt – Antwort als Zahl.
  Adaptiv: die Reihenlänge wächst mit dem Niveau (24 → 48 Zeichen). Mit Einführung, gestuften Tipps
  und Erklärung (die Treffer werden in der Lösung hervorgehoben) sowie Einbindung ins Tagestraining.

## [1.4.0] — 2026-06-16
### Added
- **Logik deutlich erweitert** um fünf verbale Aufgabentypen im Stil des Bundeswehr-CAT-Tests:
  - **Wort-Analogien** (20 kuratierte Analogien, „A : B = C : ?")
  - **Oberbegriffe** – gemeinsamen Oberbegriff zu zwei Begriffen wählen (generiert aus 14 Kategorien)
  - **Passende Begriffe** – aus sechs Begriffen das zusammengehörende Paar finden (generiert)
  - **Syllogismen** (14 Aufgaben, gültige Schlussfolgerung wählen – mit absurden Prämissen, die rein logisches Schließen erzwingen)
  - **Tatsache oder Meinung** (28 Aussagen, je zur Hälfte Tatsache/Meinung)
  - Alle mit Einführung (Konzept, Beispiel, Lösungsweg), gestuften Tipps, Erklärung und Fehlerübersicht; voll ins adaptive Tagestraining integriert. Richtige Antwort über die Positionen verteilt.

## [1.3.0] — 2026-06-16
### Changed
- **GMAT-Katalog auf Generatoren umgestellt:** Problem Solving (24 Vorlagen) und Data Sufficiency
  (18 Vorlagen) erzeugen ihre Aufgaben jetzt prozedural mit **bei jedem Aufruf wechselnden Zahlen**
  – damit praktisch unbegrenzte Variation statt einer festen Liste.
- **Breites Typenspektrum** abgedeckt: Prozent (Anteil, Zu-/Abschlag, Rückwärtsrechnung, mehrstufig),
  Gewinn-%, einfache & Zinseszinsen, Verhältnisse (Aufteilung, Verkettung), Durchschnitt (fehlender Wert,
  nach Entfernen), Geschwindigkeit & Durchschnittstempo, Arbeit/Leistung (gemeinsam, Arbeiter·Tage),
  Gleichungen & Gleichungssysteme, Teilbarkeit/Vielfache, Potenzen, Reihensumme, Geometrie
  (Rechteck/Dreieck/Kreis), Wahrscheinlichkeit, Kombinatorik. Data Sufficiency deckt die typischen
  Schlussmuster ab (Wert, Vorzeichen, Teilbarkeit, Eindeutigkeit, Geometrie, Verhältnis, Betrag …),
  Antworten über A–E verteilt.
- **Critical Reasoning** um 6 weitere Aufgaben/Typen erweitert (Scheinkorrelation, Kontraposition,
  Ursache-Richtung, Paradoxon, Evaluieren, Störfaktor) → jetzt 30.
### Added
- **Zahlenspanne:** kurze Ankündigung **„Fertig … Los!"** vor dem Erscheinen der Ziffernfolge
  (vorher kam die Folge ohne Vorwarnung). Bricht beim Verlassen des Spiels sauber ab.

## [1.2.0] — 2026-06-14
### Added
- GMAT-Fragenkatalog deutlich erweitert: **Problem Solving 8 → 24**, **Data Sufficiency 5 → 24**,
  **Critical Reasoning 3 → 24** (originale, GMAT-nahe Übungsfragen mit Lösung, Erklärung und Tipp).
  Dadurch keine Wiederholung innerhalb einer 8er-Runde und deutlich mehr Abwechslung über Runden hinweg.
  Die richtige Antwort ist bewusst über alle Positionen verteilt.

## [1.1.1] — 2026-06-14
### Fixed
- Icon-Pfade auf das Wurzelverzeichnis umgestellt (manifest.json, apple-touch-icon in index.html,
  Service-Worker-Shell), passend zu einem Deployment, bei dem die Icons direkt neben index.html liegen.
  Behebt fehlendes Home-Screen-Icon und fehlgeschlagene Service-Worker-Installation in diesem Setup.

## [1.1.0] — 2026-06-14
### Added
- Auswertung zeigt jetzt eine Übersicht der **falsch beantworteten Aufgaben** mit deiner Antwort,
  der richtigen Lösung und der Erklärung – sowohl nach Einzelübungen als auch nach dem Tagestraining.
  Bei fehlerfreien Runden erscheint stattdessen eine kurze Bestätigung. (N-Back behält seine eigene
  Treffer-/Fehlalarm-Auswertung, da es kein Einzelaufgaben-Format hat.)

## [1.0.0] — 2026-06-14
Erstes Release. Stabile, installierbare, offline-fähige PWA.

### Enthalten
- Trainingsbereiche: Kopfrechnen (13 Themen × 4 Level), Logik (Zahlen-/Buchstabenreihen),
  GMAT (Problem Solving, Data Sufficiency, Critical Reasoning), Working Memory (Zahlenspanne, N-Back).
- Adaptive Schwierigkeit pro Übung.
- Selbst-adaptives Tagestraining (5 / 10 / 15 min) mit gewichteter Auswahl und Auswertung
  (Gesamtscore, stärkster/schwächster Bereich, Level pro Bereich, Empfehlung).
- Didaktische Einführungs-Level je Aufgabentyp, abschließbar mit ✓.
- Gestufte Tipps (zwei Stufen) und Erklärungen nach jeder Antwort.
- Streak-Modell: aktueller/bester Streak, „heute erledigt", Tages-Historie (lokale Kalendertage, YYYY-MM-DD; max. 1× pro Tag).
- Zentrale, asynchrone Speicherung in einem Blob (`cortex:data:v1`) mit In-Memory-Fallback,
  automatischer Migration alter Einzelschlüssel und Sofort-Flush beim Backgrounding/Verlassen.
- Export/Import des Fortschritts als JSON.
- PWA: Web-App-Manifest, iOS-Meta-Tags, App-Icons; Service Worker mit App-Shell-Precache,
  network-first-Navigation und stale-while-revalidate für Assets.
- Versionierter Service-Worker-Cache, dessen Version aus `APP_VERSION` abgeleitet wird;
  alte Caches werden beim Aktivieren automatisch gelöscht.
- Mobile UX: Safe-Area-Berücksichtigung, große Touch-Flächen, kein Eingabe-Zoom, App-Feeling.
- Dauerhafter Home-Button mit sauberem Session-Abbau (keine hängenden Timer, keine doppelten Listener).

### Bekannte Grenzen
- localStorage auf iOS nicht garantiert dauerhaft (Backup via Export empfohlen).
- Keine geplanten Erinnerungen/Push im Web auf iOS (für Phase 2 / Capacitor vorgesehen).
- Keine geräteübergreifende Cloud-Sync (nur Export/Import).

## So pflegst du den Changelog
Bei jedem Release `APP_VERSION` in `index.html` erhöhen und hier einen neuen Abschnitt
`## [x.y.z] — JJJJ-MM-TT` mit Added / Changed / Fixed ergänzen.
