document.addEventListener("DOMContentLoaded", () => {
  const defaultVehicle = {
    brand: "Toyota",
    model: "Corolla",
    plate: "ABC-1234",
    year: "2022",
    color: "Preto",
    mileage: "45000"
  };

  let savedVehicle = JSON.parse(localStorage.getItem("aag_vehicle")) || defaultVehicle;

  const elBrand = document.getElementById("vehicle-brand");
  const elModel = document.getElementById("vehicle-model");
  const elYear = document.getElementById("vehicle-year");
  const elPlate = document.getElementById("vehicle-plate");
  const elColor = document.getElementById("vehicle-color");
  const elMileage = document.getElementById("vehicle-mileage");
  const elTitle = document.getElementById("vehicle-display-title");
  const cardMileageVal = document.getElementById("card-mileage-val");

  const editBtn = document.getElementById("edit-vehicle-btn");
  const addServiceBtn = document.getElementById("add-service-btn");
  const editModal = document.getElementById("edit-modal");
  const serviceModal = document.getElementById("service-modal");
  const editForm = document.getElementById("edit-vehicle-form");
  const serviceForm = document.getElementById("service-form");
  const cancelEditBtn = document.getElementById("cancel-edit");
  const cancelServiceBtn = document.getElementById("cancel-service");

  const inputBrand = document.getElementById("input-brand");
  const inputModel = document.getElementById("input-model");
  const inputPlate = document.getElementById("input-plate");
  const inputYear = document.getElementById("input-year");
  const inputColor = document.getElementById("input-color");
  const inputMileage = document.getElementById("input-mileage");

  function renderVehicleData() {
    if (elBrand) elBrand.textContent = savedVehicle.brand;
    if (elModel) elModel.textContent = savedVehicle.model;
    if (elYear) elYear.textContent = savedVehicle.year;
    if (elPlate) elPlate.textContent = savedVehicle.plate;
    if (elColor) elColor.textContent = savedVehicle.color;
    
    const mileageNum = parseInt(savedVehicle.mileage, 10);
    const formattedMileage = isNaN(mileageNum) ? savedVehicle.mileage : mileageNum.toLocaleString("pt-BR") + " km";
    
    if (elMileage) elMileage.textContent = formattedMileage;
    if (cardMileageVal) cardMileageVal.textContent = formattedMileage;
    if (elTitle) elTitle.textContent = `${savedVehicle.brand} ${savedVehicle.model}`;
  }

  renderVehicleData();

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      inputBrand.value = savedVehicle.brand;
      inputModel.value = savedVehicle.model;
      inputPlate.value = savedVehicle.plate;
      inputYear.value = savedVehicle.year;
      inputColor.value = savedVehicle.color;
      inputMileage.value = savedVehicle.mileage;
      editModal.classList.remove("hidden");
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", () => {
      editModal.classList.add("hidden");
    });
  }

  if (editForm) {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      savedVehicle.brand = inputBrand.value.trim();
      savedVehicle.model = inputModel.value.trim();
      savedVehicle.plate = inputPlate.value.trim();
      savedVehicle.year = inputYear.value.trim();
      savedVehicle.color = inputColor.value.trim();
      savedVehicle.mileage = inputMileage.value.trim();

      localStorage.setItem("aag_vehicle", JSON.stringify(savedVehicle));
      renderVehicleData();
      editModal.classList.add("hidden");
    });
  }

  if (addServiceBtn) {
    addServiceBtn.addEventListener("click", () => {
      serviceModal.classList.remove("hidden");
    });
  }

  if (cancelServiceBtn) {
    cancelServiceBtn.addEventListener("click", () => {
      serviceModal.classList.add("hidden");
    });
  }

  if (serviceForm) {
    serviceForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const serviceName = document.getElementById("service-name").value;
      const serviceDate = document.getElementById("service-date").value;
      
      const servicesList = JSON.parse(localStorage.getItem("aag_services")) || [];
      servicesList.push({ name: serviceName, date: serviceDate });
      localStorage.setItem("aag_services", JSON.stringify(servicesList));

      serviceForm.reset();
      serviceModal.classList.add("hidden");
    });
  }
});