document.addEventListener("DOMContentLoaded", function() {
	
	// Get it linked with the click event.
	var submitButton = document.getElementById("submitForm");
	submitButton.addEventListener("click", validateForm);
});

// Note: validate() will execute the function immediately. Take them away!

// Function to display error messages.
function displayErrorMessage(){

}

function validateForm() {
	
	// Validation variables in html document.
	var userName = document.getElementById("name");
	var errorUserNameMessage = document.getElementById("errorName");

	var userEmail = document.getElementById("email");
	var errorUserEmailMessage = document.getElementById("errorEmail");
	
	var userPassword = document.getElementById("password");
	var userPasswordConfirmation = document.getElementById("passwordConfirmation");
	var errorUserPasswordMessage = document.getElementById("errorPassword");
	
	var userCountry = document.getElementById("country");
	var errorUserCountry = document.getElementById("errorCountry");
	
	var genderList = document.getElementsByName("gender");
	var errorUserGender = document.getElementById("errorGender");

	// Validation of user name.
	if (userName == null || userName.value == "") {	
		errorUserNameMessage.textContent = "Please provide your full name.";
	} else {
		errorUserNameMessage.textContent = "";
	}

	// Validation of user email.
	if (userEmail == null || userEmail.value == "") {	
		errorUserEmailMessage.textContent = "Please provide your email.";
	} else {
		errorUserEmailMessage.textContent = "";
	}

	// Validation of user passwords.
	if (userPassword == null || userPassword.value == "" || userPassword !== userPasswordConfirmation) {	
		errorUserPasswordMessage.textContent = "Please check your password, as it doesn't match your password confirmation.";
	} else {
		errorUserPasswordMessage.textContent = "";
	}

	// Validation of user country.
	var countrySelected = userCountry.options[userCountry.selectedIndex].value;
	
	if (countrySelected == 0 || countrySelected == null) {
		errorUserCountry.textContent = "Please select a country.";
	} else {
		errorUserCountry.textContent = "";
	}

	// Validation of user gender.
	var genderFlag = false;

	// Validate that there is any list element that is checked.
	for (var i = 0; i < genderList.length; i++) {
		if (genderList[i].checked) {
			genderFlag = ! genderFlag;
			break;
		}
	}

	if (genderFlag) {
		// Message should not be displayed.
		errorGender.textContent = "";
	} else {
		// Message should be displayed.
		errorGender.textContent = "Please select a gender.";
	}
};