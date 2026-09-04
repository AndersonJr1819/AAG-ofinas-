document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.cadastro-form');
    if (!form) return;

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');
    const termosCheckbox = document.getElementById('termos');

    const reqLength = document.querySelector('[data-requirement="length"]');
    const reqCase = document.querySelector('[data-requirement="case"]');
    const reqNumber = document.querySelector('[data-requirement="number"]');
    const reqSpecial = document.querySelector('[data-requirement="special"]');

    const passwordToggleButtons = senhaInput.parentElement.querySelectorAll('button');
    const confirmToggleButtons = confirmarSenhaInput.parentElement.querySelectorAll('button');

    function setupTogglePassword(input, buttons) {
        if (!buttons || buttons.length === 0) return;
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
            });
        });
    }

    setupTogglePassword(senhaInput, passwordToggleButtons);
    setupTogglePassword(confirmarSenhaInput, confirmToggleButtons);

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    }

    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        e.target.value = value;
    });

    function updatePasswordRequirements(password) {
        const hasLength = password.length >= 8;
        const hasCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (reqLength) {
            if (hasLength) reqLength.classList.add('valid');
            else reqLength.classList.remove('valid');
        }
        if (reqCase) {
            if (hasCase) reqCase.classList.add('valid');
            else reqCase.classList.remove('valid');
        }
        if (reqNumber) {
            if (hasNumber) reqNumber.classList.add('valid');
            else reqNumber.classList.remove('valid');
        }
        if (reqSpecial) {
            if (hasSpecial) reqSpecial.classList.add('valid');
            else reqSpecial.classList.remove('valid');
        }

        return hasLength && hasCase && hasNumber && hasSpecial;
    }

    senhaInput.addEventListener('input', () => {
        updatePasswordRequirements(senhaInput.value);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;
        const termos = termosCheckbox.checked;

        if (!nome || nome.split(' ').length < 2) {
            alert('Por favor, digite seu nome completo (nome e sobrenome).');
            nomeInput.focus();
            return;
        }

        if (!email || !validateEmail(email)) {
            alert('Por favor, digite um e-mail válido.');
            emailInput.focus();
            return;
        }

        if (!telefone || !validatePhone(telefone)) {
            alert('Por favor, digite um telefone válido.');
            telefoneInput.focus();
            return;
        }

        if (!updatePasswordRequirements(senha)) {
            alert('A senha não atende a todos os requisitos mínimos de segurança.');
            senhaInput.focus();
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            confirmarSenhaInput.focus();
            return;
        }

        if (!termos) {
            alert('Você precisa aceitar os termos de uso e a política de privacidade.');
            termosCheckbox.focus();
            return;
        }

        alert('Cadastro realizado com sucesso!');
        form.reset();
        if (reqLength) reqLength.classList.remove('valid');
        if (reqCase) reqCase.classList.remove('valid');
        if (reqNumber) reqNumber.classList.remove('valid');
        if (reqSpecial) reqSpecial.classList.remove('valid');
    });
});