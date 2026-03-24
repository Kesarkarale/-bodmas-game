<?php
$conn = new mysqli("localhost", "root", "", "bodmas_game");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>