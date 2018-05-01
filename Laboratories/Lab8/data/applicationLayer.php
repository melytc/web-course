<?php
	session_start();
	# Type of data applicationLayer is sending to the frontend.
	header('Content-type: application/json');

	# Type of data to be received in the applicationLayer.
	header('Accept: application/json');

	require_once __DIR__ . '/dataLayer.php';

	# Instruction for debugging.
	# error_reporting(E_ALL);
	# ini_set('display_errors', 1);
	# ini_set('log_errors', 1);

	# All POST calls will enter here.
	$postAction = $_POST["action"];

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
		case 'LOADORDERS':
			loadOrders();
			break;
		case 'POSTORDER':
			postOrder();
			break;
	}

	# attemptLogin
	# Function that will attempt performing a login with the uName and uPassword.
	# Returns the result as a json_encode, or calls the function handleError when an error occurs.
	function attemptLogin(){

		# Receive the login and password from frontend.
		$uName = $_POST["uName"];
		$uPassword = $_POST["uPassword"];
		$rememberMe = $_POST["rememberMe"];
		
		# Call to function dbLogin from dataLayer.
		$result = dbLogin($uName, $uPassword);

		if($result["status"] == "SUCCESS"){
			startSession($result);
			# Setting cookie for 5 days.
			if($rememberMe == "true"){
				setcookie("cookieUsername", $uName, time() + 3600*24*5, "/", "", 0);
			}
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
				
			case '408':
				header("HTTP/1.1 408 User is not authenticated.");
				die("User is not authenticated.");
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
				
			case '600':
				header("HTTP/1.1 600 Invalid request.");
				die("Something went wrong.");
				break;
			
			default:
				# Most common message to send when encountered an error.
				header("HTTP/1.1 500 Internal Server Error: Bad connection, portal down");
				die("Default: The server is down, we couldn't establish the database connection.");
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
		$userInfo = ["username" => $uName,"firstname" => $uFname, "lastname" => $uLname, "status"=>"SUCCESS"];

		$result = dbRegister($uFname, $uLname, $uName, $uPassword, $uEmail);

		if($result["status"] == "SUCCESS"){
			startSession($userInfo);
			echo json_encode($result);
		} else {
			# For all error handling.
			handleError($result["status"]);
		}
	}

	# checkSession
	# Function to validate if there is an active session alive.
	# Returns user's first name, last name and username if there is an active session, or a false value in first name key if no session was found.
	function checkSession(){
		if(isset($_SESSION["uName"])){
			echo json_encode(["fName" => $_SESSION["fName"], "lName" => $_SESSION["lName"], "uName" => $_SESSION["uName"]]);
		} else {
			echo json_encode(["fName" => false, "status" => "ERROR"]);
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
	
	# loadOrders
	# Function that will retrieve all user's orders from the data layer.
	function loadOrders(){
		$result = dbRetrieveOrders($_SESSION["uName"]);
		if($result["status"] == "SUCCESS"){;
			echo json_encode($result);
		}else{
			handleError($result["status"]);
		}

		# Tried this way, using my already built function checkSession, but encountered errors when returning to ajax call :(
		/* $sessionValidation = checkSession();

		if($sessionValidation["status"] == "ERROR"){
			handleError('408');
		} else {
			$result = dbRetrieveOrders($sessionValidation->{"uName"});
			if($result["status"] == "SUCCESS"){
				# Everything went okay, send info to the frontend.
				echo json_encode($result);
			} else {
				# For all error handling.
				#handleError($result["status"]);
				echo json_encode(["STATUS" => "ERROR"]);
			}
		} */
	}

	function postOrder(){
		$burger = $_POST["burger"];
		$bread = $_POST["bread"];
		$size = $_POST["size"];
		$condiments = $_POST["condiments"];
		$toppings = $_POST["toppings"];
		$sauce = $_POST["sauce"];
		$addFries = $_POST["addFries"]; 
		$quantity = $_POST["quantity"];
		$user = $_SESSION["uName"];

		$result = dbSaveUserOrder($burger, $bread, $size, $condiments, $toppings, $sauce, $addFries, $quantity, $user);
		
		if($result["status"] == "SUCCESS"){
			echo json_encode($result);
		} else {
			handleError($result["status"]);
		}
	}
?>