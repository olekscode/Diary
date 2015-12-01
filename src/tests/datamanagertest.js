var User = require('../models/user.js');
var Post = require('../models/post.js');
var DataManager = require('../controllers/datamanager.js');

console.log(DataManager.getUser("usr1"));
console.log(DataManager.addUser(new User("login1", "qwerty")));
console.log(DataManager.updateUserPassword("login1", "qwerty1"));
console.log(DataManager.updateUserLogin("login1", "usr4"));
console.log(DataManager.deleteUser("usr4"));

console.log(DataManager.addPost(new Post(5, "2015-01-01", "title5", "text5")));
console.log(DataManager.getPost(5));
console.log(DataManager.updatePostText(5, "text55"));
console.log(DataManager.updatePostTitle(5, "title55"));
console.log(DataManager.deletePost(5));