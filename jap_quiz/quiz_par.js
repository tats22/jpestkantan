// ===== Quiz Data Particules (10 questions) =====
const quizData = [
  {
    question: "パン＿＿食(た)べます。",
    options: ["を", "が", "は", "に"],
    answer: "を"
  },
  {
    question: "猫(ねこ)＿＿かわいいです。",
    options: ["が", "と", "を", "に"],
    answer: "が"
  },
  {
    question: "あした＿＿学校(がっこう)へ行(い)きます。",
    options: ["は", "が", "で", "を"],
    answer: "は"
  },
  {
    question: "家(いえ)＿＿本(ほん)を読(よ)みます。",
    options: ["で", "に", "へ", "を"],
    answer: "で"
  },
  {
    question: "日本(にほん)＿＿行(い)きたいです。",
    options: ["へ", "を", "で", "は"],
    answer: "へ"
  },
  {
    question: "七時(しちじ)＿＿起(お)きます。",
    options: ["に", "で", "を", "が"],
    answer: "に"
  },
  {
    question: "駅(えき)＿＿バスにのります。",
    options: ["から", "か", "に", "へ"],
    answer: "から"
  },
  {
    question: "日本(にほん)＿＿歩(ある)きました。",
    options: ["まで", "は", "が", "に"],
    answer: "まで"
  },
  {
    question: "友達(ともだち)＿＿アニメをみました。",
    options: ["と", "が", "に", "を"],
    answer: "と"
  },
  {
    question: "わたしはフランス語(ご)＿＿勉強(べんきょう)します。",
    options: ["を", "で", "が", "に"],
    answer: "を"
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
