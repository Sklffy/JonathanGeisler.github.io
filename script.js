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

// ==================== TYPEWRITER ====================
const phrases = [
  "Cybersecurity Student ",
  "Blue Team Defender ",
  "CTF Competitor ",
  "Ethical Hacker in Training "
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

