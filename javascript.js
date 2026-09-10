document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DE ACESSIBILIDADE (FONTE E ALTO CONTRASTE) ---
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    const btnToggleContrast = document.getElementById('btn-toggle-contrast');
    
    let currentFontSize = 16;

    btnIncreaseFont.addEventListener('click', () => {
        let novaFonte = currentFontSize + 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            currentFontSize = novaFonte;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    btnDecreaseFont.addEventListener('click', () => {
        let novaFonte = currentFontSize - 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            currentFontSize = novaFonte;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    btnToggleContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // --- 2. GERADOR DE SENHAS CRIPTOGRÁFICAS ---
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
        generatePassword();
    });

    function generatePassword() {
        let availableChars = '';
        if (chkUppercase.checked) availableChars += charSets.uppercase;
        if (chkLowercase.checked) availableChars += charSets.lowercase;
        if (chkNumbers.checked) availableChars += charSets.numbers;
        if (chkSymbols.checked) availableChars += charSets.symbols;

        if (availableChars === '') {
            passwordDisplay.value = '';
            copyMessage.textContent = 'Selecione ao menos um tipo de caractere!';
            return;
        }

        copyMessage.textContent = '';
        let password = '';
        const length = parseInt(lengthSlider.value, 10);
        
        // Uso da Web Crypto API para geração verdadeiramente aleatória
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            password += availableChars[randomValues[i] % availableChars.length];
        }

        passwordDisplay.value = password;
    }

    // Ouvintes nos botões e caixas de seleção para regeneração automática
    btnGenerate.addEventListener('click', generatePassword);
    chkUppercase.addEventListener('change', generatePassword);
    chkLowercase.addEventListener('change', generatePassword);
    chkNumbers.addEventListener('change', generatePassword);
    chkSymbols.addEventListener('change', generatePassword);

    btnCopy.addEventListener('click', () => {
        if (!passwordDisplay.value) return;
        navigator.clipboard.writeText(passwordDisplay.value).then(() => {
            copyMessage.textContent = 'Senha copiada com sucesso!';
            setTimeout(() => { copyMessage.textContent = ''; }, 3000);
        }).catch(() => {
            copyMessage.textContent = 'Erro ao copiar a senha.';
        });
    });

    // Gerar a senha inicial imediatamente
    generatePassword();

    // --- 3. DEPOIMENTOS (ARRAY DE OBJETOS) ---
    const testimonials = [
        {
            quote: "A CyberVault garantiu a padronização e complexidade de senhas em todo o nosso time de devops sem depender de apis externas.",
            author: "Marcos Vinícius Prado",
            role: "Head de Cibersegurança na Datashield"
        },
        {
            quote: "Geração instantânea e zero rastreamento server-side. É a ferramenta indispensável do nosso dia a dia corporativo.",
            author: "Renata Vasconcelos",
            role: "Engenheira de Confiabilidade (SRE)"
        },
        {
            quote: "Garantia técnica de entropia aliada a uma interface acessível e extremamente intuitiva.",
            author: "Gabriel Sampaio",
            role: "Analista de Segurança da Informação"
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

    // --- 4. FAQ ACORDEÃO (ARRAY DE OBJETOS) ---
    const faqData = [
        {
            question: "Como o gerador de senhas garante aleatoriedade real?",
            answer: "Utilizamos a interface `window.crypto.getRandomValues()`, que acessa a entropia do sistema operacional do seu dispositivo para gerar valores criptograficamente seguros."
        },
        {
            question: "Minha senha gerada passa por algum servidor?",
            answer: "Não. A senha é computada 100% via JavaScript no seu próprio navegador. Nenhum dado é enviado, armazenado ou registrado em logs externos."
        },
        {
            question: "Por que devo utilizar senhas com mais de 16 caracteres?",
            answer: "Senhas longas combinando letras, números e símbolos expandem exponencialmente o espaço de chaves, tornando ataques de força bruta computacionalmente inviáveis."
        }
    ];

    const accordionContainer = document.getElementById('accordion-container');

    function renderFAQ() {
        accordionContainer.innerHTML = faqData.map((item, index) => `
            <div class="accordion-item" id="faq-item-${index}">
                <button class="accordion-header" type="button" onclick="toggleAccordion(${index})">
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