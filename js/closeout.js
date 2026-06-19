window.App = window.App || {};

(function () {
  const { loadData, saveData, uid, escapeHtml } = window.App.Utils;
  const STORAGE_KEY = "punchListItems";
  const STATUSES = ["open", "fixed", "verified"];

  let items = [];
  let editingId = null;
  let currentFilter = "all";

  function initCloseout() {
    items = loadData(STORAGE_KEY, window.App.SeedPunchListItems || []);

    const addBtn = document.getElementById("addPunchItemBtn");
    const overlay = document.getElementById("punchModalOverlay");
    const form = document.getElementById("punchForm");
    const cancelBtn = document.getElementById("cancelPunchBtn");
    const filterBtns = document.querySelectorAll("#punchFilters .filter-btn");

    addBtn.addEventListener("click", () => openPunchModal());
    cancelBtn.addEventListener("click", () => closeModal(overlay, form));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay, form);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const location = document.getElementById("punchLocation").value.trim();
      const description = document.getElementById("punchDescription").value.trim();
      const assignedTo = document.getElementById("punchAssignedTo").value.trim();
      const status = document.getElementById("punchStatus").value;
      const notes = document.getElementById("punchNotes").value.trim();
      if (!location || !description) return;

      if (editingId) {
        const existing = items.find((p) => p.id === editingId);
        Object.assign(existing, { location, description, assignedTo, status, notes });
      } else {
        items.push({ id: uid(), location, description, assignedTo, status, notes });
      }

      saveData(STORAGE_KEY, items);
      closeModal(overlay, form);
      renderCloseout();
    });

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
        currentFilter = btn.dataset.filter;
        renderCloseout();
      });
    });

    renderCloseout();
  }

  function openPunchModal(item) {
    editingId = item ? item.id : null;
    document.getElementById("punchModalTitle").textContent = item ? "Edit Punch List Item" : "Add Punch List Item";
    document.getElementById("punchSubmitBtn").textContent = item ? "Save Changes" : "Save Item";
    document.getElementById("punchLocation").value = item ? item.location : "";
    document.getElementById("punchDescription").value = item ? item.description : "";
    document.getElementById("punchAssignedTo").value = item ? item.assignedTo : "";
    document.getElementById("punchStatus").value = item ? item.status : "open";
    document.getElementById("punchNotes").value = item ? item.notes : "";
    document.getElementById("punchModalOverlay").classList.add("open");
  }

  function closeModal(overlay, form) {
    overlay.classList.remove("open");
    form.reset();
    editingId = null;
  }

  function renderSummary() {
    document.getElementById("summaryPunchTotal").textContent = items.length;
    document.getElementById("summaryPunchOpen").textContent = items.filter((p) => p.status === "open").length;
    document.getElementById("summaryPunchFixed").textContent = items.filter((p) => p.status === "fixed").length;
    document.getElementById("summaryPunchVerified").textContent = items.filter((p) => p.status === "verified").length;
  }

  function renderCloseout() {
    renderSummary();
    window.App.KpiSummary?.render();

    const list = document.getElementById("punchList");
    list.innerHTML = "";

    const filtered = items.filter((p) => currentFilter === "all" || p.status === currentFilter);

    if (filtered.length === 0) {
      list.innerHTML = '<li class="empty-state">No punch list items to show.</li>';
      return;
    }

    filtered.forEach((item) => {
      const li = document.createElement("li");
      li.className = "punch-item";
      li.innerHTML = `
        <div class="punch-item-info">
          <span class="budget-category-badge">${escapeHtml(item.location)}</span>
          <span class="punch-item-description">${escapeHtml(item.description)}</span>
          ${item.assignedTo ? `<span class="punch-item-assigned">Assigned: ${escapeHtml(item.assignedTo)}</span>` : ""}
          ${item.notes ? `<span class="punch-item-notes">${escapeHtml(item.notes)}</span>` : ""}
        </div>
        <button class="punch-status-badge status-${item.status}" aria-label="Cycle status">${item.status.toUpperCase()}</button>
        <button class="icon-btn edit-btn" aria-label="Edit item">&#9998;</button>
        <button class="icon-btn delete-btn" aria-label="Delete item">&times;</button>
      `;

      li.querySelector(".punch-status-badge").addEventListener("click", () => {
        const idx = STATUSES.indexOf(item.status);
        item.status = STATUSES[(idx + 1) % STATUSES.length];
        saveData(STORAGE_KEY, items);
        renderCloseout();
      });

      li.querySelector(".edit-btn").addEventListener("click", () => openPunchModal(item));

      li.querySelector(".delete-btn").addEventListener("click", () => {
        items = items.filter((p) => p.id !== item.id);
        saveData(STORAGE_KEY, items);
        renderCloseout();
      });

      list.appendChild(li);
    });
  }

  function getPunchListItems() {
    return items;
  }

  window.App.Closeout = { initCloseout, getPunchListItems };
})();
