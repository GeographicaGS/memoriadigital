var express = require('express');
var router = express.Router();
var db = require('../db/db.js');
var TownModel = db.TownModel;
var jadeFunctions = require('./jadeFunctions');

router.get('/municipios', function(req, res) {
	TownModel.getTowns(function(err,data){
		var result = {};
		for(var i=0; i<data.length; i++){
			var character = data[i].etiqueta.charAt(0);
			if(!result[character]){
				result[character] = new Array(data[i]);
			}else{
				result[character].push(data[i]);
			}
		}
		res.render('towns',{
			towns:result
    	});
	});
});

router.get('/municipios/:id', function(req, res) {
	TownModel.getTown(req.params.id, function(err,data){
		data[0].total = jadeFunctions.parseNumber(data[0].total);
		res.render('town',{
			town:data[0]
    	});
	});
});

router.get('/peoplePlan/:id', function(req, res) {
	TownModel.getPeoplePlanData(req.params.id,function(err,data){
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({result: data[0]}));
	});
});

router.get('/townPlan/:id', function(req, res) {
	TownModel.getTownPlanData(req.params.id,function(err,data){
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({result: data[0]}));
	});
});

router.get('/program/:id', function(req, res) {
	TownModel.getProgramsData(req.params.id,function(err,data){
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({result: data[0]}));
	});
});

module.exports = router;    
