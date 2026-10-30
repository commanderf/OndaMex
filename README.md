# 🌴 OndaMex

Spanisch für den Strandurlaub in Mexiko: die wichtigsten spanischen Vokabeln und Floskeln – als Lernkarten und Quiz. Läuft komplett im Browser (keine Bibliotheken, keine Datenanfragen). Der Name kombiniert das spanische *Onda* („Welle/Vibe“) mit Mexiko.

**Live:** `https://commanderf.github.io/OndaMex/`

## Funktionen

- **Lernmodus** – Lernkarten mit Tippen zum Aufdecken
- **Quizmodus** – Multiple Choice mit Punktzahl
- **Richtung** – DE → ES und ES → DE umschaltbar
- **Kategorien** – Begrüßung, Restaurant, Strand, Ausflug, Einkaufen, Notfall, Zahlen (oder „Alles“ gemischt)
- **Dark Mode** – folgt der Systemeinstellung
- **Update-Hinweis** – zeigt Nutzern, dass eine neue Version auf GitHub liegt
- Optimiert für Handy und Desktop

## Struktur

| Datei | Inhalt | Ins GitHub-Repo |
| --- | --- | --- |
| `index.html` | Gesamte App (HTML + CSS + JS, Vokabel-Daten inline) | ja |
| `update.js` | Update-Erkennung, enthält `APP_VERSION` | ja |
| `README.md` | Diese Datei | ja |
| `publish.sh` | Spiegelt die Dateien + erzeugt `version.json` | nein |

`version.json` liegt im Hauptordner des öffentlichen Repos und wird beim Publish aus `APP_VERSION` in `update.js` erzeugt (eine Quelle der Wahrheit – Versionsbumps an zwei Stellen können so nicht auseinanderlaufen).

## Updates ausrollen

1. Änderungen in `index.html` (z. B. Vokabeln im `DATA`-Array ergänzen).
2. `APP_VERSION` in `update.js` erhöhen (SemVer, z. B. `0.1.0` → `0.1.1`).
3. `./publish.sh` ausführen (nur auf Anweisung) – kopiert Dateien nach `~/git/OndaMex`, erzeugt `version.json` automatisch und pusht.
4. Pages baut automatisch neu; Nutzer sehen beim ersten Besuch ein Banner „Neue Version verfügbar“ und laden die neue Seite über den „Update laden“-Button (Seiten-Reload).

Bewusst **kein Service Worker / PWA**: Auto-Update über Service Worker hat sich im Quizprojekt als unzuverlässig erwiesen (Geräte klebten am alten Stand, „Script evaluation failed“; Details in `quizfragen/Lessons_Learned.md`). Die Update-Erkennung läuft ausschließlich über `version.json` (fetch mit `no-store`, alle 2 Minuten).

## Lokal testen

```bash
python3 -m http.server 8899 --bind 0.0.0.0   # im Ordner spanisch_mexico/
```

Aufruf dann über die IP des Hosts (nicht localhost), z. B. `http://<host-ip>:8899/`.
