'use strict';

var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');


//TODO Fetch db creds from json file
var conn = mysql.createConnection({
	host : "localhost",
    user : "root",
    password : "",
    database : "todo"
});

conn.connect(function(err) {
	if(err) {
		console.log("database connection failed");
	}
	else {
		console.log("database connected ..")
	}
})

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});



// app.get('/',function(req,res) {
// 	//res.sendFile(path.join(__dirname, 'public/'));
// 	res.redirect('/load');
// })

app.get('/', function(req,res) {

	conn.query('SELECT * FROM todo_list', function(error,response) {
		if(!error) {
			res.status(200).send({data:response});
		}
		else {
			res.status(500).send();
			console.log("Data not retrieved");
		}
	})
});

app.post('/',function(req,res) {
	var data = req.body.data;
	conn.query('INSERT INTO todo_list VALUES(DEFAULT,?,?)',[data,false],function(error,response) {
		if(!error) {
			res.status(201).send();
			console.log("Insertion successful");
		}
		else {
			res.status(500).send({error: 'Insertion failed'});
			console.log("Insertion failed");
		}
	})
	// res.redirect('/');
});

app.delete('/',function(req,res) {
    console.log("srNo:" + req.body.srNo);
	conn.query('DELETE FROM todo_list WHERE sr_no = ?',[req.body.srNo],function(error,response) {
		if(!error) {
			res.status(201).send();
			console.log("Deletion successful");
		}
		else {
			res.status(500).send({error: 'Deletion failed'});
			console.log("Deletion failed");
		}
	})
	//res.redirect('/');
});

app.put('/',function(req,res) {
	conn.query('UPDATE todo_list SET DONE = !DONE WHERE sr_no = ?',[req.body.srNo],function(error,response) {
		if(!error) {
			res.status(201).send();
			console.log("Done");
		}
		else {
			res.status(500).send({error: 'Check failed'});
			console.log("Failed");
		}
	})
	// res.redirect('/');
})

app.listen(5000,function() {
	console.log("Server running at port 5000");
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function readFile(req,res,next) { // first parameter should be err in middleware func for error logging? Check express doc //
// 	var file = jsonfile.readFile(filePath, function(err, obj) {																  //
// 		if(err) {																											  //
// 			console.log(err)																								  //
// 			res.status(500).send({ error: 'File could not be opened for reading.' })										  //
// 		}																													  //
// 		else {																												  //
// 			console.log('File opened successfully.')																		  //
// 			req.jsonFile = obj;																								  //
// 			next();																											  //
// 		}																													  //
// 	})																														  //
//}																															  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
