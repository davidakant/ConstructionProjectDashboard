window.App = window.App || {};

(function () {
  // iPadOS Safari reports as a Mac in the user-agent string, so UA sniffing
  // alone misses it. Combine the UA check with the touch-points heuristic
  // Apple recommends for distinguishing real Macs from iPads.
  function isIPad() {
    const ua = navigator.userAgent;
    const looksLikeIPadUA = /iPad/.test(ua);
    const looksLikeIPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return looksLikeIPadUA || looksLikeIPadOS;
  }

  function applyDeviceClasses() {
    const body = document.body;
    body.classList.toggle("device-ipad", isIPad());
    body.classList.toggle("orientation-portrait", window.matchMedia("(orientation: portrait)").matches);
    body.classList.toggle("orientation-landscape", window.matchMedia("(orientation: landscape)").matches);
  }

  function initDeviceDetection() {
    applyDeviceClasses();
    window.addEventListener("resize", applyDeviceClasses);
    window.addEventListener("orientationchange", applyDeviceClasses);
  }

  window.App.Device = { initDeviceDetection };
})();
