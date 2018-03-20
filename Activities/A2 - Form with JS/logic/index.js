// Display message in console
console.log("I am working!");

// Function that can be used in the console.
function addTwoNumbers(a, b){
	console.log(a+b);
}

// When submit button is clicked, validate info.
var submitButton = document.getElementById("submitForm");

// Add event to the specific element (if not, every element will have that event).
submitButton.addEventListener("click", verifyInput);

// Create the function to validate input.
function verifyInput(){
	var username = document.getElementById("name");

	// If the object has an element and has no value.
	if(username === null || username.value === ""){
		var errorUserName = document.getElementById("errorMessageUserName");
		errorUserName.removeAttribute("class");
	}
}