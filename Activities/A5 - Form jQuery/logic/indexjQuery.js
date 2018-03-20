$(document).ready(function(){
    // Validations when clicking the submit button.
    $("#submitForm").on("click", validateForm);
    
    // Updating content when clicking the menu.
    $("#menu > li").on("click", function(){
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

function validateForm() {
    
    // Validate user name.
    if($("#name").val() == "") {
        $("#errorName").removeClass("hiddenMessage");
    } else {
        $("#errorName").addClass("hiddenMessage");
    }

    // Validate user email.
    if($("#email").val() == "") {
        $("#errorEmail").removeClass("hiddenMessage");
    } else {
        $("#errorEmail").addClass("hiddenMessage");
    }

    // Validate password.
    if($("#password").val() != "" && $("$password").val() == $("passwordConfirmation").val()){
        $("#errorPassword").addClass("hiddenMessage");
    } else {
        $("#errorPassword").removeClass("hiddenMessage");
    }

    // Validate user gender.
    if($("input[name=gender]").is(":checked")) {
        $("#errorGender").addClass("hiddenMessage");
    } else {
        $("#errorGender").removeClass("hiddenMessage");
    }

    // Validate user country.
    if($("#country").val() == 0){
        $("#errorCountry").removeClass("hiddenMessage");
    } else {
        $("#errorCountry").addClass("hiddenMessage");
    }
};