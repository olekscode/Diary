// Node.js modules
var User = require('../models/user');
var DataManager = require('./datamanager');

// PATTERN: Model
var authorizer = (function() {
    var _validate_login = function(login) {
        // TODO: Use regex
    };

    var _validate_pass = function(password) {
        // TODO: Use regex
    };

    var _verify_access = function(login, password) {

    };

    var _is_login_available = function(login) {

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
                return "INVALID_LOGIN_PASS";
            }
        },

        signup: function(data) {
            if (_validate_login(data.login)
             && _validate_pass(data.password)) {
                if (_is_login_available) {
                    // TODO: Store data
                    return "SUCCESS";
                }
                else {
                    return "LOGIN_TAKEN"
                }
            }
            else {
                return "INVALID_LOGIN_PASS";
            }
        }
    };
})();