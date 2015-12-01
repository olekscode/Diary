var dataManager = require('./datamanager');
var Post = require('../models/post');
var User = require('../models/user');

// PostManager

module.exports = (function() {

    return {
        get: function(id) {
            return (dataManager.get(id));
            //if (res = "SUCCESS"){
            //    return res;
            //}
            //else{
            //	return "GET POST FAILED";
            //}
        },

        create: function(pst,login) {
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