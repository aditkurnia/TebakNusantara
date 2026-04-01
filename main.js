// ===== QUESTIONS DATA =====
const QUESTIONS = [
  {
    question: "Ibu kota negara Jepang adalah...",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    answer: 2,
    clues: ["Letaknya di Pulau Honshu", "Dikenal dengan Menara Tokyo", "Kota dengan penduduk terbanyak di dunia"]
  },
  {
    question: "Planet terbesar di Tata Surya kita adalah...",
    options: ["Saturnus", "Jupiter", "Neptunus", "Uranus"],
    answer: 1,
    clues: ["Ini planet ke-5 dari Matahari", "Memiliki Bintik Merah Besar yang terkenal", "Massanya lebih dari 300 kali Bumi"]
  },
  {
    question: "Siapakah penemu bola lampu listrik yang dipraktikkan secara komersial?",
    options: ["Nikola Tesla", "Albert Einstein", "Isaac Newton", "Thomas Edison"],
    answer: 3,
    clues: ["Lahir di Amerika Serikat tahun 1847", "Juga menemukan fonograf dan kamera film", "Julukannya adalah 'The Wizard of Menlo Park'"]
  },
  {
    question: "Benua manakah yang memiliki luas terbesar di dunia?",
    options: ["Afrika", "Amerika", "Asia", "Eropa"],
    answer: 2,
    clues: ["Tempat tinggal lebih dari 4 miliar orang", "Rumah bagi negara terluas, Rusia", "Gunung tertinggi, Everest, ada di sini"]
  },
  {
    question: "Berapa hasil dari 15 × 15?",
    options: ["200", "225", "215", "250"],
    answer: 1,
    clues: ["Hasilnya di antara 200 dan 230", "Angkanya palindrom (bisa dibaca dua arah)", "15 + 15 = 30, tapi ini perkalian bukan penjumlahan"]
  },
  {
    question: "Bahasa pemrograman apa yang dibuat oleh Brendan Eich pada 1995?",
    options: ["Python", "Java", "JavaScript", "PHP"],
    answer: 2,
    clues: ["Digunakan di hampir semua browser web", "Dibuat hanya dalam 10 hari", "Namanya diambil dari bahasa lain yang lebih populer saat itu"]
  },
  {
    question: "Danau terdalam di dunia berlokasi di negara...",
    options: ["Kanada", "Rusia", "China", "Amerika Serikat"],
    answer: 1,
    clues: ["Danau itu bernama Baikal", "Terletak di Siberia", "Kedalamannya lebih dari 1.600 meter"]
  },
  {
    question: "Unsur kimia dengan simbol 'Au' adalah...",
    options: ["Perak", "Tembaga", "Aluminium", "Emas"],
    answer: 3,
    clues: ["Digunakan sebagai alat tukar sejak zaman kuno", "Simbol berasal dari kata Latin 'Aurum'", "Logam mulia berwarna kuning mengkilap"]
  },
  {
    question: "Siapa yang menulis novel 'Bumi Manusia'?",
    options: ["Chairil Anwar", "Pramoedya Ananta Toer", "Andrea Hirata", "Tere Liye"],
    answer: 1,
    clues: ["Penulisnya pernah dipenjara tanpa pengadilan", "Buku ini bagian dari Tetralogi Buru", "Setting-nya di era kolonial Belanda di Jawa"]
  },
  {
    question: "Berapa jumlah sisi pada bangun datar heksagon?",
    options: ["5", "7", "8", "6"],
    answer: 3,
    clues: ["Lebih dari 5 sisi", "Kurang dari 7 sisi", "Bentuk ini sering terlihat di sarang lebah"]
  }
];

// ===== FICTIONAL SCORES =====
const FICTIONAL_SCORES = [
  { name: "RizkyGamer99", score: 980 },
  { name: "SitiPintar", score: 940 },
  { name: "BudiKeren", score: 900 },
  { name: "NandaQuiz", score: 860 },
  { name: "AmeliaS", score: 820 },
];

// ===== STATE =====
let playerName = "";
let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let timerInterval = null;
let timeLeft = 10;
let cluesUsed = [false, false, false];
let answered = false;

const CIRCUMFERENCE = 2 * Math.PI * 26; // r=26

// ===== DOM REFS =====
const pages = {
  home: document.getElementById('page-home'),
  game: document.getElementById('page-game'),
  result: document.getElementById('page-result'),
};

// ===== NAVIGATION =====
function showPage(name) {
  Object.values(pages).forEach(p => p.classList.remove('active'));
  pages[name].classList.add('active');
}

// ===== HOME LOGIC =====
const nameCard = document.getElementById('name-card');
const welcomeArea = document.getElementById('welcome-area');
const nameInput = document.getElementById('name-input');
const displayName = document.getElementById('display-name');
const scoreModal = document.getElementById('score-modal');

function initHome() {
  playerName = localStorage.getItem('quizblast_name') || '';
  if (playerName) {
    showWelcome();
  } else {
    nameCard.style.display = 'flex';
    welcomeArea.style.display = 'none';
  }
}

function showWelcome() {
  nameCard.style.display = 'none';
  welcomeArea.style.display = 'flex';
  displayName.textContent = playerName;
}

document.getElementById('btn-save-name').addEventListener('click', () => {
  const val = nameInput.value.trim();
  if (!val) {
    nameInput.focus();
    nameInput.style.borderColor = 'var(--neon-pink)';
    nameInput.style.boxShadow = '0 0 0 3px rgba(255,45,120,0.2)';
    setTimeout(() => {
      nameInput.style.borderColor = '';
      nameInput.style.boxShadow = '';
    }, 1200);
    return;
  }
  playerName = val;
  localStorage.setItem('quizblast_name', playerName);
  showWelcome();
});

nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-save-name').click();
});

// ===== SCOREBOARD =====
document.getElementById('btn-show-score').addEventListener('click', () => {
  renderScoreboard();
  scoreModal.classList.add('open');
});
document.getElementById('btn-close-score').addEventListener('click', () => {
  scoreModal.classList.remove('open');
});
scoreModal.addEventListener('click', e => {
  if (e.target === scoreModal) scoreModal.classList.remove('open');
});

function renderScoreboard() {
  const myScore = parseInt(localStorage.getItem('quizblast_score') || '0');
  let all = [...FICTIONAL_SCORES, { name: playerName || 'Kamu', score: myScore, isMe: true }];
  all.sort((a, b) => b.score - a.score);

  const list = document.getElementById('score-list');
  list.innerHTML = '';

  all.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'score-item' + (item.isMe ? ' score-me' : '');
    div.style.animationDelay = `${idx * 0.07}s`;

    const rankColors = ['rank-1', 'rank-2', 'rank-3'];
    const rankSymbols = ['🥇', '🥈', '🥉'];
    const rankClass = idx < 3 ? rankColors[idx] : '';
    const rankLabel = idx < 3 ? rankSymbols[idx] : `#${idx + 1}`;

    div.innerHTML = `
      <span class="score-rank ${rankClass}">${rankLabel}</span>
      <span class="score-pname">${item.name}${item.isMe ? ' (Kamu)' : ''}</span>
      <span class="score-pts">${item.score}</span>
    `;
    list.appendChild(div);
  });
}

// ===== START GAME =====
document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-play-again').addEventListener('click', startGame);
document.getElementById('btn-home').addEventListener('click', () => {
  showPage('home');
  initHome();
});

function startGame() {
  currentQuestion = 0;
  score = 0;
  correctCount = 0;
  showPage('game');
  loadQuestion();
}

// ===== GAME LOGIC =====
function loadQuestion() {
  if (currentQuestion >= QUESTIONS.length) {
    endGame();
    return;
  }

  answered = false;
  cluesUsed = [false, false, false];

  const q = QUESTIONS[currentQuestion];

  // Update UI counters
  document.getElementById('q-num').textContent = currentQuestion + 1;
  document.getElementById('live-score').textContent = score;
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('clue-display').textContent = '';

  // Options
  const optBtns = document.querySelectorAll('.option-btn');
  optBtns.forEach((btn, i) => {
    btn.className = 'option-btn';
    btn.disabled = false;
    document.getElementById(`opt-${i}`).textContent = q.options[i];
    btn.onclick = () => selectAnswer(i);
  });

  // Reset clue buttons
  [0, 1, 2].forEach(i => {
    const btn = document.getElementById(`clue-${i + 1}`);
    btn.disabled = false;
    btn.className = 'clue-btn';
    btn.textContent = `💡 ${i + 1}`;
  });

  // Reset feedback
  const fb = document.getElementById('feedback-overlay');
  fb.className = 'feedback-overlay';

  // Start timer
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 10;
  updateTimerUI();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answered) timeUp();
    }
  }, 1000);
}

function updateTimerUI() {
  const numEl = document.getElementById('timer-num');
  const ring = document.getElementById('ring-progress');
  const wrap = document.querySelector('.timer-wrap');

  numEl.textContent = timeLeft;
  const offset = CIRCUMFERENCE * (1 - timeLeft / 10);
  ring.style.strokeDashoffset = offset;

  if (timeLeft <= 3) {
    wrap.classList.add('timer-urgent');
  } else {
    wrap.classList.remove('timer-urgent');
  }
}

function timeUp() {
  answered = true;
  disableOptions();

  // Reveal correct
  const q = QUESTIONS[currentQuestion];
  document.querySelectorAll('.option-btn')[q.answer].classList.add('correct');

  showFeedback(false, 'WAKTU HABIS!');

  setTimeout(() => {
    hideFeedback();
    currentQuestion++;
    loadQuestion();
  }, 1800);
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);
  disableOptions();

  const q = QUESTIONS[currentQuestion];
  const btns = document.querySelectorAll('.option-btn');

  if (idx === q.answer) {
    btns[idx].classList.add('correct');
    const bonus = timeLeft * 10; // max 100 bonus
    const points = 100 + bonus;
    score += points;
    correctCount++;
    showFeedback(true, `+${points} PTS!`);
  } else {
    btns[idx].classList.add('wrong');
    btns[q.answer].classList.add('correct');
    showFeedback(false, 'SALAH!');
  }

  document.getElementById('live-score').textContent = score;

  setTimeout(() => {
    hideFeedback();
    currentQuestion++;
    loadQuestion();
  }, 1800);
}

function disableOptions() {
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
}

function showFeedback(isCorrect, text) {
  const fb = document.getElementById('feedback-overlay');
  document.getElementById('feedback-icon').textContent = isCorrect ? '✅' : '❌';
  document.getElementById('feedback-text').textContent = text;
  fb.className = 'feedback-overlay show ' + (isCorrect ? 'correct-fb' : 'wrong-fb');
}

function hideFeedback() {
  document.getElementById('feedback-overlay').className = 'feedback-overlay';
}

// ===== CLUE LOGIC =====
document.querySelectorAll('.clue-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (answered) return;
    const idx = parseInt(btn.dataset.index);
    if (cluesUsed[idx]) return;

    cluesUsed[idx] = true;
    btn.disabled = true;
    btn.className = 'clue-btn used';
    btn.textContent = `✓ ${idx + 1}`;

    const q = QUESTIONS[currentQuestion];
    document.getElementById('clue-display').textContent = `💡 ${q.clues[idx]}`;
  });
});

// ===== END GAME =====
function endGame() {
  clearInterval(timerInterval);

  // Save best score
  const prev = parseInt(localStorage.getItem('quizblast_score') || '0');
  if (score > prev) localStorage.setItem('quizblast_score', score);

  // Result emoji & title
  const pct = correctCount / QUESTIONS.length;
  let emoji, title;
  if (pct === 1) { emoji = '🏆'; title = 'SEMPURNA!'; }
  else if (pct >= 0.8) { emoji = '🎉'; title = 'LUAR BIASA!'; }
  else if (pct >= 0.6) { emoji = '👏'; title = 'BAGUS!'; }
  else if (pct >= 0.4) { emoji = '😅'; title = 'LUMAYAN...'; }
  else { emoji = '💪'; title = 'AYO COBA LAGI!'; }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-name').innerHTML = `Hasil kamu, <span>${playerName}</span>`;
  document.getElementById('result-score').textContent = score;
  document.getElementById('result-correct').textContent = `${correctCount} dari ${QUESTIONS.length} soal benar`;

  showPage('result');
}

// ===== INIT =====
initHome();
