// ===== Quiz Data Onomatopées =====
const quizData = [
  {
    question: "Quel onomatopée signifie 'battement de cœur / nervosité' ?",
    options: ["ドキドキ", "ワクワク", "ガタガタ", "ピカピカ"],
    answer: "ドキドキ"
  },
  {
    question: "Quel onomatopée signifie 'excitation, impatience joyeuse' ?",
    options: ["ワクワク", "ドキドキ", "ゴロゴロ", "シーン"],
    answer: "ワクワク"
  },
  {
    question: "Quel onomatopée signifie 'bruit de secousse / trembler' ?",
    options: ["ガタガタ", "チクタク", "ピカピカ", "ハラハラ"],
    answer: "ガタガタ"
  },
  {
    question: "Quel onomatopée signifie 'brillant / scintillant' ?",
    options: ["ピカピカ", "シーン", "ゴロゴロ", "メソメソ"],
    answer: "ピカピカ"
  },
  {
    question: "Quel onomatopée signifie 'silence total' ?",
    options: ["シーン", "ドンドン", "ハラハラ", "ペラペラ"],
    answer: "シーン"
  },
  {
    question: "Quel onomatopée signifie 'paresser ou bruit de tonnerre' ?",
    options: ["ゴロゴロ", "ワイワイ", "キラキラ", "ボロボロ"],
    answer: "ゴロゴロ"
  },
  {
    question: "Quel onomatopée signifie 'battement d'horloge' ?",
    options: ["チクタク", "バタバタ", "ドンドン", "ムカムカ"],
    answer: "チクタク"
  },
  {
    question: "Quel onomatopée signifie 'inquiétude, suspense' ?",
    options: ["ハラハラ", "ペラペラ", "ドキドキ", "ワクワク"],
    answer: "ハラハラ"
  },
  {
    question: "Quel onomatopée signifie 'parler couramment' ?",
    options: ["ペラペラ", "ボロボロ", "サラサラ", "キラキラ"],
    answer: "ペラペラ"
  },
  {
    question: "Quel onomatopée signifie 'de plus en plus vite / fortement' ?",
    options: ["ドンドン", "ガブガブ", "バタバタ", "ワイワイ"],
    answer: "ドンドン"
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
