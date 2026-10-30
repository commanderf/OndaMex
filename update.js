"use strict";
// Update-Erkennung nach Quiz-Muster (kein Service Worker, keine PWA):
// Serverversion steht in version.json (beim Publish automatisch aus APP_VERSION erzeugt).
const APP_VERSION = "0.1.0";

(function () {
  const IGNORE_KEY = "ondamex-update-ignored";
  const banner = document.getElementById("update-banner");
  const verLabel = document.getElementById("app-version");
  if (banner === null) return;

  if (verLabel !== null) verLabel.textContent = "v" + APP_VERSION;
  let serverVersion = null;

  const check = () => {
    fetch("version.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!j || typeof j.version !== "string" || j.version === APP_VERSION) return;
        serverVersion = j.version;
        let ignored = null;
        try { ignored = localStorage.getItem(IGNORE_KEY); } catch (e) {}
        if (ignored === j.version) return; // „Später" gedrückt, gleiche Version wie gemerkt
        banner.querySelector(".ub-text").textContent =
          "Neue Version verfügbar (" + j.version + ")";
        banner.hidden = false;
      })
      .catch(() => {}); // offline/404: stumm ignorieren
  };

  banner.querySelector(".ub-later").addEventListener("click", () => {
    try { localStorage.setItem(IGNORE_KEY, serverVersion || ""); } catch (e) {}
    banner.hidden = true;
  });
  banner.querySelector(".ub-yes").addEventListener("click", () => location.reload());

  check();
  setInterval(check, 120000);
})();
