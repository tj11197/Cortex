# Cortex — Gehirntraining (PWA) · v1.0.0

Eine installierbare, vollständig offline-fähige Web-App für persönliches Gehirntraining.
Eine Codebasis, ohne Build-Step — später ohne Rewrite mit Capacitor als iOS-App verpackbar.

---

## Was die App macht
Cortex bietet kurze, fokussierte Trainingseinheiten in mehreren Bereichen, mit
adaptiver Schwierigkeit, Erklärungen nach jeder Antwort und einem täglichen Streak.
Alle Daten bleiben lokal auf dem Gerät.

## Funktionen
- **Kopfrechnen** — 13 Themen (Ketten, 1×1, Wurzeln, Potenzen, Brüche, Prozent, Flächen, Logarithmus, Fakultät, Summen, Produkte, Funktionen), je 4 Level.
- **Logik** — Zahlen- und Buchstabenreihen.
- **GMAT** — Problem Solving, Data Sufficiency, Critical Reasoning.
- **Working Memory** — Zahlenspanne (vorwärts/rückwärts) und N-Back (N = 1/2/3).
- **Adaptive Schwierigkeit** — pro Übung wählbar; passt sich der Leistung an.
- **Selbst-adaptives Tagestraining** — 5 / 10 / 15 Minuten (≈ 12 / 24 / 36 Aufgaben), gemischt aus allen Bereichen; schwächere Bereiche kommen häufiger, starke werden schwerer; Auswertung mit Gesamtscore, stärkstem/schwächstem Bereich, Level pro Bereich und Empfehlung.
- **Einführungs-Level** — pro Aufgabentyp ein didaktischer Mini-Lernpfad (Konzept → Lösungsweg → geführter Versuch → Abschluss), abschließbar mit ✓.
- **Gestufte Tipps** — erst ein sanfter Denkanstoß, dann ein konkreterer.
- **Erklärungen** nach jeder Antwort.
- **Streak** — aktueller und bester Streak, „heute erledigt", Historie der letzten Tage.
- **Export / Import** der Fortschrittsdaten als JSON.
- **Home-Button**, der aus jeder Aufgabe sauber zurückführt (mit Bestätigung, wenn Antworten vorliegen).

## Projektstruktur
```
cortex/
├─ index.html        # die komplette App (HTML/CSS/JS), enthält APP_VERSION
├─ manifest.json     # Web-App-Manifest (Name, Farben, Icons)
├─ sw.js             # Service Worker (Offline-Cache, Version aus ?v=… der Registrierung)
├─ icons/            # App-Icons (Platzhalter – gegen eigene austauschen)
│  ├─ icon-192.png
│  ├─ icon-512.png
│  ├─ icon-512-maskable.png
│  └─ apple-touch-icon-180.png
├─ README.md
├─ CHANGELOG.md
└─ TESTPLAN.md
```

## Lokal starten
Ein Service Worker braucht http(s); `file://` reicht nicht. Im Projektordner:
```
python3 -m http.server 8080
```
Dann `http://localhost:8080/` öffnen. (Alternativ `npx serve` o. Ä.)

## Als PWA testen (Desktop Chrome)
1. Seite über `http://localhost:8080/` öffnen.
2. DevTools → **Application → Manifest**: erkannt, Icons sichtbar.
3. DevTools → **Application → Service Workers**: Status „activated".
4. DevTools → **Network → Offline** aktivieren → Seite neu laden: Die App startet weiterhin.

## Aufs iPhone (Home-Bildschirm)
1. App über **HTTPS** hosten (siehe Deployment). iOS erlaubt „Zum Home-Bildschirm" nur über https; nur `localhost` geht ohne.
2. In **Safari** öffnen.
3. Teilen-Symbol → **„Zum Home-Bildschirm"**.
4. Vom Icon starten: Vollbild, offline, eigenes App-Symbol, eigener Streak.

## Import / Export
Startseite → **„Einstellungen & Daten"**:
- **Backup exportieren** lädt eine Datei `cortex-backup-YYYY-MM-DD.json` mit deinem gesamten Fortschritt herunter.
- **Backup importieren** wählt eine solche Datei und stellt sie wieder her. **Import überschreibt** die aktuellen Daten.

Empfehlung: Lege gelegentlich ein Backup an — siehe „Grenzen".

## Welche Daten lokal gespeichert werden
Alles in **einem** Schlüssel `cortex:data:v1` im Browser-Speicher (localStorage), rein lokal, keine Übertragung ins Netz, keine personenbezogenen Daten:
- `best` — Bestwerte je Übung
- `profile` — adaptives Leistungsprofil je Unterkategorie (Versuche, richtige Antworten, aktuelle/letzte Schwierigkeit, Fehlerquote, Ø-Antwortzeit)
- `tut` — abgeschlossene Einführungen
- `streak` — letzter Trainingstag, aktueller/bester Streak, Tages-Historie
- `settings` — Einstellungen
- `version` — Schema-Version der Daten

## Grenzen (Stand 1.0.0)
- **localStorage ist auf iOS nicht garantiert dauerhaft** — der Browser kann ihn bei Speicherdruck oder langer Inaktivität löschen. Darum gibt es Export/Import; verlässliche Persistenz kommt in Phase 2 (Capacitor Preferences).
- **Keine geplanten Erinnerungen/Push** im Web auf iOS — native Tageserinnerung folgt in Phase 2.
- **Keine Cloud-Sync** zwischen Geräten — Übertragung nur via Export/Import.
- **Schriftarten** kommen von Google Fonts: Beim allerersten Start *ohne* Netz greift der System-Schrift-Fallback; nach einem Online-Start sind sie offline gecached.
- **N-Back** läuft als kontinuierlicher Stream und ist nicht Teil des gemischten Tagespools (nur als eigene Übung).
- Bewusst **ohne Build-Step / Framework** gehalten — maximal einfach und wartbar.

## Phase 2 vorbereitet (Capacitor)
Alle anzupassenden Stellen sind im Code mit `CAPACITOR` markiert:
- **Speicher-Backend** (`const Backend` in `index.html`): localStorage → `@capacitor/preferences`. `load()/save()` sind bereits **async**, sonst nichts ändern.
- **Export/Import**: Browser-Download/File-Input → `@capacitor/filesystem` + `@capacitor/share`. Die Logik (`Store.exportString/importString`) bleibt gleich.
- **Tägliche Erinnerung** (neues Feature in Phase 2): `@capacitor/local-notifications`.
- **Service Worker**: nativ nicht nötig (Assets liegen lokal im Bundle); die Registrierung schadet aber nicht.
- **Schriftarten**: für garantiertes Offline im Bundle ggf. selbst hosten (System-Fallbacks sind gesetzt).

---

## Deployment
Die App ist statisch — kein Build nötig. Drei Wege:

### A) GitHub Pages
1. Repository anlegen, **alle Dateien in den Repo-Root** legen (oder in einen `/docs`-Ordner).
2. GitHub → **Settings → Pages** → Source: Branch `main`, Ordner `/ (root)` (oder `/docs`).
3. Nach kurzer Zeit erreichbar unter `https://<user>.github.io/<repo>/` (HTTPS automatisch).
4. **Service Worker / Pfade:** Die App liegt in einem Unterpfad `/<repo>/`. Das ist ok, weil alle Pfade relativ sind (`start_url: "./index.html"`, `scope: "./"`, SW relativ). Wichtig: `sw.js` muss im selben Ordner wie `index.html` liegen.
5. **Update ohne alten Cache:** In `index.html` `APP_VERSION` erhöhen (z. B. `1.0.1`) und pushen. Dadurch ändert sich `sw.js?v=…` → neuer Service Worker → neuer Cache → alte Caches werden automatisch gelöscht. Hinweis: GitHub Pages cached Dateien über sein CDN kurz; ggf. wenige Minuten warten bzw. einmal hart neu laden.

### B) Netlify
1. Auf app.netlify.com einloggen → **Add new site → Deploy manually** und den `cortex`-Ordner per Drag-and-drop hochladen (oder per Git verbinden).
2. **Build command:** leer. **Publish directory:** der Ordner mit `index.html`.
3. HTTPS ist automatisch aktiv.
4. **Empfohlene Header** (verhindern, dass eine alte `index.html`/`sw.js` per HTTP-Cache hängenbleibt) — Datei `netlify.toml` im Root:
   ```toml
   [[headers]]
     for = "/sw.js"
     [headers.values]
       Cache-Control = "no-cache"
   [[headers]]
     for = "/index.html"
     [headers.values]
       Cache-Control = "no-cache"
   [[headers]]
     for = "/icons/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   ```
5. **Update:** `APP_VERSION` erhöhen, neu deployen — der Rest läuft automatisch (siehe oben).

### C) Vercel
1. `npm i -g vercel`, dann im Ordner `vercel` ausführen (oder Git-Import auf vercel.com).
2. **Framework Preset:** „Other" (rein statisch), keine Build-Einstellungen nötig.
3. HTTPS ist automatisch aktiv.
4. **Empfohlene Header** — Datei `vercel.json` im Root:
   ```json
   {
     "headers": [
       { "source": "/sw.js", "headers": [{ "key": "Cache-Control", "value": "no-cache" }] },
       { "source": "/index.html", "headers": [{ "key": "Cache-Control", "value": "no-cache" }] },
       { "source": "/icons/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
     ]
   }
   ```
5. **Update:** `APP_VERSION` erhöhen, `vercel --prod` (oder Git-Push).

### Worauf generell achten
- **HTTPS ist Pflicht** für Service Worker und „Zum Home-Bildschirm" (Ausnahme nur `localhost`). Alle drei Anbieter liefern HTTPS automatisch.
- **`sw.js` immer neben `index.html`** ausliefern (Scope = dieser Ordner).
- **`index.html` und `sw.js` nicht langfristig cachen** lassen (no-cache-Header bei Netlify/Vercel; GitHub Pages nutzt kurze TTL). Icons/Assets dürfen lang gecached werden.
- **Update-Mechanik in einem Satz:** Nur `APP_VERSION` in `index.html` ändern — die SW-URL ändert sich mit, der neue SW löscht beim Aktivieren alle alten Caches.

## Versionierung
Die Versionsnummer steht an **einer** Stelle: `const APP_VERSION` in `index.html`.
Sie erscheint im Footer und in „Einstellungen & Daten" und wird via
`register('sw.js?v=' + APP_VERSION)` an den Service Worker übergeben, der daraus
seinen Cache-Namen `cortex-v<version>` bildet. Für ein Release also nur diese eine
Zeile erhöhen.
