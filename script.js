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

// Terminal Typewriter Login Animation
const lines = [
    "> Login: jonathan.geisler",
    "> Password: ********",
    "> Access granted..."
];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function typeLine(id, text, delayMs = 40) {
    const el = document.getElementById(id);
    for (let i = 0; i < text.length; i++) {
        el.textContent += text[i];
        await delay(delayMs);
    }
}

async function animateLoginPrompt() {
    await typeLine("line1", lines[0]);
    await delay(500);
    await typeLine("line2", lines[1]);
    await delay(500);
    await typeLine("line3", lines[2]);
}

animateLoginPrompt();


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
