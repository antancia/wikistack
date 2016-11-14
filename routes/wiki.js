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
	// res.json(allUsers);


	res.redirect('/');
	//next();
});

router.get('/add', function (req,res, next){
	// res.json(allUsers);
	res.render('addpage', {
		title: 'Add a Page'
	});
	//next();
});

router.get('/:urlTitle', function (req, res, next) {
	var urlTitle = req.params.urlTitle;

	Page.findAll(
		{
		where: {
		urlTitle: urlTitle
		}
	})
	.then(function(page) {
		console.log(page[0].title);
		res.render('wikipage', {
			pageTitle: page[0].title,
			urlTitle: page[0].urlTitle,
			content: page[0].content
		});
	})
	.catch(next);

	//res.send('!' + urlTitle);
});

router.post('/', function (req,res, next){
	//next();

	Page
	.build({
    	title: req.body.title,
    	content: req.body.content,
    	status: req.body.status,
    	urlTitle: req.body.title
  	})
  	.save()
  	.then(function(page) {
  		res.redirect(page.route);
  	})

});






