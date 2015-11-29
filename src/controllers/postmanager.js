var dataManager = require('./datamanager');
var Post = require('../models/post');
var User = require('../models/user');

// PostManager

module.exports = (function() {

    var _validate_login = function(login) {
        return login.match('[^a-zA-Z0-9_\-]') == null;
    };

    var _validate_id = function(id) {
	return id.match('[^0-9_\-]') == null;
    };

    var _is_login_available = function(login) {
	return dataManager.getUser(login) == null;
    };

    return {
        get: function(id,login) {
            if (_validate_id(id)) {
                if (_is_login_available(login)) {
                    dataManager.getPost(id);
                    return "SUCCESS";
                }
                else {
                    return "ACCESS DENIED";
                }
            }
            else {
                return "INVALID ID";
            }
        },

        create: function(pst,login) {
            if (_validate_login(pst.id)) {
                if (_is_login_available(login)) {
                    dataManager.createPost(pst.id, pst.date,pst.title, pst.text);
                    return "SUCCESS";
                }
                else {
                    return "IS AVAILABLE. CREATE POST FAILED"
                }
            }
            else {
                return "INVALID LOGIN. UPDATE POST FAILED";
            }
        },

        update: function(pst,login) {
            if (_validate_login(pst.id)) {
                if (_is_login_available(login)) {
                    dataManager.updatePost(pst.id, pst.date,pst.title, pst.text);
                    return "SUCCESS";
                }
                else {
                    return "IS AVAILABLE. UPDATE POST FAILED"
                }
            }
            else {
                return "INVALID LOGIN. UPDATE POST FAILED";
            }
        },

        remove: function(id,login) {
            if (_validate_login(id)) {
                if (_is_login_available(login)) {
                    dataManager.createPost(id);
                    return "SUCCESS";
                }
                else {
                    return "IS AVAILABLE. REMOVE POST FAILED"
                }
            }
            else {
                return "INVALID LOGIN. REMOVE POST FAILED";
            }
        }
    };
})();