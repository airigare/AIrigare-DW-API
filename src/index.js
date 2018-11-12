	var express = require('express');
	var path = require('path');
	var app = express();

	var pool = require('./db');

	app.set('port', 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	app.get('/mikmakAPI/airigare/weatherDW/last24hours', function(req, res){
		pool.query('USE weatherDW');
		pool.query('SELECT * FROM actualWeater', function(err, data){
			res.json(data);
		});
	});

	app.get('/mikmakAPI/airigare/Station/Status', function(req, res){
		console.log("/mikmakAPI/airigare/Station/Status");
		var api = req.query.API;
		var id = req.query.id;
		var value = req.query.value;
		pool.query('USE iRig');
		var query = 'CALL writeLog("' + api + '", ' + id + ', ' + value + ')'
		pool.query(query, function(err, data){
			res.json(data);
		});
	});

	app.get('/mikmakAPI/airigare/Station/getInstructions', function(req, res){
		console.log("/mikmakAPI/airigare/Station/getInstructions/");
		var api = req.query.API;
		console.log(api);
		pool.query('USE iRig');
		pool.query('SELECT * FROM `vInstructions` where `sysID` = "' + api + '"', function(err, data){
			res.json(data[0]);
		});
	});
	
	app.listen(process.env.PORT || app.get('port'));
	console.log('Express server listening on port ' + app.get('port'));