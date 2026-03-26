 let score = 0;
let totalTime = 60;
let timeLeft = totalTime;
let timer;

let playerName = "";
let currentAnswer = 0;
let lives = 3;

let soundEnabled = true;
let selectedLevel = 1;
let hintsLeft = 2;

let questionsPerLevel = 5;
let questionCount = 0;

// player-wise progress
let unlockedLevel = 1;
let starsData = {};

// ---------- PLAYER STORAGE ----------
function normalizeName(name) {
  return (name || "").trim().toLowerCase();
}

function getLevelKey(name) {
  return "level_" + normalizeName(name);
}

function getStarsKey(name) {
  return "stars_" + normalizeName(name);
}

function loadPlayerProgress(name) {
  unlockedLevel = parseInt(localStorage.getItem(getLevelKey(name))) || 1;
  starsData = JSON.parse(localStorage.getItem(getStarsKey(name))) || {};
}

function savePlayerProgress() {
  localStorage.setItem(getLevelKey(playerName), unlockedLevel);
  localStorage.setItem(getStarsKey(playerName), JSON.stringify(starsData));
}

function clearOldCommonProgress() {
  localStorage.removeItem("unlockedLevel");
  localStorage.removeItem("starsData");
}

// ---------- RETURN STATE FOR LEADERBOARD ----------
function saveLevelCompleteState(stars) {
  sessionStorage.setItem("returnScreen", "levelComplete");
  sessionStorage.setItem("returnLevel", selectedLevel);
  sessionStorage.setItem("returnStars", stars);
  sessionStorage.setItem("returnPlayer", playerName);
}

function clearReturnState() {
  sessionStorage.removeItem("returnScreen");
  sessionStorage.removeItem("returnLevel");
  sessionStorage.removeItem("returnStars");
  sessionStorage.removeItem("returnPlayer");
}

function openLeaderboardFromLevelComplete(stars) {
  saveLevelCompleteState(stars);
  window.location.href = "leaderboard.php";
}

function restoreLevelCompleteScreen() {
  const screen = sessionStorage.getItem("returnScreen");
  const level = sessionStorage.getItem("returnLevel");
  const stars = sessionStorage.getItem("returnStars");
  const savedPlayer = sessionStorage.getItem("returnPlayer");

  if (screen === "levelComplete" && level && stars) {
    playerName = savedPlayer || "";

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("levelsScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    selectedLevel = parseInt(level);

    document.getElementById("gameArea").innerHTML = `
      <div style="text-align:center; padding-top:10px;">

        <div
          onclick="openLeaderboardFromLevelComplete('${stars}')"
          style="
            width:48px;
            height:48px;
            margin:12px auto 20px;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:20px;
            cursor:pointer;
            background:rgba(255,255,255,0.08);
            border-radius:50%;
            box-shadow:0 0 14px cyan;
            border:2px solid rgba(0,255,255,0.35);
          "
          title="Leaderboard"
        >
          🏆
        </div>

        <h2>🎉 Level ${selectedLevel} Complete!</h2>

        <h1 style="color:gold;font-size:35px;text-shadow:0 0 10px gold;">
          ${stars}
        </h1>

        <button onclick="restartLevel()">🔁 Try Again</button>
        <button onclick="goToLevelsAfterComplete()">🏠 Levels</button>
        <button onclick="nextLevel()">➡️ Next Level</button>

      </div>
    `;
  }
}

// ---------- START GAME ----------
function startGame() {
  clearInterval(timer);

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("levelsScreen").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  score = 0;
  lives = 3;
  timeLeft = totalTime;
  hintsLeft = 2;
  questionCount = 0;
  questionsPerLevel = 5 + (selectedLevel - 1);

  document.getElementById("gameArea").innerHTML = getGameUI();

  updateLevel();
  updateLives();
  document.getElementById("score").innerText = score;
  document.getElementById("playerDisplay").innerText = "Player: " + playerName;

  generateQuestion();
  startTimer();
}

// ---------- GAME UI ----------
function getGameUI() {
  return `
    <div id="playerDisplay"></div>

    <div class="top-bar">
      <div id="levelDisplay"></div>
      <div id="timer">⏱ 60</div>
      <div>Score: <span id="score">0</span></div>
      <div id="lives">❤️ 3</div>

      <div id="iconGroup">
        <button class="iconBtn" onclick="useHint()">💡</button>
        <button class="iconBtn" id="soundBtn" onclick="toggleSound()">🔊</button>
      </div>
    </div>

    <div class="progress-bar">
      <div id="progress"></div>
    </div>

    <div class="question-box"></div>
    <p id="result"></p>

    <button class="restart" onclick="restartGame()">Restart</button>
  `;
}

// ---------- LOGIN / GO TO LEVELS ----------
function goToLevels() {
  const input = document.getElementById("playerName");
  const enteredName = input ? input.value.trim() : "";

  if (!enteredName) {
    alert("Enter name!");
    return;
  }

  clearReturnState();

  playerName = normalizeName(enteredName);

  clearOldCommonProgress();
  loadPlayerProgress(playerName);

  selectedLevel = 1;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("levelsScreen").style.display = "block";

  generateLevels();
}

function goToLevelsAfterComplete() {
  clearReturnState();
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("levelsScreen").style.display = "block";
  generateLevels();
}

// ---------- GENERATE LEVELS ----------
function generateLevels() {
  let container = document.getElementById("levelsContainer");
  container.innerHTML = "";

  for (let i = 1; i <= 50; i++) {
    let locked = i > unlockedLevel;
    let label = "";

    if (locked) {
      label = `Level ${i} 🔒`;
    } else if (starsData[i]) {
      label = `Level ${i} ${starsData[i]}`;
    } else {
      label = `Level ${i} ☆`;
    }

    container.innerHTML += `
      <button
        onclick="${locked ? "" : `startLevel(${i})`}"
        style="${locked ? "opacity:0.5;cursor:not-allowed;" : ""}">
        ${label}
      </button>
    `;
  }
}

// ---------- START LEVEL ----------
function startLevel(level) {
  selectedLevel = level;
  document.getElementById("levelsScreen").style.display = "none";
  startGame();
}

// ---------- GENERATE QUESTION ----------
function generateQuestion() {
  if (questionCount >= questionsPerLevel) {
    levelComplete();
    return;
  }

  questionCount++;

  let levelElement = document.getElementById("level");
  let level = levelElement ? levelElement.value : "easy";

  let max = level === "medium" ? 20 : level === "hard" ? 50 : 10;
  max = Math.floor(max * (1 + selectedLevel * 0.3));

  let num1 = Math.floor(Math.random() * max) + 1;
  let num2 = Math.floor(Math.random() * max) + 1;
  let num3 = Math.floor(Math.random() * max) + 1;

  let ops = ["+", "-", "*", "/"];
  let op1 = ops[Math.floor(Math.random() * ops.length)];
  let op2 = ops[Math.floor(Math.random() * ops.length)];

  if (op1 === "/") num2 = Math.max(1, num2);
  if (op2 === "/") num3 = Math.max(1, num3);

  let question = `${num1} ${op1} ${num2} ${op2} ${num3}`;

  try {
    currentAnswer = Math.floor(eval(question));
  } catch (e) {
    generateQuestion();
    return;
  }

  let options = [currentAnswer];
  while (options.length < 4) {
    let wrong = currentAnswer + Math.floor(Math.random() * 10) - 5;
    if (!options.includes(wrong)) {
      options.push(wrong);
    }
  }

  options.sort(() => Math.random() - 0.5);

  let html = "";
  options.forEach(opt => {
    html += `<button class="option-btn" onclick="checkAnswer(${opt})">${opt}</button>`;
  });

  document.querySelector(".question-box").innerHTML = `<h2>${question}</h2>${html}`;
}

// ---------- CHECK ANSWER ----------
function checkAnswer(selected) {
  let result = document.getElementById("result");

  if (selected === currentAnswer) {
    score++;
    result.innerText = "✅ Correct!";
    result.className = "correct";
    fireConfetti();
    playSound("correct");
  } else {
    lives--;
    result.innerText = `❌ Wrong! ${currentAnswer}`;
    result.className = "wrong";
    updateLives();
    shakeCard();
    playSound("wrong");

    if (lives <= 0) {
      endGame();
      return;
    }
  }

  document.getElementById("score").innerText = score;

  setTimeout(() => {
    result.innerText = "";
    generateQuestion();
  }, 300);
}

// ---------- HINT ----------
function useHint() {
  if (hintsLeft <= 0) {
    alert("❌ No hints left!");
    return;
  }

  hintsLeft--;

  let buttons = document.querySelectorAll(".option-btn");
  let removed = 0;

  buttons.forEach(btn => {
    if (Number(btn.innerText) !== currentAnswer && removed < 2) {
      btn.style.display = "none";
      removed++;
    }
  });

  document.getElementById("result").innerText = "💡 Hint used!";
}

// ---------- LEVEL COMPLETE ----------
function levelComplete() {
  clearInterval(timer);

  let percentage = (score / questionsPerLevel) * 100;
  let stars = "⭐";

  if (percentage >= 80) {
    stars = "⭐⭐⭐";
  } else if (percentage >= 50) {
    stars = "⭐⭐";
  }

  starsData[selectedLevel] = stars;

  if (selectedLevel >= unlockedLevel) {
    unlockedLevel = selectedLevel + 1;
  }

  savePlayerProgress();
  generateLevels();
  saveLevelCompleteState(stars);

  document.getElementById("gameArea").innerHTML = `
    <div style="text-align:center; padding-top:10px;">

      <div
        onclick="openLeaderboardFromLevelComplete('${stars}')"
        style="
          width:48px;
          height:48px;
          margin:12px auto 20px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:20px;
          cursor:pointer;
          background:rgba(255,255,255,0.08);
          border-radius:50%;
          box-shadow:0 0 14px cyan;
          border:2px solid rgba(0,255,255,0.35);
        "
        title="Leaderboard"
      >
        🏆
      </div>

      <h2>🎉 Level ${selectedLevel} Complete!</h2>

      <h1 style="color:gold;font-size:35px;text-shadow:0 0 10px gold;">
        ${stars}
      </h1>

      <button onclick="restartLevel()">🔁 Try Again</button>
      <button onclick="goToLevelsAfterComplete()">🏠 Levels</button>
      <button onclick="nextLevel()">➡️ Next Level</button>

    </div>
  `;
}

// ---------- NEXT LEVEL ----------
function nextLevel() {
  clearReturnState();

  if (selectedLevel >= 50) {
    document.getElementById("gameArea").innerHTML = `
      <div style="position:relative; padding-top:35px; min-height:260px;">
        <h2>🏆 You Completed All Levels!</h2>
        <h1>🔥 MASTER OF BODMAS 🔥</h1>
        <button onclick="goToLevelsAfterComplete()">🏠 Levels</button>
      </div>
    `;
    return;
  }

  selectedLevel++;
  startGame();
}

// ---------- RESTART SAME LEVEL ----------
function restartLevel() {
  clearReturnState();
  startGame();
}

// ---------- UPDATE ----------
function updateLevel() {
  document.getElementById("levelDisplay").innerText = "Level " + selectedLevel;
}

function updateLives() {
  document.getElementById("lives").innerText = "❤️ " + lives;
}

// ---------- TIMER ----------
function startTimer() {
  clearInterval(timer);

  let timerEl = document.getElementById("timer");
  if (timerEl) {
    timerEl.style.color = "white";
  }

  timer = setInterval(() => {
    timeLeft--;

    let timerBox = document.getElementById("timer");
    let progressBar = document.getElementById("progress");

    if (timerBox) {
      timerBox.innerText = "⏱ " + timeLeft;
      if (timeLeft <= 5) {
        timerBox.style.color = "red";
      }
    }

    if (progressBar) {
      progressBar.style.width = (timeLeft / totalTime) * 100 + "%";
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// ---------- SOUND ----------
function toggleSound() {
  soundEnabled = !soundEnabled;
  let btn = document.getElementById("soundBtn");
  if (btn) {
    btn.innerText = soundEnabled ? "🔊" : "🔇";
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  new Audio("./" + type + ".mp3").play().catch(() => {});
}

// ---------- END GAME ----------
function endGame() {
  clearInterval(timer);
  clearReturnState();

  document.getElementById("gameArea").innerHTML = `
    <div style="position:relative; padding-top:35px; min-height:260px;">
      <h2>Game Over 🎮</h2>
      <button onclick="restartGame()">Play Again</button>
      <button onclick="goToLevelsAfterComplete()">🏠 Levels</button>
    </div>
  `;
}

// ---------- PLAY AGAIN ----------
function restartGame() {
  clearInterval(timer);

  score = 0;
  lives = 3;
  timeLeft = totalTime;
  hintsLeft = 2;
  questionCount = 0;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("levelsScreen").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  startGame();
}

// ---------- EFFECTS ----------
function fireConfetti() {
  confetti({ particleCount: 100, spread: 70 });
}

function shakeCard() {
  let c = document.querySelector(".card");
  if (!c) return;
  c.classList.add("shake");
  setTimeout(() => c.classList.remove("shake"), 300);
}

// ---------- RESTORE LEVEL COMPLETE AFTER BACK ----------
window.addEventListener("load", function () {
  restoreLevelCompleteScreen();
});
