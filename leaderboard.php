 <?php
include "db.php";

$result = $conn->query("SELECT * FROM scores ORDER BY score DESC LIMIT 50");
?>

<!DOCTYPE html>
<html>
<head>
  <title>Leaderboard</title>
  <style>
    body{
      margin:0;
      font-family:'Segoe UI',sans-serif;
      background: radial-gradient(circle at top,#102a5c,#06163a);
      color:white;
      overflow:hidden;
      height:100vh;
    }

    body::before{
      content:"";
      position:absolute;
      width:200%;
      height:200%;
      background:url('https://www.transparenttextures.com/patterns/stardust.png');
      animation:moveBg 20s linear infinite;
      opacity:0.25;
      z-index:0;
    }

    @keyframes moveBg{
      from{transform:translate(0,0);}
      to{transform:translate(-200px,-200px);}
    }

    .container{
      position:relative;
      z-index:1;
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      padding:20px;
      box-sizing:border-box;
    }

    .leaderboard-box{
      width:850px;
      max-width:90%;
      height:680px;
      background:rgba(7,20,69,0.82);
      border:3px solid rgba(88,151,255,0.7);
      border-radius:35px;
      box-shadow:0 0 30px rgba(0,183,255,0.35);
      padding:26px 28px 20px;
      position:relative;
      backdrop-filter:blur(8px);
      display:flex;
      flex-direction:column;
    }

    .top-bar{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:16px;
      gap:20px;
      flex-shrink:0;
    }

    .title{
      flex:1;
      text-align:center;
      font-size:40px;
      font-weight:800;
      margin:0;
      color:white;
      text-shadow:0 0 12px rgba(0,217,255,0.6);
    }

    .top-btn{
      min-width:130px;
      background:linear-gradient(180deg,#4c89ff,#2958c8);
      color:white;
      border:2px solid rgba(180,220,255,0.7);
      border-radius:16px;
      padding:12px 16px;
      font-size:18px;
      font-weight:700;
      cursor:pointer;
      box-shadow:0 0 14px rgba(106,173,255,0.35);
    }

    .divider{
      height:2px;
      background:rgba(132,178,255,0.55);
      margin-bottom:16px;
      flex-shrink:0;
    }

    .table-head,.row{
      display:grid;
      grid-template-columns:110px 1.3fr 1.2fr 150px;
      align-items:center;
      column-gap:16px;
    }

    .table-head{
      font-size:24px;
      font-weight:700;
      color:#c8d3ff;
      padding:12px 18px;
      border-bottom:2px solid rgba(132,178,255,0.35);
      flex-shrink:0;
    }

    .table-wrap{
      border-radius:18px;
      flex:1;
      overflow-y:auto;
      min-height:0;
    }

    .table-wrap::-webkit-scrollbar{
      width:6px;
    }

    .table-wrap::-webkit-scrollbar-thumb{
      background:cyan;
      border-radius:10px;
    }

    .row{
      font-size:24px;
      font-weight:700;
      padding:14px 18px;
      border-bottom:1px solid rgba(132,178,255,0.28);
      background:rgba(5,20,71,0.35);
    }

    .row:last-child{
      border-bottom:none;
    }

    .row.top1{
      background:rgba(255,215,0,0.18);
      box-shadow:inset 0 0 12px rgba(255,215,0,0.25);
    }

    .row.top2{
      background:rgba(192,192,192,0.14);
      box-shadow:inset 0 0 12px rgba(192,192,192,0.18);
    }

    .row.top3{
      background:rgba(205,127,50,0.16);
      box-shadow:inset 0 0 12px rgba(205,127,50,0.18);
    }

    .rank,.score{
      text-align:center;
    }

    .player,.level{
      text-align:left;
    }

    .level-stars{
      color:#ffd84d;
      margin-left:8px;
      letter-spacing:2px;
      text-shadow:0 0 8px rgba(255,215,0,0.5);
    }

    .medal{
      font-size:28px;
      margin-right:6px;
      vertical-align:middle;
    }

    .bottom-bar{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-top:22px;
      gap:20px;
      flex-shrink:0;
    }

    .bottom-btn{
      min-width:220px;
      background:linear-gradient(180deg,#4c89ff,#2958c8);
      color:white;
      border:2px solid rgba(180,220,255,0.7);
      border-radius:18px;
      padding:14px 20px;
      font-size:22px;
      font-weight:800;
      cursor:pointer;
      box-shadow:0 0 16px rgba(106,173,255,0.35);
    }

    .empty{
      text-align:center;
      padding:30px;
      font-size:22px;
      color:#d9e7ff;
    }
  </style>
</head>
<body>

<div class="container">
  <div class="leaderboard-box">

    <div class="top-bar">
      <div style="width:100px;"></div>
      <h1 class="title">🏆 Leaderboard</h1>
      <button class="top-btn" onclick="window.location.href='index.php'">Levels</button>
    </div>

    <div class="divider"></div>

    <div class="table-head">
      <div class="rank">Rank</div>
      <div class="player">Player</div>
      <div class="level">Level ⭐</div>
      <div class="score">Score</div>
    </div>

    <div class="table-wrap">
      <?php
      if($result && $result->num_rows > 0){
        $rank = 1;
        while($row = $result->fetch_assoc()){
          $player = htmlspecialchars($row['name']);
          $score = (int)$row['score'];
          $level = isset($row['level']) ? (int)$row['level'] : 1;
          $stars = isset($row['stars']) ? htmlspecialchars($row['stars']) : "⭐";

          $rowClass = "";
          $medal = $rank . ".";

          if($rank == 1){
            $rowClass = "top1";
            $medal = "🥇";
          } elseif($rank == 2){
            $rowClass = "top2";
            $medal = "🥈";
          } elseif($rank == 3){
            $rowClass = "top3";
            $medal = "🥉";
          }
      ?>
        <div class="row <?php echo $rowClass; ?>">
          <div class="rank"><?php echo $medal; ?></div>
          <div class="player"><?php echo $player; ?></div>
          <div class="level">
            Level <?php echo $level; ?>
            <span class="level-stars"><?php echo $stars; ?></span>
          </div>
          <div class="score"><?php echo $score; ?></div>
        </div>
      <?php
          $rank++;
        }
      } else {
        echo '<div class="empty">No scores yet.</div>';
      }
      ?>
    </div>

    <div class="bottom-bar">
      <button class="bottom-btn" onclick="window.location.href='index.php'">⬅ Back</button>
      <button class="bottom-btn" onclick="window.location.href='index.php'">🎮 Main Menu</button>
    </div>

  </div>
</div>

</body>
</html>
