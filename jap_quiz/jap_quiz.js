const questions = [
  { q: "Comment dit-on « manger » en japonais ?", options: ["飲む (nomu)", "食べる (taberu)", "行く (iku)"], answer: 1 },
  { q: "Que veut dire 見る (miru) ?", options: ["Regarder", "Écrire", "Dormir"], answer: 0 },
  { q: "Traduire 行く (iku)", options: ["Aller", "Venir", "Courir"], answer: 0 },
  { q: "Que signifie 買う (kau) ?", options: ["Utiliser", "Acheter", "Écouter"], answer: 1 },
  { q: "Traduire 話す (hanasu)", options: ["Parler", "Lire", "Écrire"], answer: 0 },
  { q: "Que veut dire 聞く (kiku) ?", options: ["Écouter / Demander", "Courir", "Écrire"], answer: 0 },
  { q: "Comment dit-on « dormir » ?", options: ["食べる (taberu)", "寝る (neru)", "話す (hanasu)"], answer: 1 },
  { q: "Que veut dire 来る (kuru) ?", options: ["Aller", "Venir", "Donner"], answer: 1 },
  { q: "Traduire 書く (kaku)", options: ["Écrire", "Lire", "Ouvrir"], answer: 0 },
  { q: "Comment dit-on « utiliser » ?", options: ["使う (tsukau)", "遊ぶ (asobu)", "読む (yomu)"], answer: 0 }
];

let current = 0;
let score = 0;
let answered = Array(questions.length).fill(false);

function loadQuestion() {
  const q = questions[current];
  const container = document.getElementById("quiz-container");

  container.innerHTML = `
    <div class="quiz-card">
      <h2>Question ${current + 1}/10</h2>
      <p>${q.q}</p>
      <div class="options">
        ${q.options.map((opt, i) => `
          <button onclick="checkAnswer(${i})">${opt}</button>
        `).join("")}
      </div>
      <p id="feedback"></p>
      <div class="quiz-nav">
        ${current > 0 ? `<button onclick="prevQuestion()">⬅️ Précédent</button>` : ""}
        ${current < questions.length - 1 ? `<button onclick="nextQuestion()">➡️ Suivant</button>` : `<button onclick="showScore()">Voir le score</button>`}
      </div>
    </div>
  `;
}

function checkAnswer(i) {
  const feedback = document.getElementById("feedback");
  if (!answered[current]) {
    if (i === questions[current].answer) {
      feedback.textContent = "✅ Correct !";
      feedback.style.color = "green";
      score++;
    } else {
      feedback.textContent = "❌ Incorrect, essaie encore.";
      feedback.style.color = "red";
    }
    answered[current] = true;
  } else {
    feedback.textContent = "⚠️ Réponse déjà donnée.";
    feedback.style.color = "orange";
  }
}

function nextQuestion() {
  current++;
  loadQuestion();
}

function prevQuestion() {
  current--;
  loadQuestion();
}

function showScore() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <div class="quiz-card">
      <h2>Résultat final 🎉</h2>
      <p id="final-score">Ton score est ${score} / ${questions.length}</p>
      <button onclick="restartQuiz()">🔄 Recommencer</button>
    </div>
  `;
}

function restartQuiz() {
  current = 0;
  score = 0;
  answered = Array(questions.length).fill(false);
  loadQuestion();
}

loadQuestion();
