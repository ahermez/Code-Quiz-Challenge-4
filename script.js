const startButton = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice"));
const timerElement = document.getElementById("time");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");
const initialsElement = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const highScoresContainer = document.getElementById("high-scores");
const scoreList = document.getElementById("score-list");
const goBackButton = document.getElementById("go-back");
const clearScoresButton = document.getElementById("clear-scores");

let currentQuestion = 0;
let time = 60;
let timer;

// Define your questions and answers here
const questions = [
  {
    question: "Which HTML tag is used to create a heading?",
    choices: ["<h1>", "<p>", "<div>", "<h2>"],
    answer: 0,
  },
  {
    question: "What does CSS stand for??",
    choices: [
      "Creative Styling Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheet",
      "Cascading Style Sheets",
    ],
    answer: 0,
  },
  {
    question: "How do you add a background color to an HTML element using CSS?",
    choices: [
      "color: red",
      "background-color: blue",
      "Computer Style Sheets",
      "Cascading Style Sheets",
    ],
    answer: 1,
  },
  {
    question: "Which of the following is a CSS framework?",
    choices: ["React", "Angular", "Vue", "Bootstrap"],
    answer: 3,
  },
];

// Event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveHighScore);
goBackButton.addEventListener("click", goBack);
clearScoresButton.addEventListener("click", clearScores);

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  timer = setInterval(updateTime, 1000);
  showQuestion();
}

// Function to show a question
function showQuestion() {
  const question = questions[currentQuestion];
  questionElement.innerText = question.question;
  choices.forEach((choice, index) => {
    choice.innerText = question.choices[index];
    choice.className = "choice"; // Reset class to 'choice'
    choice.addEventListener("click", checkAnswer);
  });
}

// Function to check the selected answer
function checkAnswer(event) {
  const selectedChoice = event.target;
  const question = questions[currentQuestion];
  const answer = question.answer;
  const choiceIndex = choices.indexOf(selectedChoice);

  if (choiceIndex === answer) {
    selectedChoice.classList.add("correct");
  } else {
    selectedChoice.classList.add("incorrect");
    time -= 10; // Penalty for wrong answer: reduce time by 10 seconds
  }

  disableChoices();
  currentQuestion++;

  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 1000);
  } else {
    endQuiz();
  }
}

// Function to disable all choices
function disableChoices() {
  choices.forEach((choice) => {
    choice.removeEventListener("click", checkAnswer);
  });
}

// Function to update the timer
function updateTime() {
  time--;
  timerElement.innerText = time;

  if (time <= 0) {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timer);
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreElement.innerText = `Your score is ${time}`;
}

// Function to save the high score
function saveHighScore() {
  const initials = initialsElement.value;

  if (initials !== "") {
    const scoreItem = document.createElement("li");
    scoreItem.innerText = `${initials}: ${time}`;
    scoreList.appendChild(scoreItem);
  }

  resultContainer.style.display = "none";
  highScoresContainer.style.display = "block";
}

// Function to go back to the main menu
function goBack() {
  highScoresContainer.style.display = "none";
  startButton.style.display = "block";
  resetQuiz();
}

// Function to clear high scores
function clearScores() {
  scoreList.innerHTML = "";
}

// Function to reset the quiz
function resetQuiz() {
  currentQuestion = 0;
  time = 60;
  initialsElement.value = "";
}
