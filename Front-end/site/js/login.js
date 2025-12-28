const formulario = document.querySelector("form");
const iemail = document.querySelector(".email");
const isenha = document.querySelector(".senha");
const toggleSenha = document.querySelector("#toggleSenha"); // seu ícone de mostrar/ocultar senha

// Função de login
async function login() {
    try {
        let reqs = await fetch("http://localhost:8080/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email: iemail.value,
                senha: isenha.value
            }),
        });

        let ress = await reqs.json();

        if (ress.success) {
            // Salva o usuário logado no localStorage
            localStorage.setItem("usuarioLogado", JSON.stringify({ email: iemail.value, nome: ress.nome }));

            showAlert('Bem vindo');

            // Redireciona para a página principal
            window.location.href = "index.html"; 
        } else {
            showAlert('Usuário ou senha inválidos');
        }

    } catch (error) {
        console.error(error);
        showAlert('Erro ao conectar com o servidor');
    }
}

// Escuta o submit do formulário
if (formulario) {
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        login();
    });
}

// Lógica para mostrar/ocultar senha
if (toggleSenha) {
    toggleSenha.addEventListener("click", () => {
        if (isenha.type === "password") {
            isenha.type = "text";
            toggleSenha.src = "../img/ocultar.png";
        } else {
            isenha.type = "password";
            toggleSenha.src = "../img/ver.png";
        }
    });
}

// ---------------------------
// Atualiza menu na index.html
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector('a[href="./login.html"]');
    const cadastroLink = document.querySelector('a[href="./cadastrar.html"]');

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        // Troca "Entrar" por "Sair" e oculta cadastro
        if (loginLink) loginLink.textContent = "Sair";
        if (cadastroLink) cadastroLink.style.display = "none";

        // Ao clicar em sair
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            // Limpa login e carrinho
            localStorage.removeItem("usuarioLogado");
            localStorage.removeItem("carrinho");
            // Atualiza a página
            window.location.reload();
        });
    }
});
// Função de alerta customizado
// ---------------------------
function showAlert(mensagem) {
  const container = document.getElementById("customAlertContainer");
  if (!container) return;

  const alerta = document.createElement("div");
  alerta.classList.add("custom-alert");
  alerta.textContent = mensagem;
  container.appendChild(alerta);

  // Mostrar alerta com animação
  setTimeout(() => alerta.classList.add("show"), 100);

  // Remover alerta depois de 3 segundos
  setTimeout(() => {
    alerta.classList.remove("show");
    setTimeout(() => container.removeChild(alerta), 500);
  }, 3000);
}
