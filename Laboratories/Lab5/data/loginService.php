<?php
	# Type of data you are sending to the frontend!
	header('Content-type: application/json');

	# Type of data I'm going to be receiving here in the backend.
	header('Accept: application/json');

	# Declaring variables to setup the connection to server and database.
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "MelissaTrevino";

	# Object
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	if ($conn->connect_error) {
		# Header and die are required instructions.
		header("HTTP/1.1 500 Bad connection, portal down");
		# Nothing else to do in the php.
		die("The server is down, we couldn't establish the database connection.");
	}


	# Hey frontend, I need these variables to be passed with these ids.
	$uName = $_POST["uName"];
	$uPassword = $_POST["uPassword"];

	// TODO: CHANGE THIS TO PREPARED STATEMENTS
	# Query to retrieve all the information with the variables' values.
	$sql = "SELECT *
			FROM Users
			WHERE username = '$uName' AND passwrd = '$uPassword' LIMIT 1";

	# Executes the query.
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$rememberMe = $_POST["rememberMe"];

		if($rememberMe == "true"){
			setcookie("cookieUsername", $uName, time() + 3600*24*5, "/", "", 0);
		}

		# Convert the array to json.
		# By standard we go through all rows.
		while ($row = $result->fetch_assoc()) {
			$response = array("firstname" => $row["fName"], "lastname" => $row["lName"], "success" => true);

			// Session is started.
			session_start();
			if (! isset($_SESSION['uName'])) {
				$_SESSION['uName'] = $row['username'];
			}
			if (! isset($_SESSION['fName'])) {
				$_SESSION['fName'] = $row['fName'];
			}
			if (! isset($_SESSION['lName'])) {
				$_SESSION['lName'] = $row['lName'];
			}
		}

		# Sending in Json format the content.
		echo json_encode($response);
	} else {
		# User was not found.
		#header("HTTP/1.1 406 User not found.");
		echo json_encode(["message" => "Wrong credentials provided.", "error" => true]);
	}

?>