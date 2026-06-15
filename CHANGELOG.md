# Changelog

Format orientiert an „Keep a Changelog"; Versionierung nach SemVer.

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
