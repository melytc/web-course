<?php
	session_start();
	if (isset($_SESSION['firstName']) && isset($_SESSION['lastName'])) {
		echo json_encode(array('fName' => $_SESSION['firstName'], 'lName' => $_SESSION['lastName']));   	    
	} else {
		header('HTTP/1.1 406 Session not found yet.');
	    die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}
?>