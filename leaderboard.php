 <?php
include "db.php";

$result = $conn->query("SELECT * FROM scores ORDER BY score DESC LIMIT 10");
?>

<!DOCTYPE html>
<html>
<head>
  <title>Leaderboard</title>
  <style>
    body {
      font-family: Arial;
      background: linear-gradient(135deg, #141e30, #243b55);
      color: white;
      text-align: center;
      padding-top: 50px;
    }

    .board {
      background: rgba(255,255,255,0.1);
      display: inline-block;
      padding: 20px;
      border-radius: 15px;
    }

    h2 {
      margin-bottom: 20px;
    }

    .row {
      padding: 10px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
  </style>
</head>

<body>

<div class="board">
  <h2>🏆 Leaderboard</h2>

  <?php while($row = $result->fetch_assoc()) { ?>
    <div class="row">
      <?php echo $row['name']; ?> - <?php echo $row['score']; ?>
    </div>
  <?php } ?>

</div>

</body>
</html>