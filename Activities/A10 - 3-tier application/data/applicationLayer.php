<?php
	# Type of data you are sending to the frontend!
	header('Content-type: application/json');

	# Type of data I'm going to be receiving here in the backend.
    header('Accept: application/json');

    require_once __DIR__ . '/dataLayer.php';

    # Instruction for debugging.
    # ini_set('display_errors', 1);
    # ini_set('log_errors', 1);
    # error_reporting(E_ALL);

    # Parameter that it is sent to the application layer to know what to do.
    $action = $_POST["action"];

    switch($action){
        case 'LOGIN':
            attemptLogin();
            break;
        case 'REGISTER':
            attemptRegister();
            break;
        case 'LOGOUT':
            endSession();
            break;
        case 'CHECKSESSION':
            checkSession();
            break;
    }

    function handleError($errorCode){
        switch($errorCode){
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

            case '409':
                # User is already in use upong register attempt.
                header('HTTP/1.1 409 Conflict: Username already in use, please select another one');
                die("Username already in use.");
                break;
            
            case '500':
                header("HTTP/1.1 500 Internal Server Error: Bad connection, portal down");
                die("The server is down, we couldn't establish the database connection.");
                break;
            
            default:
                # Most common message to send when encountered an error.
                header("HTTP/1.1 500 Internal Server Error: Bad connection, portal down");
                die("Default: The server is down, we couldn't establish the database connection.");
                break;
        }
    }

    function attemptLogin(){
        # Receive the login and password from frontend.
        $uName = $_POST["uName"];
        $uPassword = $_POST["uPassword"];
        $rememberMe = $_POST["rememberMe"];
        
        # We are not going to make the query and the call.
        $result = dbLogin($uName, $uPassword);

        if($result["status"] == "SUCCESS"){
            # Everything went okay, send info to the frontend.
            
            # Setting cookie for 5 days.
            if($rememberMe == "true"){
                setcookie("cookieUsername", $uName, time() + 3600*24*5, "/", "", 0);
            }
            # Data is raw. If wanted to clean it, should be done here.
            echo json_encode($result);
        } else {
            # All error handling.
            handleError($result["status"]);
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

    function startSession($result){
        # Session is started.
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

    function endSession(){
        session_start();
        unset($_SESSION['firstName']);
        unset($_SESSION['lastName']);
        session_destroy();
        echo json_encode(["status" => 'SUCCESS']);   	    
    }

    function checkSession(){
        session_start();
        if(isset($_SESSION["uName"])){
            echo json_encode(["fName" => $_SESSION["fName"], "lName" => $_SESSION["lName"], "uName" => $_SESSION["uName"]]);
        } else {
            echo json_encode(["fName" => false, "status" => "error"]);
        }
    }
?>