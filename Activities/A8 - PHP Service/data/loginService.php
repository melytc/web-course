<?php
	# Type of data you are sending to the frontend!
	header('Content-type: application/json');

	# Type of data I'm going to be receiving here in the backend.
	header('Accept: application/json');

	# Declaring variables to setup the connection to server and database.
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "LoginSystem";

	# Object
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	if ($conn->connect_error) {
		# Header and die are required instructions.
		header("HTTP/1.1 500 Bad connection, portal down");
		# Nothing else to do in the php.
		die("The server is down, we couldn't stablish the data base connection.");
	} else {
		# Hey frontend, I need these variables to be passed with these ids.
		$uName = $_POST["uName"];
		$uPassword = $_POST["uPassword"];

		# Query to retrieve all the information with the variables' values.
		$sql = "SELECT * 
				FROM Users 
				WHERE username = '$uName' AND passwrd = '$uPassword'";
	
		# Executes the query.
		$result = $conn->query($sql);
		
		# Query will return tuples of:
		# 0 - no match
		# 1 - one match
		# 1+ - more than one result
		if ($result->num_rows > 0) {
			$rememberMe = $_POST["rememberMe"];

			if($rememberMe == "true"){
				setcookie("cookieUsername", $uName, time() + 3600*24*5, "/", "", 0);
			}

			# Convert the array to json.
			# By standard we go through all rows.
			while ($row = $result->fetch_assoc()) {
				$response = array("firstname"=>$row["fName"], "lastname"=>$row["lName"]);
			}

			# Sending in Json format the content.
			echo json_encode($response);
		} else {
			# User was not found.
			header("HTTP/1.1 406 User not found.");
			die("Wrong credentials provided.");
		}
	}
?>