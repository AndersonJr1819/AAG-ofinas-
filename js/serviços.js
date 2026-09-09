document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");
  const serviceModal = document.getElementById("service-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const confirmActionBtn = document.getElementById("confirm-action-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");

  let selectedServiceName = "";

  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      const serviceName = card.getAttribute("data-service");
      const serviceDesc = card.querySelector("p").textContent;
      
      selectedServiceName = serviceName;
      
      if (modalTitle) modalTitle.textContent = serviceName;
      if (modalDesc) modalDesc.textContent = serviceDesc;
      
      if (serviceModal) serviceModal.classList.remove("hidden");
    });
  });

  if (confirmActionBtn) {
    confirmActionBtn.addEventListener("click", () => {
      localStorage.setItem("aag_selected_service", selectedServiceName);
      alert(`Serviço "${selectedServiceName}" selecionado para agendamento!`);
      if (serviceModal) serviceModal.classList.add("hidden");
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      if (serviceModal) serviceModal.classList.add("hidden");
    });
  }
});