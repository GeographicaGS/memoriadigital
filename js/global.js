function Global(){

}

Global.prototype.onReady = function(){

    $("nav .programs").mouseenter(function(){
        $("nav .programs .subMenu").addClass('active');
    });
    
    $("nav .programs").mouseleave(function(){
        $("nav .programs .subMenu").removeClass('active');
    });


	$('.searcher').autocomplete({
		minLength: 3,
        source: function(req,res) {
            $.ajax({
                url: "/townsName/" + req.term,
                dataType: "json",
                type: "GET",
                success: function(data) {
           			res($.map(data, function(item) {
                        return {
                            label: item.label,
                            value: item.label,
                            id: item.id
                        };
                    }));
                }
            });
        },
        select: function(event, ui) {
        	window.location.href = "/municipios/" + ui.item.id;
        }
    });
}
