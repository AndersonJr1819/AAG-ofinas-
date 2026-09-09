document.addEventListener("DOMContentLoaded", () => {
  const defaultRecommendations = [
    {
      id: "1",
      name: "Verifique regularmente os níveis dos fluidos",
      category: "Manutenção",
      description: "Acompanhe óleo, fluido de freio e água do limpador para garantir o bom funcionamento.",
      status: "Acompanhado"
    },
    {
      id: "2",
      name: "Mantenha as revisões organizadas",
      category: "Manutenção",
      description: "Programar as revisões periódicas ajuda a preservar a vida útil do veículo.",
      status: "Acompanhado"
    },
    {
      id: "3",
      name: "Acompanhe a quilometragem",
      category: "Manutenção",
      description: "Monitore a quilometragem atual para prever trocas de peças e manutenções preventivas.",
      status: "Acompanhado"
    },
    {
      id: "4",
      name: "Verifique a pressão regularmente",
      category: "Pneus",
      description: "Calibrar os pneus periodicamente melhora o consumo de combustível e a segurança.",
      status: "Acompanhado"
    },
    {
      id: "5",
      name: "Observe as condições dos pneus",
      category: "Pneus",
      description: "Fique atento ao desgaste da banda de rodagem e possíveis danos na estrutura.",
      status: "Acompanhado"
    },
    {
      id: "6",
      name: "Mantenha as informações de troca organizadas",
      category: "Pneus",
      description: "Registre quando os pneus foram trocados para planejar substituições futuras.",
      status: "Acompanhado"
    },
    {
      id: "7",
      name: "Mantenha o interior limpo",
      category: "Limpeza",
      description: "Aspirar e organizar a cabine proporciona um ambiente mais agradável no dia a dia.",
      status: "Acompanhado"
    },
    {
      id: "8",
      name: "Faça a limpeza externa regularmente",
      category: "Limpeza",
      description: "Lavagens frequentes protegem a pintura contra poeira, detritos e agentes externos.",
      status: "Acompanhado"
    },
    {
      id: "9",
      name: "Cuide das superfícies internas",
      category: "Limpeza",
      description: "Utilize produtos adequados para painéis e bancos, evitando ressecamento e rachaduras.",
      status: "Acompanhado"
    },
    {
      id: "10",
      name: "Registre os serviços realizados",
      category: "Cuidados gerais",
      description: "Anote cada procedimento no histórico para manter o controle completo do veículo.",
      status: "Acompanhado"
    },
    {
      id: "11",
      name: "Mantenha o histórico atualizado",
      category: "Cuidados gerais",
      description: "Um histórico organizado facilita a revenda e o planejamento de manutenções.",
      status: "Acompanhado"
    },
    {
      id: "12",
      name: "Acompanhe os próximos cuidados",
      category: "Cuidados gerais",
      description: "Utilize lembretes para não perder prazos de revisões e checagens importantes.",
      status: "Acompanhado"
    }
  ];

  function getStoredRecommendations() {
    const stored = localStorage.getItem("aag_vehicle_recommendations");
    if (!stored) {
      localStorage.setItem("aag_vehicle_recommendations", JSON.stringify(defaultRecommendations));
      return defaultRecommendations;
    }
    return JSON.parse(stored);
  }

  function saveStoredRecommendations(recs) {
    localStorage.setItem("aag_vehicle_recommendations", JSON.stringify(recs));
  }

  const recommendationsContainer = document.getElementById("recommendations-container");
  const filterCategory = document.getElementById("filter-category");

  function renderRecommendations() {
    let recs = getStoredRecommendations();
    const selectedCategory = filterCategory.value;

    if (selectedCategory !== "todos") {
      recs = recs.filter(r => r.category === selectedCategory);
    }

    recommendationsContainer.innerHTML = "";

    if (recs.length === 0) {
      recommendationsContainer.innerHTML = `
        <div class="timeline-card" style="justify-content: center; padding: var(--space-32);">
          <p style="color: var(--color-text-muted); font-size: var(--font-size-sm);">Nenhuma recomendação encontrada nesta categoria.</p>
        </div>
      `;
      return;
    }

    recs.forEach((rec) => {
      const card = document.createElement("div");
      card.className = "timeline-card";

      let statusClass = "status-acompanhado";
      if (rec.status === "Concluído") {
        statusClass = "status-concluido";
      }

      card.innerHTML = `
        <div class="timeline-info">
          <div class="timeline-icon">
            <i class="fa-solid fa-lightbulb"></i>
          </div>
          <div class="timeline-details">
            <h4>${rec.name}</h4>
            <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: 2px;">${rec.description}</p>
            <div class="timeline-meta" style="margin-top: 8px;">
              <span><i class="fa-solid fa-tag"></i> ${rec.category}</span>
              <span class="status-badge ${statusClass}">${rec.status}</span>
            </div>
          </div>
        </div>
        <div class="timeline-actions">
          <button type="button" class="action-icon-btn done-btn" title="Alternar status de acompanhamento" data-id="${rec.id}">
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      `;

      recommendationsContainer.appendChild(card);
    });

    attachCardEvents();
  }

  function attachCardEvents() {
    document.querySelectorAll(".done-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        let recs = getStoredRecommendations();
        const rec = recs.find(r => r.id === id);
        if (rec) {
          rec.status = rec.status === "Acompanhado" ? "Concluído" : "Acompanhado";
          saveStoredRecommendations(recs);
          renderRecommendations();
        }
      });
    });
  }

  if (filterCategory) {
    filterCategory.addEventListener("change", renderRecommendations);
  }

  renderRecommendations();
});