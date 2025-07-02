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


// ==================== Particles GRID ====================
  document.addEventListener('DOMContentLoaded', function() {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 140,
                        "density": {
                            "enable": true,
                            "value_area": 2000
                        }
                    },
                    "color": {
                        "value": "#00d4ff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.8,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.4,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#00d4ff",
                        "opacity": 0.6,
                        "width": 1.5
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "window",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 100,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        });

