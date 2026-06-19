window.App = window.App || {};

(function () {
  const { loadData, saveData, uid, formatDate, escapeHtml } = window.App.Utils;
  const STORAGE_KEY = "tasks";

  let tasks = [];
  let currentFilter = "all";
  let editingId = null;

  function initTasks() {
    tasks = loadData(STORAGE_KEY, window.App.SeedTasks || []);

    const addBtn = document.getElementById("addTaskBtn");
    const overlay = document.getElementById("taskModalOverlay");
    const form = document.getElementById("taskForm");
    const cancelBtn = document.getElementById("cancelTaskBtn");
    const filterBtns = document.querySelectorAll("#taskFilters .filter-btn");

    addBtn.addEventListener("click", () => openTaskModal());
    cancelBtn.addEventListener("click", () => closeModal(overlay, form));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay, form);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("taskTitle").value.trim();
      const dueDate = document.getElementById("taskDueDate").value;
      if (!title || !dueDate) return;

      const priority = document.getElementById("taskPriority").value;
      const notes = document.getElementById("taskNotes").value.trim();

      if (editingId) {
        const task = tasks.find((t) => t.id === editingId);
        Object.assign(task, { title, dueDate, priority, notes });
      } else {
        tasks.push({ id: uid(), title, dueDate, priority, notes, done: false, milestone: false });
      }

      saveData(STORAGE_KEY, tasks);
      closeModal(overlay, form);
      renderTasks();
      refreshCalendar();
    });

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
        currentFilter = btn.dataset.filter;
        renderTasks();
      });
    });

    renderTasks();
  }

  function openTaskModal(task) {
    editingId = task ? task.id : null;
    document.getElementById("taskModalTitle").textContent = task ? "Edit Task" : "Add Task";
    document.getElementById("taskSubmitBtn").textContent = task ? "Save Changes" : "Save Task";
    document.getElementById("taskTitle").value = task ? task.title : "";
    document.getElementById("taskDueDate").value = task ? task.dueDate : "";
    document.getElementById("taskPriority").value = task ? task.priority : "medium";
    document.getElementById("taskNotes").value = task ? task.notes : "";
    document.getElementById("taskModalOverlay").classList.add("open");
  }

  function closeModal(overlay, form) {
    overlay.classList.remove("open");
    form.reset();
    editingId = null;
  }

  function refreshCalendar() {
    window.App.Calendar?.refresh();
  }

  function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const filtered = tasks.filter((t) => {
      if (currentFilter === "open") return !t.done;
      if (currentFilter === "done") return t.done;
      return true;
    });

    if (filtered.length === 0) {
      list.innerHTML = '<li class="empty-state">No tasks to show.</li>';
      return;
    }

    filtered
      .slice()
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .forEach((task) => {
        const li = document.createElement("li");
        li.className = `task-item priority-${task.priority}${task.done ? " done" : ""}${task.milestone ? " milestone" : ""}`;
        li.innerHTML = `
          <label class="task-check">
            <input type="checkbox" ${task.done ? "checked" : ""}>
          </label>
          <div class="task-info">
            <span class="task-title">${escapeHtml(task.title)}</span>
            <span class="task-due">Due ${formatDate(task.dueDate)}</span>
            ${task.notes ? `<span class="task-notes">${escapeHtml(task.notes)}</span>` : ""}
          </div>
          <span class="badge badge-${task.priority}">${task.priority}</span>
          <button class="icon-btn milestone-btn${task.milestone ? " active" : ""}" aria-label="Toggle milestone">&#9733;</button>
          <button class="icon-btn edit-btn" aria-label="Edit task">&#9998;</button>
          <button class="icon-btn delete-btn" aria-label="Delete task">&times;</button>
        `;

        li.querySelector('input[type="checkbox"]').addEventListener("change", (e) => {
          task.done = e.target.checked;
          saveData(STORAGE_KEY, tasks);
          renderTasks();
          refreshCalendar();
        });

        li.querySelector(".milestone-btn").addEventListener("click", () => {
          task.milestone = !task.milestone;
          saveData(STORAGE_KEY, tasks);
          renderTasks();
          refreshCalendar();
        });

        li.querySelector(".edit-btn").addEventListener("click", () => openTaskModal(task));

        li.querySelector(".delete-btn").addEventListener("click", () => {
          tasks = tasks.filter((t) => t.id !== task.id);
          saveData(STORAGE_KEY, tasks);
          renderTasks();
          refreshCalendar();
        });

        list.appendChild(li);
      });
  }

  function getTasks() {
    return tasks;
  }

  window.App.Tasks = { initTasks, getTasks };
})();
