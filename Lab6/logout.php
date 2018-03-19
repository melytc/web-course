<?php 
session_start();
session_unset();
session_destroy();
echo "You're set to go!";
header("Location: home.html");