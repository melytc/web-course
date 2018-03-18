<?php
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
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                # Username already in use.
                return ["status" => "409"];
            } else {
                # Query to add a new user.
                $sql = "INSERT INTO Users(fName, lName, username, passwrd, email)
                        VALUES ('$uFname', '$uLname', '$uName', '$uPassword', '$uEmail')";
                $result = $conn->query($sql);

                if($result->num_rows > 0){
                    # Registration was successful.
                    $response = ["username"=>$row["username"],"firstname"=>$row["fName"], "lastname"=>$row["lName"], "status" => "SUCCESS"];
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
?>