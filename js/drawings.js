window.App = window.App || {};

(function () {
  const { uid, escapeHtml } = window.App.Utils;
  const { idbGetAll, idbPut, idbDelete } = window.App.Idb;
  const STORE_NAME = "drawings";

  // File blobs uploaded through the (currently disabled) file input are
  // persisted in IndexedDB; object URLs are created fresh each time a blob
  // is loaded since they don't survive a page reload. Static entries come
  // from window.App.DrawingsManifest, set by drawings/manifest.js (a plain
  // <script> tag, not fetch, so it loads even when index.html is opened by
  // double-click) which lists whatever files were placed in the drawings/
  // folder as of the last `npm run sync-documents` (see scripts/generate-manifest.js).
  let drawings = [];
  let activeId = null;

  const ZOOM_MIN = 0.25;
  const ZOOM_MAX = 3;
  const ZOOM_STEP = 0.1;
  let zoomLevel = 1;

  // Pan is a translate() composed with the zoom scale() rather than native
  // scrolling, since CSS transforms don't expand an ancestor's scrollable
  // area - overflow:hidden + transform is the standard way to get both
  // zoom and pan working together without fighting the layout box.
  let panX = 0;
  let panY = 0;
  let isPanning = false;
  let panStartX = 0;
  let panStartY = 0;

  function getStaticDrawings() {
    const filenames = window.App.DrawingsManifest || [];
    return filenames.map((name) => ({
      id: `static:${name}`,
      name,
      type: /\.pdf$/i.test(name) ? "application/pdf" : "",
      url: `drawings/${encodeURIComponent(name)}`,
      static: true,
    }));
  }

  async function initDrawings() {
    const input = document.getElementById("drawingUpload");
    const viewer = document.getElementById("drawingViewer");

    const stored = await idbGetAll(STORE_NAME);
    const uploaded = stored.map((d) => ({ ...d, url: URL.createObjectURL(d.blob) }));
    drawings = [...getStaticDrawings(), ...uploaded];
    if (drawings.length) activeId = drawings[0].id;

    input.addEventListener("change", async (e) => {
      const files = Array.from(e.target.files);
      for (const file of files) {
        const record = { id: uid(), name: file.name, type: file.type, blob: file };
        await idbPut(STORE_NAME, record);
        drawings.push({ ...record, url: URL.createObjectURL(file) });
      }
      input.value = "";
      if (!activeId && drawings.length) {
        activeId = drawings[0].id;
        resetView();
      }
      renderList();
      renderViewer();
    });

    document.getElementById("zoomInBtn").addEventListener("click", () => setZoom(zoomLevel + ZOOM_STEP));
    document.getElementById("zoomOutBtn").addEventListener("click", () => setZoom(zoomLevel - ZOOM_STEP));
    document.getElementById("recenterBtn").addEventListener("click", () => {
      panX = 0;
      panY = 0;
      applyTransform();
    });

    viewer.addEventListener(
      "wheel",
      (e) => {
        if (!drawings.some((d) => d.id === activeId)) return;
        e.preventDefault();
        setZoom(zoomLevel + (e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP));
      },
      { passive: false }
    );

    viewer.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      if (!drawings.some((d) => d.id === activeId)) return;
      isPanning = true;
      panStartX = e.clientX - panX;
      panStartY = e.clientY - panY;
      viewer.classList.add("panning");
      e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
      if (!isPanning) return;
      panX = e.clientX - panStartX;
      panY = e.clientY - panStartY;
      applyTransform();
    });

    window.addEventListener("mouseup", () => {
      if (!isPanning) return;
      isPanning = false;
      viewer.classList.remove("panning");
    });

    renderList();
    renderViewer();
  }

  function applyTransform() {
    const el = document.querySelector("#drawingViewer .drawing-image, #drawingViewer .drawing-frame");
    if (el) el.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
  }

  function setZoom(value) {
    zoomLevel = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value));
    applyTransform();
  }

  function resetView() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
  }

  function selectDrawing(id) {
    activeId = id;
    resetView();
    renderList();
    renderViewer();
  }

  function renderList() {
    const list = document.getElementById("drawingsList");
    list.innerHTML = "";

    if (drawings.length === 0) {
      list.innerHTML = '<li class="empty-state">No drawings added yet.</li>';
      return;
    }

    drawings.forEach((d) => {
      const li = document.createElement("li");
      li.className = `drawing-item${d.id === activeId ? " active" : ""}`;
      li.innerHTML = `
        <span class="drawing-name">${escapeHtml(d.name)}</span>
        ${d.static ? "" : '<button class="icon-btn delete-btn" aria-label="Remove drawing">&times;</button>'}
      `;

      li.addEventListener("click", (e) => {
        if (e.target.closest(".delete-btn")) return;
        selectDrawing(d.id);
      });

      const deleteBtn = li.querySelector(".delete-btn");
      if (deleteBtn) {
        deleteBtn.addEventListener("click", async () => {
          URL.revokeObjectURL(d.url);
          await idbDelete(STORE_NAME, d.id);
          drawings = drawings.filter((x) => x.id !== d.id);
          if (activeId === d.id) {
            activeId = drawings[0]?.id ?? null;
            resetView();
          }
          renderList();
          renderViewer();
        });
      }

      list.appendChild(li);
    });
  }

  function renderViewer() {
    const viewer = document.getElementById("drawingViewer");
    const drawing = drawings.find((d) => d.id === activeId);

    viewer.classList.toggle("has-drawing", !!drawing);

    if (!drawing) {
      viewer.innerHTML = '<p class="empty-state">Select a drawing to view</p>';
      return;
    }

    if (drawing.type === "application/pdf") {
      viewer.innerHTML = `<embed src="${drawing.url}" type="application/pdf" class="drawing-frame">`;
    } else {
      viewer.innerHTML = `<img src="${drawing.url}" alt="${escapeHtml(drawing.name)}" class="drawing-image" draggable="false">`;
    }

    applyTransform();
  }

  window.App.Drawings = { initDrawings };
})();
