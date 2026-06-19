(function () {
  function setCurrentDate() {
    const el = document.getElementById("currentDate");
    el.textContent = new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const { Device, Nav, Tasks, Calendar, Drawings, Lightbox, ExportSeed, createPhotoGrid } = window.App;

    Device.initDeviceDetection();
    setCurrentDate();
    Nav.initNav();
    Tasks.initTasks();
    Calendar.initCalendar();
    Lightbox.initLightbox();
    ExportSeed.initExportSeed();

    const visualizations = createPhotoGrid({
      storeName: "visualizations",
      inputId: "galleryUpload",
      gridId: "galleryGrid",
      manifestGlobal: "VisualizationsManifest",
      folder: "visualizations",
      emptyText: "No visualizations added yet.",
    });

    const photos = createPhotoGrid({
      storeName: "photos",
      inputId: "photoUpload",
      gridId: "photoGrid",
      manifestGlobal: "PhotosManifest",
      folder: "photos",
      emptyText: "No photos added yet.",
    });

    await Promise.all([Drawings.initDrawings(), visualizations.init(), photos.init()]);
  });
})();
