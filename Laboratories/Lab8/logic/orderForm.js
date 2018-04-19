// Variable to control the summary display.
var showSummary = false;

// Variables for retrieving data from view.
var chosenBurgerType = $("input:radio[name=burgerType]").val();
var chosenBreadType = $("input:radio[name=breadType]").val();
var chosenSize = $("input:radio[name=burgerSize]").val();
var burgerQuantity = $("#burgerQuantity").val();

// Variables for displaying results.
var chosenCondiments = [];
var condimentsString = "";
var chosenSauces = [];
var saucesString = "";
var chosenToppings = [];
var chosenToppingsString = "";
var chosenFries = false;

$(document).ready(function(){
	// Load menu data
	loadMenu();
	
	// Validations when clicking the submit button.
	$("#submitButton").on("click", addToCart);

	// All inputs should be restarted if clicked.
	$("#restartButton").on("click", resetOrder);

	// Updating content when clicking the menu.
	$("#homeMenu > li").on("click", function(){
	
		// Hiding current element.
		$(".elementSelected").addClass("hiddenElement").removeClass("elementSelected");

		// Update option selected.
		$(".selected").removeClass("selected");

		// Show current element.
		var currentOption = $(this).attr("class");
		$("#" + currentOption).removeClass("hiddenElement");
		$("#" + currentOption).addClass("elementSelected");

		// Update option selected in menu.
		$(this).addClass("selected");
	});

	// Send info from modal to server, when sign in is required.
	$("#modalLoginButton").on("click", orderSendLoginInfoToServer);
});

// Function to load menu data from json file.
function loadMenu(){
   $.ajax({
	   url: "data/menu.json",
	   type: "GET",
	   dataType: "json",
	   success: function(dataReceived){
			// Load burger type data.
			var burgerTypeHTML = "";
			for(var i = 0; i < dataReceived.menu.burgerType.length; i++){
				burgerTypeHTML += '<input type="radio" name="burgerType" value="' + dataReceived.menu.burgerType[i].value + '">' + dataReceived.menu.burgerType[i].type + '</input> <br>';
			}
			$("#burgerTypeData").append(burgerTypeHTML);

			// Load bread type data.
			var breadTypeHTML = "";
			for(var i = 0; i < dataReceived.menu.breadType.length; i++){
				breadTypeHTML += '<input type="radio" name="breadType" value="' + dataReceived.menu.breadType[i].value + '">' + dataReceived.menu.breadType[i].type + '</input> <br>';
			}
			$("#breadTypeData").append(breadTypeHTML);

			// Load burger size data.
			var sizeTypeHTML = "";
			var size = dataReceived.menu.burgerSize.sizeS;
			sizeTypeHTML += '<input type="radio" name="burgerSize" value="' + size + '"/>' + size + '<br>';
			
			size = dataReceived.menu.burgerSize.sizeM;
			sizeTypeHTML += '<input type="radio" name="burgerSize" value="' + size + '"/>' + size + '<br>';

			size = dataReceived.menu.burgerSize.sizeL;
			sizeTypeHTML += '<input type="radio" name="burgerSize" value="' + size + '"/>' + size + '<br>';

			$("#burgerSizeData").append(sizeTypeHTML);

			// Load toppings data.
			var toppingsHTML = "";
			for(var i = 0; i < dataReceived.menu.toppings.length; i++){
				toppingsHTML += '<input type="checkbox" name="burgerToppings" value="' + dataReceived.menu.toppings[i].value + '">' + dataReceived.menu.toppings[i].topping + '</input> <br>';
			}
			$("#burgerToppingsData").append(toppingsHTML);

			// Load sauces data.
			var saucesHTML = "";
			for(var i = 0; i < dataReceived.menu.sauces.length; i++){
				saucesHTML += '<input type="checkbox" name="burgerSauce" value="' + dataReceived.menu.sauces[i].value + '">' + dataReceived.menu.sauces[i].sauce + '</input> <br>';
			}
			$("#burgerSauceData").append(saucesHTML);
	  },
	   error: function(errorMessage){
		   console.log("Error when loading menu: " + errorMessage);
	  }
  });
}

// Function to add order to cart.
function addToCart(){
	showSummary = false;
	validateOrder();

	if(showSummary){
		// 1. Condiments
		// Retrieving condiments selected.
		$("input[name=burgerCondiment]").each(function(){
			if (this.checked){
				 chosenCondiments.push($(this).val());
			 }
		});
		// Adding chosen condiments to a string.
		if(chosenCondiments.length > 0){
			for(var i = 0; i < chosenCondiments.length - 1; i++){
				condimentsString += chosenCondiments[i] + ", ";
			}
			condimentsString += chosenCondiments[chosenCondiments.length - 1];
		}
		// Showing condiments in the order's summary.
		$("#condimentsSummary").text("With " + condimentsString + ".");
		
		// 2. Sauces
		// Retrieving sauces selected.
		$("input[name=burgerSauce]").each(function(){
			if (this.checked){
				chosenSauces.push($(this).val());
			 }
		});
		// Adding chosen condiments to a string.
		if(chosenSauces.length > 0){
			for(var i = 0; i < chosenSauces.length - 1; i++){
				saucesString += chosenSauces[i] + ", ";
			}
			saucesString += chosenSauces[chosenSauces.length - 1];
		}
		// Showing sauces in the order's summary.
		$("#saucesSummary").text("With " + saucesString + ".");

		// 3. Toppings
		// Retrieving toppings selected.
		$("input[name=burgerToppings]").each(function(){
			if (this.checked){
				chosenToppings.push($(this).val());
			 }
		});
		// Adding each topping to html and string variable.
		if(chosenToppings.length == 0){
			// Hide the toppings header in the order's summary.
			$("#toppingHeader").css("display", "none");
		}else{
			$("#toppingHeader").css("display", "inherit");
			$("#toppingsSummary").html("");
			// Adding chosen condiments directly as html.
			for(var i = 0; i < chosenToppings.length; i++){
				$("#toppingsSummary").append('<li>' + chosenToppings[i] + '</li>');
				chosenToppingsString += chosenToppings[i] + " ";
			}
		}

		// 4. Fries
		// Display if fries were selected.
		if($("#addFries").is(":checked")){
			$("#friesSummary").text("Includes fries");
			chosenFries = true;
		}else{
			$("#friesSummary").text("With no fries");
		}
		
		// Display the in the burger summary.
		burgerSummary.textContent = burgerQuantity + " " + chosenBurgerType + " in " + chosenBreadType + " in size " + chosenSize + ".";

		// Display order summary div.
		$("#orderSummary").css("display", "inherit");

		// To save the order in the history, first check if the user is logged in.
		orderCheckSession();
	}else{
		$("#orderSummary").style.display = "none";
	}
}

// Function to validate that there is a current session.
function orderCheckSession(){
	console.log("Checking session to save order.");
	jsonToSend = {
		"action" : 'CHECKSESSION'
	};
	
	$.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		dataType : "json",
		data : jsonToSend,
		success : function(dataReceived){
			if(dataReceived.fName){
				console.log("Session was valid.");
				postOrder(dataReceived.uName, false);
			}else{
				console.log("Session was NOT valid. Showing modal.");
				orderShowModal();
			}
		},
		error : function(errorMessage){
			console.log("error in checkSession() " + errorMessage);
			alert(errorMessage.statusText);
		}
	});
}

// Function to post an order to the user's history (database).
function postOrder(username, fromModal){
	jsonToSend = {
		"uName" : username,
		"burgerQuantity" : burgerQuantity,
		"burgerType" : chosenBurgerType,
		"breadType" : chosenBreadType,
		"burgerSize" : chosenSize,
		"addCondiments" : condimentsString,
		"addToppings" : chosenToppingsString,
		"addSauces" : saucesString,
		"addFries" : chosenFries,
		"action" : "ADDORDER"
	};
	
	console.log(jsonToSend);
	console.log("AJAX call goes here.");
	// AJAX call to save order and give user feedback about the result.
	/* $.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
			console.log("Login success function.");
			if(dataReceived.status == 'SUCCESS'){
				alert("Saved! Your order will be delivered in less than 30 minutes, or free!");
				window.location.href = "./home.html";
			}else{
				alert("We were not able to save your order. Please try again.");
			}
		},
		error : function(errorMessage){
			console.log("Saving order function failed.");
			alert(errorMessage.statusText);
		}
	}); */
}

// Function that will popup when a user is not logged in.
function orderShowModal(){
	console.log("Showing modal.");
	$("#loginModal").dialog({modal: true, position:{ my: 'top', at: 'top+180'}});
}

// Function to send the login info to the server, when the user wants to save order but has to log in first.
function orderSendLoginInfoToServer(){
	var username = $("#modalUsername").val();
	var password = $("#modalPassword").val();

	if (username != "" && password != ""){
		var jsonToSend ={
			"uName" : username,
			"uPassword" : password,
			"rememberMe" : false,
			"action" : 'LOGIN'
		};

		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			dataType : "json",
			success : function(dataReceived){
				if(dataReceived.status == 'SUCCESS'){
					console.log("User logged in! Posting order!");
					$("#loginModal").dialog("close");
					postOrder(username, true);	
				}else{
					alert("Incorrect credentials. Please try again.");
				}
			},
			error : function(errorMessage){
				alert("Could not post message.");
			}
		});
	}
}

// Function to validate inputs.
function validateOrder(){

	// Validate burger type.
	if($("input[name=burgerType]").is(":checked")){
		$("#errorBurgerType").addClass("hiddenMessage");
		showSummary = true;
	}else{
		$("#errorBurgerType").removeClass("hiddenMessage");
		showSummary = false;
	}

	// Validate bread type.
	if($("input[name=breadType]").is(":checked")){
		$("#errorBreadType").addClass("hiddenMessage");
		showSummary = true;
	}else{
		$("#errorBreadType").removeClass("hiddenMessage");
		showSummary = false;
	}

	// Validate burger size.
	if($("input[name=burgerSize]").is(":checked")){
		$("#errorBurgerSize").addClass("hiddenMessage");
		showSummary = true;
	}else{
		$("#errorBurgerSize").removeClass("hiddenMessage");
		showSummary = false;
	}

	// Validate burger orders.
	if($("#burgerQuantity").val() == ""){
		$("#errorBurgerOrders").removeClass("hiddenMessage");
		showSummary = false;
	}else{
		$("#errorBurgerOrders").addClass("hiddenMessage");
		showSummary = true;
	}
}

// Function to reset order.
function resetOrder(){
	// Reset order inputs.
	$("input:radio[name=burgerType]").prop("checked", false);
	$("input:radio[name=breadType]").prop("checked", false);
	$("input:checkbox[name=burgerCondiment]").prop("checked", false);
	$("input:checkbox[name=burgerSauce]").prop("checked", false);
	$("input:checkbox[name=burgerToppings]").prop("checked", false);
	$("input:radio[name=burgerSize]").prop("checked", false);
	$("#addFries").prop("checked", false);
	$("#burgerQuantity").val("");
	
	// Reset order summary.
	$("#burgerSummary").html("");
	$("#condimentsSummary").html("");
	$("#saucesSummary").html("");
	$("#toppingsSummary").html("");
	$("#friesSummary").html("");

	// Change display of order summary.
	$("#orderSummary").css("display","none");

	// Reset order errors.
	$("#errorBurgerType").addClass("hiddenMessage");
	$("#errorBreadType").addClass("hiddenMessage");
	$("#errorBurgerSize").addClass("hiddenMessage");
	$("#errorBurgerOrders").addClass("hiddenMessage");
}