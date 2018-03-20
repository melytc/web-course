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
        $userName = $_POST['username'];
        
        $sql = "SELECT username FROM Users WHERE username = '$userName'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            header('HTTP/1.1 409 Conflict, Username already in use please select another one');
            die("Username already in use.");
        } else {
            
            # Hey frontend, I need these variables to be passed with these ids.
            $uFirstName = $_POST["uFirstName"];
            $uLastName = $_POST["uLastName"];
            $uUsername = $_POST["uUsername"];
            $uPassword = $_POST["uPassword"];
            
            # Query to add this username
            $sql = "INSERT INTO Users (fName, lName, passwrd, username)
                    VALUES ('$uFirstName', '$uLastName', '$uPassword', '$uUsername')";
            
            if (mysqli_query($conn, $sql)) {
                echo "New record created successfully";
            } else {
                header("HTTP/1.1 40? User not added.");
                die("Couldn't add new user.");
            }
        }
    }
?>