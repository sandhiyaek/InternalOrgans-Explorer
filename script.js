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
        model: 'models/lung.glb',
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
  
    // --- 3D Explorer Section: Model Switching ---
    const organSelectorItems = document.querySelectorAll('.organ-selector ul li');
    const modelViewer = document.getElementById('organ-viewer');
    const organNameElem = document.getElementById('organ-name');
    const organDescriptionElem = document.getElementById('organ-description');
  
    organSelectorItems.forEach(item => {
      item.addEventListener('click', function() {
        const organKey = this.getAttribute('data-organ');
        if (organs[organKey]) {
          // Update active state in selector
          organSelectorItems.forEach(el => el.classList.remove('active'));
          this.classList.add('active');
          // Fade-out model preview before switching
          modelViewer.style.opacity = 0;
          setTimeout(() => {
            modelViewer.setAttribute('src', organs[organKey].model);
            modelViewer.setAttribute('alt', `3D model of ${organs[organKey].name}`);
            organNameElem.textContent = organs[organKey].name;
            organDescriptionElem.textContent = organs[organKey].description;
            modelViewer.style.opacity = 1;
          }, 300);
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
  
    // --- Quiz Section: Load Quiz Questions from JSON ---
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
  });
  