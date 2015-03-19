function Home(){

}

Home.prototype.onReady = function(){

	$("#home .greeting a").unbind().click(function(e){
		e.stopPropagation();
	});

	$("#home .greeting, #home nav li:first-child").unbind().click(function(e){
		$("html, body").animate({ scrollTop: $("#home").height()}, "slow");
		if($(this).find("a").length > 0){
			e.preventDefault();
		}
	});
}
