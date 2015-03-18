var express = require('express');
var router = express.Router();
var db = require('../db/db.js');
var ProgramModel = db.ProgramModel;

router.get('/con-las-personas', function(req, res) {
	ProgramModel.getPeople(function(err,data){
		res.render('programs',{
			titleH1:"Con las Personas",
    		people:data[0]
    	});
	});

});

router.get('/con-los-ayuntamientos', function(req, res) {
	ProgramModel.getTowns(function(err,data){
		res.render('programs',{
			titleH1:"Con los Ayuntamientos",
    		towns:data[0]
    	});
	});

});

module.exports = router;    
