let result = document.querySelector("#result");
let chance = document.querySelector("#chance");
let user = document.querySelector("#user");
let playBtn = document.querySelector("#play");
let resetBtn = document.querySelector("#reset");
let chatBox = document.querySelector(".chat");
let arrowUp = document.querySelector(".up");
let arrowDown = document.querySelector(".down");

let chances = 5;
let history = [];
let computerNum;

function randomNum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  console.log("정답:", computerNum);
}

randomNum();

window.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.querySelector(".chat");
  const mcImg = document.querySelector(".mcImg");
  const chanceBox = document.querySelector("#chance");

  setTimeout(() => {
    chatBox.classList.add("hide");

    setTimeout(() => {
      mcImg.classList.add("show");

      setTimeout(() => {
        chanceBox.classList.add("on");
      }, 700);
    }, 500);
  }, 2000);
});

function play() {
  let userNum = Number(user.value);

  if (userNum < 1 || userNum > 100) {
    showNormalResult("1부터 100까지의 숫자를 입력하세요");
    return;
  }

  if (history.includes(userNum)) {
    showNormalResult("이미 입력한 숫자입니다. 다른 숫자를 입력해주세요");
    user.value = "";
    return;
  }

  history.push(userNum);

  if (computerNum > userNum) {
    animateResult("UP");
    showArrow("up");
  } else if (computerNum < userNum) {
    animateResult("DOWN");
    showArrow("down");
  } else {
    animateResult("BINGO!");
    hideArrows();
    playBtn.disabled = true;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2 - 80;
    new LottiUI(5);
    return;
  }

  chances--;
  chance.textContent = `남은찬스 ${chances}번`;

  if (chances < 1) {
    showGameOver();
    playBtn.disabled = true;
  }

  user.value = "";
}

function showArrow(type) {
  hideArrows();
  if (type === "up") {
    arrowUp.style.display = "block";
    arrowUp.classList.add("arrowUpAon");
  } else {
    arrowDown.style.display = "block";
    arrowDown.classList.add("arrowDownAon");
  }
}

function hideArrows() {
  arrowUp.classList.remove("arrowUpAon");
  arrowDown.classList.remove("arrowDownAon");
  arrowUp.style.display = "none";
  arrowDown.style.display = "none";
}

function animateResult(text) {
  result.classList.remove("neon", "bounce", "gameover");
  result.textContent = text;
  result.classList.add("neon", "bounce");
}

function showNormalResult(text) {
  result.classList.remove("neon", "bounce", "gameover");
  result.textContent = text;
}

function showGameOver() {
  hideArrows();
  result.classList.remove("neon", "bounce");
  result.textContent = "GAMEOVER";
  result.classList.add("gameover");
}

function reset() {
  user.value = "";
  result.textContent = "결과화면 : UP/DOWN/BINGO!";
  result.classList.remove("gameover", "neon", "bounce");

  chances = 5;
  chance.textContent = `남은찬스 ${chances}번`;

  history = [];
  hideArrows();
  playBtn.disabled = false;

  document.querySelectorAll("dotlottie-player").forEach((el) => el.remove());

  randomNum();
}

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
class LottiUI {
  constructor(count = 6) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: {
            x: 0.2 + Math.random() * 0.6,
            y: 0.15 + Math.random() * 0.4,
          },
          startVelocity: 30,
          gravity: 0.8,
          scalar: 0.8 + Math.random() * 0.5,
        });
      }, i * 300);
    }
  }
}
