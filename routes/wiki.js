'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

module.exports = router;

var nunjucks = require('nunjucks');
var env = nunjucks.configure('views', {noCache: true});

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
	//next();

	var titleFunction = function (reqTitle) {
		var title = reqTitle.replace(/ /g, '_').replace(/\W/g, '');
		var urlTitle = title ? title : 'title';

		return urlTitle;
	}

	var page = Page.build({
    	title: req.body.title,
    	content: req.body.content,
    	status: req.body.status,
    	urlTitle: titleFunction(req.body.title)
  	});

	  page.save();
	// console.log(req.body);
	// res.json(req.body);
});

