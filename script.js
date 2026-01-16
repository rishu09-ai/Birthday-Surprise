/* PAGE SWITCH */
function nextPage(num) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page' + num).classList.add('active');

  if (num === 5) {
    launchFireworks();
    setInterval(launchFireworks, 1200);
  }
}

/* WISH CARDS */
let unlocked = 0;
function unlock(el) {
  if (!el.classList.contains('open')) {
    el.classList.add('open');
    unlocked++;
    document.getElementById("counter").innerText =
      `${unlocked} of 3 birthday wishes unlocked 🎉`;
  }
}

/* CAKE CUT */
let isCut = false;
const cake = document.querySelector(".cake-cut");
const line = document.querySelector(".cut-line");

if (cake) {
  cake.addEventListener("pointermove", e => {
    if (isCut) return;
    const rect = cake.getBoundingClientRect();
    const y = e.clientY - rect.top;

    if (y > 30 && y < rect.height - 30) {
      line.style.height = rect.height + "px";
      isCut = true;
      document.getElementById("cutText").innerText =
        "Cake Cut Successfully! 🎉";
      setTimeout(() => nextPage(4), 1200);
    }
  });
}

/* FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let fireworks = [];

function Firework(x, y) {
  this.particles = [];
  for (let i = 0; i < 30; i++) {
    this.particles.push({
      x, y,
      dx: Math.cos(i) * Math.random() * 4,
      dy: Math.sin(i) * Math.random() * 4,
      life: 40
    });
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((fw, i) => {
    fw.particles.forEach(p => {
      ctx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
    });
    fw.particles = fw.particles.filter(p => p.life > 0);
    if (!fw.particles.length) fireworks.splice(i, 1);
  });

  requestAnimationFrame(animateFireworks);
}
animateFireworks();

function launchFireworks() {
  for (let i = 0; i < 6; i++) {
    fireworks.push(
      new Firework(
        Math.random() * canvas.width,
        Math.random() * canvas.height / 2
      )
    );
  }
}
