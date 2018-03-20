<?php
	session_start();

	header('Content-type: application/json');
	header('Accept: application/json');

	
	if(isset($_SESSION["uName"])){
		echo json_encode(array("fName" => $_SESSION["fName"], "lName" => $_SESSION["lName"], "uName" => $_SESSION["uName"]));
	} else {
		echo json_encode(array("fName" => false));
	}
