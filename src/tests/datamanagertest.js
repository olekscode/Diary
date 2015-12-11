var User = require('../models/user.js');
var Post = require('../models/post.js');
var DataManager = require('../controllers/datamanager.js');

var dataManager = new DataManager();

//dataManager.getPostById(2, function(post) {
//    console.log(post.getTitle() + ' ' + post.getText());
//});

//dataManager.getAllUsers(function(users) {
//    for (var i = 0; i < users.length; ++i) {
//	  console.log(users[i].getLogin() + ' ' + users[i].getPassword());
//    }
//});

dataManager.getAllPosts(function(posts) {
    for (var i = 0; i < posts.length; ++i) {
	console.log(posts[i].getId() + ' '
		   + posts[i].getLogin() + ' '
		   + posts[i].getDate() + ' '
		   + posts[i].getTitle() + ' '
		   + posts[i].getText());
    }
});
