
document.addEventListener("DOMContentLoaded", function () {
    const seletorStatus = document.querySelector(".status-control select");
    const botaoAtualizar = document.querySelector(".status-control button");
    const timeline = document.querySelector(".order-timeline");
    const etiquetaStatus = document.querySelector(
        ".order-details-header .order-status"
    );

    if (!seletorStatus || !botaoAtualizar || !timeline) {
        console.error("Elementos do status não encontrados.");
        return;
    }

    const etapas = Array.from(
        timeline.querySelectorAll(".timeline-item")
    );

    const iconesEtapas = [
        "fa-solid fa-check",
        "fa-solid fa-box",
        "fa-solid fa-truck",
        "fa-solid fa-house-circle-check"
    ];

    const statusEtapas = {
        "Em preparação": 1,
        "A caminho": 2,
        "Entregue": 3
    };

    function atualizarTimeline(status) {
        etapas.forEach(function (etapa, indice) {
            etapa.classList.remove(
                "completed",
                "current",
                "cancelled"
            );

            const icone = etapa.querySelector(".timeline-icon i");

            if (status === "Cancelado") {
                if (indice === 0) {
                    etapa.classList.add("completed");
                    if (icone) {
                        icone.className = "fa-solid fa-check";
                    }
                } else {
                    etapa.classList.add("cancelled");
                    if (icone) {
                        icone.className = "fa-solid fa-xmark";
                    }
                }

                return;
            }

            const etapaAtual = statusEtapas[status] ?? 1;

            if (indice < etapaAtual) {
                etapa.classList.add("completed");
            } else if (indice === etapaAtual) {
                etapa.classList.add("current");
            }

            if (icone) {
                icone.className =
                    indice < etapaAtual
                        ? "fa-solid fa-check"
                        : iconesEtapas[indice];
            }
        });

        if (etiquetaStatus) {
            etiquetaStatus.textContent = status;

            etiquetaStatus.classList.remove(
                "preparing",
                "route",
                "delivered",
                "cancelled"
            );

            const classesStatus = {
                "Em preparação": "preparing",
                "A caminho": "route",
                "Entregue": "delivered",
                "Cancelado": "cancelled"
            };

            etiquetaStatus.classList.add(classesStatus[status]);
        }
    }

    botaoAtualizar.addEventListener("click", function () {
        const novoStatus = seletorStatus.value;

        atualizarTimeline(novoStatus);

        botaoAtualizar.disabled = true;
        botaoAtualizar.innerHTML =
            '<i class="fa-solid fa-check"></i> Status atualizado!';

        setTimeout(function () {
            botaoAtualizar.innerHTML =
                '<i class="fa-solid fa-check"></i> Atualizar status';

            botaoAtualizar.disabled = false;
        }, 1800);
    });

    // Exibe inicialmente o status selecionado.
    atualizarTimeline(seletorStatus.value);
});
