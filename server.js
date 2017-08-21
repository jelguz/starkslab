var express = require('express');
var app = express();
var path = require('path');

var port = '3000';
app.set('view.engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client', 'views'));

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/', function(req, res){
	res.render('index.ejs');
});
app.get('/', function(req, res){
	res.render('index.ejs');
});
app.get('/starkAppCenter', function(req, res){
	res.render('index.ejs');
});
app.get('/starkGroups', function(req, res){
	res.render('index.ejs');
});
app.get('/newsFeed', function(req, res){
	res.render('index.ejs');
});
app.get('/profileTimeline', function(req, res){
	res.render('index.ejs');
});
app.get('/profileStarkApp', function(req, res){
	res.render('index.ejs');
});
app.get('/profileGroups', function(req, res){
	res.render('index.ejs');
});
app.get('/starkAppPage', function(req, res){
	res.render('index.ejs');
});
app.get('/groupPage', function(req, res){
	res.render('index.ejs');
});
app.get('/faq', function(req, res){
	res.render('index.ejs');
});

app.listen(port, function(){
	console.log('SERVER RUNNING... PORT: ' + port)
})