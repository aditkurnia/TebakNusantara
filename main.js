// =====================
// SOUND ENGINE (Web Audio API)
// =====================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;

function getCtx() {
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

function playBenar() {
  const ac = getCtx();
  const freqs = [523, 659, 784]; // C, E, G
  freqs.forEach((f, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = 'sine';
    osc.frequency.value = f;
    const t = ac.currentTime + i * 0.1;
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.start(t);
    osc.stop(t + 0.3);
  });
}

function playSalah() {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ac.currentTime + 0.35);
  gain.gain.setValueAtTime(0.25, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.35);
  osc.start();
  osc.stop(ac.currentTime + 0.35);
}

function playTikTok() {
  const ac = getCtx();
  const buf = ac.createBuffer(1, ac.sampleRate * 0.05, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const src = ac.createBufferSource();
  const gain = ac.createGain();
  src.buffer = buf;
  src.connect(gain);
  gain.connect(ac.destination);
  gain.gain.value = 0.15;
  src.start();
}

function playWaktuHabis() {
  const ac = getCtx();
  [400, 300, 200].forEach((f, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = 'square';
    osc.frequency.value = f;
    const t = ac.currentTime + i * 0.15;
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.start(t);
    osc.stop(t + 0.12);
  });
}

function playClue() {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1100, ac.currentTime + 0.15);
  gain.gain.setValueAtTime(0.18, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
  osc.start();
  osc.stop(ac.currentTime + 0.2);
}

function playStart() {
  const ac = getCtx();
  [392, 523, 659, 784].forEach((f, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = 'sine';
    osc.frequency.value = f;
    const t = ac.currentTime + i * 0.09;
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.start(t);
    osc.stop(t + 0.25);
  });
}

// =====================
// ANIMASI HELPERS
// =====================
(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shakeAnim {
      0%,100%{transform:translateX(0)}
      15%{transform:translateX(-8px)}
      30%{transform:translateX(8px)}
      45%{transform:translateX(-6px)}
      60%{transform:translateX(6px)}
      75%{transform:translateX(-3px)}
      90%{transform:translateX(3px)}
    }
    @keyframes bounceAnim {
      0%,100%{transform:scale(1)}
      30%{transform:scale(1.12)}
      60%{transform:scale(0.95)}
      80%{transform:scale(1.05)}
    }
    @keyframes popIn {
      0%{transform:scale(0.7);opacity:0}
      70%{transform:scale(1.08);opacity:1}
      100%{transform:scale(1);opacity:1}
    }
    @keyframes pulseRed {
      0%,100%{background:var(--primary)}
      50%{background:#7B241C}
    }
    @keyframes slideDown {
      from{opacity:0;transform:translateY(-10px)}
      to{opacity:1;transform:translateY(0)}
    }
    .anim-shake { animation: shakeAnim 0.45s ease both; }
    .anim-bounce { animation: bounceAnim 0.45s ease both; }
    .anim-popin { animation: popIn 0.3s ease both; }
    .anim-pulse-red { animation: pulseRed 0.35s ease 2; }
    .anim-slide-down { animation: slideDown 0.25s ease both; }
    .anim-in { animation: slideDown 0.3s ease both; }
  `;
  document.head.appendChild(style);
})();

function animateEl(el, animClass, duration = 450) {
  if (!el) return;
  el.classList.remove(animClass);
  void el.offsetWidth;
  el.classList.add(animClass);
  setTimeout(() => el.classList.remove(animClass), duration);
}

function shakeEl(el)  { animateEl(el, 'anim-shake', 450); }
function bounceEl(el) { animateEl(el, 'anim-bounce', 450); }
function popInEl(el)  { animateEl(el, 'anim-popin', 300); }

function flashTopbar() {
  animateEl(document.querySelector('.game-topbar'), 'anim-pulse-red', 700);
}

// =====================
// DATA SOAL
// =====================
const BANK_SOAL = [
  {
    id: 1, kategori: "Tari",
    soal: "Tari yang berasal dari Bali dan biasanya dibawakan oleh perempuan dengan gerakan tangan yang halus adalah...",
    pilihan: ["Tari Kecak", "Tari Legong", "Tari Pendet", "Tari Barong"],
    jawaban: "Tari Legong",
    clue: "Tari ini identik dengan kostum indah dan gerakan mata yang khas."
  },
  {
    id: 2, kategori: "Kain",
    soal: "Teknik pembuatan kain dengan cara mengikat dan mencelup benang sebelum ditenun disebut...",
    pilihan: ["Batik", "Songket", "Tenun Ikat", "Tapis"],
    jawaban: "Tenun Ikat",
    clue: "Teknik ini ditemukan di NTT, NTB, dan Kalimantan."
  },
  {
    id: 3, kategori: "Wayang",
    soal: "Tokoh wayang yang merupakan pemimpin Pandawa Lima adalah...",
    pilihan: ["Arjuna", "Bima", "Yudistira", "Nakula"],
    jawaban: "Yudistira",
    clue: "Dia dikenal sebagai sosok yang paling bijak dan jujur di antara Pandawa."
  },
  {
    id: 4, kategori: "Alat Musik",
    soal: "Angklung adalah alat musik tradisional yang berasal dari daerah...",
    pilihan: ["Jawa Tengah", "Sumatera Barat", "Jawa Barat", "Bali"],
    jawaban: "Jawa Barat",
    clue: "Alat musik ini terbuat dari bambu dan dimainkan dengan cara digoyangkan."
  },
  {
    id: 5, kategori: "Tari",
    soal: "Tari Saman berasal dari suku...",
    pilihan: ["Batak", "Minangkabau", "Gayo", "Dayak"],
    jawaban: "Gayo",
    clue: "Suku ini mendiami dataran tinggi di Provinsi Aceh."
  },
  {
    id: 6, kategori: "Batik",
    soal: "Motif batik yang mendapat pengaruh budaya Cina dan Arab, khas kota Pekalongan adalah...",
    pilihan: ["Motif Mega Mendung", "Motif Kawung", "Motif Jlamprang", "Motif Sido Mukti"],
    jawaban: "Motif Jlamprang",
    clue: "Motif ini memiliki pola geometris berbentuk bintang."
  },
  {
    id: 7, kategori: "Alat Musik",
    soal: "Gamelan adalah ansambel musik tradisional yang paling terkenal berasal dari...",
    pilihan: ["Aceh", "Jawa", "Sulawesi", "Kalimantan"],
    jawaban: "Jawa",
    clue: "Instrumen ini banyak digunakan dalam pertunjukan wayang dan tari istana."
  },
  {
    id: 8, kategori: "Seni Rupa",
    soal: "Teknik membuat hiasan dari potongan-potongan bahan yang ditempel pada bidang disebut...",
    pilihan: ["Mozaik", "Montase", "Kolase", "Batik"],
    jawaban: "Kolase",
    clue: "Bahan yang dipakai bisa berupa kain, kertas koran, atau daun kering."
  },
  {
    id: 9, kategori: "Rumah Adat",
    soal: "Rumah Gadang merupakan rumah adat khas dari suku...",
    pilihan: ["Batak", "Minangkabau", "Bugis", "Sunda"],
    jawaban: "Minangkabau",
    clue: "Rumah ini memiliki atap melengkung menyerupai tanduk kerbau."
  },
  {
    id: 10, kategori: "Wayang",
    soal: "Jenis wayang yang terbuat dari kulit kerbau dan dimainkan dengan layar putih disebut...",
    pilihan: ["Wayang Golek", "Wayang Kulit", "Wayang Beber", "Wayang Klitik"],
    jawaban: "Wayang Kulit",
    clue: "Wayang jenis ini biasa dipertunjukkan semalam suntuk oleh seorang dalang."
  },
  {
    id: 11, kategori: "Tari",
    soal: "Tari Tor-Tor merupakan tari tradisional dari suku...",
    pilihan: ["Dayak", "Batak", "Sunda", "Papua"],
    jawaban: "Batak",
    clue: "Tari ini berasal dari Sumatera Utara dan sering dimainkan bersama gondang."
  },
  {
    id: 12, kategori: "Batik",
    soal: "Motif batik Mega Mendung yang terkenal berasal dari kota...",
    pilihan: ["Solo", "Yogyakarta", "Cirebon", "Pekalongan"],
    jawaban: "Cirebon",
    clue: "Kota ini terletak di pesisir utara Jawa Barat."
  },
  {
    id: 13, kategori: "Seni Rupa",
    soal: "Ukiran khas Toraja yang penuh simbol filosofis pada rumah adat disebut...",
    pilihan: ["Pa'tedong", "Pa'barana", "Pa'ssura", "Tongkonan"],
    jawaban: "Pa'ssura",
    clue: "Nama ini berarti 'tulisan' dalam bahasa Toraja."
  },
  {
    id: 14, kategori: "Alat Musik",
    soal: "Sasando adalah alat musik dawai khas dari Pulau...",
    pilihan: ["Flores", "Timor", "Rote", "Sumba"],
    jawaban: "Rote",
    clue: "Pulau ini merupakan pulau paling selatan di Indonesia."
  },
  {
    id: 15, kategori: "Kain",
    soal: "Kain tradisional Sumatera Utara yang digunakan dalam berbagai upacara adat Batak disebut...",
    pilihan: ["Ulos", "Tapis", "Songket", "Tenun Timor"],
    jawaban: "Ulos",
    clue: "Kain ini diberikan sebagai simbol kasih sayang dan berkat."
  }
];

// =====================
// STATE
// =====================
let namaUser = '';
let soalGame = [];
let indexSoal = 0;
let score = 0;
let cluesSisa = 3;
let timerInterval = null;
let waktuSisa = 10;
let hasilReview = [];
let sudahJawab = false;

// =====================
// HELPERS
// =====================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function tampilPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// =====================
// INISIALISASI
// =====================
window.addEventListener('DOMContentLoaded', () => {
  namaUser = localStorage.getItem('nusantara_nama') || '';
  if (!namaUser) {
    document.getElementById('modal-nama').classList.remove('hidden');
  } else {
    tampilkanSapa();
  }
  tampilPage('page-beranda');
  initBeranda();
});

function initBeranda() {
  document.getElementById('btn-simpan-nama').addEventListener('click', simpanNama);
  document.getElementById('input-nama').addEventListener('keydown', e => {
    if (e.key === 'Enter') simpanNama();
  });
  document.getElementById('btn-main').addEventListener('click', mulaiGame);
  document.getElementById('btn-leaderboard').addEventListener('click', toggleLeaderboard);
  document.getElementById('btn-tutup-lb').addEventListener('click', () => {
    document.getElementById('leaderboard-panel').classList.add('hidden');
  });
  document.getElementById('btn-main-lagi').addEventListener('click', mulaiGame);
  document.getElementById('btn-ke-beranda').addEventListener('click', () => tampilPage('page-beranda'));
}

function simpanNama() {
  const val = document.getElementById('input-nama').value.trim();
  if (!val) {
    shakeEl(document.getElementById('input-nama'));
    document.getElementById('input-nama').style.borderColor = 'var(--wrong)';
    return;
  }
  namaUser = val;
  localStorage.setItem('nusantara_nama', namaUser);
  document.getElementById('modal-nama').classList.add('hidden');
  tampilkanSapa();
}

function tampilkanSapa() {
  const el = document.getElementById('sapa-user');
  document.getElementById('nama-display').textContent = namaUser;
  el.classList.remove('hidden');
  popInEl(el);
}

function toggleLeaderboard() {
  const p = document.getElementById('leaderboard-panel');
  p.classList.toggle('hidden');
  if (!p.classList.contains('hidden')) {
    animateEl(p, 'anim-slide-down', 300);
  }
}

// =====================
// GAME
// =====================
function mulaiGame() {
  playStart();
  soalGame = shuffle(BANK_SOAL).slice(0, 10);
  indexSoal = 0;
  score = 0;
  cluesSisa = 3;
  hasilReview = [];
  tampilPage('page-game');
  tampilSoal();
}

function tampilSoal() {
  sudahJawab = false;
  const soal = soalGame[indexSoal];

  document.getElementById('nomor-soal').textContent = indexSoal + 1;
  document.getElementById('score-display').textContent = score;
  document.getElementById('kategori-text').textContent = soal.kategori;

  const elSoal = document.getElementById('teks-soal');
  elSoal.textContent = soal.soal;
  animateEl(elSoal, 'anim-in', 300);

  document.getElementById('clue-box').classList.add('hidden');

  const btnClue = document.getElementById('btn-clue');
  btnClue.disabled = cluesSisa <= 0;
  document.getElementById('clue-sisa').textContent = cluesSisa;
  btnClue.onclick = pakaiClue;

  // Render pilihan jawaban dengan stagger
  const grid = document.getElementById('jawaban-grid');
  grid.innerHTML = '';
  const shuffledPilihan = shuffle(soal.pilihan);
  shuffledPilihan.forEach((pilihan, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn-jawaban';
    btn.textContent = pilihan;
    btn.style.animationDelay = `${i * 0.07}s`;
    btn.classList.add('anim-in');
    btn.addEventListener('click', () => pilihJawaban(pilihan, soal.jawaban, btn));
    grid.appendChild(btn);
  });

  mulaiTimer();
}

function mulaiTimer() {
  clearInterval(timerInterval);
  waktuSisa = 10;
  updateTimerUI();

  timerInterval = setInterval(() => {
    waktuSisa--;
    updateTimerUI();

    if (waktuSisa > 0) {
      playTikTok();
      if (waktuSisa <= 3) flashTopbar();
    }

    if (waktuSisa <= 0) {
      clearInterval(timerInterval);
      waktuHabis();
    }
  }, 1000);
}

function updateTimerUI() {
  const el = document.getElementById('timer-display');
  el.textContent = waktuSisa;
  el.classList.toggle('kritis', waktuSisa <= 3);
  document.getElementById('progress-bar').style.width = (waktuSisa / 10 * 100) + '%';
}

function waktuHabis() {
  if (sudahJawab) return;
  sudahJawab = true;
  playWaktuHabis();

  // Shake semua tombol
  document.querySelectorAll('.btn-jawaban').forEach(b => {
    b.disabled = true;
    shakeEl(b);
  });

  const soal = soalGame[indexSoal];
  hasilReview.push({ soal: soal.soal, pilihan: '(Waktu habis)', jawaban: soal.jawaban, benar: false });
  setTimeout(() => {
    tampilkanJawabanBenar(soal.jawaban);
    setTimeout(soalBerikutnya, 1000);
  }, 500);
}

function pilihJawaban(pilihan, jawaban, btn) {
  if (sudahJawab) return;
  sudahJawab = true;
  clearInterval(timerInterval);

  document.querySelectorAll('.btn-jawaban').forEach(b => b.disabled = true);

  const benar = pilihan === jawaban;

  if (benar) {
    playBenar();
    btn.classList.add('benar');
    bounceEl(btn);
    score += 100 + waktuSisa * 10;
    document.getElementById('score-display').textContent = score;
    popInEl(document.querySelector('.game-score-wrap'));
  } else {
    playSalah();
    btn.classList.add('salah');
    shakeEl(btn);
    tampilkanJawabanBenar(jawaban);
  }

  hasilReview.push({ soal: soalGame[indexSoal].soal, pilihan, jawaban, benar });
  setTimeout(soalBerikutnya, 1300);
}

function tampilkanJawabanBenar(jawaban) {
  document.querySelectorAll('.btn-jawaban').forEach(b => {
    if (b.textContent === jawaban) {
      b.classList.add('benar');
      bounceEl(b);
    }
    b.disabled = true;
  });
}

function soalBerikutnya() {
  indexSoal++;
  if (indexSoal >= soalGame.length) {
    tampilHasil();
  } else {
    tampilSoal();
  }
}

function pakaiClue() {
  if (cluesSisa <= 0 || sudahJawab) return;
  playClue();
  cluesSisa--;
  document.getElementById('clue-sisa').textContent = cluesSisa;
  if (cluesSisa <= 0) document.getElementById('btn-clue').disabled = true;

  const clue = soalGame[indexSoal].clue;
  document.getElementById('clue-text').textContent = clue;
  const clueBox = document.getElementById('clue-box');
  clueBox.classList.remove('hidden');
  animateEl(clueBox, 'anim-slide-down', 300);
}

// =====================
// HASIL
// =====================
function tampilHasil() {
  tampilPage('page-hasil');

  const totalBenar = hasilReview.filter(r => r.benar).length;
  const persen = (totalBenar / hasilReview.length) * 100;

  if (persen >= 80) {
    setTimeout(playBenar, 0);
    setTimeout(playBenar, 350);
    setTimeout(playStart, 700);
  } else {
    playSalah();
  }

  document.getElementById('final-score').textContent = score;
  popInEl(document.querySelector('.hasil-score-box'));

  const elJudul = document.getElementById('hasil-judul');
  const elIkon  = document.getElementById('hasil-icon');
  elIkon.className = 'hasil-icon';

  if (persen >= 80) {
    elJudul.textContent = 'Luar Biasa! 🎉';
    elIkon.innerHTML = '<i class="bi bi-trophy-fill"></i>';
    elIkon.classList.add('bagus');
  } else if (persen >= 50) {
    elJudul.textContent = 'Lumayan Bagus!';
    elIkon.innerHTML = '<i class="bi bi-patch-check-fill"></i>';
    elIkon.classList.add('bagus');
  } else {
    elJudul.textContent = 'Tetap Semangat!';
    elIkon.innerHTML = '<i class="bi bi-emoji-smile-fill"></i>';
    elIkon.classList.add('kurang');
  }
  bounceEl(elIkon);

  const reviewEl = document.getElementById('review-list');
  reviewEl.innerHTML = '';
  hasilReview.forEach((r, i) => {
    const div = document.createElement('div');
    div.className = 'review-item ' + (r.benar ? 'benar' : 'salah');
    div.style.animationDelay = `${i * 0.05}s`;
    div.classList.add('anim-in');
    div.innerHTML = `
      <div class="review-icon">
        <i class="bi bi-${r.benar ? 'check-circle-fill' : 'x-circle-fill'}"></i>
      </div>
      <div>
        <div class="review-soal">${i + 1}. ${r.soal}</div>
        <div class="review-jawaban">
          Jawabanmu: <span>${r.pilihan}</span>
          ${!r.benar ? `&nbsp;·&nbsp; Jawaban benar: <span style="color:var(--correct)">${r.jawaban}</span>` : ''}
        </div>
      </div>
    `;
    reviewEl.appendChild(div);
  });
}
