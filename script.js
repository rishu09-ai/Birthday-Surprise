/* Page navigation */
function nextPage(num) {
  document.querySelectorAll('.page').forEach(p =>
    p.classList.remove('active')
  );
  document.getElementById('page' + num).classList.add('active');
}

/* Envelope open */
function openEnvelope() {
  const env = document.querySelector('.real-envelope');
  env.classList.add('open');

  setTimeout(() => {
    nextPage(2);
  }, 900);
}

/* Wish cards */
let unlocked = 0;
function unlock(el) {
  if (!el.classList.contains('open')) {
    el.classList.add('open');
    unlocked++;
    document.getElementById("counter").innerText =
      `${unlocked} of 3 birthday wishes unlocked`;
  }
}

/* Cake cutting */
const canvas = document.getElementById("cutCanvas");
const ctx = canvas.getContext("2d");
const cakeImg = document.getElementById("cakeImage");
const btn = document.getElementById("cakeBtn");

let drawing = false;
let cutDone = false;

function resizeCanvas() {
  canvas.width = cakeImg.clientWidth;
  canvas.height = cakeImg.clientHeight;
}
window.addEventListener("resize", resizeCanvas);
cakeImg.onload = resizeCanvas;

canvas.addEventListener("pointerdown", () => drawing = true);
canvas.addEventListener("pointerup", () => {
  drawing = false;
  if (!cutDone) {
    cutDone = true;
    btn.disabled = false;
    btn.onclick = () => nextPage(4);
  }
});

canvas.addEventListener("pointermove", e => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
});
