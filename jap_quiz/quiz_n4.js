// ===== Quiz Data N4 =====
const quizData = [
  {
    question: "Comment dit-on 'manger' ?",
    options: ["食べます（たべます）", "飲みます（のみます）", "行きます（いきます）", "見ます（みます）"],
    answer: "食べます（たべます）"
  },
  {
    question: "Comment demander 'où' ?",
    options: ["何（なに）", "どこ", "いつ", "誰（だれ）"],
    answer: "どこ"
  },
  {
    question: "Lequel signifie 'lire' ?",
    options: ["読みます（よみます）", "書きます（かきます）", "聞きます（ききます）", "話します（はなします）"],
    answer: "読みます（よみます）"
  },
  {
    question: "Comment dit-on 'grand' ?",
    options: ["小さい（ちいさい）", "大きい（おおきい）", "長い（ながい）", "高い（たかい）"],
    answer: "大きい（おおきい）"
  },
  {
    question: "Lequel signifie 'venir' ?",
    options: ["行く（いく）", "来る（くる）", "帰る（かえる）", "乗る（のる）"],
    answer: "来る（くる）"
  },
  {
    question: "Comment demander 'quel' ?",
    options: ["どれ", "何（なに）", "どんな", "どの"],
    answer: "どの"
  },
  {
    question: "Comment dit-on 'école' ?",
    options: ["学校（がっこう）", "喫茶店（きっさてん）", "本屋（ほんや）", "駅（えき）"],
    answer: "学校（がっこう）"
  },
  {
    question: "Lequel signifie 'parler' ?",
    options: ["話します（はなします）", "聞きます（ききます）", "書きます（かきます）", "読みます（よみます）"],
    answer: "話します（はなします）"
  },
  {
    question: "Comment dire 'petit' ?",
    options: ["小さい（ちいさい）", "大きい（おおきい）", "高い（たかい）", "長い（ながい）"],
    answer: "小さい（ちいさい）"
  },
  {
    question: "Lequel signifie 'boire' ?",
    options: ["飲みます（のみます）", "食べます（たべます）", "見ます（みます）", "行きます（いきます）"],
    answer: "飲みます（のみます）"
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
