var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var path = require('path');
var models = require('./models')

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('dev'));

app.use(express.static(path.join('/public')));

app.use('/', function (req, res, next) {
	res.render('index');
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