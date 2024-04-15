const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
];

const quiz = document.querySelector(".quiz");
const questionTitle = document.getElementById("quiz-question");
const choicesWrapper = document.querySelector(".quiz__choices");
const choices = document.querySelectorAll(".quiz__choice");

const nextButton = document.getElementById("next-button");

const score = document.querySelector(".score");
const scoreDescription = document.getElementById("score-description");

const againButton = document.getElementById("score-again");

let scoreCounter = 0;
let questionCounter = 0;


startQuiz(0);

nextButton.onclick = () => {
  if (questionCounter < questions.length) {
    makeQuiz(questionCounter);
    resetChoices();
  } else {
    showScore();
  }
  choicesWrapper.classList.remove("change-cursor", "disable-cursor");
  nextButton.disabled = true;
}

againButton.onclick = () => {
  startQuiz();
}

function startQuiz() {
  quiz.style.display = "block";
  score.style.display = "none";
  scoreCounter = 0;
  questionCounter = 0;
  makeQuiz(0);
  resetChoices();
}

function makeQuiz(questionIndex) {
  questionTitle.textContent = questions[questionIndex].question;
  let answers = questions[questionIndex].answers;

  choices.forEach(function (choice, answersIndex) {
    choice.textContent = answers[answersIndex].text;

    choicesWrapper.onclick = (event) => {
      const clickedChoice = event.target;
      if (!clickedChoice.classList.contains("quiz__choice")) return

      const answersIndex = Array.from(choices).indexOf(clickedChoice); // 1

      if (questions[questionIndex].answers[answersIndex].correct) {
        clickedChoice.classList.add("quiz__answer--correct");
        scoreCounter++;
      } else {
        clickedChoice.classList.add("quiz__answer--wrong");

        choices.forEach(function (item, answersIndex) {

          if (answers[answersIndex].correct === true) {
            item.classList.add("quiz__answer--correct");
          }
        })
      }
      nextButton.disabled = false;
      choicesWrapper.classList.add("change-cursor", "disable-cursor");
    }
  });
  questionCounter++;
}

function resetChoices() {
  choices.forEach(function (choice) {
    choice.classList.remove("quiz__answer--correct", "quiz__answer--wrong");
  })
}

function showScore() {
  quiz.style.display = "none";
  score.style.display = "block";
  scoreDescription.textContent = `You scored ${scoreCounter} out of ${questions.length} !`
}