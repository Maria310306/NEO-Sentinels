const quizData = {
  planets: [
    {
      question: "Which planet has the most moons in the solar system?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      answer: "Saturn",
      reason: "Saturn has over 80 moons, making it the planet with the most moons as of recent discoveries."
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Earth", "Mars", "Mercury"],
      answer: "Mercury",
      reason: "Mercury is the closest planet to the Sun."
    },
    {
      question: "Which planet has the fastest rotation on its axis?",
      options: ["Earth", "Jupiter", "Mars", "Venus"],
      answer: "Jupiter",
      reason: "Jupiter rotates in about 10 hours, the fastest rotation in the solar system."
    },
    {
      question: "Which planet is known as the 'Gas Giant'?",
      options: ["Neptune", "Earth", "Jupiter", "Mars"],
      answer: "Jupiter",
      reason: "Jupiter is the largest gas giant in the solar system."
    },
    {
      question: "Which planet's day is longer than its year?",
      options: ["Venus", "Mars", "Neptune", "Earth"],
      answer: "Venus",
      reason: "Venus has a day (one rotation on its axis) that is longer than its year (its orbit around the Sun)."
    }
  ],
  asteroids: [
    {
      question: "What region of the solar system do most asteroids originate from?",
      options: ["Kuiper Belt", "Oort Cloud", "Asteroid Belt", "Inner Solar System"],
      answer: "Asteroid Belt",
      reason: "Most asteroids originate from the Asteroid Belt between Mars and Jupiter."
    },
    {
      question: "What is the approximate size of the largest known Near-Earth Asteroid?",
      options: ["10 km", "25 km", "34 km", "100 km"],
      answer: "34 km",
      reason: "The largest known NEA, Ganymed, is about 34 kilometers in diameter."
    },
    {
      question: "How often do asteroids typically impact Earth?",
      options: ["Every day", "Once every 100 years", "Once every 1,000 years", "Once every 1,000,000 years"],
      answer: "Once every 100 years",
      reason: "Larger asteroid impacts capable of causing regional damage occur roughly once every century."
    },
    {
      question: "Which space mission was sent to study Near-Earth Asteroids?",
      options: ["Voyager 1", "Cassini", "OSIRIS-REx", "Juno"],
      answer: "OSIRIS-REx",
      reason: "OSIRIS-REx was launched to study and collect samples from the Near-Earth Asteroid Bennu."
    },
    {
      question: "What is the primary composition of most Near-Earth Asteroids?",
      options: ["Ice", "Metal and rock", "Gas", "Liquid water"],
      answer: "Metal and rock",
      reason: "NEAs are composed primarily of metal (nickel and iron) and rock (silicate minerals)."
    }
  ],
  comets: [
    {
      question: "What is a distinguishing feature of a Near-Earth Comet (NEC)?",
      options: ["A tail of gas and dust", "Its metallic composition", "It never orbits the Sun", "It originates from the asteroid belt"],
      answer: "A tail of gas and dust",
      reason: "Comets develop tails of gas and dust when they approach the Sun, as their ices sublimate and release particles."
    },
    {
      question: "What is the typical size range of NECs?",
      options: ["10–50 meters", "1–10 kilometers", "50–100 kilometers", "100–500 kilometers"],
      answer: "1–10 kilometers",
      reason: "Most NECs fall within this size range, although some can be larger or smaller."
    },
    {
      question: "What happens when a comet approaches the Sun?",
      options: ["It melts completely", "Its tail forms", "It loses its orbital path", "It becomes an asteroid"],
      answer: "Its tail forms",
      reason: "The heat from the Sun causes the comet's ices to vaporize, forming a visible tail of gas and dust."
    },
    {
      question: "What is the nucleus of a comet mostly composed of?",
      options: ["Metal", "Gas", "Ice and dust", "Molten rock"],
      answer: "Ice and dust",
      reason: "Cometary nuclei are mostly composed of ices (like water, methane, and ammonia) mixed with dust and rocky material."
    },
    {
      question: "Which space mission successfully studied a comet?",
      options: ["OSIRIS-REx", "New Horizons", "Rosetta", "Galileo"],
      answer: "Rosetta",
      reason: "The European Space Agency's Rosetta mission successfully orbited and deployed a lander to comet 67P/Churyumov–Gerasimenko."
    }
  ],
  pha: [
    {
      question: "What defines a Potentially Hazardous Asteroid (PHA)?",
      options: ["Its large size alone", "Its orbit brings it close to Earth", "It has a tail", "It originates from beyond the solar system"],
      answer: "Its orbit brings it close to Earth",
      reason: "A PHA's orbit brings it within 0.05 AU of Earth, and it must also be over 140 meters in size."
    },
    {
      question: "What is the largest known PHA?",
      options: ["99942 Apophis", "101955 Bennu", "(29075) 1950 DA", "2000 SG344"],
      answer: "(29075) 1950 DA",
      reason: "This is the largest known PHA, with a diameter of around 1.1 kilometers."
    },
    {
      question: "What is the minimum size for an asteroid to be considered a PHA?",
      options: ["50 meters", "100 meters", "140 meters", "200 meters"],
      answer: "140 meters",
      reason: "PHAs are defined as being larger than 140 meters in diameter and coming within 0.05 AU of Earth."
    },
    {
      question: "What would happen if a PHA impacted Earth?",
      options: ["It would burn up in the atmosphere", "It could cause regional or global damage", "It would bounce off Earth's magnetic field", "It would be harmless"],
      answer: "It could cause regional or global damage",
      reason: "PHAs have the potential to cause widespread destruction, depending on their size and impact location."
    },
    {
      question: "What organization keeps track of PHAs?",
      options: ["United Nations", "NASA", "SpaceX", "International Space Station"],
      answer: "NASA",
      reason: "NASA, through its Near-Earth Object program and Planetary Defense Coordination Office, monitors PHAs."
    }
  ],
  general: [
    {
      question: "What is the shape of most objects in the solar system?",
      options: ["Spherical", "Cubic", "Cylindrical", "Irregular"],
      answer: "Spherical",
      reason: "Due to gravity, most large objects in the solar system, like planets and moons, are spherical in shape."
    },
    {
      question: "What is the primary force governing the motion of objects in the solar system?",
      options: ["Magnetism", "Gravity", "Electromagnetic force", "Nuclear force"],
      answer: "Gravity",
      reason: "Gravity is the dominant force that dictates the orbits of planets, comets, and other celestial bodies."
    },
    {
      question: "What is the average distance between the Earth and the Sun?",
      options: ["1 AU", "0.5 AU", "2 AU", "0.1 AU"],
      answer: "1 AU",
      reason: "One Astronomical Unit (AU) is defined as the average distance between Earth and the Sun, about 93 million miles (150 million kilometers)."
    },
    {
      question: "What is the age of the solar system?",
      options: ["4.6 billion years", "1 million years", "10 billion years", "100,000 years"],
      answer: "4.6 billion years",
      reason: "The solar system is about 4.6 billion years old, based on radiometric age dating of meteorites and planetary material."
    },
    {
      question: "Which celestial body in our solar system has the strongest gravitational pull?",
      options: ["Jupiter", "Earth", "Saturn", "The Moon"],
      answer: "Jupiter",
      reason: "Jupiter, being the largest planet in the solar system, has the strongest gravitational pull."
    }
  ]
};

let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const categorySelection = document.getElementById("category-selection");
const quizBox = document.getElementById("quiz-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("results");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
const percentageText = document.querySelector(".percentage");
const circle = document.querySelector(".circle");

document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    startQuiz();
  });
});

function startQuiz() {
  categorySelection.style.display = "none";
  quizBox.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = quizData[currentCategory][currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.addEventListener("click", () => selectOption(button, index));
    optionsEl.appendChild(button);
  });

  updateProgressBar();
  nextBtn.disabled = true;
  nextBtn.classList.add("disabled");
}

function selectOption(button, optionIndex) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(option => {
    option.classList.remove("selected");
    option.disabled = false;
  });
  
  button.classList.add("selected");
  userAnswers[currentQuestionIndex] = optionIndex;

  nextBtn.disabled = false;
  nextBtn.classList.remove("disabled");
}

function showResults() {
  quizBox.style.display = "none";
  resultContainer.style.display = "block";

  score = quizData[currentCategory].reduce((acc, question, index) => {
    return acc + (question.options[userAnswers[index]] === question.answer ? 1 : 0);
  }, 0);

  const percentage = (score / quizData[currentCategory].length) * 100;
  percentageText.textContent = `${percentage.toFixed(0)}%`;
  resultText.textContent = `You answered ${score} out of ${quizData[currentCategory].length} questions correctly!`;
  
  const circumference = 2 * Math.PI * 50;
  const dashOffset = ((100 - percentage) / 100) * circumference;
  
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = dashOffset;

  circle.style.transition = "stroke-dashoffset 1s ease-out";

  const reasoningContainer = document.querySelector(".reasoning-container");
  reasoningContainer.innerHTML = "";
  
  quizData[currentCategory].forEach((question, index) => {
    const reasoningItem = document.createElement("div");
    reasoningItem.classList.add("reasoning-item");
    const userAnswer = question.options[userAnswers[index]];
    const isCorrect = userAnswer === question.answer;
    
    reasoningItem.innerHTML = `
      <h3>Question ${index + 1}</h3>
      <p><strong>Your answer:</strong> ${userAnswer}</p>
      <p><strong>Correct answer:</strong> ${question.answer}</p>
      <p><strong>Explanation:</strong> ${question.reason}</p>
    `;
    reasoningItem.classList.add(isCorrect ? "correct" : "incorrect");
    reasoningContainer.appendChild(reasoningItem);
  });
}

function updateProgressBar() {
  const progress = (((currentQuestionIndex + 1) / quizData[currentCategory].length) * 100);
  document.getElementById("progress-bar").style.width = `${progress}%`;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData[currentCategory].length) {
    loadQuestion();
  } else {
    showResults();
  }
});

restartBtn.addEventListener("click", () => {
  resultContainer.style.display = "none";
  categorySelection.style.display = "block";
});

// Initial setup
categorySelection.style.display = "block";
quizBox.style.display = "none";
resultContainer.style.display = "none";