<?php
	# Type of data you are sending to the frontend!
	header('Content-type: application/json');

	# Type of data I'm going to be receiving here in the backend.
    header('Accept: application/json');

    require_once __DIR__ . '/dataLayer.php';

    # Instruction for debugging.
    ini_set('display_errors', 1);
    ini_set('log_errors', 1);
    error_reporting(E_ALL);

    # Connection to the database will not be created in the application layer.

    # Parameter that it is sent to the application layer to know what to do.
    $action = $_POST["action"];

    switch($action){
        case 'LOGIN':
            attemptLogin();
            break;
        case 'REGISTER':
            attemptRegister();
            break;
    }

    function attemptLogin(){
        # Receive the login and password from frontend.
        $uName = $_POST["uName"];
        $uPassword = $_POST["uPassword"];
        
        # We are not going to make the query and the call.
        $result = dbLogin($uName, $uPassword);

        if($result["status"] == "SUCCESS"){
            # Everything went okay, send info to the frontend.
            # Data is raw. If wanted to clean it, should be done here.
            echo json_encode($result);
        } else {
            # All error handling.
            handleError($result["status"]);
        }
    }

    function handleError($errorCode){
        switch($errorCode){
            case '500':
                # Header and die are required instructions.
                header("HTTP/1.1 500 Bad connection, portal down");
                # Nothing else to do in the php.
                die("The server is down, we couldn't stablish the data base connection.");
                break;
            
            case '406':
                # User was not found.
                header("HTTP/1.1 406 User not found.");
                die("Wrong credentials provided.");
                break;

            default:
                # Most common message to send when encountered an error.
                header("HTTP/1.1 500 Bad connection, portal down");
                die("The server is down, we couldn't stablish the data base connection.");
                break;
        }
    }

    function attemptRegister(){
        # Variables needed from frontend.
        $uFirstName = $_POST["uFirstName"];
        $uLastName = $_POST["uLastName"];
        $uUsername = $_POST["uUsername"];
        $uPassword = $_POST["uPassword"];
        
        # Call made to dataLayer.php to execute query.
        $result = dbRegister($uFirstName, $uLastName, $uUsername, $uPassword);

        # Response from dataLayer.php.
        if($result["status"] == "SUCCESS"){
            echo json_encode($result);
        } else {
            handleError($result["status"]);
        }
    }
?>