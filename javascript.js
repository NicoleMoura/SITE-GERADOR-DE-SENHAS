document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DE ACESSIBILIDADE ---
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    const btnToggleContrast = document.getElementById('btn-toggle-contrast');
    
    let currentFontSize = 16;

    btnIncreaseFont.addEventListener('click', () => {
        if (currentFontSize < 24) {
            currentFontSize += 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    btnDecreaseFont.addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    btnToggleContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // --- 2. GERADOR DE SENHAS ---
    const passwordDisplay = document.getElementById('password-display');
    const btnCopy = document.getElementById('btn-copy');
    const copyMessage = document.getElementById('copy-message');
    const lengthSlider = document.getElementById('length-slider');
    const lengthValue = document.getElementById('length-value');
    const btnGenerate = document.getElementById('btn-generate');

    const chkUppercase = document.getElementById('chk-uppercase');
    const chkLowercase = document.getElementById('chk-lowercase');
    const chkNumbers = document.getElementById('chk-numbers');
    const chkSymbols = document.getElementById('chk-symbols');

    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    lengthSlider.addEventListener('input', (e) => {
        lengthValue.textContent = e.target.value;
    });

    function generatePassword() {
        let availableChars = '';
        if (chkUppercase.checked) availableChars += charSets.uppercase;
        if (chkLowercase.checked) availableChars += charSets.lowercase;
        if (chkNumbers.checked) availableChars += charSets.numbers;
        if (chkSymbols.checked) availableChars += charSets.symbols;

        if (availableChars === '') {
            passwordDisplay.value = '';
            copyMessage.textContent = 'Selecione ao menos uma opção!';
            return;
        }

        copyMessage.textContent = '';
        let password = '';
        const length = parseInt(lengthSlider.value, 10);
        
        // Uso de Crypto API para aleatoriedade segura
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            password += availableChars[array[i] % availableChars.length];
        }

        passwordDisplay.value = password;
    }

    btnGenerate.addEventListener('click', generatePassword);

    btnCopy.addEventListener('click', () => {
        if (!passwordDisplay.value) return;
        navigator.clipboard.writeText(passwordDisplay.value).then(() => {
            copyMessage.textContent = 'Senha copiada com sucesso!';
            setTimeout(() => { copyMessage.textContent = ''; }, 3000);
        });
    });

    // Gerar uma senha inicial
    generatePassword();

    // --- 3. CARROSSEL DE DEPOIMENTOS (ARRAY DE OBJETOS) ---
    const testimonials = [
        {
            quote: "A CyberVault redefiniu os padrões de segurança na nossa infraestrutura. O gerador local garante zero vazamento de dados.",
            author: "Carlos Eduardo Mendes",
            role: "CTO na FinTech Secure"
        },
        {
            quote: "A facilidade de uso combinada com algoritmos robustos nos deu a tranquilidade que precisávamos para proteger credenciais administrativas.",
            author: "Mariana R. Siqueira",
            role: "Especialista em Cibersegurança"
        },
        {
            quote: "Interface limpa, acessibilidade impecável e execução rápida. A melhor ferramenta de geração e auditoria da categoria.",
            author: "Roberto Rocha",
            role: "Diretor de Operações de TI"
        }
    ];

    let currentTestimonial = 0;
    const carouselContainer = document.getElementById('carousel-container');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    function renderTestimonial(index) {
        const item = testimonials[index];
        carouselContainer.innerHTML = `
            <div class="testimonial-card">
                <p>"${item.quote}"</p>
                <h4>${item.author}</h4>
                <span>${item.role}</span>
            </div>
        `;
    }

    btnPrev.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(currentTestimonial);
    });

    btnNext.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonial(currentTestimonial);
    });

    renderTestimonial(currentTestimonial);

    // --- 4. ACORDEÃO FAQ (ARRAY DE OBJETOS) ---
    const faqData = [
        {
            question: "Como o gerador de senhas garante que minha senha é segura?",
            answer: "Utilizamos a API de Criptografia Web nativa do navegador (`window.crypto`), gerando números verdadeiramente aleatórios sem depender de conexão externa."
        },
        {
            question: "As senhas geradas ficam salvas em algum servidor?",
            answer: "Não. Todo o processo ocorre exclusivamente na memória do seu próprio dispositivo e navegador. Nenhum dado transita por redes externas."
        },
        {
            question: "O que é uma senha de alta entropia?",
            answer: "É uma senha construída com alto grau de imprevisibilidade e variedade de caracteres, dificultando matematicamente ataques cibernéticos."
        }
    ];

    const accordionContainer = document.getElementById('accordion-container');

    function renderFAQ() {
        accordionContainer.innerHTML = faqData.map((item, index) => `
            <div class="accordion-item" id="faq-item-${index}">
                <button class="accordion-header" onclick="toggleAccordion(${index})">
                    <span>${item.question}</span>
                    <span>+</span>
                </button>
                <div class="accordion-body">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');
    }

    window.toggleAccordion = function(index) {
        const items = document.querySelectorAll('.accordion-item');
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.toggle('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    renderFAQ();
});