document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector('a[href="./login.html"]');
    const cadastroLink = document.querySelector('a[href="./cadastrar.html"]');

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        // Usuário logado: mostra "Sair" e esconde "Cadastrar"
        if (loginLink) loginLink.textContent = "Sair";
        if (cadastroLink) cadastroLink.style.display = "none";

        // Clicar em sair
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            // Remove dados do usuário e carrinho
            localStorage.removeItem("usuarioLogado");
            localStorage.removeItem("carrinho");
            // Atualiza página
            window.location.reload();
        });
    }
});
