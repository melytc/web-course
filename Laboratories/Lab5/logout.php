<?php 
session_start();
var_dump($_SESSION);
session_unset();
session_destroy();
var_dump($_SESSION);
echo "You're set to go!";
header("Location: home.html");