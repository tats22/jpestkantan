// ===== Quiz Data N2 =====
const quizData = [
  {
    question: "Comment dit-on 'analyser' ?",
    options: ["分析します（ぶんせきします）", "理解します（りかいします）", "説明します（せつめいします）", "比較します（ひかくします）"],
    answer: "分析します（ぶんせきします）"
  },
  {
    question: "Lequel signifie 'gestion / administration' ?",
    options: ["管理（かんり）", "計画（けいかく）", "方法（ほうほう）", "経験（けいけん）"],
    answer: "管理（かんり）"
  },
  {
    question: "Comment dire 'considérer' ?",
    options: ["考慮します（こうりょします）", "判断します（はんだんします）", "決定します（けっていします）", "理解します（りかいします）"],
    answer: "考慮します（こうりょします）"
  },
  {
    question: "Lequel signifie 'améliorer' ?",
    options: ["改善します（かいぜんします）", "維持します（いじします）", "変更します（へんこうします）", "保存します（ほぞんします）"],
    answer: "改善します（かいぜんします）"
  },
  {
    question: "Comment dire 'occasion' ?",
    options: ["機会（きかい）", "経験（けいけん）", "方法（ほうほう）", "目的（もくてき）"],
    answer: "機会（きかい）"
  },
  {
    question: "Lequel signifie 'responsabilité' ?",
    options: ["義務（ぎむ）", "権利（けんり）", "確認(かくにん)", "役割（やくわり）"],
    answer: "義務（ぎむ）"
  },
  {
    question: "Comment dire 'prévenir' ?",
    options: ["警告します（けいこくします）", "実験じゃよ(じっけんじゃよ)", "確認します（かくにんします）", "報告します（ほうこくします）"],
    answer: "警告します（けいこくします）"
  },
  {
    question: "Lequel signifie 'approximation / environ' ?",
    options: ["約（やく）", "完全（かんぜん）", "正確（せいかく）", "正直（しょうじき）"],
    answer: "約（やく）"
  },
  {
    question: "Comment dire 'confiance' ?",
    options: ["信頼（しんらい）", "理解（りかい）", "協力（きょうりょく）", "経験（けいけん）"],
    answer: "信頼（しんらい）"
  },
  {
    question: "Lequel signifie 'accomplir' ?",
    options: ["達成します（たっせいします）", "実行します（じっこうします）", "成功します（せいこうします）", "完成します（かんせいします）"],
    answer: "達成します（たっせいします）"
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
