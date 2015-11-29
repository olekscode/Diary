var User = require('../models/user');
var dataManager = require('./datamanager');

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

    var _verify_access = function(login, password) {
	var usr = dataManager.getUser(login);
	return usr != null && password == usr.password;
    };

    var _is_login_available = function(login) {
	return dataManager.getUser(login) == null;
    };

    return {
        // TODO: Avoid hardcoding the responses
        // TODO: Consider using callbacks instead of passing the responses

        signin: function(login, password) {
            if (_validate_login(login)
             && _validate_pass(password)) {
                if (_verify_access(login, password)) {
                    return "SUCCESS";
                }
                else {
                    return "ACCESS DENIED";
                }
            }
            else {
                return "INVALID LOGIN OR PASSWORD";
            }
        },

        signup: function(usr) {
            if (_validate_login(usr.login)
             && _validate_pass(usr.password)) {
                if (_is_login_available(usr.login)) {
                    dataManager.addUser(usr);
                    return "SUCCESS";
                }
                else {
                    return "LOGIN TAKEN"
                }
            }
            else {
                return "INVALID LOGIN OR PASSWORD";
            }
        }
    };
})();
