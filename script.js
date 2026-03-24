 let score = 0;
let totalTime = 60;
let timeLeft = totalTime;
let timer;
let playerName = "";
let currentAnswer = 0;
let soundEnabled = true;
let lives = 3;

// Start Game
function startGame() {
  playerName = document.getElementById("playerName").value;

  if (playerName === "") {
    alert("Please enter your name!");
    return;
  }

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  score = 0;
  timeLeft = totalTime;
  lives = 3;

  document.getElementById("score").innerText = score;
  updateLives();

  // 👤 SHOW PLAYER NAME
  document.getElementById("playerDisplay").innerText =
    "Player: " + playerName;

  generateQuestion();
  startTimer();

  document.getElementById("answer").focus();
}

// Generate Question
function generateQuestion() {
  let level = document.getElementById("level").value;

  let max = 10;
  if (level === "medium") max = 20;
  if (level === "hard") max = 50;

  let num1 = Math.floor(Math.random() * max) + 1;
  let num2 = Math.floor(Math.random() * max) + 1;
  let num3 = Math.floor(Math.random() * max) + 1;

  let ops = ["+", "-", "*", "/"];

  let op1 = ops[Math.floor(Math.random() * ops.length)];
  let op2 = ops[Math.floor(Math.random() * ops.length)];

  if (op1 === "/" && num2 === 0) num2 = 1;
  if (op2 === "/" && num3 === 0) num3 = 1;

  let question = `${num1} ${op1} ${num2} ${op2} ${num3}`;

  currentAnswer = Math.floor(eval(question));

  document.getElementById("question").innerText = question;
  document.getElementById("answer").value = "";
}

// Check Answer
function checkAnswer() {
  let userAnswer = document.getElementById("answer").value;
  let result = document.getElementById("result");

  if (userAnswer == currentAnswer) {
    score++;
    result.innerText = "✅ Correct!";
    result.className = "correct";
    playSound("correct");
    fireConfetti();

    if (score % 5 === 0) {
      alert("Level Up 🚀");
    }

  } else {
    lives--;
    result.innerText = "❌ Wrong!";
    result.className = "wrong";
    playSound("wrong");

    updateLives();

    if (lives === 0) {
      endGame();
      return;
    }
  }

  document.getElementById("score").innerText = score;

  generateQuestion();
  document.getElementById("answer").focus();
}

// ❤️ Lives
function updateLives() {
  let livesBox = document.getElementById("lives");
  if (livesBox) {
    livesBox.innerText = "❤️ " + lives;
  }
}

// Timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;

    let timerEl = document.getElementById("timer");
    timerEl.innerText = "⏱ " + timeLeft;

    // ⏰ WARNING LAST 5 SEC
    if (timeLeft <= 5) {
      timerEl.style.color = "red";
    }

    document.getElementById("progress").style.width =
      (timeLeft / totalTime) * 100 + "%";

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// End Game
function endGame() {
  saveScore();

  document.getElementById("gameArea").innerHTML = `
    <h2>Game Over 🎮</h2>
    <h3>${playerName}, Your Score: ${score}</h3>
    <button onclick="restartGame()">Play Again</button>
    <button onclick="window.location.href='leaderboard.php'">🏆 Leaderboard</button>
  `;
}

// Sound toggle
function toggleSound() {
  soundEnabled = !soundEnabled;

  document.getElementById("soundBtn").innerText =
    soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF";
}

// Sound
function playSound(type) {
  if (!soundEnabled) return;

  let sound = new Audio("sounds/" + type + ".mp3");
  sound.play();
}

// Save Score
function saveScore() {
  fetch("save_score.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${playerName}&score=${score}`,
  });
}

// Restart
function restartGame() {
  location.reload();
}

// Confetti
function fireConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Enter key
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("answer")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        checkAnswer();
      }
    });
});
