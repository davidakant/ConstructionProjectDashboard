window.App = window.App || {};

// Read-only synthesis of Budget/Tasks/Closeout/Calendar data into the KPI
// cards on the Overview page. Other modules call render() after their own
// mutations (see calendar.js refresh(), budget.js renderBudget(), and
// closeout.js renderCloseout()) so the cards always reflect live data.
(function () {
  const { formatCurrency } = window.App.Utils;

  function renderBudgetUsed() {
    const items = window.App.Budget?.getBudgetItems() ?? [];
    const totalBudget = items.reduce((sum, b) => sum + b.budgeted, 0);
    const totalActual = items.reduce((sum, b) => sum + b.actual, 0);
    const percent = totalBudget > 0 ? Math.round((totalActual / totalBudget) * 100) : 0;

    document.getElementById("kpiBudgetUsed").textContent = `${percent}%`;
    document.getElementById("kpiBudgetUsedDetail").textContent =
      `${formatCurrency(totalActual)} of ${formatCurrency(totalBudget)}`;
  }

  function renderTasksCompleted() {
    const tasks = window.App.Tasks?.getTasks() ?? [];
    const done = tasks.filter((t) => t.done).length;
    document.getElementById("kpiTasksCompleted").textContent = `${done} / ${tasks.length}`;
  }

  function renderPunchOpen() {
    const items = window.App.Closeout?.getPunchListItems() ?? [];
    const open = items.filter((p) => p.status === "open").length;
    document.getElementById("kpiPunchOpen").textContent = `${open}`;
  }

  function renderNextMilestone() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const tasks = window.App.Tasks?.getTasks() ?? [];
    const events = window.App.Calendar?.getEvents() ?? [];

    const upcoming = tasks
      .filter((t) => t.milestone && t.dueDate >= todayStr)
      .map((t) => ({ title: t.title, date: t.dueDate }))
      .concat(events.filter((e) => e.milestone && e.date >= todayStr).map((e) => ({ title: e.title, date: e.date })))
      .sort((a, b) => a.date.localeCompare(b.date));

    const next = upcoming[0];
    const valueEl = document.getElementById("kpiNextMilestone");
    const detailEl = document.getElementById("kpiNextMilestoneDetail");

    if (!next) {
      valueEl.textContent = "—";
      detailEl.textContent = "No upcoming milestones";
      return;
    }

    const days = Math.round(
      (new Date(next.date + "T00:00:00") - new Date(todayStr + "T00:00:00")) / 86400000
    );
    valueEl.textContent = days === 0 ? "Today" : `${days} day${days === 1 ? "" : "s"}`;
    detailEl.textContent = next.title;
  }

  function render() {
    renderBudgetUsed();
    renderTasksCompleted();
    renderPunchOpen();
    renderNextMilestone();
  }

  function initKpiSummary() {
    render();
  }

  window.App.KpiSummary = { initKpiSummary, render };
})();
