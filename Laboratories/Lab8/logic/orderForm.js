var showSummary = false;

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
		
		loadPreviousOrders();
    });
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
                burgerTypeHTML += '<input id="' + dataReceived.menu.burgerType[i].value + '" type="radio" name="burgerType" value="' + dataReceived.menu.burgerType[i].type + '">' + dataReceived.menu.burgerType[i].type + '</input> <br>';
            }
			$("#burgerTypeData").append(burgerTypeHTML);

            // Load bread type data.
            var breadTypeHTML = "";
            for(var i = 0; i < dataReceived.menu.breadType.length; i++){
                breadTypeHTML += '<input id="' + dataReceived.menu.breadType[i].value + '" type="radio" name="breadType" value="' + dataReceived.menu.breadType[i].type + '">' + dataReceived.menu.breadType[i].type + '</input> <br>';
            }
            $("#breadTypeData").append(breadTypeHTML);

            // Load burger size data.
            var sizeTypeHTML = "";
			sizeTypeHTML += '<label><input id="sizeS" type="radio" name="burgerSize" value="' + dataReceived.menu.burgerSize['sizeS'] + '"> ' + dataReceived.menu.burgerSize['sizeS'] + ' </label>'; 
			sizeTypeHTML += '<label><input id="sizeM" type="radio" name="burgerSize" value="' + dataReceived.menu.burgerSize['sizeM'] + '"> ' + dataReceived.menu.burgerSize['sizeM'] + ' </label>'; 
			sizeTypeHTML += '<label><input id="sizeL" type="radio" name="burgerSize" value="' + dataReceived.menu.burgerSize['sizeL'] + '"> ' + dataReceived.menu.burgerSize['sizeL'] + ' </label>'; 
            $("#burgerSizeData").append(sizeTypeHTML);

            // Load toppings data.
            var toppingsHTML = "";
            for(var i = 0; i < dataReceived.menu.toppings.length; i++){
                toppingsHTML += '<input type="checkbox" name="burgerToppings" value="' + dataReceived.menu.toppings[i].topping + '">' + dataReceived.menu.toppings[i].topping + '</input> <br>';
			}
            $("#burgerToppingsData").append(toppingsHTML);

            // Load sauces data.
            var saucesHTML = "";
            for(var i = 0; i < dataReceived.menu.sauces.length; i++){
                saucesHTML += '<input type="radio" name="burgerSauce" value="' + dataReceived.menu.sauces[i].sauce + '">' + dataReceived.menu.sauces[i].sauce + '</input> <br>';
            }
            $("#burgerSauceData").append(saucesHTML);

       },
       error: function(errorMessage){
       }
   });
}

// Function to add order to cart.
function addToCart(){
    showSummary = false;
    validateOrder();

    if(showSummary){
		checkLogin();
		if(isUserLoggedin){
			var chosenBurgerType = $("input:radio[name=burgerType]").val();
			var chosenBreadType = $("input:radio[name=breadType]").val();
			var chosenSize = $("input:radio[name=burgerSize]").val();
			var burgerQuantity = $("#burgerQuantity").val();
			// Display chosen sauce.
			var chosenSauce = $("input:radio[name=burgerSauce]:checked").val();
			 $("#saucesSummary").text(chosenSauce);
			
			// Display chosen condiments.
			var chosenCondiments = [];
	
			$("input[name=burgerCondiment]").each(function() {
				if (this.checked) {
					 chosenCondiments.push($(this).val());
				  }
			 });
			 var condimentsSummaryString = "";
			 if(chosenCondiments.length > 0){
				condimentsSummaryString = "With ";
				for(var i = 0; i < chosenCondiments.length - 1; i++){
					condimentsSummaryString += chosenCondiments[i] + ", ";
				}
				condimentsSummaryString += chosenCondiments[chosenCondiments.length - 1] + ".";
			 }
			 $("#condimentsSummary").text(condimentsSummaryString);
			
	
			// Display toppings.
			var chosenToppings = [];
			$("input[name=burgerToppings]").each(function() {
				if (this.checked) {
					chosenToppings.push($(this).val());
				  }
			 });
			 
			if(chosenToppings.length == 0){
				// Hide the toppings header.
				$("#toppingHeader").css("display", "none");
			} else {
				$("#toppingHeader").css("display", "inherit");
				$("#toppingsSummary").html("");
				for(var i = 0; i < chosenToppings.length; i++) {
					$("#toppingsSummary").append('<li>' + chosenToppings[i] + '</li>');
				}
			}
	
			var addFries;
			// Display if fries were selected.
			if($("#addFries").is(":checked")){
				$("#friesSummary").text("Includes fries");
				addFries = 1;
			} else {
				$("#friesSummary").text("With no fries");
				addFries = 0;
			}
			
			// Display order quantity.
			burgerSummary.textContent = burgerQuantity + " ";
	
			// Display the burger summary.
			burgerSummary.textContent += chosenBurgerType + " in " + chosenBreadType + " in size " + chosenSize + ".";
			
			// Display order summary.
			$("#orderSummary").css("display", "inherit");

			/* if(chosenCondiments == [])
			chosenCondiments = NULL;
		
			if(chosenToppings == [])
				chosenToppings = NULL;
			
			if(chosenSauce == [])
				chosenSauce = NULL; */

			// Add to user's history.
			var jsonObject = {
				"burger" : chosenBurgerType,
				"bread" : chosenBreadType,
				"size" : chosenSize,
				"quantity" : burgerQuantity,
				"condiments" : chosenCondiments,
				"toppings" : chosenToppings,
				"sauce" : chosenSauce,
				"addFries" : addFries, 
				"action" : "POSTORDER"
			};

			console.log(jsonObject);
	
			$.ajax({
				url : "./data/applicationLayer.php",
				type : "POST",
				dataType : "json",
				data : jsonObject,
				success : function(dataReceived){
					if(dataReceived.status == "SUCCESS"){
						console.log("Success: order posted.");
					} else {
						console.log("Error: order was not posted.");
					}
				},
				error : function(errorMessage){
					console.log("Error in ajax call." + errorMessage);
				}
			});
			
			// Hiding current element.
			$(".elementSelected").addClass("hiddenElement").removeClass("elementSelected");
	
			// Update option selected.
			$(".selected").removeClass("selected");
	
			// Redirect to user's previous orders.
			var currentOption = "myHistory";
			$("#" + currentOption).removeClass("hiddenElement");
			$("#" + currentOption).addClass("elementSelected");
	
			// Update option selected in menu.
			$(this).addClass("selected");
	
			// Refresh past orders.
			loadPreviousOrders();
		} else {
			alert("Please login first. :)");
		}
    } else {
		$("#orderSummary").style.display = "none";
    }
}

// Function to validate inputs.
function validateOrder(){

    // Validate burger type.
    if($("input[name=burgerType]").is(":checked")) {
        $("#errorBurgerType").addClass("hiddenMessage");
        showSummary = true;
    } else {
        $("#errorBurgerType").removeClass("hiddenMessage");
        showSummary = false;
    }

    // Validate bread type.
    if($("input[name=breadType]").is(":checked")) {
        $("#errorBreadType").addClass("hiddenMessage");
        showSummary = true;
    } else {
        $("#errorBreadType").removeClass("hiddenMessage");
        showSummary = false;
    }

    // Validate burger size.
    if($("input[name=burgerSize]").is(":checked")) {
        $("#errorBurgerSize").addClass("hiddenMessage");
        showSummary = true;
    } else {
        $("#errorBurgerSize").removeClass("hiddenMessage");
        showSummary = false;
    }

    // Validate burger orders.
    if($("#burgerQuantity").val() == "") {
        $("#errorBurgerOrders").removeClass("hiddenMessage");
        showSummary = false;
    } else {
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

// Function to retrieve previous orders.
function loadPreviousOrders(){
	var jsonObject = {
		"action" : "LOADORDERS"
	};

	// Empty the list.
	$("#previousOrders").html("");

	$.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		dataType : "json",
		data : jsonObject,
		success : function(dataReceived){
			// Retrieve each order and add it to the list.
			var orders = dataReceived.orders;
			if(orders.length == 0){
				$("#previousOrders").html("You have no orders registered.");
			}
			for(var i = 0; i < orders.length; i++) {
				$("#previousOrders").append('<li class="previousOrderList"><blockquote id=order'+ i +'></blockquote></li>');
				$("#order" + i).append("<p>" + orders[i].quantity + " " + orders[i].burger + " in " + orders[i].bread + " " + orders[i].size + "</p>");
				if(orders[i].sauce != null){
					$("#order" + i).append("<p>" + orders[i].sauce + " sauce" + "</p>"); 
				}else {
					$("#order" + i).append("<p>No sauce</p>"); 
				}

				if(orders[i].addFries == 1){
					$("#order" + i).append("<p>With fries</p>"); 
				}
				else{
					$("#order" + i).append("<p>With no fries</p>"); 
				}

				// Add condiments list.
				$("#order" + i).append('<div class="condimentsListPrevious" id="condimentsListTitle' + i + '"><h5>Condiments</h5></div>')
				var idOrderCondiments = "order-condiments-" + (i+1);
				var condimentsList = "<ul class=grid id=" + idOrderCondiments + "></ul>"
				$("#condimentsListTitle" + i).append(condimentsList);
				var condiments = orders[i].condiments;
				if(condiments.length == 0){
					$("#" + idOrderCondiments).append('<li>None</li>');
				}
				for(var j = 0; j < condiments.length; j++) {
					$("#" + idOrderCondiments).append('<li>' + condiments[j] + '</li>');
				}

				// Add toppings list.
				$("#order" + i).append('<div class="toppingsListPrevious" id="toppingsListTitle' + i + '"><h5>Toppings</h5></div>')
				var idOrderToppings = "order-toppings-" + (i+1);
				var toppingsList = "<ul class=grid id=" + idOrderToppings + "></ul>"
				$("#toppingsListTitle" + i).append(toppingsList);
				var toppings = orders[i].toppings;
				if(toppings.length == 0){
					$("#" + idOrderToppings).append('<li>None</li>');
				}
				for(var j = 0; j < toppings.length; j++) {
					$("#" + idOrderToppings).append('<li>' + toppings[j] + '</li>');
				}

			}
		},
		error : function(errorMessage){
			$("#previousOrders").html("");
			console.log("Entered error function in ajax call for loadPreviousOrders." + errorMessage);
		}
	});
}