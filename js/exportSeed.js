window.App = window.App || {};

(function () {
  function buildSeedFileContents() {
    const tasks = window.App.Tasks.getTasks();
    const events = window.App.Calendar.getEvents();
    const budgetItems = window.App.Budget.getBudgetItems();
    return [
      "window.App = window.App || {};",
      "",
      "// Default tasks/events/budget shown the first time the app loads in a",
      "// browser with no saved data yet (e.g. a fresh clone, or a visitor on",
      '// GitHub Pages). Regenerate this file from your current local data with',
      '// the "Export for GitHub" button, then commit it to publish your changes.',
      `window.App.SeedTasks = ${JSON.stringify(tasks, null, 2)};`,
      `window.App.SeedEvents = ${JSON.stringify(events, null, 2)};`,
      `window.App.SeedBudgetItems = ${JSON.stringify(budgetItems, null, 2)};`,
      "",
    ].join("\n");
  }

  function exportSeedFile() {
    const blob = new Blob([buildSeedFileContents()], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seed.js";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function initExportSeed() {
    document.getElementById("exportSeedBtn").addEventListener("click", exportSeedFile);
  }

  window.App.ExportSeed = { initExportSeed };
})();
