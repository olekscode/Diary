var User = require('../models/user');
var Post = require('../models/post');


var users = [
    new User('usr1', 'pass1'),
    new User('usr2', 'pass2'),
    new User('usr3', 'pass3')
];

var posts = [
	new Post(0, "2015-01-01", "title1", "text1"),
	new Post(1, "2015-01-02", "title2", "text2"),
	new Post(2, "2015-01-03", "title3", "text3")
]

// DataManager
module.exports = {
    getUser: function(login) {
	for (var i = 0; i < users.length; ++i) {
	    if (users[i].login === login) {
		return users[i];
	    }
	}
	return null;
    },

    addUser: function(usr) {
	users.push(usr);
    },

    updateUserPassword: function(login, password){
    	for(var i = 0; i < users.length; ++i){
    		if(users[i].login === login){
    			users[i].password = password;
    			return;
    		}
    	}
    },

    updateUserLogin: function(oldLogin, newLogin){
    	var loginExists = false;
    	for(var i = 0; i < users.length; ++i){
    		if(users[i].login === newLogin){
    			loginExists = true;
    			break;
    		}
    	}
    	if(loginExists === false){
    		for(var i = 0; i < users.length; ++i){
	    		if(users[i].login === oldLogin){
	    			users[i].login = newLogin;
	    			return;
	    		}
	    	}
    	}
    },

    deleteUser: function(login) {
    	for(var i = 0; i < users.length; ++i){
    		if(users[i].login === login){
    			users.splice(i, 1);
    			return;
    		}
    	}
    },

    addPost: function(post){
    	posts.push(post);
    },

    getPost: function(id){
    	for(var i = 0; i < posts.length; ++i){
    		if(posts[i].id === id){
    			return posts[i];
    		}
    	}
    	return null;
    },

    updatePostText: function(id, text){
    	for(var i = 0; i < posts.length; ++i){
    		if(posts[i].id === id){
    			posts[i].text = text;
    			return;
    		}
    	}
    },

    updatePostTitle: function(id, title){
    	for(var i = 0; i < posts.length; ++i){
    		if(posts[i].id === id){
    			posts[i].title = title;
    			return;
    		}
    	}	
    },

    deletePost: function(id){
    	for(var i = 0; i < posts.length; ++i){
    		if(posts[i].id === id){
    			posts.splice(i, 1);
    			return;
    		}
    	}
    }
};
