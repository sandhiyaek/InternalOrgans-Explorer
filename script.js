document.addEventListener('DOMContentLoaded', () => {
  // Organ Data (update model paths with your actual GLB files)
  const organs = {
    heart: {
      name: 'Heart',
      model: 'models/heart.glb',
      description: 'A powerful muscular organ that pumps blood, delivering oxygen and nutrients throughout the body.'
    },
    brain: {
      name: 'Brain',
      model: 'models/brain.glb',
      description: 'The control center of the body, managing thoughts, memories, and motor functions.'
    },
    lung: {
      name: 'Lung',
      model: 'models/lungs.glb',
      description: 'Vital for respiration, the lungs facilitate the exchange of oxygen and carbon dioxide.'
    },
    liver: {
      name: 'Liver',
      model: 'models/liver.glb',
      description: 'Detoxifies chemicals, metabolizes drugs, and produces bile essential for digestion.'
    },
    kidney: {
      name: 'Kidney',
      model: 'models/kidney.glb',
      description: 'Filters blood to remove waste and helps regulate fluid balance for homeostasis.'
    },
    stomach: {
      name: 'Stomach',
      model: 'models/stomach.glb',
      description: 'Breaks down food using acids and enzymes, initiating the digestive process.'
    },
    spleen: {
      name: 'Spleen',
      model: 'models/spleen.glb',
      description: 'Helps filter blood and plays a role in the body’s immune response.'
    },
    pancreas: {
      name: 'Pancreas',
      model: 'models/pancreas.glb',
      description: 'Produces digestive enzymes and hormones such as insulin for regulating blood sugar.'
    }
  };

  // --- 3D Explorer Section: Model Switching with Creative Animation ---
  const organSelectorItems = document.querySelectorAll('.organ-selector ul li');
  const modelViewer = document.getElementById('organ-viewer');
  const organNameElem = document.getElementById('organ-name');
  const organDescriptionElem = document.getElementById('organ-description');
  const organAnnotationOverlay = document.getElementById('organ-annotation');

  organSelectorItems.forEach(item => {
    item.addEventListener('click', function() {
      const organKey = this.getAttribute('data-organ');
      if (organs[organKey]) {
        // Update active state in selector
        organSelectorItems.forEach(el => el.classList.remove('active'));
        this.classList.add('active');

        // Animate model viewer container with a creative flip & scale effect
        gsap.to(modelViewer, { rotationY: "+=360", scale: 0.9, duration: 0.3, ease: "power1.out", onComplete: () => {
          // Update model attributes after the flip
          modelViewer.setAttribute('src', organs[organKey].model);
          modelViewer.setAttribute('alt', `3D model of ${organs[organKey].name}`);
          organNameElem.textContent = organs[organKey].name;
          organDescriptionElem.textContent = organs[organKey].description;
          // Update hotspot annotation in model-viewer
          const hotspot = document.querySelector('#organ-viewer [slot="hotspot-annotation"]');
          if (hotspot) {
            hotspot.textContent = organs[organKey].name;
          }
          // Update overlay annotation as fallback
          if (organAnnotationOverlay) {
            organAnnotationOverlay.textContent = organs[organKey].name;
          }
          gsap.to(modelViewer, { scale: 1, duration: 0.3, ease: "power1.out" });
        }});
      }
    });
  });

  // --- Smooth Scrolling for Navigation ---
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth'
      });
      navLinks.forEach(lnk => lnk.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // --- Header Animation on Scroll (Changing style on scroll) ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // --- Quiz Section: Load Quiz Questions from JSON with Animated Options ---
  let quizQuestions = [];
  let currentQuizIndex = 0;

  const quizContainer = document.getElementById('quiz-container');
  const quizFeedback = document.getElementById('quiz-feedback');
  const nextQuizBtn = document.getElementById('next-quiz');

  function renderQuizQuestion(index) {
    quizFeedback.textContent = "";
    if (index < quizQuestions.length) {
      const questionData = quizQuestions[index];
      quizContainer.innerHTML = `
        <div class="quiz-question">${questionData.question}</div>
        <div class="quiz-options">
          ${questionData.options.map(option => `<button class="quiz-option" data-answer="${option}">${option}</button>`).join('')}
        </div>
      `;
      document.querySelectorAll('.quiz-option').forEach(optionBtn => {
        optionBtn.addEventListener('click', function() {
          const selected = this.getAttribute('data-answer');
          // Animate the option click for immediate feedback
          gsap.fromTo(this, { scale: 1 }, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
          if (selected === questionData.answer) {
            quizFeedback.textContent = "Correct!";
            quizFeedback.style.color = "green";
          } else {
            quizFeedback.textContent = "Incorrect. Try again!";
            quizFeedback.style.color = "red";
          }
        });
      });
    } else {
      quizContainer.innerHTML = `<div class="quiz-question">You have completed all quiz questions!</div>`;
      nextQuizBtn.style.display = "none";
    }
  }

  fetch('quizzes.json')
    .then(response => response.json())
    .then(data => {
      quizQuestions = data.quizzes;
      renderQuizQuestion(currentQuizIndex);
    })
    .catch(error => {
      console.error('Error loading quiz data:', error);
      quizContainer.innerHTML = `<div class="quiz-question">Unable to load quiz questions.</div>`;
    });

  nextQuizBtn.addEventListener('click', () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      currentQuizIndex++;
      renderQuizQuestion(currentQuizIndex);
    } else {
      renderQuizQuestion(quizQuestions.length);
    }
  });

  // --- Particles.js Initialization for Hero Section Background ---
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out"
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        }
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });

  // --- GSAP Animation for Detail Cards (Staggered Reveal) ---
  gsap.from(".detail-card", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".details-grid",
      start: "top 80%"
    }
  });
});
