// Matrix digital rain effect
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to use for matrix rain
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    
    // Array for drops
    const columns = Math.floor(canvas.width / 20);
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -canvas.height;
    }
    
    // Drawing function
    function draw() {
        // Black BG with opacity for fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dark red text
        ctx.fillStyle = 'rgba(139, 0, 0, 0.8)'; 
        ctx.font = '15px Courier New';
        
        // Loop through drops
        for (let i = 0; i < drops.length; i++) {
            // Random character to print
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            
            // x = i*font size, y = value of drops[i]
            ctx.fillText(text, i * 20, drops[i] * 1);
            
            // Reset drop position when it's too low + randomize speed
            if (drops[i] * 1 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop
            drops[i] += Math.random() * 1 + 0.5;
        }
    }
    
    // Animate the canvas
    const matrixInterval = setInterval(draw, 35);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reinitialize drops for new width
        const newColumns = Math.floor(canvas.width / 20);
        for (let i = 0; i < newColumns; i++) {
            if (i >= drops.length) {
                drops[i] = Math.random() * -canvas.height;
            }
        }
    });

    // Hacker-style text scramble effect
    const heroNameElement = document.querySelector('.hero h1 span');
    const originalText = "Josiah Leaman";
    heroNameElement.textContent = originalText;
    
    // Characters to use for scrambling
    const scrambleChars = "!<>-_\\/[]{}—=+*^?#________";
    
    // Text scramble effect
    function textScramble() {
        let iteration = 0;
        let interval = null;
        
        clearInterval(interval);
        
        interval = setInterval(() => {
            // Create scrambled text
            heroNameElement.textContent = heroNameElement.textContent
                .split("")
                .map((letter, index) => {
                    // If iteration is past this index, show the original letter
                    if (index < iteration) {
                        return originalText[index];
                    }
                    
                    // Otherwise show a random character
                    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                })
                .join("");
            
            // When we've iterated through all letters, stop
            if (iteration >= originalText.length) {
                clearInterval(interval);
                
                // After showing the full name for a moment, trigger again
                setTimeout(() => {
                    textScramble();
                }, 3000);
            }
            
            iteration += 1/3;
        }, 30);
    }
    
    // Start the effect
    setTimeout(textScramble, 1500);
    
    // Energy ball animation
    const energyBall = document.querySelector('#energyBall circle');
    
    // Security badge animation and interaction
    const securityBadge = document.querySelector('#securityBadge');
    const badgeElements = document.querySelectorAll('.badge-color');
    
    // Make security badge interactive
    document.getElementById('securityBadge').addEventListener('click', function() {
        // Pulse effect
        badgeElements.forEach(element => {
            const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            element.style.fill = currentColor;
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.fill = '';
            }, 300);
        });
    });
    
    // Theme customization
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            
            // Update active button style
            themeButtons.forEach(btn => btn.style.border = 'none');
            this.style.border = '2px solid white';
            
            // Save preference to localStorage
            localStorage.setItem('preferredColor', color);
        });
    });
    
    // Font size adjustments
    let currentFontSize = 16;
    document.getElementById('fontSizeIncrease').addEventListener('click', function() {
        if (currentFontSize < 20) {
            currentFontSize += 1;
            document.body.style.fontSize = currentFontSize + 'px';
            localStorage.setItem('preferredFontSize', currentFontSize);
        }
    });
    
    document.getElementById('fontSizeDecrease').addEventListener('click', function() {
        if (currentFontSize > 12) {
            currentFontSize -= 1;
            document.body.style.fontSize = currentFontSize + 'px';
            localStorage.setItem('preferredFontSize', currentFontSize);
        }
    });
    
    // Load saved preferences if any
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
    
    // Add scroll reveal animations
    window.addEventListener('scroll', revealOnScroll);
    
    function revealOnScroll() {
        const elements = document.querySelectorAll('.project-card, .section-header, .contact-info');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Trigger initial check for animations
    revealOnScroll();
});
