  // Hacker-style text scramble effect
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

  // Start initial effect after slight delay
  setTimeout(scramble, 1000);
}

textScrambleEffect(scrambleTarget, originalText);

const phrases = [
    "Cybersecurity Student",
    "Blue Team Defender",
    "CTF Competitor",
    "Ethical Hacker in Training"
  ];

  const el = document.getElementById("typewriter");

  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;
  let delay = 100;

  function typeLoop() {
    const phrase = phrases[currentPhrase];

    if (isDeleting) {
      currentChar--;
    } else {
      currentChar++;
    }

    el.textContent = phrase.substring(0, currentChar);

    if (!isDeleting && currentChar === phrase.length) {
      isDeleting = true;
      delay = 1500; // Pause before deleting
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      delay = 300; // Delay before typing new
    } else {
      delay = isDeleting ? 50 : 100;
    }

    setTimeout(typeLoop, delay);
  }

  setTimeout(typeLoop, 500); // Initial delay

const canvas = document.getElementById("gridCanvas");

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