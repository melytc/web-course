 $(document).ready(function() {
          
  $("#registerButton").on("click", function() {
    
    var jsonObject = {
        "uUsername" : $("#username").val(),
        "uPassword" : $("#userPassword").val(),
        "uFirstName" : $("#firstName").val(),
        "uLastName" : $("#lastName").val()
    };

    $.ajax({
        type: "POST",
        url: "/A8 - PHP Service/data/registrationService.php",
        data : jsonObject,
        dataType : "json",
        ContentType : "application/json",
        success: function(jsonData) {
            alert(jsonData);
            window.location.replace("home.html");   
        },
        error: function(errorMsg) {
            alert(errorMsg.statusText);
        }
    });
});

   $("#cancelButton").on("click", function() {
        window.location.replace("login.html");
   });

});