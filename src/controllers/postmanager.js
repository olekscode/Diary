var Post = require('../models/post');
var User = require('../models/user');

// TODO: Replace with a Singletone
var DataManager = require('./datamanager');
var dataManager = new DataManager();

// PostManager
module.exports = (function() {
    return {
        // TODO: this stuff should be sent with the corresponding page
        get: function(id, res) {
            dataManager.getPostById(id, function(post) {
                // Respond with JSON
            }, function() {
                res.status(404).send("There is no post with this id");
            });
        },

        create: function(pst, login) {
            return (dataManager.createPost(pst.id, pst.date ,pst.title, pst.text));
            //if (res = "SUCCESS"){
            //    return res;
            //}            
            //else {
            //    return "CREATE POST FAILED";
            //}
        },

        update: function(pst,login) {
            return (dataManager.updatePost(pst.id, pst.date,pst.title, pst.text));
            //if (res = "SUCCESS"){
            //    return res;
            //}
            //else {
            //    return "UPDATE POST FAILED";
            //}
        },

        remove: function(id,login) {
            return (dataManager.createPost(id));
            //if (res = "SUCCESS"){
            //    return res;
            //}
            //else {
            //    return " REMOVE POST FAILED";
            //}
        }
    };
})();