function Home(){

}

Home.prototype.onReady = function(){
	$("#home .greeting, #home nav li:first-child").click(function(e){
		$("html, body").animate({ scrollTop: $("#home").height()}, "slow");
		e.preventDefault();
	});
}
