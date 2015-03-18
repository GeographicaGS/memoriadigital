function Global(){

}

Global.prototype.onReady = function(){
	$('.searcher').autocomplete({
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
