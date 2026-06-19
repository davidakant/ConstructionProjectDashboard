window.App = window.App || {};

(function () {
  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  function toDateStr(date) {
    return date.toISOString().slice(0, 10);
  }

  function buildMonthTicks(rangeStart, rangeEnd) {
    const ticks = [];
    const cursor = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
    while (cursor <= rangeEnd) {
      ticks.push(new Date(cursor));
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return ticks;
  }

  function getScheduleItems() {
    const tasks = window.App.Tasks?.getTasks() ?? [];
    const events = window.App.Calendar?.getEvents() ?? [];

    const taskItems = tasks.map((t) => {
      const start = t.startDate || t.dueDate;
      const end = t.dueDate < start ? start : t.dueDate;
      return {
        title: t.title,
        start,
        end,
        milestone: !!t.milestone,
        done: !!t.done,
        priority: t.priority,
      };
    });

    const milestoneEventItems = events
      .filter((e) => e.milestone)
      .map((e) => ({ title: e.title, start: e.date, end: e.date, milestone: true, done: false }));

    return taskItems.concat(milestoneEventItems);
  }

  function render() {
    const container = document.getElementById("ganttChart");
    if (!container) return;
    container.innerHTML = "";

    const items = getScheduleItems();

    if (items.length === 0) {
      container.innerHTML = '<p class="empty-state">No tasks or milestones to show on the timeline yet.</p>';
      return;
    }

    const todayStr = toDateStr(new Date());
    const allDates = items.flatMap((it) => [it.start, it.end]).concat([todayStr]);
    const minDate = new Date(allDates.reduce((a, b) => (a < b ? a : b)) + "T00:00:00");
    const maxDate = new Date(allDates.reduce((a, b) => (a > b ? a : b)) + "T00:00:00");

    const rangeStart = addDays(minDate, -2);
    const rangeEnd = addDays(maxDate, 2);
    const rangeStartStr = toDateStr(rangeStart);
    const rangeEndStr = toDateStr(rangeEnd);
    const totalMs = rangeEnd.getTime() - rangeStart.getTime();

    function ratio(dateStr) {
      const t = new Date(dateStr + "T00:00:00").getTime();
      return (t - rangeStart.getTime()) / totalMs;
    }

    const monthTicks = buildMonthTicks(rangeStart, rangeEnd);

    function buildGridlines() {
      const frag = document.createDocumentFragment();
      monthTicks.forEach((tickDate) => {
        const gridline = document.createElement("div");
        gridline.className = "gantt-gridline";
        gridline.style.left = `${ratio(toDateStr(tickDate)) * 100}%`;
        frag.appendChild(gridline);
      });
      if (todayStr >= rangeStartStr && todayStr <= rangeEndStr) {
        const todayLine = document.createElement("div");
        todayLine.className = "gantt-today-line";
        todayLine.style.left = `${ratio(todayStr) * 100}%`;
        frag.appendChild(todayLine);
      }
      return frag;
    }

    // Header row with month labels
    const header = document.createElement("div");
    header.className = "gantt-header";
    const headerSpacer = document.createElement("div");
    headerSpacer.className = "gantt-row-label";
    header.appendChild(headerSpacer);

    const headerTrack = document.createElement("div");
    headerTrack.className = "gantt-track gantt-header-track";
    monthTicks.forEach((tickDate) => {
      const tick = document.createElement("div");
      tick.className = "gantt-month-tick";
      tick.style.left = `${ratio(toDateStr(tickDate)) * 100}%`;
      tick.textContent = tickDate.toLocaleDateString(undefined, { month: "short", year: "numeric" });
      headerTrack.appendChild(tick);
    });
    header.appendChild(headerTrack);
    container.appendChild(header);

    // One row per task/milestone, earliest first
    items
      .slice()
      .sort((a, b) => a.start.localeCompare(b.start))
      .forEach((item) => {
        const row = document.createElement("div");
        row.className = `gantt-row${item.done ? " done" : ""}`;

        const label = document.createElement("div");
        label.className = "gantt-row-label";
        label.textContent = item.title;
        label.title = item.title;
        row.appendChild(label);

        const track = document.createElement("div");
        track.className = "gantt-track";
        track.appendChild(buildGridlines());

        if (item.milestone && item.start === item.end) {
          const diamond = document.createElement("div");
          diamond.className = "gantt-milestone";
          diamond.style.left = `${ratio(item.start) * 100}%`;
          diamond.title = item.title;
          track.appendChild(diamond);
        } else {
          const bar = document.createElement("div");
          bar.className = `gantt-bar priority-${item.priority || "medium"}${item.milestone ? " milestone-task" : ""}${item.done ? " done" : ""}`;
          const startRatio = ratio(item.start);
          const endRatio = ratio(item.end);
          bar.style.left = `${startRatio * 100}%`;
          bar.style.width = `${Math.max((endRatio - startRatio) * 100, 0.5)}%`;
          bar.title = item.title;
          track.appendChild(bar);
        }

        row.appendChild(track);
        container.appendChild(row);
      });
  }

  function initViewToggle() {
    const toggleBtns = document.querySelectorAll("#scheduleViewToggle .view-toggle-btn");
    const views = document.querySelectorAll(".schedule-view");

    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleBtns.forEach((b) => b.classList.toggle("active", b === btn));
        views.forEach((v) => v.classList.toggle("active", v.dataset.view === btn.dataset.view));
      });
    });
  }

  function initGantt() {
    initViewToggle();
    render();
  }

  window.App.Gantt = { initGantt, render };
})();
