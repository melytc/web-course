$(document).ready(function(){
	$.ajax({
		url: "../data/restaurants.xml",
		type: "GET",
		dataType : "xml",
		success : function(xmlContent){
			console.log("hello world");
		}
	});
})