document.addEventListener("DOMContentLoaded", () => {

  window.nextPage = function (num) {
    document.querySelectorAll(".page").forEach(p =>
      p.classList.remove("active")
    );
    document.getElementById("page" + num).classList.add("active");
  };

  window.openEnvelope = function () {
    const env = document.querySelector(".real-envelope");
    env.classList.add("open");
    setTimeout(() => nextPage(2), 900);
  };

  /* Cake cutting */
  const canvas = document.getElementById("cutCanvas");
  const ctx = canvas.getContext("2d");
  const cake = document.querySelector(".cake");
  const btn = document.getElementById("cakeBtn");

  function resize() {
    canvas.width = cake.offsetWidth;
    canvas.height = cake.offsetHeight;
  }
  resize();

  let drawing = false;
  let cutDone = false;

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
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  /* Wishes */
  let unlocked = 0;
  window.unlock = function (el) {
    if (!el.classList.contains("open")) {
      el.classList.add("open");
      unlocked++;
      document.getElementById("counter").innerText =
        `${unlocked} of 3 wishes unlocked`;
    }
  };
});
