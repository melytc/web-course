var showSummary = false;

$(document).ready(function(){
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
});

// Function to add order to cart.
function addToCart(){
    showSummary = false;
    validateOrder();
}

// Function to validate a radio button input.
function validateRadio(radioName, radioErrorId){
    if($("input[name=" + radioName + "]").is(":checked")) {
        $("#" + radioErrorId).addClass("hiddenMessage");
    } else {
        $("#" + radioErrorId).removeClass("hiddenMessage");
    }
}

// Function to validate a numeric text input.
function validateNumericText(textId, textErrorId){
    if($("#" + textId).val() == "") {
        $("#" + textErrorId).removeClass("hiddenMessage");
    } else {
        $("#" + textErrorId).addClass("hiddenMessage");
    }
}
// Function to validate inputs.
function validateOrder(){

    // Validate burger type.
    validateRadio($("input[name=burgerType]"), $("#errorBurgerType"));

    // Validate bread type.
    validateRadio($("input[name=breadType"), $("#errorBreadType"));

    // Validate burger size.
    validateRadio($("input[name=burgerSize"), $("#errorBurgerSize"));

    // Validate burger orders.
    validateNumericText($("#burgerQuantity"), $("#errorBurgerOrder"));
}

// Function to reset checkbox.
function resetCheckbox(){

}

// Function to reset radio button.
function resetRadioButton(){

}

// Function to reset text input.
function resetText(){

}

// Function to reset all input fields.
function resetOrder(){
    // Reset burger type.

    // Reset bread type.

    // Reset burger size.

    // Reset condiments.

    // Reset toppings.

    // Reset sauce.

    // Reset fries.

    // Reset burger orders.

    // Reset error messages.

    // Do not display order summary.
    $("#orderSummary").hide();

}