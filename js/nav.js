window.App = window.App || {};

(function () {
  function initNav() {
    const buttons = document.querySelectorAll(".nav-btn");
    const panels = document.querySelectorAll(".panel");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.panel;
        buttons.forEach((b) => b.classList.toggle("active", b === btn));
        panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === target));
      });
    });
  }

  window.App.Nav = { initNav };
})();
