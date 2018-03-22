<?php
    function connectionDB(){
        # Declaring variables to setup the connection to server and database.
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "LoginSystem";
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        if ($conn->connect_error) {
            # We need to be consistent. Connection is an object.
            return null;
        } else {
            return $conn;
        }
    }

    function dbLogin($uName, $uPassword){
        $connection = connectionDB();

        if($connection != null){
            # Query to retrieve all the information with the parameters' values.
            $sql = "SELECT * 
                    FROM Users 
                    WHERE username = '$uName' AND passwrd = '$uPassword'";
        
            # Executes the query.
            $resultDB = $connection->query($sql);
            
            if ($resultDB->num_rows > 0) {
                # Cookies should not be placed here.

                while ($row = $resultDB->fetch_assoc()) {
                    $response = ["firstname"=>$row["fName"], "lastname"=>$row["lName"], "status"=>"SUCCESS"];
                    # Session is not part of the data layer.
                }
            return $response;

            } else {
                # User was not found on the database.
                return ["status"=>"406"];
            }

        } else {
            # Database connection was unsuccessful.
            return ["status" => "500"];
        }
    }

    function dbRegister($uFname, $uLname, $uName, $uPassword){
        $connection = connectionDB();

        if($connection != null){
            # Query to add the user to the database.
            $sql = "INSERT INTO Users (fName, lName, passwrd, username)
                    VALUES ('$uFname', '$uLname', '$uPassword', '$uName')";

            # Execues the query.
            $resultDB = $connection->query($sql);
            
            if($resultDB){
                $response = ["status"=>"SUCCESS"];
                return $response;
            } else {
                # Bad request
                return ["status"=>"400"];
            }
        } else {
            return ["status" => "500"];
        }
    }
?>