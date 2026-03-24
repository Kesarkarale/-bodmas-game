 <?php
include "db.php";

$name = $_POST['name'];
$score = $_POST['score'];

$sql = "INSERT INTO scores (name, score) VALUES ('$name', '$score')";
$conn->query($sql);
?>