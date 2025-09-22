// ===== Quiz Data Interrogatifs =====
const quizData = [
  {
    question: "Quel mot signifie 'quoi' ?",
    options: ["なに", "どこ", "だれ", "いつ"],
    answer: "なに"
  },
  {
    question: "Quel mot signifie 'qui' ?",
    options: ["なに", "だれ", "どこ", "いつ"],
    answer: "だれ"
  },
  {
    question: "Quel mot signifie 'où' ?",
    options: ["どこ", "なに", "だれ", "なぜ"],
    answer: "どこ"
  },
  {
    question: "Quel mot signifie 'quand' ?",
    options: ["なに", "どこ", "いつ", "どうして"],
    answer: "いつ"
  },
  {
    question: "Quel mot signifie 'pourquoi' ?",
    options: ["なぜ", "なんさい", "どの", "どれ"],
    answer: "なぜ"
  },
  {
    question: "Quel mot signifie 'comment' ?",
    options: ["どの", "どれ", "どう", "なに"],
    answer: "どう"
  },
  {
    question: "Quel mot signifie 'lequel' ?",
    options: ["どれ", "なんで", "だれ", "なに"],
    answer: "どれ"
  },
  {
    question: "Quel mot signifie 'lequel (avec nom)' ?",
    options: ["どれ", "どの", "どこ", "なぜ"],
    answer: "どの"
  },
  {
    question: "Quel mot signifie 'combien' ?",
    options: ["いくつ", "どれ", "どう", "いつ"],
    answer: "いくつ"
  },
  {
    question: "Quel mot signifie 'quel genre / quelle sorte' ?",
    options: ["どんな", "なんじゃ", "なに", "どうして"],
    answer: "どんな"
  }
];

// ===== Shuffle function =====
function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ===== Quiz logic =====
let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const finalScoreEl = document.getElementById("final-score");

function loadQuiz() {
  const current = quizData[currentQuiz];
  questionEl.innerText = current.question;
  optionsEl.innerHTML = "";
  feedbackEl.innerText = "";
  nextBtn.style.display = "none";

  const shuffledOptions = shuffle([...current.options]);

  shuffledOptions.forEach(opt => {
    const button = document.createElement("button");
    button.innerText = opt;
    button.addEventListener("click", () => selectAnswer(button, current.answer));
    optionsEl.appendChild(button);
  });
}

function selectAnswer(button, correctAnswer) {
  if(button.innerText === correctAnswer) {
    feedbackEl.innerText = "✅ Correct !";
    feedbackEl.style.color = "green";
    button.classList.add("correct");
    score++;
  } else {
    feedbackEl.innerText = `❌ Incorrect ! La bonne réponse est : ${correctAnswer}`;
    feedbackEl.style.color = "red";
    button.classList.add("wrong");
  }
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuiz++;
  if(currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";
    feedbackEl.style.display = "none";
    finalScoreEl.style.display = "block";
    finalScoreEl.innerHTML = `🎉 Ton score final est ${score} / ${quizData.length}<br><br>
      <a href="jap_quiz.html" class="btn-return"> Retour au quiz</a>`;
  }
});

loadQuiz();
