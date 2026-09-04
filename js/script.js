document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const submitButton = form.querySelector('button[type="submit"]');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailValue = emailInput.value.trim();
        const senhaValue = senhaInput.value.trim();

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

        if (!senhaValue) {
            alert('Por favor, preencha o campo de senha.');
            senhaInput.focus();
            return;
        }

        submitButton.disabled = true;
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Entrando...';

        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            form.submit();
        }, 800);
    });
});