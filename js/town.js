var chart = null;

function Town(){
}

Town.prototype.onReady = function(){

	var options = {
			          pieHole: 0.7,
			          chartArea: {'width': '85%', 'height': '85%', 'top':'0'},
			          legend: 'none',
			          backgroundColor: '#f2f2f2',
			          fontSize: 12,
			      };

	$(".filter .peopleFilter, .filter .townFilter").unbind().click(function(){
		$(this).toggleClass("active");
		$(".legend").removeClass("active")
		var peopleFilter = $(".filter .peopleFilter")
		var townFilter = $(".filter .townFilter")
		if(peopleFilter.hasClass("active") && townFilter.hasClass("active")){
			drawChartProgram(options);
			$(".programLegend").addClass("active")

		}else if(peopleFilter.hasClass("active")){
			drawChartPeople(options);
			$(".peopleLegend").addClass("active")

		}else if(townFilter.hasClass("active")){
			drawChartTown(options);
			$(".townLegend").addClass("active")
		}else{
			$("#chart").children().remove();
			chart = null;
			$(".greeBox").hide();
			$("#ceterChartText").hide();
		}
	});

	

	google.load("visualization", "1", {packages:["corechart"]});
	google.setOnLoadCallback(drawChartPeople(options));
}

function drawChartPeople(options){
	options["colors"] = ['#5da5da', '#32a260', '#f9a339', '#f25854', '#b2912f', '#b276b3','#4584b3', '#cccc33', '#d785aa', '#404d40', '#404d40'];
	$.ajax({
    	url: '/peoplePlan/' + document.URL.substr(document.URL.lastIndexOf('/') + 1),
    	dataType: 'json',
        success: function(response) {
        	drawChart(response, options);
        }
	});
}

function drawChartTown(options){
	options["colors"] = ['#0c783d', '#2b59a6', '#d4005b', '#e5ad2f', '#4a664b', '#ff6699','#7ab51d', '#ca7e33', '#e54742', '#8d77b3'];
	$.ajax({
    	url: '/townPlan/' + document.URL.substr(document.URL.lastIndexOf('/') + 1),
    	dataType: 'json',
        success: function(response) {
        	drawChart(response, options);
        }
	});
}

function drawChartProgram(options){
	options["colors"] = ['#279881', '#30a38d', '#39ae99', '#57baa8', '#75c6b8'];
	$.ajax({
    	url: '/program/' + document.URL.substr(document.URL.lastIndexOf('/') + 1),
    	dataType: 'json',
        success: function(response) {
        	drawChart(response, options);
        }
	});
}

function drawChart(response,options){
	var data = new Array(['Plan', 'Inversión']);
	var max = 0;
	var cont = 0;
	var pos = 0;
	var total = 0;
	$.each(response.result, function(k, v) {	
		data.push([k, v]);
		if(max < v){
			max = v;
			pos = cont;
		}
		cont ++;
		total += v;
	});
	
	var aux = {};
	aux[pos] = {offset: 0.1};
	options["slices"] = aux;
	var data = google.visualization.arrayToDataTable(data);
	var formatter = new google.visualization.NumberFormat({pattern: '###,###.## €'});
	for(var z=0; z<data.getNumberOfColumns(); z++){
		formatter.format(data, z); 
	}
	if(!chart){
		chart = new google.visualization.PieChart(document.getElementById('chart'));
	}
	
	chart.draw(data, options);
	$("#greeBoxPlan").text(data.getValue(pos,0));
	var inversion = data.getValue(pos,1).toString().split(".")[0];
	$("#greeBoxValue").text(addCommas(inversion));
	$("#greeBoxPer").text((data.getValue(pos,1)/total * 100).toString().split(".")[0] + " %");
	$(".greeBox").css({"background-color":options.colors[pos]})
	$(".greeBox .arrow-left").css({"border-right":"10px solid " + options.colors[pos]})
	$(".greeBox").show();
	$($("#ceterChartText span")[0]).text(addCommas(total.toString().split(".")[0]) + " €");
	$("#ceterChartText").show();
}

function addCommas(number) {
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(number)) {
            number = number.replace(rgx, '$1' + '.' + '$2');
    }
    return number;
}
