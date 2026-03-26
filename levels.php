<?php session_start(); ?>

<!DOCTYPE html>
<html>
<head>
  <title>Levels</title>
  <link rel="stylesheet" href="style.css">
</head>
<body class="levels-page">
<div class="main-container">
  <div class="card">

    <h1>Welcome <?php echo $_SESSION['player']; ?> 🎮</h1>
    <h2>Select Level</h2>

    <?php
    for($i=1;$i<=50;$i++){
      $stars = isset($_SESSION["level_$i"]) ? $_SESSION["level_$i"] : "☆";
      echo "<a href='game.php?level=$i'>
              <button>Level $i $stars</button>
            </a>";
    }
    ?>

  </div>
</div>

</body>
</html>