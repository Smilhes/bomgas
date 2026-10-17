
document.addEventListener("DOMContentLoaded", function () {
    const campoBusca = document.getElementById("buscar-cliente");
    const filtroClientes = document.getElementById("filtro-clientes");
    const botaoLimpar = document.getElementById("limpar-clientes");
    const linhasClientes = document.querySelectorAll(".client-row");
    const textoResultados = document.getElementById("texto-resultados");
    const mensagemVazia = document.getElementById("nenhum-cliente");
    const contadorClientes = document.querySelector(".clients-count");

    // Elementos do modal
    const modal = document.getElementById("modal-cliente");
    const botaoFechar = document.getElementById("fechar-modal-cliente");
    const botaoFecharSecundario = document.getElementById("fechar-modal-secundario");

    // Dados demonstrativos para cada cliente
    const historicoClientes = {
        "João da Silva": [
            { numero: "001", produto: "Botijão de gás", data: "Pedido demonstrativo", status: "Entregue" },
            { numero: "002", produto: "Botijão de gás", data: "Pedido demonstrativo", status: "Entregue" },
            { numero: "003", produto: "Água mineral", data: "Pedido demonstrativo", status: "Entregue" }
        ],
        "Maria Oliveira": [
            { numero: "004", produto: "Botijão de gás", data: "Pedido demonstrativo", status: "Entregue" },
            { numero: "005", produto: "Água mineral", data: "Pedido demonstrativo", status: "Entregue" }
        ],
        "Carlos Santos": [
            { numero: "006", produto: "Botijão de gás", data: "Pedido demonstrativo", status: "Entregue" },
            { numero: "007", produto: "Carvão", data: "Pedido demonstrativo", status: "Entregue" },
            { numero: "008", produto: "Botijão de gás", data: "Pedido demonstrativo", status: "Entregue" }
        ],
        "Ana Costa": []
    };

    // Busca e filtros
    function filtrarClientes() {
        const busca = campoBusca.value.toLowerCase().trim();
        const filtro = filtroClientes.value;
        let encontrados = 0;

        linhasClientes.forEach(function (linha) {
            const nome = linha.dataset.nome.toLowerCase();
            const telefone = linha.dataset.telefone.toLowerCase();
            const quantidadePedidos = Number(linha.dataset.pedidos);

            const correspondeBusca =
                nome.includes(busca) || telefone.includes(busca);

            let correspondeFiltro = true;

            if (filtro === "com-pedidos") {
                correspondeFiltro = quantidadePedidos > 0;
            } else if (filtro === "sem-pedidos") {
                correspondeFiltro = quantidadePedidos === 0;
            }

            const mostrar = correspondeBusca && correspondeFiltro;
            linha.hidden = !mostrar;

            if (mostrar) encontrados++;
        });

        textoResultados.textContent =
            `Mostrando ${encontrados} ${encontrados === 1 ? "cliente" : "clientes"}`;

        contadorClientes.textContent =
            `${encontrados} ${encontrados === 1 ? "cliente encontrado" : "clientes encontrados"}`;

        mensagemVazia.hidden = encontrados !== 0;
    }

    campoBusca.addEventListener("input", filtrarClientes);
    filtroClientes.addEventListener("change", filtrarClientes);

    botaoLimpar.addEventListener("click", function () {
        campoBusca.value = "";
        filtroClientes.value = "todos";
        filtrarClientes();
        campoBusca.focus();
    });

    // Abrir modal com os dados do cliente selecionado
    function abrirDetalhes(linha) {
        const nome = linha.dataset.nome;
        const telefone = linha.dataset.telefone;
        const quantidadePedidos = Number(linha.dataset.pedidos);

        const endereco = linha.querySelector(".client-address > span").textContent;
        const bairro = linha.querySelector(".client-address small").textContent;
        const identificacao = linha.querySelector(".client-identity > div:last-child span").textContent;

        const iniciais = nome
            .split(" ")
            .filter(Boolean)
            .map(function (parte) {
                return parte[0];
            })
            .slice(0, 2)
            .join("")
            .toUpperCase();

        document.getElementById("modal-titulo-cliente").textContent = "Detalhes do cliente";
        document.getElementById("modal-nome-cliente").textContent = nome;
        document.getElementById("modal-id-cliente").textContent = identificacao;
        document.getElementById("modal-avatar-cliente").textContent = iniciais;
        document.getElementById("modal-telefone-cliente").textContent = telefone;
        document.getElementById("modal-endereco-cliente").textContent =
            `${endereco} — ${bairro}`;
        document.getElementById("modal-pedidos-cliente").textContent =
            `${quantidadePedidos} ${quantidadePedidos === 1 ? "pedido" : "pedidos"}`;

        const areaHistorico = document.getElementById("modal-historico-cliente");
        areaHistorico.replaceChildren();

        const pedidos = historicoClientes[nome] || [];

        if (pedidos.length === 0) {
            const vazio = document.createElement("div");
            vazio.className = "history-empty";
            vazio.textContent = "Este cliente ainda não possui pedidos.";
            areaHistorico.appendChild(vazio);
        } else {
            pedidos.forEach(function (pedido) {
                const item = document.createElement("div");
                item.className = "history-order";

                const informacoes = document.createElement("div");
                informacoes.className = "history-order-info";

                const titulo = document.createElement("strong");
                titulo.textContent = `Pedido #${pedido.numero} — ${pedido.produto}`;

                const data = document.createElement("span");
                data.textContent = pedido.data;

                const status = document.createElement("span");
                status.className = "history-order-status";
                status.textContent = pedido.status;

                informacoes.append(titulo, data);
                item.append(informacoes, status);
                areaHistorico.appendChild(item);
            });
        }

        modal.hidden = false;
        document.body.style.overflow = "hidden";
        botaoFechar.focus();
    }

    // Botões de detalhes
    document.querySelectorAll(".btn-cliente-detalhes").forEach(function (botao) {
        botao.addEventListener("click", function () {
            const linha = botao.closest(".client-row");
            abrirDetalhes(linha);
        });
    });

    // Fechar modal
    function fecharModal() {
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    botaoFechar.addEventListener("click", fecharModal);
    botaoFecharSecundario.addEventListener("click", fecharModal);

    // Fechar ao clicar fora da janela
    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            fecharModal();
        }
    });

    // Fechar com a tecla Esc
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && !modal.hidden) {
            fecharModal();
        }
    });

    filtrarClientes();
});
