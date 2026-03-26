 
 <?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
  <title>BODMAS Master 🎮</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="main-container">
  <div class="card">

    <h1>BODMAS Master 🎮</h1>

    <!-- START -->
    <div id="startScreen">
      <input type="text" id="playerName" placeholder="Enter your name">

      <select id="level">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button onclick="goToLevels()">Start Game</button>
    </div>

    <!-- LEVELS -->
    <div id="levelsScreen" style="display:none;">
      <h2>Select Level 🎯</h2>
       <div id="levelsContainer" style="max-height:300px; overflow-y:auto;"></div>
    </div>

    <!-- GAME -->
    <div id="gameArea" style="display:none;"></div>

  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
<script src="script.js"></script>

</body>
</html>
