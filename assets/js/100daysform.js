$("#new-example-button").click(function(){
    // alert("Text: yes");
    // var exampleGroup = $("#example-group");
    // $("#examples").append(exampleGroup);
    $(this).parent().before($("#example-group").clone());
});

// $("#remove-example-group").click(function(){
// 	$(this).parents("#example-group").remove();
// });

$(".fa-minus").click(function(){
	$(this).parents("#example-group").remove(); 
});

$("#new-link-button").click(function(){

});
