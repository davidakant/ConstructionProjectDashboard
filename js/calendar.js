window.App = window.App || {};

(function () {
  const { loadData, saveData, uid, formatDate, escapeHtml } = window.App.Utils;
  const STORAGE_KEY = "events";

  let events = [];
  let viewDate = new Date();

  function initCalendar() {
    events = loadData(STORAGE_KEY, []);

    document.getElementById("prevMonth").addEventListener("click", () => {
      viewDate.setMonth(viewDate.getMonth() - 1);
      renderCalendar();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
      viewDate.setMonth(viewDate.getMonth() + 1);
      renderCalendar();
    });

    const overlay = document.getElementById("eventModalOverlay");
    const form = document.getElementById("eventForm");
    const addBtn = document.getElementById("addEventBtn");
    const cancelBtn = document.getElementById("cancelEventBtn");

    addBtn.addEventListener("click", () => openEventModal());
    cancelBtn.addEventListener("click", () => closeEventModal());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeEventModal();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("eventTitle").value.trim();
      const date = document.getElementById("eventDate").value;
      if (!title || !date) return;

      events.push({
        id: uid(),
        title,
        date,
        milestone: document.getElementById("eventMilestone").checked,
        notes: document.getElementById("eventNotes").value.trim(),
      });

      saveData(STORAGE_KEY, events);
      closeEventModal();
      renderCalendar();
      renderUpcoming();
    });

    renderCalendar();
    renderUpcoming();
  }

  function openEventModal(dateStr) {
    document.getElementById("eventDate").value = dateStr || "";
    document.getElementById("eventModalOverlay").classList.add("open");
  }

  function closeEventModal() {
    document.getElementById("eventModalOverlay").classList.remove("open");
    document.getElementById("eventForm").reset();
  }

  function renderCalendar() {
    const grid = document.getElementById("calendarGrid");
    const label = document.getElementById("calendarMonthLabel");
    grid.innerHTML = "";

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    label.textContent = viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });

    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((d) => {
      const head = document.createElement("div");
      head.className = "calendar-day-head";
      head.textContent = d;
      grid.appendChild(head);
    });

    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = new Date().toISOString().slice(0, 10);

    for (let i = 0; i < startOffset; i++) {
      const blank = document.createElement("div");
      blank.className = "calendar-day empty";
      grid.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const cell = document.createElement("div");
      cell.className = "calendar-day";
      if (dateStr === todayStr) cell.classList.add("today");

      const dayEvents = events.filter((e) => e.date === dateStr);
      const dayTasks = (window.App.Tasks?.getTasks() ?? []).filter((t) => t.dueDate === dateStr);
      if (dayEvents.some((e) => e.milestone) || dayTasks.some((t) => t.milestone)) {
        cell.classList.add("has-milestone");
      }

      const dayNumber = document.createElement("span");
      dayNumber.className = "day-number";
      dayNumber.textContent = String(day);
      cell.appendChild(dayNumber);

      dayEvents.forEach((ev) => {
        const tag = document.createElement("span");
        tag.className = `event-tag${ev.milestone ? " milestone" : ""}`;
        tag.textContent = ev.title;
        cell.appendChild(tag);
      });

      dayTasks.forEach((task) => {
        const tag = document.createElement("span");
        tag.className = `event-tag task-tag${task.milestone ? " milestone-task" : ""}${task.done ? " done" : ""}`;
        tag.textContent = task.title;
        cell.appendChild(tag);
      });

      cell.addEventListener("click", () => openEventModal(dateStr));
      grid.appendChild(cell);
    }
  }

  function renderUpcoming() {
    const list = document.getElementById("upcomingEventsList");
    list.innerHTML = "";

    const todayStr = new Date().toISOString().slice(0, 10);
    const upcoming = events
      .filter((e) => e.date >= todayStr)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 10);

    if (upcoming.length === 0) {
      list.innerHTML = '<li class="empty-state">No upcoming events.</li>';
      return;
    }

    upcoming.forEach((ev) => {
      const li = document.createElement("li");
      li.className = `event-item${ev.milestone ? " milestone" : ""}`;
      li.innerHTML = `
        <div class="event-date">${formatDate(ev.date)}</div>
        <div class="event-title">
          <span>${ev.milestone ? "★ " : ""}${escapeHtml(ev.title)}</span>
          <button class="icon-btn delete-btn" aria-label="Delete event">&times;</button>
        </div>
      `;
      li.querySelector(".delete-btn").addEventListener("click", () => {
        events = events.filter((e) => e.id !== ev.id);
        saveData(STORAGE_KEY, events);
        renderCalendar();
        renderUpcoming();
      });
      list.appendChild(li);
    });
  }

  function refresh() {
    renderCalendar();
    renderUpcoming();
  }

  window.App.Calendar = { initCalendar, refresh };
})();
