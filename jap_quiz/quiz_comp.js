// ===== Quiz Data Compteurs (10 questions) =====
const quizData = [
  {
    question: "Quel compteur utilise-t-on pour les âges ?",
    options: ["さい（歳）", "ひき（匹）", "こ（個）", "ほん（本）"],
    answer: "さい（歳）"
  },
  {
    question: "Quel compteur utilise-t-on pour les petits animaux ?",
    options: ["ひき（匹）", "さい（歳）", "ほん（本）", "まい（枚）"],
    answer: "ひき（匹）"
  },
  {
    question: "Quel compteur utilise-t-on pour les objets ronds ou petits objets ?",
    options: ["こ（個）", "まい（枚）", "ほん（本）", "ひき（匹）"],
    answer: "こ（個）"
  },
  {
    question: "Quel compteur utilise-t-on pour les objets cylindriques ?",
    options: ["ほん（本）", "こ（個）", "まい（枚）", "ひき（匹）"],
    answer: "ほん（本）"
  },
  {
    question: "Quel compteur utilise-t-on pour les feuilles plates ?",
    options: ["まい（枚）", "こ（個）", "ほん（本）", "ひき（匹）"],
    answer: "まい（枚）"
  },
  {
    question: "Quel compteur utilise-t-on pour les gros animaux ?",
    options: ["とう（頭）", "ひき（匹）", "こ（個）", "ほん（本）"],
    answer: "とう（頭）"
  },
  {
    question: "Quel compteur utilise-t-on pour les vêtements ?",
    options: ["ちゃく（着）", "まい（枚）", "にん（人）", "ほん（本）"],
    answer: "ちゃく（着）"
  },
  {
    question: "Quel compteur utilise-t-on pour les personnes ?",
    options: ["にん（人）", "さい（歳）", "こ（個）", "ひき（匹）"],
    answer: "にん（人）"
  },
  {
    question: "Quel compteur utilise-t-on pour les livres ?",
    options: ["さつ（冊）", "ほん（本）", "まい（枚）", "こ（個）"],
    answer: "さつ（冊）"
  },
  {
    question: "Quel compteur utilise-t-on pour les véhicules ou machines ?",
    options: ["だい（台）", "こ（個）", "にん（人）", "ほん（本）"],
    answer: "だい（台）"
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

const counterEl = document.getElementById("question-counter");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const finalScoreEl = document.getElementById("final-score");

function loadQuiz() {
  const current = quizData[currentQuiz];
  counterEl.innerText = `Question ${currentQuiz + 1} / ${quizData.length}`;
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
    counterEl.style.display = "none";
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
