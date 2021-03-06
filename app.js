var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var path = require('path');
var models = require('./models')
var wikiRouter = require('./routes/wiki');
var Page = models.Page;

var env = nunjucks.configure('views', {noCache: true});
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('dev'));

app.use(express.static(path.join('/public')));

app.use('/wiki', wikiRouter);

app.get('/', function(req, res, next){
	
	Page.findAll()
	.then(function(pageArr) {
		res.render('index', {
			pages: pageArr
		});
	})

	//res.render('index');
})


models.User.sync({})
.then(function () {
	return models.Page.sync({})
})
.then(function () {
	app.listen(8080, function() {
		console.log("Listening on 8080");
	});
})
.catch(console.error);