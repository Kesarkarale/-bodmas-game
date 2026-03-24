  <!DOCTYPE html>
<html>
<head>
  <title>BODMAS Master Pro</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="main-container">

  <div class="card">

    <h1>BODMAS Master 🎮</h1>

    <!-- Start Section -->
    <div id="startScreen">
      <input type="text" id="playerName" placeholder="Enter your name">
      
      <select id="level">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button onclick="startGame()">Start Game</button>

    </div>

    <!-- Game Section -->
    <div id="gameArea" style="display:none;">
        <div id="playerDisplay"></div>

      <div class="top-bar">
        <div id="timer">⏱ 60</div>
        <div id="scoreBox">Score: <span id="score">0</span></div>
        <div id="lives">❤️ 3</div>
      </div>

      <div class="progress-bar">
        <div id="progress"></div>
      </div>

      <div class="question-box">
        <h2 id="question"></h2>
      </div>

      <input type="number" id="answer" placeholder="Your Answer">

      <button onclick="checkAnswer()">Submit</button>

      <p id="result"></p>

      <button class="restart" onclick="restartGame()">Restart</button>

    </div>

  </div>

</div>
 
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
<script src="script.js"></script>
</body>
</html>