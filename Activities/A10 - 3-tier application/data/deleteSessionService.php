<?php
	session_start();
	if (isset($_SESSION['firstName']) && isset($_SESSION['lastName']))
	{
		unset($_SESSION['firstName']);
		unset($_SESSION['lastName']);
		session_destroy();
		echo json_encode(array('success' => 'Session deleted'));   	    
	}
	else
	{
		header('HTTP/1.1 406 Session not found yet.');
	    die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
	}
?>
