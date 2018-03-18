<?php
	# Type of data applicationLayer is sending to the frontend.
	header('Content-type: application/json');

	# Type of data to be received in the applicationLayer.
    header('Accept: application/json');

    require_once __DIR__ . '/dataLayer.php';

    # Instruction for debugging.
    ini_set('display_errors', 1);
    ini_set('log_errors', 1);
    error_reporting(E_ALL);

    # This parameter is sent from frontend in order to know what to do.
    $action = $_POST["action"];

    switch($action){
        case 'LOGIN':
            attemptLogin();
            break;
        case 'LOGOUT':
            endSession();
            break;
        case 'REGISTER':
            attemptRegister();
            break;
    }

    # attemptLogin
    # Function that will attempt performing a login with the uName and uPassword.
    # Returns the result as a json_encode, or calls the function handleError when an error occurs.
    function attemptLogin(){
        # Receive the login and password from frontend.
        $uName = $_POST["uName"];
        $uPassword = $_POST["uPassword"];
        
        # Call to function dbLogin from dataLayer.
        $result = dbLogin($uName, $uPassword);

        if($result["status"] == "SUCCESS"){
            startSession($result);
            # Everything went okay, send info to the frontend.
            echo json_encode($result);
        } else {
            # For all error handling.
            handleError($result["status"]);
        }
    }

    # startSession
    # Function that will enable saving a session when logged-in or when registered.
    function startSession($result){
        // Session is started.
        session_start();
        if (! isset($_SESSION['uName'])) {
            $_SESSION['uName'] = $result['username'];
        }
        if (! isset($_SESSION['fName'])) {
            $_SESSION['fName'] = $result['firstname'];
        }
        if (! isset($_SESSION['lName'])) {
            $_SESSION['lName'] = $result['lastname'];
        }
    }

    # endSession
    # Function that will unset the session variables and destroy the session, intended to be used when a user logs out.
    function endSession(){
        session_start();
        unset($_SESSION["fName"]);
        unset($_SESSION["lName"]);
        unset($_SESSION["uName"]);
        session_destroy();
    }

    # handleError
    # Function that given an error code, returns the appropriate description on header.
    function handleError($errorCode){
        switch($errorCode){
            case '500':
                header("HTTP/1.1 500 Internal Server Error: Bad connection, portal down");
                die("The server is down, we couldn't establish the data base connection.");
                break;
            
            case '404':
                # User was not found.
                header("HTTP/1.1 404 Not found: User not found.");
                die("Wrong credentials provided.");
                break;

            case '406':
                # User could not be registered.
                header("HTTP/1.1 406 Not acceptable: User not registered.");
                die("Could not add new user, please try again.");
                break;

            default:
                # Most common message to send when encountered an error.
                header("HTTP/1.1 500 Internal Server Error: Bad connection, portal down");
                die("The server is down, we couldn't stablish the data base connection.");
                break;
        }
    }

    # attemptRegister
    # Function that will attempt performing a registration with the necessary variables.
    # Returns the result as a json_encode, or calls the function handleError when an error occurs.
    function attemptRegister(){
        # Receive the variables needed to register a user.
        $uFname = $_POST["uFirstName"];
        $uLname = $_POST["uLastName"];
        $uName = $_POST["uUsername"];
        $uPassword = $_POST["uPassword"];
        $uEmail = $_POST["uEmail"];

        $result = dbRegister($uFname, $uLname, $uName, $uPassword, $uEmail);

        if($result["status"] == "SUCCESS"){
            startSession($result);
            echo json_encode($result);
        } else {
            # For all error handling.
            handleError($result["status"]);
        }
    }

?>