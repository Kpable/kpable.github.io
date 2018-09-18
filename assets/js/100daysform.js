
var numElements = 1;
var numLinkElements = 1;

$("#new-example-button").click(function(){
    // alert("Text: yes");
    // var exampleGroup = $("#example-group");
    // $("#examples").append(exampleGroup);
    numElements += 1;
    var clone = $("#example-group1").clone(true);
    clone.attr("id", "example-group" + numElements);
    $(this).parent().before(clone);
    // alert(numElements);
});

// $("#remove-example-group").click(function(){
// 	$(this).parents("#example-group").remove();
// });

$(".fa-minus").click(function(){
	$(this).parents("#example-group").remove(); 
	$(this).parents("#link-group").remove();
});

$("#new-link-button").click(function(){
    numLinkElements += 1;
    var clone = $("#link-group1").clone(true);
    clone.attr("id", "link-group" + numLinkElements);
    $(this).parent().before(clone);
});

$("#generate").click(function(){
	alert("generate");
	var dayNumber = $("#day-number").text();
	var title = $("#title").text();
	var date = $("#date").text();
	var thoughts = $("#thoughts").text();

	for (var i = 0; i <= numElements; i++) {
			
	}

});