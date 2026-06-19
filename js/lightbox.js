window.App = window.App || {};

(function () {
  function initLightbox() {
    document.getElementById("lightboxClose").addEventListener("click", close);
    document.getElementById("lightboxOverlay").addEventListener("click", (e) => {
      if (e.target.id === "lightboxOverlay") close();
    });
  }

  function open(item) {
    document.getElementById("lightboxImage").src = item.url;
    document.getElementById("lightboxCaption").textContent = item.name;
    document.getElementById("lightboxOverlay").classList.add("open");
  }

  function close() {
    document.getElementById("lightboxOverlay").classList.remove("open");
  }

  window.App.Lightbox = { initLightbox, open, close };
})();
