// ==================== RADAR CHART ====================
const chartCtx = document.getElementById("skillsRadar");
if (chartCtx) {
  new Chart(chartCtx, {
    type: 'radar',
    data: {
      labels: ['C++', 'HTML', 'CSS', 'JAVASCRIPT', 'Python', 'Bash'],
      datasets: [{
        label: 'Skill Level',
        data: [90, 75, 75, 65, 90, 65],
        backgroundColor: 'rgba(100, 255, 218, 0.2)',
        borderColor: 'rgba(100, 255, 218, 1)',
        pointBackgroundColor: '#64ffda',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: { color: '#334155' },
          grid: { color: '#334155' },
          pointLabels: { color: '#cbd5e1', font: { size: 12 } },
          ticks: { display: false },
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// ==================== TABS ====================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const targetTab = button.getAttribute("data-tab");

    tabContents.forEach(content => {
      content.classList.toggle("active", content.id === targetTab);
    });
  });
});

// ==================== TEXT SCRAMBLE EFFECT ====================
const scrambleTarget = document.querySelector(".scramble-target");
const originalText = "Cybersecurity Student";
const scrambleChars = "!<>-_\\/[]{}—=+*^?#________";

function textScrambleEffect(textEl, targetText, speed = 30, loopDelay = 3000) {
  let iteration = 0;
  let interval;

  function scramble() {
    clearInterval(interval);
    iteration = 0;

    interval = setInterval(() => {
      textEl.textContent = targetText
        .split("")
        .map((char, i) => {
          if (i < iteration) return targetText[i];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setTimeout(scramble, loopDelay);
      }

      iteration += 1 / 3;
    }, speed);
  }

  setTimeout(scramble, 1000);
}

if (scrambleTarget) {
  textScrambleEffect(scrambleTarget, originalText);
}

// ==================== TYPEWRITER ====================
const phrases = [
  "Cybersecurity Student",
  "Blue Team Defender",
  "CTF Competitor",
  "Ethical Hacker in Training"
];

const el = document.getElementById("typewriter");

if (el) {
  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;
  let delay = 100;

  function typeLoop() {
    const phrase = phrases[currentPhrase];

    el.textContent = phrase.substring(0, currentChar);
    currentChar += isDeleting ? -1 : 1;

    if (!isDeleting && currentChar === phrase.length) {
      isDeleting = true;
      delay = 1500;
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      delay = 300;
    } else {
      delay = isDeleting ? 50 : 100;
    }

    setTimeout(typeLoop, delay);
  }

  setTimeout(typeLoop, 500);
}

// ==================== CANVAS GRID BACKGROUND ====================
const canvas = document.getElementById("gridCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const spacing = 40;
  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        const dx = (mouseX - x) * 0.02;
        const dy = (mouseY - y) * 0.02;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();
      }
    }
  }

  function animate() {
    drawGrid();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

