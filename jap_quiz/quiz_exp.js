// ===== Quiz Data Expressions avec Kanji + Hiragana =====
const quizData = [
  {
    question: "Que signifie '猿も木から落ちる (さるもきからおちる)' ?",
    options: [
      "Même les experts font des erreurs",
      "Ne jamais abandonner",
      "Investir peu pour obtenir beaucoup",
      "Préférer l’utile au joli"
    ],
    answer: "Même les experts font des erreurs"
  },
  {
    question: "Que signifie '七転び八起き (ななころびやおき)' ?",
    options: [
      "Tomber sept fois, se relever huit",
      "Ne te relâche pas après avoir réussi",
      "La patience finit toujours par payer",
      "Attention à ce que tu dis"
    ],
    answer: "Tomber sept fois, se relever huit"
  },
  {
    question: "Que signifie '花より団子 (はなよりだんご)' ?",
    options: [
      "Préférer l’utile au joli",
      "Investir peu pour obtenir beaucoup",
      "Tout le monde fait des erreurs",
      "Ne tente pas de tout faire en même temps"
    ],
    answer: "Préférer l’utile au joli"
  },
  {
    question: "Que signifie '石の上にも三年 (いしのうえにもさんねん)' ?",
    options: [
      "La patience finit toujours par payer",
      "Ne jamais abandonner",
      "Même les experts font des erreurs",
      "Parfois mieux vaut ne pas savoir"
    ],
    answer: "La patience finit toujours par payer"
  },
  {
    question: "Que signifie '口は災いの元 (くちはわざわいのもと)' ?",
    options: [
      "Attention à ce que tu dis",
      "Ne te relâche pas après avoir réussi",
      "Tomber sept fois, se relever huit",
      "Investir peu pour obtenir beaucoup"
    ],
    answer: "Attention à ce que tu dis"
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
      <a href="jap_quiz.html" class="btn-return"> Recommencer le quiz</a>`;
  }
});

// Initial load
loadQuiz();
