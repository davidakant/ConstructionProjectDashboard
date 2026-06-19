window.App = window.App || {};

(function () {
  const { loadData, saveData, uid, escapeHtml, formatCurrency } = window.App.Utils;
  const STORAGE_KEY = "budgetItems";

  let items = [];
  let editingId = null;

  function initBudget() {
    items = loadData(STORAGE_KEY, window.App.SeedBudgetItems || []);

    const addBtn = document.getElementById("addBudgetItemBtn");
    const overlay = document.getElementById("budgetModalOverlay");
    const form = document.getElementById("budgetForm");
    const cancelBtn = document.getElementById("cancelBudgetBtn");

    addBtn.addEventListener("click", () => openBudgetModal());
    cancelBtn.addEventListener("click", () => closeModal(overlay, form));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay, form);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = document.getElementById("budgetCategory").value;
      const item = document.getElementById("budgetItem").value.trim();
      const budgeted = parseFloat(document.getElementById("budgetBudgeted").value);
      const actual = parseFloat(document.getElementById("budgetActual").value) || 0;
      const notes = document.getElementById("budgetNotes").value.trim();
      if (!item || Number.isNaN(budgeted)) return;

      if (editingId) {
        const existing = items.find((b) => b.id === editingId);
        Object.assign(existing, { category, item, budgeted, actual, notes });
      } else {
        items.push({ id: uid(), category, item, budgeted, actual, notes });
      }

      saveData(STORAGE_KEY, items);
      closeModal(overlay, form);
      renderBudget();
    });

    renderBudget();
  }

  function openBudgetModal(item) {
    editingId = item ? item.id : null;
    document.getElementById("budgetModalTitle").textContent = item ? "Edit Line Item" : "Add Line Item";
    document.getElementById("budgetSubmitBtn").textContent = item ? "Save Changes" : "Save Line Item";
    document.getElementById("budgetCategory").value = item ? item.category : "Site Preparation";
    document.getElementById("budgetItem").value = item ? item.item : "";
    document.getElementById("budgetBudgeted").value = item ? item.budgeted : "";
    document.getElementById("budgetActual").value = item ? item.actual : "";
    document.getElementById("budgetNotes").value = item ? item.notes : "";
    document.getElementById("budgetModalOverlay").classList.add("open");
  }

  function closeModal(overlay, form) {
    overlay.classList.remove("open");
    form.reset();
    editingId = null;
  }

  function renderSummary() {
    const totalBudget = items.reduce((sum, b) => sum + b.budgeted, 0);
    const totalActual = items.reduce((sum, b) => sum + b.actual, 0);
    const remaining = totalBudget - totalActual;
    const percentUsed = totalBudget > 0 ? Math.round((totalActual / totalBudget) * 100) : 0;

    document.getElementById("summaryTotalBudget").textContent = formatCurrency(totalBudget);
    document.getElementById("summaryTotalActual").textContent = formatCurrency(totalActual);
    document.getElementById("summaryRemaining").textContent = formatCurrency(remaining);
    document.getElementById("summaryPercentUsed").textContent = `${percentUsed}%`;
  }

  function renderBudget() {
    renderSummary();
    window.App.KpiSummary?.render();

    const list = document.getElementById("budgetList");
    list.innerHTML = "";

    if (items.length === 0) {
      list.innerHTML = '<li class="empty-state">No budget line items yet.</li>';
      return;
    }

    items.forEach((item) => {
      const pct = item.budgeted > 0 ? item.actual / item.budgeted : 0;
      const healthClass = pct > 1 ? "over" : pct >= 0.9 ? "near" : "under";
      const barWidth = Math.min(pct, 1) * 100;
      const variance = item.budgeted - item.actual;
      const varianceHtml =
        variance < 0
          ? `<span class="budget-variance over">${formatCurrency(Math.abs(variance))} over</span>`
          : `<span class="budget-variance">${formatCurrency(variance)} left</span>`;

      const li = document.createElement("li");
      li.className = "budget-item";
      li.innerHTML = `
        <div class="budget-item-info">
          <span class="budget-category-badge">${escapeHtml(item.category)}</span>
          <span class="budget-item-name">${escapeHtml(item.item)}</span>
          ${item.notes ? `<span class="budget-item-notes">${escapeHtml(item.notes)}</span>` : ""}
        </div>
        <div class="budget-amounts">
          <div class="budget-numbers">
            <span class="budget-actual-amt">${formatCurrency(item.actual)}</span>
            <span class="budget-sep">of</span>
            <span class="budget-budgeted-amt">${formatCurrency(item.budgeted)}</span>
          </div>
          <div class="budget-progress">
            <div class="budget-progress-fill ${healthClass}" style="width: ${barWidth}%"></div>
          </div>
          ${varianceHtml}
        </div>
        <button class="icon-btn edit-btn" aria-label="Edit line item">&#9998;</button>
        <button class="icon-btn delete-btn" aria-label="Delete line item">&times;</button>
      `;

      li.querySelector(".edit-btn").addEventListener("click", () => openBudgetModal(item));

      li.querySelector(".delete-btn").addEventListener("click", () => {
        items = items.filter((b) => b.id !== item.id);
        saveData(STORAGE_KEY, items);
        renderBudget();
      });

      list.appendChild(li);
    });
  }

  function getBudgetItems() {
    return items;
  }

  window.App.Budget = { initBudget, getBudgetItems };
})();
