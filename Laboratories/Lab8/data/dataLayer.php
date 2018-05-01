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
	function dbLoadComments(){
		$connection = connectionDB();

		if($connection != null){
			# Query to retrieve all comments.
			$sql = "SELECT c.username as 'username', u.email as 'email', c.commentText as 'commentText'
			FROM Comment c JOIN Users u
			ON c.username = u.username
			ORDER BY c.id ASC";
			$result = $connection->query($sql);

			if($result){
				$response["status"] = "SUCCESS";
				$response_comments = array();
				while ($row = $result->fetch_assoc()){
					array_push($response_comments, ["username" => $row["username"], "email" => $row["email"], "comment" => $row["commentText"]]);
				}
				$response["comments"] = $response_comments;
				return $response;
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
	
	# dbRetrieveOrders
	# Function to gather all orders from user's history.
	function dbRetrieveOrders($username){
		$connection = connectionDB();

		if ($connection != null){
			# Query to retrieve all order id's from username.
			$sql = "SELECT id, quantity, addFries, burgerType, breadType, size, sauce from Orders WHERE username = '$username'";
			$sql_result = $connection->query($sql);

			if($sql_result){
				# We transform the result to an array so we can access each order.
				$result = array();
				while($row = $sql_result->fetch_assoc()){
					$row_id = $row["id"];
					$bread = $row["breadType"];
					$burger = $row["burgerType"];
					$addFries = $row["addFries"];
					$quantity = $row["quantity"];
					$sauce = $row["sauce"];
					$size = $row["size"];

					# We are missing to retrieve the order condiments.
					$sql_condiments = "SELECT idCondiment from OrderCondiments WHERE idOrder = '$row_id'";
					$result_condiments = $connection->query($sql_condiments);
					$currentRow_condiment = array();
					while($row_condiment = $result_condiments->fetch_assoc()){
						array_push($currentRow_condiment, $row_condiment["idCondiment"]);
					}
		
					# We are missing to retrieve the order toppings.
					$sql_toppings = "SELECT idTopping from OrderToppings WHERE idOrder = '$row_id'";
					$result_toppings = $connection->query($sql_toppings);
					$currentRow_topping = array();
					while($row_topping = $result_toppings->fetch_assoc()){
						array_push($currentRow_topping, $row_topping["idTopping"]);
					}

					# Now, let's wrap it all in one row to push it to the result.
					$currentRow = array("orderId"=>$row_id, "condiments" => $currentRow_condiment, "toppings" => $currentRow_topping, "bread"=>$bread, "burger"=>$burger, "size"=>$size, "sauce"=>$sauce, "addFries"=>$addFries, "quantity"=>$quantity);
					array_push($result, $currentRow);
				}

				# And finally, send the result as an array with all the orders.
				return ["status" => "SUCCESS", "orders" => $result];

			} else {
				# Error when trying to retrieve orders.
				return ["status" => "600"];
			}
		} else {
			# Database connection was unsuccessful.
			return ["status"=>"500"];
		}
	}

	# dbSaveUserOrder
	# Function to save a user's order.
	function dbSaveUserOrder($burger, $bread, $size, $condiments, $toppings, $sauce, $addFries, $quantity, $user){
		$connection = connectionDB();

		if ($connection != null){

			if($sauce == ''){
				$sql = "INSERT INTO Orders(username, addFries, quantity, burgerType, breadType, size, sauce)
					VALUES  ('$user', '$addFries', '$quantity', '$burger', '$bread', '$size', NULL)";
			} else {
				$sql = "INSERT INTO Orders(username, addFries, quantity, burgerType, breadType, size, sauce)
					VALUES  ('$user', '$addFries', '$quantity', '$burger', '$bread', '$size', '$sauce')";
			}
			$sql_result = $connection->query($sql);
			
			if($sql_result){
				# We addeed the order to the Orders table, but we are missing to update the OrderCondiments and OrderToppings table.
				$sql_id = "SELECT MAX(id) as latest FROM Orders";
				$result_latest_id = $connection->query($sql_id);
				$latest_id = "";
		
				while($row = $result_latest_id->fetch_assoc()){
					$latest_id = $row['latest'];
				}
		
				if($condiments != ''){
					foreach ($condiments as $condiment) {
						$sql_condiments = "INSERT INTO OrderCondiments(idOrder, idCondiment)
								VALUES  ('$latest_id', '$condiment')";
			
						if(!$sql_condiments){
							# Error when trying to insert to OrderCondiments table.
							return ["status"=>"600"];
						}
					}
				}
		
				if($toppings != ''){
					foreach ($toppings as $topping) {
						$sql_toppings = "INSERT INTO OrderToppings(idOrder, idTopping)
								VALUES  ('$latest_id', '$topping')";
			
						if(!$sql_toppings){
							# Error when trying to insert to OrderToppings table.
							return ["status"=>"600"];
						}
					}
				}
				return ["status"=>"SUCCESS"];
			} else {
				# Error when trying to insert to Orders table.
				return ["status"=>"600"];
			}
		} else {
			# Database connection was unsuccessful.
			return ["status"=>"500"];
		}

	}
?>