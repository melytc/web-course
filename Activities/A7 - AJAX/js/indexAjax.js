$(document).ready(function(){

	// Call function to update capital data when clicked.
	$("#mexicanStates").on("change", updateCapital);

	// Load restaurant names.
	$.ajax({
		url: "data/restaurants.xml",
		type: "GET",
		dataType: "xml",
		success: function(xmlContent){
			var liElements = "";

			// This will work as a loop to find the restaurants' info.
			$(xmlContent).find("restaurant").each(function(){
				// Print the name of the restaurant.
				// console.log($(this).attr("name"));

				// Add the name as a li element.
				liElements += "<li>" + $(this).attr("name") + "</li>";
			});

			$("#restaurantCatalog").append(liElements);
		},
		error: function(error) {
			console.log("Restaurant error" + error);
		}
	});
	
	// Reading an XML and loading it into a table
	$.ajax({
		url: "data/nutrition.xml",
		type: "GET",
		dataType : "xml",
		success : function(xmlContent){
			var name = "";
			var serving = "";
			var calories = "";
			var cholesterol = "";
			var sodium = "";
			var carbohydrates = "";
			var fiber = "";
			var protein = "";

			$(xmlContent).find("food").each(function(){
				name = $(this).find("name").text();
				serving = $(this).find("serving").text();
				calories = $(this).find("calories").attr("total");
				cholesterol = $(this).find("cholesterol").text();
				sodium = $(this).find("sodium").text();
				carbohydrates = $(this).find("carb").text();
				fiber = $(this).find("fiber").text();
				protein = $(this).find("protein").text();

				$('#foodTable > tbody:last-child').append(
					'<tr>' + 
						'<td>' + name + '</td>' + 
						'<td>' + serving + '</td>' +
						'<td>' + calories + '</td>' +
						'<td>' + cholesterol + '</td>' +
						'<td>' + sodium + '</td>' +
						'<td>' + carbohydrates + '</td>' +
						'<td>' + fiber + '</td>' +
						'<td>' + protein + '</td>' +
					'</tr>'
				);
			});
		},
		error : function(error){
			console.log("Nutrition table error" + error);
		}
	});
	
	// Load dropdown menu with json mexican states.
	$.ajax({
		url : "data/mexicanStates.json",
		type : "GET",
		dataType : "json",
		success : function(jsonData){
			// JSON data is stored in an array.
			var mexicanOptions = "";

			// Loop to go through all elements. Possible because it's an array.
			for(var i = 0; i < jsonData.length; i++) {
				mexicanOptions += '<option value="' + jsonData[i].identifier + '">' + jsonData[i].state + '</option>';
				// jsonData[i]["identifier"] can also access the identifier of each element.
			}

			$("#mexicanStates").append(mexicanOptions);
		},
		error : function(error){
			console.log("Mexican states error " + error);
		}
	});
});

// Load capital when element in dropdown menu is selected.
function updateCapital(){
	var stateIdentifier = $("#mexicanStates").val();

	console.log("Updating");

	if(stateIdentifier == "0"){
		$("#stateCapital").val("0");
	} else {
		console.log("Not zero");
		$.ajax({
			url: "data/mexicanStatesCapitals.json",
			type: "GET",
			dataType: "json",
			success: function(jsonData){
				var stateCapital = "";

				console.log("Searching for " + stateIdentifier);
				
				for(var i = 0; i < jsonData.length; i++){
					if(jsonData[i].id == stateIdentifier){
						stateCapital = jsonData[i].capital;
						console.log("Found " + jsonData[i].capital);
					}
				}
				$("#stateCapital").val(stateCapital);
				console.log("Loading");
			},
			error: function(error){
				console.log("Error " + error);
			}
		})
	}
}