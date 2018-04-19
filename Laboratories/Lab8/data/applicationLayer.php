<?php
	# Type of data applicationLayer is sending to the frontend.
	header('Content-type: application/json');

	# Type of data to be received in the applicationLayer.
    header('Accept: application/json');

    require_once __DIR__ . '/dataLayer.php';

    # Instruction for debugging.
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('log_errors', 1);

    # All POST calls will enter here.
    $postAction = $_POST["action"];

    # Start session.
    session_start();

    switch($postAction){
        case 'LOGIN':
            attemptLogin();
            break;
        case 'LOGOUT':
            endSession();
            break;
        case 'REGISTER':
            attemptRegister();
            break;
        case 'POSTCOMMENT':
            postComment();
            break;
        case 'CHECKSESSION':
            checkSession();
            break;
        case 'CHECKCOOKIE':
            checkCookie();
            break;
        case 'LOADCOMMENTS':
            loadComments();
            break;
        case 'ADDORDER':
            addOrder();
            break;
    }

    # attemptLogin
    # Function that will attempt performing a login with the uName and uPassword.
    # Returns the result as a json_encode, or calls the function handleError when an error occurs.
    function attemptLogin(){

        # Receive the username and 'remember me' value from frontend.
        $uName = $_POST["uName"];
        $rememberMe = $_POST["rememberMe"];
        
        # Call to function dbValidateUser from dataLayer to see if the username exists.
        $result = dbValidateUser($uName);

        if($result["status"] == "SUCCESS"){
            
            # We have to validate the input password and the decrypted password.
            # Decrypt the password from database.
            $decryptedPassword = @decryptPassword($result['passwrd']);

            # Input password.
            $uPassword = $_POST['uPassword'];

            # Compare the decrypted password with the one provided by the user
            if ($decryptedPassword == $uPassword){
                # Start user's session.
                startSession($result);

                # Setting cookie for 5 days.
                if($rememberMe == "true"){
                    setcookie("cookieUsername", $uName, time() + 3600*24*5, "/", "", 0);
                }

                # Everything went okay, send info to the frontend.
                echo json_encode($result);
            } else {
                header('HTTP/1.1 306 Wrong credentials');
                die("Wrong credentials");
            }
        } else {
            # For all error handling.
            handleError($result["status"]);
        }
    }

    # startSession
    # Function that will enable saving a session when logged-in or when registered.
    function startSession($result){
        # Session is started.
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
        unset($_SESSION["fName"]);
        unset($_SESSION["lName"]);
        unset($_SESSION["uName"]);
        session_destroy();
    }

    # attemptRegister
    # Function that will attempt performing a registration with the necessary variables.
    # Returns the result as a json_encode, or calls the function handleError when an error occurs.
    function attemptRegister(){
        # Receive the variables needed to register a user.
        $uFname = $_POST["uFirstName"];
        $uLname = $_POST["uLastName"];
        $uName = $_POST["uUsername"];
        $userPassword = @encryptPassword();
        $uEmail = $_POST["uEmail"];
        $userInfo = ["username" => $uName,"firstname" => $uFname, "lastname" => $uLname, "status"=>"SUCCESS"];

        $result = dbRegister($uFname, $uLname, $uName, $userPassword, $uEmail);

        if($result["status"] == "SUCCESS"){
            startSession($userInfo);
            echo json_encode($result);
        } else {
            # For all error handling.
            handleError($result["status"]);
        }
    }

    # encryptPassword
    # Function to encrypt the password of the user, using the mcrypt_encrypt. [DEPRECATED]
    function encryptPassword() {
        $userPassword = $_POST["uPassword"];

        $key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
        $key_size =  strlen($key);

        $plaintext = $userPassword;

        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

        $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $plaintext, MCRYPT_MODE_CBC, $iv);
        $ciphertext = $iv . $ciphertext;

        $userPassword = base64_encode($ciphertext);

        return $userPassword;
    }

    # decryptPassword
    # Function to decrypt the password of the user.
    function decryptPassword($password){
        $key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");

        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);

        $ciphertext_dec = base64_decode($password);
        $iv_dec = substr($ciphertext_dec, 0, $iv_size);
        $ciphertext_dec = substr($ciphertext_dec, $iv_size);

        $password = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);

        $count = 0;
        $length = strlen($password);

        for ($i = $length - 1; $i >= 0; $i --){
            if (ord($password{$i}) === 0){
                $count ++;
            }
        }

        $password = substr($password, 0,  $length - $count);

        return $password;
    }

    # checkSession
    # Function to validate if there is an active session alive.
    # Returns user's first name, last name and username if there is an active session, or a false value in first name key if no session was found.
    function checkSession(){
        if(isset($_SESSION["uName"])){
            echo json_encode(["fName" => $_SESSION["fName"], "lName" => $_SESSION["lName"], "uName" => $_SESSION["uName"]]);
        } else {
            echo json_encode(["fName" => false]);
        }
    }

    # checkCookie
    # Function that checks whether the user wants to remember her username.
    # If the cookie was already set, returns the username.
    # Else return a message "no cookie set"
    function checkCookie(){
        if(isset($_COOKIE['cookieUsername'])){
            echo json_encode(['cookieUsername' => $_COOKIE['cookieUsername']]);   	    
        } else {
            echo json_encode(['message' => 'No cookie set', 'code' => 1337]);
        }
    }

    # loadComments
    # Function that will retrieve all comments from the data layer.
    function loadComments(){
        $result = dbLoadComments();

        if($result["status"] == "SUCCESS"){
            # Everything went okay, send info to the frontend.
            echo json_encode($result);
        } else {
            # For all error handling.
            handleError($result["status"]);
        }
    }

    # postComment
    # Function that will send to the data layer a commnet to save it.
    function postComment(){
        $uName = $_POST["username"];
        $commentText = $_POST["commentText"];
        $result = dbPostComment($uName, $commentText);

        if($result["status"] == "SUCCESS"){
            # Everything went okay, send info to the frontend.
            echo json_encode($result);
        } else {
            # For all error handling.
            handleError($result["status"]);
        }
    }

    # addOrder
    # Function that will update the database with a new user order.
    function addOrder(){
        $uName = $_POST["username"];
        $burgerQuantity = $_POST["burgerQuantity"];
        $burgerType = $_POST["burgerType"];
        $breadType = $_POST["breadType"];
        $burgerSize = $_POST["burgerSize"];
        $addCondiments = $_POST["addCondiments"];
        $addToppings = $_POST["addToppings"];
        $addSauces = $_POST["addSauces"];
        $addFries = $_POST["addFries"];

        $result = dbAddOrder($uName, $burgerQuantity, $burgerType, $breadType, $burgerSize, $addCondiments, $addToppings, $addSauces, $addFries);

        if($result["status"] == "SUCCESS"){
            echo json_encode($result);
        } else {
            handleError($result["status"]);
        }
    }
    
    # handleError
    # Function that given an error code, returns the appropriate description on header.
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
?>