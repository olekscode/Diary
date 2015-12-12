var User = require('../models/user');

// TODO: Replace with a Singletone
var DataManager = require('./datamanager');
var dataManager = new DataManager();

// PATTERN: Model

// Authorizer
module.exports = (function() {
    var _validate_login = function(login) {
        // TODO: Forbid having a digit as a first character
        return login.match('[^a-zA-Z0-9_\-]') == null;
    };

    var _validate_pass = function(password) {
    	// TODO: Allow using $ as in the Pa$$word
    	return password.match('[^a-zA-Z0-9_\-]') == null;
    };

    return {
        signin: function(login, password, res) {
            if (_validate_login(login)
             && _validate_pass(password)) {
                dataManager.getUserByLogin(login, function(usr) {
                    if (usr.getPassword() == password) {
                        res.status(200).send("Successfully logged in");
                    }
                    else {
                        res.status(404).send("Access denied");
                    }
                }, function() {
                    res.status(404).send("No user with such login found");
                });
            }
            else {
                res.status(404).send("Invalid login or password");
            }
        },

        signup: function(usr, res) {
            if (_validate_login(usr.getLogin())
             && _validate_pass(usr.getPassword())) {
                dataManager.getUserByLogin(usr.getLogin(), function(usr) {
                    res.status(404).send("This login is already taken");
                }, function() {
                    dataManager.insertUser(usr, function() {
                        res.status(200).send("Successfully signed up");
                    }, function() {
                        res.status(500).send("Failed to sign up");
                    });
                });
            }
            else {
                res.status(404).send("Invalid login or password");
            }
        }
    };
})();
