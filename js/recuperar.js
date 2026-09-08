document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const submitButton = form.querySelector('button[type="submit"]');
    const loginCard = document.querySelector('.login-card');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailValue = emailInput.value.trim();

        if (!emailValue) {
            alert('Por favor, preencha o campo de e-mail.');
            emailInput.focus();
            return;
        }

        if (!validateEmail(emailValue)) {
            alert('Por favor, insira um formato de e-mail válido.');
            emailInput.focus();
            return;
        }

        submitButton.disabled = true;
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';

        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            form.innerHTML = `
                <div class="recover-message">
                    E-mail enviado! Verifique sua caixa de entrada para continuar a recuperação da sua conta.
                </div>
                <div class="register-prompt" style="margin-top: 20px;">
                    <p><a href="index.html">Voltar para o login</a></p>
                </div>
            `;
        }, 800);
    });
});