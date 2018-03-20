$(document).ready(function(){
	$("#submitForm").on("click", validateForm);
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