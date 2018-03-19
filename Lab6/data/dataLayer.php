<?php

    # Instruction for debugging.
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('log_errors', 1);

    # connectionDB
    # Function to connect to the database.
    # Returns the connection object ($conn) if successful, and null if connection was unsuccessful.
    function connectionDB(){
        
        # Declaring variables to setup the connection to server and database.
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "MelissaTrevino";
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        if ($conn->connect_error) {
            return null;
        } else {
            return $conn;
        }
    }

    # dbLogin
    # Function to perform a login into the database.
    # Returns the response ($response) if the database found a user, or the corresponding error encapsulated in an array if user was not found or the connection was unsuccessful (with the key "status").
    function dbLogin($uName, $uPassword){
        $connection = connectionDB();

        # Validate that there's a connection to the database.
        if($connection != null){
            # Query to retrieve all the information with the parameters' values.
            $sql = "SELECT * 
                    FROM Users 
                    WHERE username = '$uName' AND passwrd = '$uPassword'";
        
            # Executes the query.
            $resultDB = $connection->query($sql);
            
            # Retrieve all the results.
            if ($resultDB->num_rows > 0) {
                while ($row = $resultDB->fetch_assoc()) {
                    $response = ["username"=>$row["username"],"firstname"=>$row["fName"], "lastname"=>$row["lName"], "status"=>"SUCCESS"];
                }
            # Return response from database as an array.
            return $response;

            } else {
                # User was not found on the database.
                return ["status" => "406"];
            }
        } else {
            # Database connection was unsuccessful.
            return ["status" => "500"];
        }
    }

    # dbRegister
    # Function to perform a register of a new user into the database.
    # Returns the response ($response) if the registration was successful, or the corresponding error encapsulated in an array if user could not be registered or the connection was unsuccessful (with the key "status").
    function dbRegister($uFname, $uLname, $uName, $uPassword, $uEmail){
        $connection = connectionDB();

        # Validate that there's a connection to the database.
        if($connection != null){

            # Validate that the user is not already in use.
            $sql = "SELECT username FROM Users WHERE username = '$uName'";
            $result = $connection->query($sql);

            if ($result->num_rows > 0) {
                # Username already in use.
                return ["status" => "409"];
            } else {
                # Query to add a new user.
                $sql = "INSERT INTO Users(fName, lName, username, passwrd, email)
                        VALUES ('$uFname', '$uLname', '$uName', '$uPassword', '$uEmail')";
                $result = $connection->query($sql);

                if($result){
                    # Registration was successful.
                    $response = ["status" => "SUCCESS"];
                    return $response;
                } else {
                    # Registration was unsuccessful.
                    return ["status" => "406"];
                }
            }
        } else {
            # Database connection was unsuccessful.
            return ["status" => "500"];
        }
    }

    # dbLoadComment
    # Function to load all comments from the database.
    function dbLoadComment(){
        $connection = connectionDB();

        if($connection != null){
            # Query to retrieve all comments.
            $sql = "SELECT c.username as 'username', u.email as 'email', c.commentText as 'commentText'
			FROM Comment c JOIN Users u
			ON c.username = u.username
			ORDER BY c.id ASC";
            $result = $conn->query($sql);
            $response = array();

            if ($result) {
                while ($row = $result->fetch_assoc()){
                    array_push($response, array("username" => $row["username"], "email" => $row["email"], "comment" => $row["commentText"], "status" => "SUCCESS"));
                }
                echo json_encode($response);
            } else {
                return ["status" => "500"];
            }
        } else {
            # Database connection was unsuccessful.
            return ["status" => "500"];
        }
    }

    # dbPostComment
    # Function to post a comment into the database.
    function dbPostComment($uName, $commentText){
        $connection = connectionDB();

        if($connection != null){
            # Query to add a comment into the database.
            $sql = "INSERT INTO Comment(username, commentText)
            VALUES('$uName', '$commentText')";
            $result = $connection->query($sql);

            if($result){
                $response = ["status" => "SUCCESS"];
                return $response;
            } else {
                return ["status" => "500"];
            }
        } else {
             # Database connection was unsuccessful.
             return ["status" => "500"];
        }
    }
?>