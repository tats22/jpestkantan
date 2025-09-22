// ===== Quiz Data N1 =====
const quizData = [
  {
    question: "Comment dit-on 'arbitraire' ?",
    options: ["合理的（ごうりてき）", "恣意的（しいてき）", "自然的（しぜんてき）", "明確（めいかく）"],
    answer: "恣意的（しいてき）"
  },
  {
    question: "Lequel signifie 'complexité' ?",
    options: ["単純（たんじゅん）", "複雑（ふくざつ）", "容易（ようい）", "簡単（かんたん）"],
    answer: "複雑（ふくざつ）"
  },
  {
    question: "Comment dire 'conséquence' ?",
    options: ["過程（かてい）", "手段（しゅだん）", "結果（けっか）", "原因（げんいん）"],
    answer: "結果（けっか）"
  },
  {
    question: "Lequel signifie 'interprétation' ?",
    options: ["理解（りかい）", "解釈（かいしゃく）", "説明（せつめい）", "翻訳（ほんやく）"],
    answer: "解釈（かいしゃく）"
  },
  {
    question: "Comment dire 'précaution' ?",
    options: ["用心（ようじん）", "会計(かいけい)", "安全（あんぜん）", "代表(だいひょう)"],
    answer: "用心（ようじん）"
  },
  {
    question: "Lequel signifie 'hypothèse' ?",
    options: ["前提（ぜんてい）", "条件（じょうけん）", "可能性（かのうせい）", "仮定（かてい）"],
    answer: "仮定（かてい）"
  },
  {
    question: "Comment dire 'persévérance' ?",
    options: ["努力（どりょく）", "挑戦（ちょうせん）", "根気（こんき）", "忍耐（にんたい）"],
    answer: "忍耐（にんたい）"
  },
  {
    question: "Lequel signifie 'contradiction' ?",
    options: ["一致（いっち）", "整合（せいごう）", "調和（ちょうわ）", "矛盾（むじゅん）"],
    answer: "矛盾（むじゅん）"
  },
  {
    question: "Comment dire 'raisonnement' ?",
    options: ["考察（こうさつ）", "分析（ぶんせき）", "理論（りろん）", "論理（ろんり）"],
    answer: "論理（ろんり）"
  },
  {
    question: "Lequel signifie 'compétence' ?",
    options: ["購入(こうにゅう)", "能力（のうりょく）", "潜水(せんすい)", "実行力(じっこうりょく)"],
    answer: "能力（のうりょく）"
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
