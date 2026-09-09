document.addEventListener("DOMContentLoaded", () => {
  const defaultReminders = [
    {
      id: "1",
      name: "Troca de óleo",
      category: "Manutenção",
      date: "2026-04-15",
      mileage: "50000",
      status: "Próximo",
      observation: "Verificar óleo sintético e filtro."
    },
    {
      id: "2",
      name: "Revisão geral",
      category: "Manutenção",
      date: "2026-05-10",
      mileage: "52000",
      status: "Programado",
      observation: "Revisão periódica na concessionária."
    },
    {
      id: "3",
      name: "Verificação dos pneus",
      category: "Pneus",
      date: "2026-03-20",
      mileage: "46000",
      status: "Concluído",
      observation: "Calibragem e checagem de desgaste."
    },
    {
      id: "4",
      name: "Manutenção dos freios",
      category: "Freios",
      date: "2026-06-01",
      mileage: "55000",
      status: "Programado",
      observation: "Checar pastilhas e discos de freio."
    }
  ];

  function getStoredReminders() {
    const stored = localStorage.getItem("aag_vehicle_reminders");
    if (!stored) {
      localStorage.setItem("aag_vehicle_reminders", JSON.stringify(defaultReminders));
      return defaultReminders;
    }
    return JSON.parse(stored);
  }

  function saveStoredReminders(reminders) {
    localStorage.setItem("aag_vehicle_reminders", JSON.stringify(reminders));
  }

  const remindersContainer = document.getElementById("reminders-container");
  const filterStatus = document.getElementById("filter-status");
  const filterCategory = document.getElementById("filter-category");
  const addReminderBtn = document.getElementById("add-reminder-btn");
  
  const reminderModal = document.getElementById("reminder-modal");
  const reminderForm = document.getElementById("reminder-form");
  const modalMainTitle = document.getElementById("modal-main-title");
  const cancelReminderBtn = document.getElementById("cancel-reminder-btn");
  
  const reminderIndexInput = document.getElementById("reminder-index");
  const inputName = document.getElementById("input-name");
  const inputCategory = document.getElementById("input-category");
  const inputDate = document.getElementById("input-date");
  const inputMileage = document.getElementById("input-mileage");
  const inputStatus = document.getElementById("input-status");
  const inputObservation = document.getElementById("input-observation");

  const detailModal = document.getElementById("detail-modal");
  const closeDetailBtn = document.getElementById("close-detail-btn");
  const detailName = document.getElementById("detail-name");
  const detailCategory = document.getElementById("detail-category");
  const detailDate = document.getElementById("detail-date");
  const detailMileage = document.getElementById("detail-mileage");
  const detailStatus = document.getElementById("detail-status");
  const detailObservation = document.getElementById("detail-observation");

  function renderReminders() {
    let reminders = getStoredReminders();
    const selectedStatus = filterStatus.value;
    const selectedCategory = filterCategory.value;

    if (selectedStatus !== "todos") {
      reminders = reminders.filter(r => r.status === selectedStatus);
    }

    if (selectedCategory !== "todos") {
      reminders = reminders.filter(r => r.category === selectedCategory);
    }

    remindersContainer.innerHTML = "";

    if (reminders.length === 0) {
      remindersContainer.innerHTML = `
        <div class="timeline-card" style="justify-content: center; padding: var(--space-32);">
          <p style="color: var(--color-text-muted); font-size: var(--font-size-sm);">Nenhum lembrete encontrado com os filtros selecionados.</p>
        </div>
      `;
      return;
    }

    reminders.forEach((reminder) => {
      const card = document.createElement("div");
      card.className = "timeline-card";

      const formattedDate = reminder.date ? reminder.date.split("-").reverse().join("/") : "";
      
      let statusClass = "status-programado";
      if (reminder.status === "Próximo") {
        statusClass = "status-proximo";
      } else if (reminder.status === "Concluído") {
        statusClass = "status-concluido";
      }

      card.innerHTML = `
        <div class="timeline-info">
          <div class="timeline-icon">
            <i class="fa-solid fa-bell"></i>
          </div>
          <div class="timeline-details">
            <h4>${reminder.name}</h4>
            <div class="timeline-meta">
              <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
              <span><i class="fa-solid fa-road"></i> ${Number(reminder.mileage).toLocaleString("pt-BR")} km</span>
              <span><i class="fa-solid fa-tag"></i> ${reminder.category}</span>
              <span class="status-badge ${statusClass}">${reminder.status}</span>
            </div>
          </div>
        </div>
        <div class="timeline-actions">
          <button type="button" class="action-icon-btn done-btn" title="Marcar como concluído" data-id="${reminder.id}">
            <i class="fa-solid fa-check"></i>
          </button>
          <button type="button" class="action-icon-btn view-btn" title="Visualizar detalhes" data-id="${reminder.id}">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button type="button" class="action-icon-btn edit-btn" title="Editar lembrete" data-id="${reminder.id}">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button type="button" class="action-icon-btn delete-btn" title="Remover lembrete" data-id="${reminder.id}">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;

      remindersContainer.appendChild(card);
    });

    attachCardEvents();
  }

  function attachCardEvents() {
    document.querySelectorAll(".done-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        let reminders = getStoredReminders();
        const reminder = reminders.find(r => r.id === id);
        if (reminder) {
          reminder.status = "Concluído";
          saveStoredReminders(reminders);
          renderReminders();
        }
      });
    });

    document.querySelectorAll(".view-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        const reminders = getStoredReminders();
        const reminder = reminders.find(r => r.id === id);
        if (reminder) {
          detailName.textContent = reminder.name;
          detailCategory.textContent = reminder.category;
          detailDate.textContent = reminder.date ? reminder.date.split("-").reverse().join("/") : "-";
          detailMileage.textContent = `${Number(reminder.mileage).toLocaleString("pt-BR")} km`;
          detailStatus.textContent = reminder.status;
          detailObservation.textContent = reminder.observation || "Nenhuma observação informada.";
          detailModal.classList.remove("hidden");
        }
      });
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        const reminders = getStoredReminders();
        const reminder = reminders.find(r => r.id === id);
        if (reminder) {
          reminderIndexInput.value = reminder.id;
          inputName.value = reminder.name;
          inputCategory.value = reminder.category;
          inputDate.value = reminder.date;
          inputMileage.value = reminder.mileage;
          inputStatus.value = reminder.status;
          inputObservation.value = reminder.observation;

          modalMainTitle.textContent = "Editar lembrete";
          reminderModal.classList.remove("hidden");
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        let reminders = getStoredReminders();
        reminders = reminders.filter(r => r.id !== id);
        saveStoredReminders(reminders);
        renderReminders();
      });
    });
  }

  if (addReminderBtn) {
    addReminderBtn.addEventListener("click", () => {
      reminderIndexInput.value = "";
      reminderForm.reset();
      modalMainTitle.textContent = "Adicionar lembrete";
      reminderModal.classList.remove("hidden");
    });
  }

  if (cancelReminderBtn) {
    cancelReminderBtn.addEventListener("click", () => {
      reminderModal.classList.add("hidden");
    });
  }

  if (closeDetailBtn) {
    closeDetailBtn.addEventListener("click", () => {
      detailModal.classList.add("hidden");
    });
  }

  if (reminderForm) {
    reminderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = reminderIndexInput.value;
      const reminders = getStoredReminders();

      const newReminder = {
        id: id ? id : Date.now().toString(),
        name: inputName.value,
        category: inputCategory.value,
        date: inputDate.value,
        mileage: inputMileage.value,
        status: inputStatus.value,
        observation: inputObservation.value
      };

      if (id) {
        const index = reminders.findIndex(r => r.id === id);
        if (index !== -1) {
          reminders[index] = newReminder;
        }
      } else {
        reminders.push(newReminder);
      }

      saveStoredReminders(reminders);
      reminderModal.classList.add("hidden");
      renderReminders();
    });
  }

  if (filterStatus) {
    filterStatus.addEventListener("change", renderReminders);
  }

  if (filterCategory) {
    filterCategory.addEventListener("change", renderReminders);
  }

  renderReminders();
});