<?php

	/*
	 * Cookie Service
	 * @author Melissa Treviño
	 * @desc The cookie service checks whether the user wants to remember her username 
	 *		 If the cookie was already set, return the username
	 *		 Else return a message "no cookie set"
	*/

	header('Content-type: application/json');
	if (isset($_COOKIE['cookieUsername'])){
		echo json_encode(['cookieUsername' => $_COOKIE['cookieUsername']]);   	    
	} else {
		// header('HTTP/1.1 200 Cookie not set yet.');
		echo json_encode(['message' => 'No cookie set', 'code' => 1337]);
	}
	
?>

