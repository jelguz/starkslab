var express = require('express');
var app = express();
var path = require('path');

var port = '80';
app.set('view.engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client', 'views'));

app.use(express.static(path.resolve(__dirname, 'client')));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res){
	res.render('index.ejs');
});
app.get('/', function(req, res){
	res.render('index.ejs');
});
app.get('/login', function(req, res){
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
app.get('/starkApp', function(req, res){
	res.render('index.ejs');
});
app.get('/groupPage', function(req, res){
	res.render('index.ejs');
});
app.get('/faq', function(req, res){
	res.render('faq.ejs');
});
app.get('/starkAppIncubator', function(req, res){
	res.render('index.ejs');
});
app.get('/starkAppCreate', function(req, res){
	res.render('index.ejs');
});
app.get('/starkAppUpload', function(req, res){
	res.render('index.ejs');
});
app.get('/starkAppAddConcept', function(req, res){
	res.render('index.ejs');
});
app.get('/newsletter', function(req, res){
	res.render('newsletter.ejs');
});
app.listen(port, function(){
	console.log('SERVER RUNNING... PORT: ' + port)
})