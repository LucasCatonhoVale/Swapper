document.addEventListener('DOMContentLoaded', () => {
  // Pega produto do localStorage
  const produto = JSON.parse(localStorage.getItem("selectedChatProduct"));
  if (!produto) {
    alert("Produto não selecionado para o chat!");
    window.location.href = "./index.html";
    return;
  }

  const categoria = produto.categoria.toLowerCase();
  const idProduto = produto.id_prod || produto.id || 1;

  const nomeProduto = document.getElementById("produto-nome");
  const nomeProp = document.getElementById("prop-nome");
  const fotoProp = document.getElementById("prop-foto");
  const chatBody = document.getElementById("chat-body");
  const input = document.getElementById("msgInput");
  const btn = document.getElementById("btnEnviar");

  if (!nomeProduto || !nomeProp || !fotoProp || !chatBody || !input || !btn) {
    console.error("Algum elemento do DOM do chat não foi encontrado!");
    return;
  }

  // Exibe nome do produto
  nomeProduto.innerText = produto.nome;

  // Proprietários fake
  const proprietarios = {
    1: { nome: "Carlos Alves", foto: "../img/homem2.jpg" },
    2: { nome: "Marcos Lima", foto: "../img/homem1.jpg" },
    3: { nome: "Fernanda Silva", foto: "../img/fernanda.jpg" },
    4: { nome: "Ana Paula", foto: "../img/ana.jpg" },
  };
  const prop = proprietarios[idProduto] || { nome: "Proprietário", foto: "img/default.png" };
  nomeProp.innerText = prop.nome;
  fotoProp.src = prop.foto;

  // Mensagens automáticas por categoria
  const mensagensPorCategoria = {
    livros: [
      "Olá! Esse livro está disponível.",
      "Ele está em ótimo estado, quase novo!",
      "Posso enviar algumas fotos das páginas.",
      "Aceito negociação no preço.",
      "Posso entregar pessoalmente ou enviar pelos Correios."
    ],
    tenis: [
      "Olá! O tênis ainda está disponível.",
      "Ele é super confortável e está quase novo.",
      "Posso enviar fotos detalhadas do calçado.",
      "Aceito negociar o preço se tiver interesse.",
      "Entrego em mãos ou via correio."
    ],
    eletronicos: [
      "Olá! Esse eletrônico está funcionando perfeitamente.",
      "Está em ótimo estado e testado recentemente.",
      "Posso enviar vídeos mostrando que funciona.",
      "Aceito negociação, mas preço justo.",
      "Entrega rápida garantida."
    ],
    roupas: [
      "Olá! A roupa ainda está disponível.",
      "Está em ótimo estado, pouco usada.",
      "Posso enviar mais fotos se quiser.",
      "Aceito negociar o preço.",
      "Entrego pessoalmente ou envio pelos Correios."
    ]
  };

  // Índice para controlar a sequência de respostas
  let indiceResposta = 0;
  const respostasCategoria = mensagensPorCategoria[categoria] || ["Obrigado pelo contato!"];

  // Função para adicionar mensagem no chat
  function addMensagem(texto, tipo) {
    const div = document.createElement("div");
    div.classList.add("msg", tipo === "user" ? "msg-user" : "msg-bot");
    div.innerText = texto;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Função de envio do usuário
  function enviarUsuario() {
    const txt = input.value.trim();
    if (!txt) return;
    addMensagem(txt, "user");
    input.value = "";

    // Resposta automática do bot seguindo a sequência
    setTimeout(() => {
      if (indiceResposta < respostasCategoria.length) {
        addMensagem(respostasCategoria[indiceResposta], "bot");
        indiceResposta++;
      } else {
        // Caso acabe as mensagens, envia uma padrão
        addMensagem("Obrigado pelo contato!", "bot");
      }
    }, 800 + Math.random() * 700);
  }

  // Eventos do botão e Enter
  btn.addEventListener("click", enviarUsuario);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") enviarUsuario();
  });
});
