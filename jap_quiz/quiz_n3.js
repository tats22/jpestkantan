// ===== Quiz Data N3 =====
const quizData = [
  {
    question: "Comment dit-on 'commencer' ?",
    options: ["始めます（はじめます）", "終わります（おわります）", "続けます（つづけます）", "止めます（やめます）"],
    answer: "始めます（はじめます）"
  },
  {
    question: "Lequel signifie 'préparer / se préparer' ?",
    options: ["準備します（じゅんびします）", "勉強します（べんきょうします）", "練習します（れんしゅうします）", "確認します（かくにんします）"],
    answer: "準備します（じゅんびします）"
  },
  {
    question: "Comment dire 'problème / souci' ?",
    options: ["問題（もんだい）", "解決（かいけつ）", "答え（こたえ）", "答弁（とうべん）"],
    answer: "問題（もんだい）"
  },
  {
    question: "Lequel signifie 'connaître / apprendre' ?",
    options: ["知ります（しります）", "忘れます（わすれます）", "思います（おもいます）", "信じます（しんじます）"],
    answer: "知ります（しります）"
  },
  {
    question: "Comment dire 'réunion' ?",
    options: ["会議（かいぎ）", "授業（じゅぎょう）", "面接（めんせつ）", "お葬式(おそうしき)"],
    answer: "会議（かいぎ）"
  },
  {
    question: "Lequel signifie 'changer' ?",
    options: ["変えます（かえます）", "進めます（すすめます）", "選びます（えらびます）", "作ります（つくります）"],
    answer: "変えます（かえます）"
  },
  {
    question: "Comment dire 'facile' ?",
    options: ["簡単（かんたん）", "難しい（むずかしい）", "複雑（ふくざつ）", "簡潔（かんけつ）"],
    answer: "簡単（かんたん）"
  },
  {
    question: "Lequel signifie 'très / extrêmement' ?",
    options: ["非常に（ひじょうに）", "少し（すこし）", "たくさん", "大体（だいたい）"],
    answer: "非常に（ひじょうに）"
  },
  {
    question: "Comment dire 'finir / terminer' ?",
    options: ["終わります（おわります）", "始めます（はじめます）", "続けます（つづけます）", "継続(けいぞく)"],
    answer: "終わります（おわります）"
  },
  {
    question: "Lequel signifie 'réussir / réussir un examen' ?",
    options: ["合格します（ごうかくします）", "失敗します（しっぱいします）", "挑戦します（ちょうせんします）", "勉強します（べんきょうします）"],
    answer: "合格します（ごうかくします）"
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
