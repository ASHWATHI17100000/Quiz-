const questions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Transfer Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript data type?",
    options: ["String", "Boolean", "Number", "Float"],
    answer: "Float"
  },
  {
    question: "Which tag is used for inserting the largest heading in HTML?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: "<h1>"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Where is the correct place to insert a JavaScript file?",
    options: ["Both the <head> and <body>", "Only the <head>", "Only the <body>", "After </html>"],
    answer: "Both the <head> and <body>"
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "bgcolor", "background-color", "background"],
    answer: "background-color"
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function = myFunc()", "function:myFunc()", "function myFunc()", "create myFunc()"],
    answer: "function myFunc()"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "#", "/* */"],
    answer: "//"
  },
  {
    question: "How do you call a function named `test` in JavaScript?",
    options: ["call test()", "test()", "run test", "go test()"],
    answer: "test()"
  }
];
 
let shuffledQuestions = shuffleArray([...questions]);
let currentQuestion = 0;
let score = 0;
let highScore= localStorage.getItem('highScore')|| 0;
let userAnswers = Array(questions.length).fill(null);
let timeLeft = 60;
let timer;
 

const questionE1 = document.getElementById('question');
const optionsE1 = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const scoreE1 = document.getElementById('score');
const resetBtn = document.getElementById('resetBtn');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const completeSound = document.getElementById('completeSound');
const failedSound = document.getElementById('failedSound');
const fullscoreSound = document.getElementById('fullscoreSound');


const timerE1 = document.getElementById('timer');

function startTimer(){
  timeLeft = 60;
  timerE1.textContent = `Time left: ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerE1.textContent = `Time Left: ${timeLeft}s`;
    if(timeLeft <= 0){
      clearInterval(timer);
      showScore();
    }
  }, 1000);
}

function loadQuestion() {
  nextBtn.disabled = true;
  questionE1.textContent = shuffledQuestions[currentQuestion].question;
  optionsE1.innerHTML = '';
 
  shuffledQuestions[currentQuestion].options.forEach(optionText => {
    const option = document.createElement('div');
    option.className = 'option';
    option.textContent = optionText;
    option.addEventListener('click', () => selectOption(option, optionText));
    optionsE1.appendChild(option);
  });
 
  const previousAnswer = userAnswers[currentQuestion];
  if (previousAnswer) {
    const correctAnswer = shuffledQuestions[currentQuestion].answer;
    Array.from(optionsE1.children).forEach(option => {
      option.classList.add(option.textContent === correctAnswer ? 'correct' : 'incorrect');
      option.style.pointerEvents = 'none';
      if (option.textContent === previousAnswer) {
        nextBtn.disabled = false;
      }
    });
  }
 
  prevBtn.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
  updateProgressBar();
}
 /*
function selectOption(selectedE1, selectedAnswer) {
  const correctAnswer = shuffledQuestions[currentQuestion].answer;
  const prevAnswer = userAnswers[currentQuestion];
 
  if (prevAnswer === null && selectedAnswer === correctAnswer) {
    score++;
    correctSound.play();
  } else if (prevAnswer !== null) {
    const wasCorrect = prevAnswer === correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;
 
    if (wasCorrect && !isCorrect) {
      score--;
    
    }
    else if (!wasCorrect && isCorrect) 
      score++;
  }

  else{
    wrongSound.play();
  }

  userAnswers[currentQuestion] = selectedAnswer;
 
  Array.from(optionsE1.children).forEach(option => {
    option.classList.add(option.textContent === correctAnswer ? 'correct' : 'incorrect');
    option.style.pointerEvents = 'none';
  });
 
  nextBtn.disabled = false;
}
 */

function selectOption(selectedE1, selectedAnswer) {
  const correctAnswer = shuffledQuestions[currentQuestion].answer;

 
  if (userAnswers[currentQuestion] !== null) return;

  userAnswers[currentQuestion] = selectedAnswer;

  Array.from(optionsE1.children).forEach(option => {
    const isCorrect = option.textContent === correctAnswer;
    const isSelected = option === selectedE1;

    if (isCorrect && isSelected) {
      option.classList.add('correct');
      score++;
      correctSound.play();
    } else if (!isCorrect && isSelected) {
      option.classList.add('incorrect');
      wrongSound.play();
    } else if (!isSelected) {
      option.classList.add('incorrect');
    }

    
    option.style.pointerEvents = 'none';
  });

  nextBtn.disabled = false;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
 
function updateProgressBar() {
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.textContent = `${currentQuestion + 1} / ${shuffledQuestions.length}`;
}
 
nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});
 
prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});
 
resetBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  userAnswers = Array(questions.length).fill(null);
  scoreE1.textContent = '';
  nextBtn.style.display = 'inline-block';
  prevBtn.style.display = 'inline-block';
  resetBtn.style.display = 'none';
  progressContainer.style.display = 'block';
  progressBar.style.width = `0%`;
  progressBar.textContent = '';
  shuffledQuestions = shuffleArray([...questions]);
  loadQuestion();
  startTimer();
});
 
function showScore() {
  questionE1.textContent = 'Quiz Completed!';
  optionsE1.innerHTML = '';
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';
  nextBtn.disabled = true;
  progressContainer.style.display = 'none';
 
  let message = '';
  if (score === shuffledQuestions.length) {
    message = "🎉 Perfect Score! Great job!";
    fullscoreSound.play();
  } else if (score < shuffledQuestions.length / 2) {
    message = "😢 Better luck next time!";
    failedSound.play();
  } else {
    message = "👍 Good effort!";
    completeSound.play();
  }
 
  scoreE1.innerHTML = `Your score: ${score} out of ${shuffledQuestions.length} <br> ${message}`;
  if(score > highScore){
    localStorage.setItem('highScore', score);
    highScore = score;
    scoreE1.innerHTML += '<br> New High Score!';
  } else {
    scoreE1.innerHTML += `<br>High Score: ${highScore}`;
  }
  
  resetBtn.style.display = 'inline-block';
  progressBar.style.width = `100%`;
  progressBar.textContent = `Done`;
 
}
 
loadQuestion();

 
 