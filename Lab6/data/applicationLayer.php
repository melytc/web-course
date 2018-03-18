<?php
	# Type of data applicationLayer is sending to the frontend.
	header('Content-type: application/json');

	# Type of data to be received in the applicationLayer.
    header('Accept: application/json');

    require_once __DIR__ . '/dataLayer.php';

    # Instruction for debugging.
    # ini_set('display_errors', 1);
    # ini_set('log_errors', 1);
    # error_reporting(E_ALL);

    # This parameter is sent from frontend in order to know what to do.
    $action = $_POST["action"];

    switch($action){
        case 'LOGIN':
            attemptLogin();
            break;
    }

    # attemptLogin
    # Function that will attempt performing a login with the uName and uPassword.
    # Returns the result as a json_encode, or calls the function handleError when error occurs.
    function attemptLogin(){
        # Receive the login and password from frontend.
        $uName = $_POST["uName"];
        $uPassword = $_POST["uPassword"];
        
        # Call to function dbLogin from dataLayer.
        $result = dbLogin($uName, $uPassword);

        if($result["status"] == "SUCCESS"){
            # Everything went okay, send info to the frontend.
            echo json_encode($result);
        } else {
            # For all error handling.
            handleError($result["status"]);
        }
    }

    # handleError
    # Function that given an error code, returns the appropriate description on header.
    function handleError($errorCode){
        switch($errorCode){
            case '500':
                header("HTTP/1.1 500 Internal Server Error: Bad connection, portal down");
                die("The server is down, we couldn't establish the data base connection.");
                break;
            
            case '406':
                # User was not found.
                header("HTTP/1.1 404 Not found: User not found.");
                die("Wrong credentials provided.");
                break;

            default:
                # Most common message to send when encountered an error.
                header("HTTP/1.1 500 Internal Server Error: Bad connection, portal down");
                die("The server is down, we couldn't stablish the data base connection.");
                break;
        }
    }