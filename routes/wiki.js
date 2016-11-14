'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

module.exports = router;

var nunjucks = require('nunjucks');
var env = nunjucks.configure('views', {noCache: true});
router.use(bodyParser.json()); 

router.get('/', function (req,res, next){
	// var allUsers = Todos.listPeople();
	// res.json(allUsers);
	res.redirect('/');
	//next();
});

router.get('/add', function (req,res, next){
	// var allUsers = Todos.listPeople();
	// res.json(allUsers);
	res.render('addpage', {
		title: 'Add a Page'
	});
	//next();
});

router.post('/', function (req,res, next){
	// var allUsers = Todos.listPeople();
	console.log(req.body);
	res.json(req.body);
	//next();
});
