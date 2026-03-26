<?php
session_start();

$level = $_POST['level'];
$stars = $_POST['stars'];

$_SESSION["level_$level"] = $stars;
?>