// TODO: Remove if not used
var Post = require('../models/post');
var User = require('../models/user');

var authorizer = require('./authorizer');
var postManager = require('./postmanager');

// // TODO: Replace with a Singletone
// var DataManager = require('controllers/datamanager');
// var dataManager = new DataManager();

exports.load = function (req, res) {
	var obj = {
		name: "Hello, world!"
	};

	res.send(JSON.stringify(obj));
}

exports.signin = function (req, res) {
	authorizer.signin("IvMykh", "password1", res);
}

exports.signup = function (req, res) {
	var usr = new User("IvMykh", "pass");
	authorizer.signup(usr, res);
}