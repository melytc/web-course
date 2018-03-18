<?php

	header('Content-type: application/json');
	header('Accept: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "MelissaTrevino";

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error){
		header("HTTP/1.1 500 Bad connection, portal down");
		die("The server is down, we couldn't establish the data base connection.");
	} else {
		$uName = $_POST["username"];
		$commentText = $_POST["commentText"];
		$sql = "INSERT INTO Comment(username, commentText) VALUES('$uName', '$commentText')";
		$result = $conn->query($sql);


		if ($result) {
			$response = array("success" => true);
			echo json_encode($response);
		} else {
			header("HTTP/1.1 500 Something went wrong.");
			die("Sorry, could not post comment.");
		}
	}

?>