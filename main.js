// =====================
// DATA SOAL
// =====================
const BANK_SOAL = [
  {
    id: 1,
    kategori: "Tari",
    soal: "Tari yang berasal dari Bali dan biasanya dibawakan oleh perempuan dengan gerakan tangan yang halus adalah...",
    pilihan: ["Tari Kecak", "Tari Legong", "Tari Pendet", "Tari Barong"],
    jawaban: "Tari Legong",
    clue: "Tari ini identik dengan kostum indah dan gerakan mata yang khas."
  },
  {
    id: 2,
    kategori: "Kain",
    soal: "Teknik pembuatan kain dengan cara mengikat dan mencelup benang sebelum ditenun disebut...",
    pilihan: ["Batik", "Songket", "Tenun Ikat", "Tapis"],
    jawaban: "Tenun Ikat",
    clue: "Teknik ini ditemukan di NTT, NTB, dan Kalimantan."
  },
  {
    id: 3,
    kategori: "Wayang",
    soal: "Tokoh wayang yang merupakan pemimpin Pandawa Lima adalah...",
    pilihan: ["Arjuna", "Bima", "Yudistira", "Nakula"],
    jawaban: "Yudistira",
    clue: "Dia dikenal sebagai sosok yang paling bijak dan jujur di antara Pandawa."
  },
  {
    id: 4,
    kategori: "Alat Musik",
    soal: "Angklung adalah alat musik tradisional yang berasal dari daerah...",
    pilihan: ["Jawa Tengah", "Sumatera Barat", "Jawa Barat", "Bali"],
    jawaban: "Jawa Barat",
    clue: "Alat musik ini terbuat dari bambu dan dimainkan dengan cara digoyangkan."
  },
  {
    id: 5,
    kategori: "Tari",
    soal: "Tari Saman berasal dari suku...",
    pilihan: ["Batak", "Minangkabau", "Gayo", "Dayak"],
    jawaban: "Gayo",
    clue: "Suku ini mendiami dataran tinggi di Provinsi Aceh."
  },
  {
    id: 6,
    kategori: "Batik",
    soal: "Motif batik yang menggambarkan tumbuhan pakis dan sering ditemukan di batik Pekalongan disebut...",
    pilihan: ["Motif Mega Mendung", "Motif Kawung", "Motif Jlamprang", "Motif Sido Mukti"],
    jawaban: "Motif Jlamprang",
    clue: "Motif ini mendapat pengaruh dari budaya Cina dan Arab."
  },
  {
    id: 7,
    kategori: "Alat Musik",
    soal: "Gamelan adalah ansambel musik tradisional yang paling terkenal berasal dari...",
    pilihan: ["Aceh", "Jawa", "Sulawesi", "Kalimantan"],
    jawaban: "Jawa",
    clue: "Instrumen ini banyak digunakan dalam pertunjukan wayang dan tari istana."
  },
  {
    id: 8,
    kategori: "Seni Rupa",
    soal: "Teknik membuat hiasan dari potongan-potongan kertas atau bahan yang ditempel disebut...",
    pilihan: ["Mozaik", "Montase", "Kolase", "Batik"],
    jawaban: "Kolase",
    clue: "Teknik ini menggunakan berbagai bahan seperti kain, kertas koran, atau daun kering."
  },
  {
    id: 9,
    kategori: "Rumah Adat",
    soal: "Rumah Gadang merupakan rumah adat khas dari suku...",
    pilihan: ["Batak", "Minangkabau", "Bugis", "Sunda"],
    jawaban: "Minangkabau",
    clue: "Rumah ini memiliki atap melengkung menyerupai tanduk kerbau."
  },
  {
    id: 10,
    kategori: "Wayang",
    soal: "Jenis wayang yang terbuat dari kulit kerbau dan dimainkan dengan layar putih disebut...",
    pilihan: ["Wayang Golek", "Wayang Kulit", "Wayang Beber", "Wayang Klitik"],
    jawaban: "Wayang Kulit",
    clue: "Wayang jenis ini biasa dipertunjukkan semalam suntuk oleh seorang dalang."
  },
  {
    id: 11,
    kategori: "Tari",
    soal: "Tari Tor-Tor merupakan tari tradisional dari suku...",
    pilihan: ["Dayak", "Batak", "Sunda", "Papua"],
    jawaban: "Batak",
    clue: "Tari ini berasal dari Sumatera Utara dan sering dimainkan bersama gondang."
  },
  {
    id: 12,
    kategori: "Batik",
    soal: "Motif batik Mega Mendung yang terkenal berasal dari kota...",
    pilihan: ["Solo", "Yogyakarta", "Cirebon", "Pekalongan"],
    jawaban: "Cirebon",
    clue: "Kota ini terletak di pesisir utara Jawa Barat."
  },
  {
    id: 13,
    kategori: "Seni Rupa",
    soal: "Ukiran kayu Toraja yang khas dan penuh simbol filosofis disebut...",
    pilihan: ["Pa'tedong", "Pa'barana", "Pa'ssura", "Tongkonan"],
    jawaban: "Pa'ssura",
    clue: "Nama ini berarti 'tulisan' dalam bahasa Toraja."
  },
  {
    id: 14,
    kategori: "Alat Musik",
    soal: "Sasando adalah alat musik dawai khas dari Pulau...",
    pilihan: ["Flores", "Timor", "Rote", "Sumba"],
    jawaban: "Rote",
    clue: "Pulau ini merupakan pulau paling selatan di Indonesia."
  },
  {
    id: 15,
    kategori: "Kain",
    soal: "Kain tenun dari Nusa Tenggara Timur yang proses pembuatannya sangat panjang dan sarat makna adat disebut...",
    pilihan: ["Ulos", "Tapis", "Songket", "Tenun Timor"],
    jawaban: "Tenun Timor",
    clue: "Kain ini dipakai dalam berbagai upacara adat di NTT."
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
}

function toggleLeaderboard() {
  const p = document.getElementById('leaderboard-panel');
  p.classList.toggle('hidden');
}

// =====================
// GAME
// =====================
function mulaiGame() {
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

  // Update topbar
  document.getElementById('nomor-soal').textContent = indexSoal + 1;
  document.getElementById('score-display').textContent = score;
  document.getElementById('kategori-text').textContent = soal.kategori;

  // Soal
  const elSoal = document.getElementById('teks-soal');
  elSoal.textContent = soal.soal;
  elSoal.classList.remove('anim-in');
  void elSoal.offsetWidth;
  elSoal.classList.add('anim-in');

  // Sembunyikan clue
  document.getElementById('clue-box').classList.add('hidden');

  // Clue button
  const btnClue = document.getElementById('btn-clue');
  btnClue.disabled = cluesSisa <= 0;
  document.getElementById('clue-sisa').textContent = cluesSisa;
  btnClue.onclick = pakaiClue;

  // Pilihan jawaban
  const grid = document.getElementById('jawaban-grid');
  grid.innerHTML = '';
  const shuffledPilihan = shuffle(soal.pilihan);
  shuffledPilihan.forEach(pilihan => {
    const btn = document.createElement('button');
    btn.className = 'btn-jawaban';
    btn.textContent = pilihan;
    btn.addEventListener('click', () => pilihJawaban(pilihan, soal.jawaban, btn));
    grid.appendChild(btn);
  });

  // Timer
  mulaiTimer();
}

function mulaiTimer() {
  clearInterval(timerInterval);
  waktuSisa = 10;
  updateTimerUI();

  timerInterval = setInterval(() => {
    waktuSisa--;
    updateTimerUI();
    if (waktuSisa <= 0) {
      clearInterval(timerInterval);
      waktuHabis();
    }
  }, 1000);
}

function updateTimerUI() {
  const el = document.getElementById('timer-display');
  el.textContent = waktuSisa;
  if (waktuSisa <= 3) {
    el.classList.add('kritis');
  } else {
    el.classList.remove('kritis');
  }
  // Progress bar
  document.getElementById('progress-bar').style.width = (waktuSisa / 10 * 100) + '%';
}

function waktuHabis() {
  if (sudahJawab) return;
  sudahJawab = true;
  const soal = soalGame[indexSoal];
  hasilReview.push({ soal: soal.soal, pilihan: '(Waktu habis)', jawaban: soal.jawaban, benar: false });
  tampilkanJawabanBenar(soal.jawaban);
  setTimeout(soalBerikutnya, 1200);
}

function pilihJawaban(pilihan, jawaban, btn) {
  if (sudahJawab) return;
  sudahJawab = true;
  clearInterval(timerInterval);

  const benar = pilihan === jawaban;
  if (benar) {
    btn.classList.add('benar');
    score += 100 + waktuSisa * 10;
  } else {
    btn.classList.add('salah');
    tampilkanJawabanBenar(jawaban);
  }
  document.getElementById('score-display').textContent = score;

  hasilReview.push({ soal: soalGame[indexSoal].soal, pilihan, jawaban, benar });

  // Nonaktifkan semua tombol
  document.querySelectorAll('.btn-jawaban').forEach(b => b.disabled = true);
  setTimeout(soalBerikutnya, 1200);
}

function tampilkanJawabanBenar(jawaban) {
  document.querySelectorAll('.btn-jawaban').forEach(b => {
    if (b.textContent === jawaban) b.classList.add('benar');
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
  cluesSisa--;
  document.getElementById('clue-sisa').textContent = cluesSisa;
  if (cluesSisa <= 0) document.getElementById('btn-clue').disabled = true;

  const clue = soalGame[indexSoal].clue;
  document.getElementById('clue-text').textContent = clue;
  document.getElementById('clue-box').classList.remove('hidden');
}

// =====================
// HASIL
// =====================
function tampilHasil() {
  tampilPage('page-hasil');

  const totalBenar = hasilReview.filter(r => r.benar).length;
  const persen = (totalBenar / hasilReview.length) * 100;

  document.getElementById('final-score').textContent = score;

  // Judul & ikon berdasarkan hasil
  const elJudul = document.getElementById('hasil-judul');
  const elIkon = document.getElementById('hasil-icon');
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

  // Review list
  const reviewEl = document.getElementById('review-list');
  reviewEl.innerHTML = '';
  hasilReview.forEach((r, i) => {
    const div = document.createElement('div');
    div.className = 'review-item ' + (r.benar ? 'benar' : 'salah');
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
