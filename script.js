document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Matrix Canvas Setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const columns = Math.floor(canvas.width / 20);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -canvas.height;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(139, 0, 0, 0.8)';
        ctx.font = '15px Courier New';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillText(text, i * 20, drops[i]);
            if (drops[i] > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += Math.random() * 1 + 0.5;
        }
    }

    setInterval(draw, 35);

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const newColumns = Math.floor(canvas.width / 20);
        for (let i = 0; i < newColumns; i++) {
            if (i >= drops.length) {
                drops[i] = Math.random() * -canvas.height;
            }
        }
    });

    // Text Scramble Animation
    const heroNameElement = document.querySelector('.hero h1 span');
    const originalText = "Jonathan Geisler";
    const scrambleChars = "!<>-_\\/[]{}—=+*^?#________";

    function textScramble() {
        let iteration = 0;
        const maxLength = originalText.length;

        const interval = setInterval(() => {
            const scrambled = originalText
                .split("")
                .map((char, idx) => {
                    if (idx < iteration) return originalText[idx];
                    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                })
                .join("");

            heroNameElement.textContent = scrambled;

            iteration += 1 / 2;

            if (iteration >= maxLength) {
                clearInterval(interval);
                heroNameElement.textContent = originalText;
                setTimeout(textScramble, 3000); // Restart loop
            }
        }, 30);
    }

    if (heroNameElement) {
        heroNameElement.textContent = originalText;
        setTimeout(() => textScramble(), 1500);
    }

    // Theme color switching
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const color = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            themeButtons.forEach(btn => btn.style.border = 'none');
            this.style.border = '2px solid white';
            localStorage.setItem('preferredColor', color);
        });
    });

    // Font size controls
    let currentFontSize = 16;
    const fontSizeIncrease = document.getElementById('fontSizeIncrease');
    const fontSizeDecrease = document.getElementById('fontSizeDecrease');

    if (fontSizeIncrease && fontSizeDecrease) {
        fontSizeIncrease.addEventListener('click', () => {
            if (currentFontSize < 20) {
                currentFontSize++;
                document.body.style.fontSize = currentFontSize + 'px';
                localStorage.setItem('preferredFontSize', currentFontSize);
            }
        });

        fontSizeDecrease.addEventListener('click', () => {
            if (currentFontSize > 12) {
                currentFontSize--;
                document.body.style.fontSize = currentFontSize + 'px';
                localStorage.setItem('preferredFontSize', currentFontSize);
            }
        });
    }

    // Apply saved preferences
    const savedColor = localStorage.getItem('preferredColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-color') === savedColor) {
                btn.style.border = '2px solid white';
            }
        });
    }

    const savedFontSize = localStorage.getItem('preferredFontSize');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        document.body.style.fontSize = currentFontSize + 'px';
    }

    // Scroll reveal animations
    function revealOnScroll() {
        const elements = document.querySelectorAll('.project-card, .section-header, .contact-info');
        elements.forEach(el => {
            const rectTop = el.getBoundingClientRect().top;
            if (rectTop < window.innerHeight - 150) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
