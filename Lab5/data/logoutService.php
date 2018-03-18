<?php
	# Type of data you are sending to the frontend!
	header('Content-type: application/json');

	# Type of data I'm going to be receiving here in the backend.
	header('Accept: application/json');
	session_start();
	unset($_SESSION["fName"]);
	unset($_SESSION["lName"]);
	unset($_SESSION["uName"]);
	session_destroy();
?>