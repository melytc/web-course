var showSummary = false;

document.addEventListener("DOMContentLoaded", function() {
    
	// Validation should start when user clicks on Add to Cart button.
	var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", addToCart);
    
    // When reset button is clicked, all inputs should be restarted.
    var resetButton = document.getElementById("restartButton");
    resetButton.addEventListener("click", resetForm);
});

// Function to add order to cart.
function addToCart(){
    showSummary = false;
    validateForm();

    if(showSummary){
         // Display chosen burger type.
        var burgerType = document.getElementsByName("burgerType");
        var burgerTypeChosen = "";

        for(var i = 0; i < burgerType.length; i++){
            if(burgerType[i].checked){
                burgerTypeChosen = burgerType[i].value;
                break;
            }
        }

        // Display chosen bread type.
        var breadTypeList = document.getElementsByName("breadType");
        var breadTypeChosen = "";

        for(var i = 0; i < breadTypeList.length; i++){
            if(breadTypeList[i].checked){
                breadTypeChosen = breadTypeList[i].value;
                break;
            }
        }

        // Display chosen condiments.
        var condimentList = document.getElementsByName("burgerCondiment");
        var chosenCondiments = [];
        
		for(var i = 0; i < condimentList.length; i++){
			if(condimentList[i].checked){
				chosenCondiments.push(condimentList[i].value);
			}
		}
		condimentsSummary.textContent = "";

		if(chosenCondiments.length > 0)
		{
			condimentsSummary.textContent = "With "
			for(var i = 0; i < chosenCondiments.length - 1; i++){
				condimentsSummary.textContent += chosenCondiments[i] + ", "
			}
			condimentsSummary.textContent += chosenCondiments[chosenCondiments.length - 1] + "."
        }

        // Display chosen sauces.
        var burgerSauceList = document.getElementsByName("burgerSauce");
        var chosenSauces = [];
        
		for(var i = 0; i < burgerSauceList.length; i++){
			if(burgerSauceList[i].checked){
				chosenSauces.push(burgerSauceList[i].value);
			}
		}
		saucesSummary.textContent = "";

		if(chosenSauces.length > 0){
			saucesSummary.textContent = "With "
			for(var i = 0; i < chosenSauces.length - 1; i++){
				saucesSummary.textContent += chosenSauces[i] + ", "
			}
			saucesSummary.textContent += chosenSauces[chosenSauces.length - 1] + "."
        }

        // Display toppings.
        var burgerToppings = document.getElementsByName("burgerToppings");
        var chosenToppings = [];
        document.getElementById("toppingsSummary").innerHTML = "";
        
        for(var i = 0; i < burgerToppings.length; i++){
            if(burgerToppings[i].checked){
                chosenToppings.push(burgerToppings[i].value);
            }
        }

        if(chosenToppings.length == 0){
            // Hide the toppings header.
            document.getElementById("toppingHeader").style.display = "none";

        } else {
            document.getElementById("toppingHeader").style.display = "inherit";

            var listChosenToppings = document.getElementById("toppingsSummary");
		    listChosenToppings.innerHTML = "";
		    for(var i = 0; i < chosenToppings.length; i++){
			var li = document.createElement("li");
	  		li.appendChild(document.createTextNode(chosenToppings[i]));
	  		listChosenToppings.appendChild(li);
		}
        }
        
        // Display size of burger.
        var burgerSizeList = document.getElementsByName("burgerSize");
		var chosenSize = "";
		for(var i = 0; i < burgerSizeList.length; i++){
			if(burgerSizeList[i].checked){
				chosenSize = burgerSizeList[i].value;
				break;
			}
        }

        // Display if fries were selected.
        var friesSelected = document.getElementById("addFries").checked;
		if(friesSelected){
			document.getElementById("friesSummary").textContent = "Includes fries";
		} else {
			document.getElementById("friesSummary").textContent = "With no fries";
		}
        
        // Display the burger summary.
        document.getElementById("burgerSummary").textContent = burgerTypeChosen + " in " + breadTypeChosen + " in size " + chosenSize + "."

        // Display order quantity.
        var burgerQuantity = parseInt(document.getElementById("burgerQuantity").value);
        document.getElementById("burgerSummary").textContent = burgerQuantity + " " + document.getElementById("burgerSummary").textContent;
        
        // Display order summary.
        document.getElementById("orderSummary").style.display = "inherit";
        
    } else {
        // Do not display order summary.
        document.getElementById("orderSummary").style.display = "none";
    }
}

// Function to validate necessary input field.
function validateForm(){
    // Validate burger type.
    var burgerList = document.getElementsByName("burgerType");
    var errorBurgerType = document.getElementById("errorBurgerType")
    var burgerTypeFlag = false;

    for(var i = 0; i < burgerList.length; i++){
        if(burgerList[i].checked){
            burgerTypeFlag = ! burgerTypeFlag;
            break;
        }
    }

    if(burgerTypeFlag){
        errorBurgerType.textContent = "";
        showSummary = true;
	}else{
        errorBurgerType.textContent = "Please select a burger type.";
        showSummary = false;
    }
    
    // Validate bread type.
    var breadTypeList = document.getElementsByName("breadType");
    var errorBreadType = document.getElementById("errorBreadType");
    var breadTypeFlag = false;

    for(var i = 0; i < breadTypeList.length; i++){
        if(breadTypeList[i].checked){
            breadTypeFlag = ! breadTypeFlag;
            break;
        }
    }

    if(breadTypeFlag){
        errorBreadType.textContent = "";
        showSummary = true;
    }else{
        errorBreadType.textContent = "Please select a bread type.";
        showSummary = false;
    }

    // Validate burger size.
    var burgerSizeList = document.getElementsByName("burgerSize");
    var errorBurgerSize = document.getElementById("errorBurgerSize");
    var burgerSizeFlag = false;

    for(var i = 0; i < burgerSizeList.length; i++){
        if(burgerSizeList[i].checked){
            burgerSizeFlag = ! burgerSizeFlag;
            break;
        }
    }

    if(burgerSizeFlag){
        errorBurgerSize.textContent = "";
        showSummary = true;
    }else{
        errorBurgerSize.textContent = "Please select a burger size.";
        showSummary = false;
    }
    
    // Validate burger orders.
    var burgerOrders = document.getElementById("burgerQuantity");
    var errorBurgerOrder = document.getElementById("errorBurgerOrders");
    var numericValueOrders = burgerOrders.value;

    if (numericValueOrders == null || numericValueOrders.value == "") {	
        errorBurgerOrder.textContent = "Please enter a number of orders.";
        showSummary = false;
	} else {
        if((parseFloat(numericValueOrders) % 1 === 0) && (parseFloat(numericValueOrders) > 0)){
            errorBurgerOrder.textContent = "";
            showSummary = true;
		}else{
            errorBurgerOrder.textContent = "Please enter a number of orders.";
            showSummary = false;
        }
    }
}

// Function to reset all input fields.
function resetForm(){
    // Reset burger type.
    var burgerTypeList = document.getElementsByName("burgerType");
    for(i = 0; i < burgerTypeList.length; i++){
        burgerTypeList[i].checked = false;
    }

    // Reset bread type.
    var breadTypeList = document.getElementsByName("breadType");
    for(i = 0; i < breadTypeList.length; i++){
        breadTypeList[i].checked = false;
    }

    // Reset burger size.
    var burgerSizeList = document.getElementsByName("burgerSize");
    for(i = 0; i < burgerSizeList.length; i++){
        burgerSizeList[i].checked = false;
    }

    // Reset condiments.
    var burgerCondiments = document.getElementsByName("burgerCondiment");
    for(i = 0; i < burgerCondiments.length; i++){
        burgerCondiments[i].checked = false;
    }

    // Reset toppings.
    var burgerToppings = document.getElementsByName("burgerToppings");
    for(i = 0; i < burgerToppings.length; i++){
        burgerToppings[i].checked = false;
    }

    // Reset sauce.
    var burgerSauce = document.getElementsByName("burgerSauce");
    for(i = 0; i < burgerSauce.length; i++){
        burgerSauce[i].checked = false;
    }

    // Reset fries.
    document.getElementById("addFries").checked = false;

    // Reset burger orders.
    document.getElementById("burgerQuantity").value = "";

    // Reset error messages.
    var errorMessageList = document.getElementsByClassName("errorMessage");

    for(var i = 0; i < errorMessageList.length; i++){
        errorMessageList[i].textContent = "";
    }

    // Do not display order summary.
    document.getElementById("orderSummary").style.display = "none";
}