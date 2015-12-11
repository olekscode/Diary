var User = require('../models/user.js');
var Post = require('../models/post.js');
var DataManager = require('../controllers/datamanager.js');

var dataManager = new DataManager();
dataManager.getPostById(2, function(post) {
    console.log(post.getTitle() + ' ' + post.getText());
});
