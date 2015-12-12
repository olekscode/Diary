var http = require("http");
var express = require('express');
var app = express();

var routes = require('./controllers/routes');

// Error: 'app.router' is deprecated!
// // Add router middleware explicitly
// app.use(app.router);

http.createServer(app).listen(3000, function() {
	console.log('App started');
});

console.log('Server running at http://127.0.0.1:3000/');

app.get('/', routes.load);
app.get('/signin', routes.signin);
app.get('/signup', routes.signup);
