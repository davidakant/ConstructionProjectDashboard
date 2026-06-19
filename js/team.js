window.App = window.App || {};

(function () {
  const { loadData, saveData, uid, escapeHtml } = window.App.Utils;
  const STORAGE_KEY = "contacts";

  let contacts = [];
  let editingId = null;
  let currentFilter = "all";

  function initTeam() {
    contacts = loadData(STORAGE_KEY, window.App.SeedContacts || []);

    const addBtn = document.getElementById("addContactBtn");
    const overlay = document.getElementById("contactModalOverlay");
    const form = document.getElementById("contactForm");
    const cancelBtn = document.getElementById("cancelContactBtn");
    const filterBtns = document.querySelectorAll("#contactFilters .filter-btn");

    addBtn.addEventListener("click", () => openContactModal());
    cancelBtn.addEventListener("click", () => closeModal(overlay, form));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay, form);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName").value.trim();
      const role = document.getElementById("contactRole").value.trim();
      const company = document.getElementById("contactCompany").value.trim();
      const category = document.getElementById("contactCategory").value;
      const phone = document.getElementById("contactPhone").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const notes = document.getElementById("contactNotes").value.trim();
      if (!name) return;

      if (editingId) {
        const existing = contacts.find((c) => c.id === editingId);
        Object.assign(existing, { name, role, company, category, phone, email, notes });
      } else {
        contacts.push({ id: uid(), name, role, company, category, phone, email, notes });
      }

      saveData(STORAGE_KEY, contacts);
      closeModal(overlay, form);
      renderTeam();
    });

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
        currentFilter = btn.dataset.filter;
        renderTeam();
      });
    });

    renderTeam();
  }

  function openContactModal(contact) {
    editingId = contact ? contact.id : null;
    document.getElementById("contactModalTitle").textContent = contact ? "Edit Contact" : "Add Contact";
    document.getElementById("contactSubmitBtn").textContent = contact ? "Save Changes" : "Save Contact";
    document.getElementById("contactName").value = contact ? contact.name : "";
    document.getElementById("contactRole").value = contact ? contact.role : "";
    document.getElementById("contactCompany").value = contact ? contact.company : "";
    document.getElementById("contactCategory").value = contact ? contact.category : "Owner/District";
    document.getElementById("contactPhone").value = contact ? contact.phone : "";
    document.getElementById("contactEmail").value = contact ? contact.email : "";
    document.getElementById("contactNotes").value = contact ? contact.notes : "";
    document.getElementById("contactModalOverlay").classList.add("open");
  }

  function closeModal(overlay, form) {
    overlay.classList.remove("open");
    form.reset();
    editingId = null;
  }

  function renderTeam() {
    const list = document.getElementById("contactList");
    list.innerHTML = "";

    const filtered = contacts.filter((c) => currentFilter === "all" || c.category === currentFilter);

    if (filtered.length === 0) {
      list.innerHTML = '<li class="empty-state">No contacts to show.</li>';
      return;
    }

    filtered
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((contact) => {
        const li = document.createElement("li");
        li.className = "contact-item";
        li.innerHTML = `
          <div class="contact-item-info">
            <span class="budget-category-badge">${escapeHtml(contact.category)}</span>
            <span class="contact-name">${escapeHtml(contact.name)}</span>
            ${contact.role || contact.company ? `<span class="contact-role">${escapeHtml([contact.role, contact.company].filter(Boolean).join(" – "))}</span>` : ""}
            ${contact.notes ? `<span class="contact-notes">${escapeHtml(contact.notes)}</span>` : ""}
          </div>
          <div class="contact-reach">
            ${contact.phone ? `<a href="tel:${escapeHtml(contact.phone)}" class="contact-link">${escapeHtml(contact.phone)}</a>` : ""}
            ${contact.email ? `<a href="mailto:${escapeHtml(contact.email)}" class="contact-link">${escapeHtml(contact.email)}</a>` : ""}
          </div>
          <button class="icon-btn edit-btn" aria-label="Edit contact">&#9998;</button>
          <button class="icon-btn delete-btn" aria-label="Delete contact">&times;</button>
        `;

        li.querySelector(".edit-btn").addEventListener("click", () => openContactModal(contact));

        li.querySelector(".delete-btn").addEventListener("click", () => {
          contacts = contacts.filter((c) => c.id !== contact.id);
          saveData(STORAGE_KEY, contacts);
          renderTeam();
        });

        list.appendChild(li);
      });
  }

  function getContacts() {
    return contacts;
  }

  window.App.Team = { initTeam, getContacts };
})();
