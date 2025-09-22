// ===== Quiz Data N5 =====
const quizData = [
  { question: "Comment dit-on 'Bonjour' ?", options: ["こんにちは", "おはよう", "こんばんは", "さようなら"], answer: "こんにちは" },
  { question: "Lequel signifie 'Merci' ?", options: ["ありがとう", "ごめんなさい", "すみません", "はい"], answer: "ありがとう" },
  { question: "Comment dire 'Maison' ?", options: ["家（いえ）", "学校（がっこう）", "会社（かいしゃ）", "部屋（へや）"], answer: "家（いえ）" },
  { question: "Lequel signifie 'Eau' ?", options: ["水（みず）", "お茶（おちゃ）", "牛乳（ぎゅうにゅう）", "ジュース"], answer: "水（みず）" },
  { question: "Comment dire 'Livre' ?", options: ["本（ほん）", "新聞（しんぶん）", "雑誌（ざっし）", "ノート"], answer: "本（ほん）" },
  { question: "Lequel signifie 'Chat' ?", options: ["猫（ねこ）", "犬（いぬ）", "鳥（とり）", "魚（さかな）"], answer: "猫（ねこ）" },
  { question: "Comment dire 'Pain' ?", options: ["パン", "ご飯（ごはん）", "果物（くだもの）", "魚（さかな）"], answer: "パン" },
  { question: "Lequel signifie 'Voiture' ?", options: ["車（くるま）", "自転車（じてんしゃ）", "電車（でんしゃ）", "バス"], answer: "車（くるま）" },
  { question: "Comment dire 'Oui' ?", options: ["はい", "いいえ", "ありがとう", "すみません"], answer: "はい" },
  { question: "Lequel signifie 'Non' ?", options: ["いいえ", "はい", "すみません", "おはよう"], answer: "いいえ" }
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
