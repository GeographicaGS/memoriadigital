var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('home',{
    	hideMenu:true
    });
});

module.exports = router;    
