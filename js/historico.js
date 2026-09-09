document.addEventListener("DOMContentLoaded", () => {
  const defaultServices = [
    {
      id: "1",
      name: "Troca de óleo",
      category: "Manutenção",
      date: "2026-01-15",
      mileage: "40000",
      observation: "Substituição do óleo sintético e filtro.",
      status: "Realizado"
    },
    {
      id: "2",
      name: "Revisão",
      category: "Manutenção",
      date: "2026-02-10",
      mileage: "42000",
      observation: "Revisão periódica de 40.000 km concluída.",
      status: "Realizado"
    },
    {
      id: "3",
      name: "Manutenção dos freios",
      category: "Freios",
      date: "2026-03-01",
      mileage: "44000",
      observation: "Troca de pastilhas de freio dianteiras.",
      status: "Realizado"
    },
    {
      id: "4",
      name: "Limpeza",
      category: "Limpeza",
      date: "2026-03-05",
      mileage: "44500",
      observation: "Higienização interna e limpeza do ar-condicionado.",
      status: "Realizado"
    },
    {
      id: "5",
      name: "Diagnóstico",
      category: "Diagnóstico",
      date: "2026-03-08",
      mileage: "44800",
      observation: "Scaneamento completo do sistema eletrônico.",
      status: "Realizado"
    }
  ];

  function getStoredServices() {
    const stored = localStorage.getItem("aag_vehicle_history");
    if (!stored) {
      localStorage.setItem("aag_vehicle_history", JSON.stringify(defaultServices));
      return defaultServices;
    }
    return JSON.parse(stored);
  }

  function saveStoredServices(services) {
    localStorage.setItem("aag_vehicle_history", JSON.stringify(services));
  }

  const timelineContainer = document.getElementById("timeline-container");
  const filterCategory = document.getElementById("filter-category");
  const sortOrder = document.getElementById("sort-order");
  const addServiceBtn = document.getElementById("add-service-btn");
  
  const serviceModal = document.getElementById("service-modal");
  const serviceForm = document.getElementById("service-form");
  const modalMainTitle = document.getElementById("modal-main-title");
  const cancelServiceBtn = document.getElementById("cancel-service-btn");
  
  const serviceIndexInput = document.getElementById("service-index");
  const inputName = document.getElementById("input-name");
  const inputCategory = document.getElementById("input-category");
  const inputDate = document.getElementById("input-date");
  const inputMileage = document.getElementById("input-mileage");
  const inputObservation = document.getElementById("input-observation");

  const detailModal = document.getElementById("detail-modal");
  const closeDetailBtn = document.getElementById("close-detail-btn");
  const detailName = document.getElementById("detail-name");
  const detailCategory = document.getElementById("detail-category");
  const detailDate = document.getElementById("detail-date");
  const detailMileage = document.getElementById("detail-mileage");
  const detailStatus = document.getElementById("detail-status");
  const detailObservation = document.getElementById("detail-observation");

  function renderTimeline() {
    let services = getStoredServices();
    const selectedCategory = filterCategory.value;
    const sortVal = sortOrder.value;

    if (selectedCategory !== "todos") {
      services = services.filter(s => s.category === selectedCategory);
    }

    services.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortVal === "recente") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    timelineContainer.innerHTML = "";

    if (services.length === 0) {
      timelineContainer.innerHTML = `
        <div class="timeline-card" style="justify-content: center; padding: var(--space-32);">
          <p style="color: var(--color-text-muted); font-size: var(--font-size-sm);">Nenhum serviço encontrado nesta categoria.</p>
        </div>
      `;
      return;
    }

    services.forEach((service) => {
      const card = document.createElement("div");
      card.className = "timeline-card";

      const formattedDate = service.date.split("-").reverse().join("/");

      card.innerHTML = `
        <div class="timeline-info">
          <div class="timeline-icon">
            <i class="fa-solid fa-wrench"></i>
          </div>
          <div class="timeline-details">
            <h4>${service.name}</h4>
            <div class="timeline-meta">
              <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
              <span><i class="fa-solid fa-road"></i> ${Number(service.mileage).toLocaleString("pt-BR")} km</span>
              <span><i class="fa-solid fa-tag"></i> ${service.category}</span>
            </div>
          </div>
        </div>
        <div class="timeline-actions">
          <button type="button" class="action-icon-btn view-btn" title="Visualizar detalhes" data-id="${service.id}">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button type="button" class="action-icon-btn edit-btn" title="Editar serviço" data-id="${service.id}">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button type="button" class="action-icon-btn delete-btn" title="Remover serviço" data-id="${service.id}">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;

      timelineContainer.appendChild(card);
    });

    attachCardEvents();
  }

  function attachCardEvents() {
    document.querySelectorAll(".view-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        const services = getStoredServices();
        const service = services.find(s => s.id === id);
        if (service) {
          detailName.textContent = service.name;
          detailCategory.textContent = service.category;
          detailDate.textContent = service.date.split("-").reverse().join("/");
          detailMileage.textContent = `${Number(service.mileage).toLocaleString("pt-BR")} km`;
          detailStatus.textContent = service.status;
          detailObservation.textContent = service.observation || "Nenhuma observação informada.";
          detailModal.classList.remove("hidden");
        }
      });
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        const services = getStoredServices();
        const service = services.find(s => s.id === id);
        if (service) {
          serviceIndexInput.value = service.id;
          inputName.value = service.name;
          inputCategory.value = service.category;
          inputDate.value = service.date;
          inputMileage.value = service.mileage;
          inputObservation.value = service.observation;

          modalMainTitle.textContent = "Editar serviço";
          serviceModal.classList.remove("hidden");
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        let services = getStoredServices();
        services = services.filter(s => s.id !== id);
        saveStoredServices(services);
        renderTimeline();
      });
    });
  }

  if (addServiceBtn) {
    addServiceBtn.addEventListener("click", () => {
      serviceIndexInput.value = "";
      serviceForm.reset();
      modalMainTitle.textContent = "Adicionar serviço";
      serviceModal.classList.remove("hidden");
    });
  }

  if (cancelServiceBtn) {
    cancelServiceBtn.addEventListener("click", () => {
      serviceModal.classList.add("hidden");
    });
  }

  if (closeDetailBtn) {
    closeDetailBtn.addEventListener("click", () => {
      detailModal.classList.add("hidden");
    });
  }

  if (serviceForm) {
    serviceForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = serviceIndexInput.value;
      const services = getStoredServices();

      const newService = {
        id: id ? id : Date.now().toString(),
        name: inputName.value,
        category: inputCategory.value,
        date: inputDate.value,
        mileage: inputMileage.value,
        observation: inputObservation.value,
        status: "Realizado"
      };

      if (id) {
        const index = services.findIndex(s => s.id === id);
        if (index !== -1) {
          services[index] = newService;
        }
      } else {
        services.push(newService);
      }

      saveStoredServices(services);
      serviceModal.classList.add("hidden");
      renderTimeline();
    });
  }

  if (filterCategory) {
    filterCategory.addEventListener("change", renderTimeline);
  }

  if (sortOrder) {
    sortOrder.addEventListener("change", renderTimeline);
  }

  renderTimeline();
});