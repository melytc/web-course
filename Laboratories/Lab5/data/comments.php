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
	}

	$sql = "SELECT c.username as 'username', u.email as 'email', c.commentText as 'commentText'
			FROM Comment c JOIN Users u
			ON c.username = u.username
			ORDER BY c.id ASC";

	$result = $conn->query($sql);
	$response = array();

	if ($result) {
		while ($row = $result->fetch_assoc()){
			array_push($response, array("username" => $row["username"], "email" => $row["email"], "comment" => $row["commentText"]));
		}

		echo json_encode($response);
	} else {
		#header("HTTP/1.1 406 User not found.");
		die("Wrong credentials provided.");
	}
?>