
let current = 0;
const screens = document.querySelectorAll(".screen");

function nextPage() {
  screens[current].classList.remove("active");
  current++;
  screens[current].classList.add("active");
}

function restart() {
  screens[current].classList.remove("active");
  current = 0;
  screens[0].classList.add("active");
}
