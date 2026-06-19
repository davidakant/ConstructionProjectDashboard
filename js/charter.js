window.App = window.App || {};

(function () {
  const { loadData, saveData } = window.App.Utils;
  const STORAGE_KEY = "charter";

  const FIELDS = [
    { key: "title", label: "Project Title" },
    { key: "sponsor", label: "Project Sponsor" },
    { key: "projectManager", label: "Project Manager" },
    { key: "startDate", label: "Start Date" },
    { key: "targetCompletion", label: "Target Completion" },
    { key: "purpose", label: "Purpose & Background" },
    { key: "objectives", label: "Objectives" },
    { key: "scope", label: "Scope" },
    { key: "stakeholders", label: "Key Stakeholders" },
    { key: "successCriteria", label: "Success Criteria" },
    { key: "assumptions", label: "Assumptions & Constraints" },
  ];

  let charter = {};
  let editingField = null;

  function displayElementId(key) {
    return `charter${key.charAt(0).toUpperCase()}${key.slice(1)}Display`;
  }

  function initCharter() {
    charter = loadData(STORAGE_KEY, window.App.SeedCharter || {});

    const overlay = document.getElementById("charterModalOverlay");
    const form = document.getElementById("charterForm");
    const cancelBtn = document.getElementById("cancelCharterBtn");

    document.querySelectorAll(".charter-field .edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => openCharterModal(btn.dataset.field));
    });

    cancelBtn.addEventListener("click", () => closeModal(overlay, form));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay, form);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!editingField) return;
      charter[editingField] = document.getElementById("charterModalTextarea").value.trim();
      saveData(STORAGE_KEY, charter);
      closeModal(overlay, form);
      renderCharter();
    });

    renderCharter();
  }

  function openCharterModal(field) {
    const meta = FIELDS.find((f) => f.key === field);
    editingField = field;
    document.getElementById("charterModalTitle").textContent = `Edit ${meta ? meta.label : "Section"}`;
    document.getElementById("charterModalTextarea").value = charter[field] || "";
    document.getElementById("charterModalOverlay").classList.add("open");
  }

  function closeModal(overlay, form) {
    overlay.classList.remove("open");
    form.reset();
    editingField = null;
  }

  function renderCharter() {
    FIELDS.forEach(({ key }) => {
      const el = document.getElementById(displayElementId(key));
      if (!el) return;
      const value = charter[key];
      el.textContent = value || "Click the pencil to add this section.";
      el.classList.toggle("empty-state", !value);
    });
  }

  function getCharter() {
    return charter;
  }

  window.App.Charter = { initCharter, getCharter };
})();
