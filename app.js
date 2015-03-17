var express = require('express');
var config = require('./config');

var app = express();
var db = require("./db/db");

db.init(function(err){
    if (err){
        throw err;
    }
    
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var bodyParser = require('body-parser');
    var lessMiddleware = require('less-middleware');
    
    var routes = require('./routes/index');
    var programs = require('./routes/programs');
    var towns = require('./routes/towns');
    var url = require('url');

    var jadeFunctions = require('./routes/jadeFunctions');

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    console.log("Environment: " + app.get('env'));

    if (app.get('env') === 'development') {
        app.use("/js",express.static(path.join(__dirname, 'js')));
        app.use("/lib",express.static(path.join(__dirname, 'lib')));
    }
    else{
        var buildFolder = path.join(__dirname,'js-built');

        var fs = require('fs');

        if (!fs.existsSync(buildFolder)) {
            fs.mkdirSync(buildFolder);
        }

        app.use("/js",express.static(buildFolder));    
    }

    app.use(lessMiddleware(path.join(__dirname, 'public'), {
        parser: {
            paths: [ 
                path.join(__dirname, 'lib', 'WWW-Styles')
            ]
        }
    }));

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(jadeFunctions.init);

    app.use('/', routes);
    app.use('/', programs);
    app.use('/', towns);
    

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {

        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            data = {
                message: err.message,
                error: err
            };

            console.log(data);
            res.render('error', data);
        });
    }
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });


});

module.exports = app;




