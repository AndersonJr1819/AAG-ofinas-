document.addEventListener("DOMContentLoaded", () => {
  const defaultProfile = {
    name: "Usuário SmartCare",
    email: "usuario@email.com"
  };

  const defaultVehicle = {
    name: "Corolla",
    brand: "Toyota",
    year: "2022",
    mileage: "45.000 km"
  };

  const defaultPreferences = {
    recommendations: true,
    reminders: true,
    maintenance: true
  };

  function getStoredProfile() {
    const stored = localStorage.getItem("aag_user_profile");
    if (!stored) {
      localStorage.setItem("aag_user_profile", JSON.stringify(defaultProfile));
      return defaultProfile;
    }
    return JSON.parse(stored);
  }

  function saveStoredProfile(profile) {
    localStorage.setItem("aag_user_profile", JSON.stringify(profile));
  }

  function getStoredVehicle() {
    const stored = localStorage.getItem("aag_user_vehicle");
    if (!stored) {
      localStorage.setItem("aag_user_vehicle", JSON.stringify(defaultVehicle));
      return defaultVehicle;
    }
    return JSON.parse(stored);
  }

  function saveStoredVehicle(vehicle) {
    localStorage.setItem("aag_user_vehicle", JSON.stringify(vehicle));
  }

  function getStoredPreferences() {
    const stored = localStorage.getItem("aag_user_preferences");
    if (!stored) {
      localStorage.setItem("aag_user_preferences", JSON.stringify(defaultPreferences));
      return defaultPreferences;
    }
    return JSON.parse(stored);
  }

  function saveStoredPreferences(prefs) {
    localStorage.setItem("aag_user_preferences", JSON.stringify(prefs));
  }

  const profileNameDisplay = document.getElementById("profile-name-display");
  const profileEmailDisplay = document.getElementById("profile-email-display");
  
  const vehicleTitleDisplay = document.getElementById("vehicle-title-display");
  const vehicleMileageDisplay = document.getElementById("vehicle-mileage-display");

  const headerVehicleName = document.getElementById("header-vehicle-name");
  const headerVehicleBrand = document.getElementById("header-vehicle-brand");
  const headerVehicleYear = document.getElementById("header-vehicle-year");
  const headerVehicleMileage = document.getElementById("header-vehicle-mileage");

  const prefRecommendations = document.getElementById("pref-recommendations");
  const prefReminders = document.getElementById("pref-reminders");
  const prefMaintenance = document.getElementById("pref-maintenance");

  const editProfileBtn = document.getElementById("edit-profile-btn");
  const editVehicleBtn = document.getElementById("edit-vehicle-btn");
  const clearDataBtn = document.getElementById("clear-data-btn");
  const restoreSettingsBtn = document.getElementById("restore-settings-btn");

  const settingsModal = document.getElementById("settings-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const settingsForm = document.getElementById("settings-form");
  const formFieldsContainer = document.getElementById("form-fields-container");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");

  const confirmModal = document.getElementById("confirm-modal");
  const confirmTitle = document.getElementById("confirm-title");
  const confirmMessage = document.getElementById("confirm-message");
  const confirmCancelBtn = document.getElementById("confirm-cancel-btn");
  const confirmOkBtn = document.getElementById("confirm-ok-btn");

  let currentActionType = null;

  function updateUI() {
    const profile = getStoredProfile();
    const vehicle = getStoredVehicle();
    const prefs = getStoredPreferences();

    profileNameDisplay.textContent = profile.name;
    profileEmailDisplay.innerHTML = `<i class="fa-regular fa-envelope"></i> ${profile.email}`;

    vehicleTitleDisplay.textContent = `${vehicle.brand} ${vehicle.name} (${vehicle.year})`;
    vehicleMileageDisplay.innerHTML = `<i class="fa-solid fa-road"></i> ${vehicle.mileage}`;

    headerVehicleName.textContent = vehicle.name;
    headerVehicleBrand.textContent = vehicle.brand;
    headerVehicleYear.textContent = vehicle.year;
    headerVehicleMileage.textContent = vehicle.mileage;

    prefRecommendations.checked = prefs.recommendations;
    prefReminders.checked = prefs.reminders;
    prefMaintenance.checked = prefs.maintenance;
  }

  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      const profile = getStoredProfile();
      modalTitle.textContent = "Editar perfil";
      modalSubtitle.textContent = "Atualize suas informações pessoais.";
      formFieldsContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <label style="font-size: var(--font-size-xs); color: var(--color-text-muted); font-weight: var(--font-weight-semibold);">Nome</label>
          <input type="text" id="input-profile-name" class="form-control" value="${profile.name}" required>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <label style="font-size: var(--font-size-xs); color: var(--color-text-muted); font-weight: var(--font-weight-semibold);">E-mail</label>
          <input type="email" id="input-profile-email" class="form-control" value="${profile.email}" required>
        </div>
      `;
      currentActionType = "profile";
      settingsModal.classList.remove("hidden");
    });
  }

  if (editVehicleBtn) {
    editVehicleBtn.addEventListener("click", () => {
      const vehicle = getStoredVehicle();
      modalTitle.textContent = "Gerenciar veículo";
      modalSubtitle.textContent = "Atualize os dados do seu automóvel.";
      formFieldsContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <label style="font-size: var(--font-size-xs); color: var(--color-text-muted); font-weight: var(--font-weight-semibold);">Modelo</label>
          <input type="text" id="input-vehicle-name" class="form-control" value="${vehicle.name}" required>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <label style="font-size: var(--font-size-xs); color: var(--color-text-muted); font-weight: var(--font-weight-semibold);">Marca</label>
          <input type="text" id="input-vehicle-brand" class="form-control" value="${vehicle.brand}" required>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <label style="font-size: var(--font-size-xs); color: var(--color-text-muted); font-weight: var(--font-weight-semibold);">Ano</label>
          <input type="text" id="input-vehicle-year" class="form-control" value="${vehicle.year}" required>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <label style="font-size: var(--font-size-xs); color: var(--color-text-muted); font-weight: var(--font-weight-semibold);">Quilometragem</label>
          <input type="text" id="input-vehicle-mileage" class="form-control" value="${vehicle.mileage}" required>
        </div>
      `;
      currentActionType = "vehicle";
      settingsModal.classList.remove("hidden");
    });
  }

  if (cancelModalBtn) {
    cancelModalBtn.addEventListener("click", () => {
      settingsModal.classList.add("hidden");
    });
  }

  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (currentActionType === "profile") {
        const newName = document.getElementById("input-profile-name").value;
        const newEmail = document.getElementById("input-profile-email").value;
        saveStoredProfile({ name: newName, email: newEmail });
      } else if (currentActionType === "vehicle") {
        const newName = document.getElementById("input-vehicle-name").value;
        const newBrand = document.getElementById("input-vehicle-brand").value;
        const newYear = document.getElementById("input-vehicle-year").value;
        const newMileage = document.getElementById("input-vehicle-mileage").value;
        saveStoredVehicle({ name: newName, brand: newBrand, year: newYear, mileage: newMileage });
      }
      settingsModal.classList.add("hidden");
      updateUI();
    });
  }

  [prefRecommendations, prefReminders, prefMaintenance].forEach(pref => {
    if (pref) {
      pref.addEventListener("change", () => {
        const prefs = {
          recommendations: prefRecommendations.checked,
          reminders: prefReminders.checked,
          maintenance: prefMaintenance.checked
        };
        saveStoredPreferences(prefs);
      });
    }
  });

  if (clearDataBtn) {
    clearDataBtn.addEventListener("click", () => {
      confirmTitle.textContent = "Limpar dados locais";
      confirmMessage.textContent = "Tem certeza que deseja apagar todos os registros salvos no navegador? Esta ação não pode ser desfeita.";
      confirmOkBtn.style.backgroundColor = "#dc3545";
      confirmOkBtn.style.borderColor = "#dc3545";
      currentActionType = "clear_data";
      confirmModal.classList.remove("hidden");
    });
  }

  if (restoreSettingsBtn) {
    restoreSettingsBtn.addEventListener("click", () => {
      confirmTitle.textContent = "Restaurar configurações";
      confirmMessage.textContent = "Deseja retornar todas as preferências aos valores originais?";
      confirmOkBtn.style.backgroundColor = "var(--color-primary)";
      confirmOkBtn.style.borderColor = "var(--color-primary)";
      currentActionType = "restore_settings";
      confirmModal.classList.remove("hidden");
    });
  }

  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener("click", () => {
      confirmModal.classList.add("hidden");
    });
  }

  if (confirmOkBtn) {
    confirmOkBtn.addEventListener("click", () => {
      if (currentActionType === "clear_data") {
        localStorage.clear();
      } else if (currentActionType === "restore_settings") {
        localStorage.setItem("aag_user_profile", JSON.stringify(defaultProfile));
        localStorage.setItem("aag_user_vehicle", JSON.stringify(defaultVehicle));
        localStorage.setItem("aag_user_preferences", JSON.stringify(defaultPreferences));
      }
      confirmModal.classList.add("hidden");
      updateUI();
    });
  }

  updateUI();
});