const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("#campo-busca");
let dados = [];

// Função para carregar os dados do JSON e renderizar todos os cards inicialmente.
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os dados.');
        }
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error('Falha na requisição:', error);
        cardContainer.innerHTML = '<p>Não foi possível carregar as linguagens. Tente novamente mais tarde.</p>';
    }
}

// Função de busca, acionada pelo botão ou ao digitar.
function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(items){
    cardContainer.innerHTML = ""; // Limpa os resultados anteriores

    if (items.length === 0) {
        cardContainer.innerHTML = "<p>Nenhuma linguagem encontrada.</p>";
        return;
    }

    for(const dado of items){
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <div class="card-imagem-container">
                <img src="${dado.imagem}" alt="Logo da linguagem ${dado.nome}" class="card-imagem">
            </div>
            <h2>${dado.nome}</h2>
            <p><strong>Ano:</strong> ${dado.ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" 
            target="_blank">Saiba mais</a>
            `;
        cardContainer.appendChild(article);
    }
}

// Adiciona um listener para buscar em tempo real enquanto o usuário digita
campoBusca.addEventListener('input', iniciarBusca);

// Carrega os dados assim que o script é executado
carregarDados();
