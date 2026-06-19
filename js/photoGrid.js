window.App = window.App || {};

// Factory for a photo grid section (Visualizations, Photos, ...). Each
// instance combines static files (listed in window.App[manifestGlobal],
// set by <folder>/manifest.js via scripts/generate-manifest.js) with any
// blobs uploaded through the file input and persisted in IndexedDB.
(function () {
  const { uid, escapeHtml } = window.App.Utils;
  const { idbGetAll, idbPut, idbDelete } = window.App.Idb;

  function createPhotoGrid({ storeName, inputId, gridId, manifestGlobal, folder, emptyText }) {
    let items = [];

    function getStaticItems() {
      const filenames = window.App[manifestGlobal] || [];
      return filenames.map((name) => ({
        id: `static:${name}`,
        name,
        url: `${folder}/${encodeURIComponent(name)}`,
        static: true,
      }));
    }

    async function init() {
      const input = document.getElementById(inputId);

      const stored = await idbGetAll(storeName);
      const uploaded = stored.map((item) => ({ ...item, url: URL.createObjectURL(item.blob) }));
      items = [...getStaticItems(), ...uploaded];

      input.addEventListener("change", async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
          const record = { id: uid(), name: file.name, blob: file };
          await idbPut(storeName, record);
          items.push({ ...record, url: URL.createObjectURL(file) });
        }
        input.value = "";
        renderGrid();
      });

      renderGrid();
    }

    function renderGrid() {
      const grid = document.getElementById(gridId);
      grid.innerHTML = "";

      if (items.length === 0) {
        grid.innerHTML = `<p class="empty-state">${escapeHtml(emptyText)}</p>`;
        return;
      }

      items.forEach((item) => {
        const fig = document.createElement("figure");
        fig.className = "gallery-item";
        fig.innerHTML = `
          <img src="${item.url}" alt="${escapeHtml(item.name)}">
          ${item.static ? "" : '<button class="icon-btn delete-btn" aria-label="Remove photo">&times;</button>'}
        `;

        fig.querySelector("img").addEventListener("click", () => window.App.Lightbox.open(item));

        const deleteBtn = fig.querySelector(".delete-btn");
        if (deleteBtn) {
          deleteBtn.addEventListener("click", async () => {
            URL.revokeObjectURL(item.url);
            await idbDelete(storeName, item.id);
            items = items.filter((x) => x.id !== item.id);
            renderGrid();
          });
        }

        grid.appendChild(fig);
      });
    }

    return { init };
  }

  window.App.createPhotoGrid = createPhotoGrid;
})();
