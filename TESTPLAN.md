# Testplan — Cortex v1.0.0 (manuell)

Vor dem Release alle Abschnitte durchgehen. ☐ = offen, ✓ = bestanden.
Empfehlung: einmal auf **Desktop Chrome** und einmal auf einem **echten iPhone (Safari)**.

## 1. Desktop Chrome
- ☐ `python3 -m http.server 8080`, `http://localhost:8080/` öffnet die App ohne Konsolenfehler (DevTools → Console).
- ☐ DevTools → Application → **Manifest** erkannt, Icons werden angezeigt.
- ☐ DevTools → Application → **Service Workers**: Status „activated", Quelle `sw.js?v=1.0.0`.
- ☐ Application → Cache Storage: Eintrag **`cortex-v1.0.0`** vorhanden, enthält index.html/manifest/icons.
- ☐ Footer zeigt „Cortex v1.0.0".

## 2. iPhone Safari
- ☐ App über HTTPS-URL in Safari öffnet korrekt, Layout sauberes Hochformat.
- ☐ Eingabefeld antippen → Seite **zoomt nicht** ungewollt.
- ☐ Buttons gut mit dem Daumen treffbar; nichts wird von der Notch/Home-Leiste überdeckt.
- ☐ Teilen → **„Zum Home-Bildschirm"** möglich; Icon erscheint.

## 3. Installierte Home-Screen-PWA
- ☐ Start vom Icon öffnet **Vollbild** (keine Safari-Leisten).
- ☐ Eigenes App-Icon und Titel „Cortex" korrekt.
- ☐ Status-Bar überlagert den Inhalt nicht.

## 4. Offline-Modus
- ☐ Einmal online laden (damit Cache + Schriften gefüllt sind).
- ☐ Desktop: Network → **Offline** → Reload → App startet.
- ☐ iPhone: **Flugmodus** → App vom Home-Screen starten → App startet und ist bedienbar.
- ☐ Eine Aufgabe offline lösen → funktioniert (alles clientseitig).

## 5. Reload nach Training
- ☐ Eine Runde bis zur Auswertung spielen, zurück zur Startseite.
- ☐ Seite **neu laden** → Bestwerte, adaptives Level und Streak sind erhalten.
- ☐ App schließen/Tab schließen direkt nach der letzten Antwort, erneut öffnen → letzter Stand erhalten (Flush).

## 6. Import / Export
- ☐ Einstellungen & Daten → **Backup exportieren** lädt `cortex-backup-<datum>.json`.
- ☐ Etwas trainieren (Daten ändern), dann dieselbe Datei **importieren** → Toast „Daten importiert", alter Stand wiederhergestellt.
- ☐ Ungültige Datei importieren → Toast „Ungültige Datei", App bleibt stabil.

## 7. Streak-Zählung
- ☐ Nach erstem Training heute: Banner „1 Tag Streak", „heute erledigt".
- ☐ Zweites Training am selben Tag erhöht den Streak **nicht**.
- ☐ (Folgetag) Training erhöht Streak auf 2; bester Streak aktualisiert sich.
- ☐ Nach einem ausgelassenen Tag startet der Streak wieder bei 1; bester bleibt erhalten.

## 8. Home-Button
- ☐ In einer laufenden Aufgabe (mit gegebener Antwort) → **Bestätigungsdialog** „Training wirklich verlassen?".
- ☐ „Weiter üben" bleibt in der Aufgabe; „Verlassen" landet sauber auf der Startseite.
- ☐ In einer **Einführung**: Home führt **ohne** Rückfrage zur Startseite.
- ☐ Im **Tagestraining**: Home funktioniert ebenso.
- ☐ Nach dem Verlassen: keine hängenden Timer (Zahlenspanne/N-Back stoppen), keine Konsolenfehler.

## 9. Tagestraining
- ☐ 5 min → „Aufgabe 1 / 12"; 10 min → /24; 15 min → /36.
- ☐ Aufgaben stammen aus verschiedenen Bereichen.
- ☐ Auswertung zeigt Gesamtscore, stärksten/schwächsten Bereich, Level pro Bereich, Empfehlung.

## 10. Working Memory
- ☐ Zahlenspanne vorwärts: Ziffern erscheinen nacheinander, Eingabe wird korrekt geprüft.
- ☐ Zahlenspanne rückwärts: Eingabe in umgekehrter Reihenfolge wird korrekt geprüft.
- ☐ N-Back (N = 2): „Treffer" funktioniert; Lauf endet in Auswertung; kein hängender Stream nach Home.

## 11. Einführungs-Level
- ☐ Einführung eines Themas durchläuft Konzept → Lösungsweg → geführter Versuch → Abschluss.
- ☐ Nach Abschluss erscheint ✓ an der Einführung.
- ☐ Nach **Reload** bleibt das ✓ erhalten.
- ☐ Gestufte Tipps: „Tipp anzeigen" zeigt Stufe 1, „Noch ein Tipp" Stufe 2.

## Regressionsmerker
- ☐ Keine roten Fehler in der Konsole während aller obigen Schritte.
- ☐ Nach einem simulierten Update (APP_VERSION erhöht) lädt die neue Version, und unter
     Cache Storage existiert nur noch der neue `cortex-v<neu>`-Eintrag.
