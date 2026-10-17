
document.addEventListener("DOMContentLoaded", function () {
    const campoBusca = document.getElementById("buscar-produto");
    const filtroCategoria = document.getElementById("filtro-produtos");
    const listaProdutos = document.getElementById("lista-produtos");
    const mensagemVazia = document.getElementById("nenhum-produto");

    const modalDetalhes = document.getElementById("modal-produto");
    const modalForm = document.getElementById("modal-form-produto");

    const formProduto = document.getElementById("form-produto");
    const btnNovo = document.getElementById("btn-novo-produto");

    const campoNome = document.getElementById("form-nome-produto");
    const campoCategoria = document.getElementById("form-categoria-produto");
    const campoPreco = document.getElementById("form-preco-produto");
    const campoDescricao = document.getElementById("form-descricao-produto");

    let produtoEditando = null;

    function nomeCategoria(categoria) {
        const categorias = {
            gas: "Gás",
            agua: "Água",
            carvao: "Carvão"
        };

        return categorias[categoria] || categoria;
    }

    function formatarPreco(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // Pesquisa e filtros
    function filtrarProdutos() {
        const busca = campoBusca.value.trim().toLowerCase();
        const categoria = filtroCategoria.value;
        let encontrados = 0;

        document.querySelectorAll(".product-card").forEach(function (produto) {
            const nome = (produto.dataset.nome || "").toLowerCase();
            const categoriaProduto = produto.dataset.categoria;

            const mostrar =
                nome.includes(busca) &&
                (categoria === "todos" || categoriaProduto === categoria);

            produto.hidden = !mostrar;

            if (mostrar) encontrados++;
        });

        mensagemVazia.hidden = encontrados > 0;
        listaProdutos.hidden = encontrados === 0;
    }

    campoBusca.addEventListener("input", filtrarProdutos);
    filtroCategoria.addEventListener("change", filtrarProdutos);

    // Detalhes do produto
    function abrirDetalhes(botao) {
        document.getElementById("modal-produto-nome").textContent =
            botao.dataset.produto;

        document.getElementById("modal-produto-categoria").textContent =
            botao.dataset.categoria;

        document.getElementById("modal-produto-preco").textContent =
            botao.dataset.preco;

        document.getElementById("modal-produto-descricao").textContent =
            botao.dataset.descricao;

        modalDetalhes.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function fecharDetalhes() {
        modalDetalhes.hidden = true;
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".btn-product-details").forEach(function (botao) {
        botao.addEventListener("click", function () {
            abrirDetalhes(botao);
        });
    });

    document.getElementById("fechar-modal-produto")
        .addEventListener("click", fecharDetalhes);

    document.getElementById("fechar-modal-produto-secundario")
        .addEventListener("click", fecharDetalhes);

    modalDetalhes.addEventListener("click", function (evento) {
        if (evento.target === modalDetalhes) fecharDetalhes();
    });

    // Cadastro e edição
    function abrirFormulario(produto = null) {
        produtoEditando = produto;
        formProduto.reset();

        document.getElementById("titulo-form-produto").textContent =
            produto ? "Editar produto" : "Novo produto";

        if (produto) {
            campoNome.value = produto.dataset.nome;
            campoCategoria.value = produto.dataset.categoria;
            campoPreco.value = produto.dataset.preco;
            campoDescricao.value = produto.dataset.descricao;
        }

        modalForm.hidden = false;
        document.body.style.overflow = "hidden";
        campoNome.focus();
    }

    function fecharFormulario() {
        modalForm.hidden = true;
        document.body.style.overflow = "";
        produtoEditando = null;
    }

    btnNovo.addEventListener("click", function () {
        abrirFormulario();
    });

    document.getElementById("fechar-form-produto")
        .addEventListener("click", fecharFormulario);

    document.getElementById("cancelar-form-produto")
        .addEventListener("click", fecharFormulario);

    modalForm.addEventListener("click", function (evento) {
        if (evento.target === modalForm) fecharFormulario();
    });

    function atualizarProduto(produto, nome, categoria, preco, descricao) {
        produto.dataset.nome = nome;
        produto.dataset.categoria = categoria;
        produto.dataset.preco = Number(preco).toFixed(2);
        produto.dataset.descricao = descricao;

        produto.querySelector(".product-category").textContent =
            nomeCategoria(categoria);

        produto.querySelector("h3").textContent = nome;
        produto.querySelector(".product-card-body p").textContent = descricao;
        produto.querySelector(".product-card-footer strong").textContent =
            formatarPreco(preco);

        const botao = produto.querySelector(".btn-product-details");
        botao.dataset.produto = nome;
        botao.dataset.categoria = nomeCategoria(categoria);
        botao.dataset.preco = formatarPreco(preco);
        botao.dataset.descricao = descricao;

        const imagem = produto.querySelector(".product-image");
        imagem.classList.remove("gas-image", "water-image", "charcoal-image");
        imagem.classList.add(
            categoria === "gas" ? "gas-image" :
            categoria === "agua" ? "water-image" : "charcoal-image"
        );

        const icone = imagem.querySelector("i");
        icone.className =
            "fa-solid " +
            (categoria === "gas" ? "fa-fire-flame-curved" :
            categoria === "agua" ? "fa-droplet" : "fa-cubes-stacked");
    }

    function criarProduto(nome, categoria, preco, descricao) {
        const produto = document.createElement("article");
        produto.className = "product-card";

        const imagem = document.createElement("div");
        imagem.className =
            "product-image " +
            (categoria === "gas" ? "gas-image" :
            categoria === "agua" ? "water-image" : "charcoal-image");

        const icone = document.createElement("i");
        icone.className =
            "fa-solid " +
            (categoria === "gas" ? "fa-fire-flame-curved" :
            categoria === "agua" ? "fa-droplet" : "fa-cubes-stacked");

        const status = document.createElement("span");
        status.className = "product-status";
        status.textContent = "Disponível";
        imagem.append(icone, status);

        const corpo = document.createElement("div");
        corpo.className = "product-card-body";

        const categoriaElemento = document.createElement("span");
        categoriaElemento.className = "product-category";
        categoriaElemento.textContent = nomeCategoria(categoria);

        const titulo = document.createElement("h3");
        titulo.textContent = nome;

        const textoDescricao = document.createElement("p");
        textoDescricao.textContent = descricao;

        const rodape = document.createElement("div");
        rodape.className = "product-card-footer";

        const textoPreco = document.createElement("strong");
        textoPreco.textContent = formatarPreco(preco);

        const botaoDetalhes = document.createElement("button");
        botaoDetalhes.type = "button";
        botaoDetalhes.className = "btn-product-details";
        botaoDetalhes.setAttribute("aria-label", "Ver detalhes de " + nome);
        botaoDetalhes.innerHTML = '<i class="fa-solid fa-eye"></i>';
        botaoDetalhes.addEventListener("click", function () {
            abrirDetalhes(botaoDetalhes);
        });

        rodape.append(textoPreco, botaoDetalhes);
        corpo.append(categoriaElemento, titulo, textoDescricao, rodape);
        produto.append(imagem, corpo);

        atualizarProduto(produto, nome, categoria, preco, descricao);
        listaProdutos.appendChild(produto);
    }

    formProduto.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nome = campoNome.value.trim();
        const categoria = campoCategoria.value;
        const preco = Number(campoPreco.value);
        const descricao = campoDescricao.value.trim();

        if (!nome || !categoria || !descricao || !Number.isFinite(preco) || preco <= 0) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        if (produtoEditando) {
            atualizarProduto(produtoEditando, nome, categoria, preco, descricao);
        } else {
            criarProduto(nome, categoria, preco, descricao);
        }

        const total = document.getElementById("total-produtos");
        if (total) {
            total.textContent = document.querySelectorAll(".product-card").length;
        }

        filtrarProdutos();
        fecharFormulario();
    });

    // Tecla Escape
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            if (!modalForm.hidden) fecharFormulario();
            if (!modalDetalhes.hidden) fecharDetalhes();
        }
    });

    filtrarProdutos();
});