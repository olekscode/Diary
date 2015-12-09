var User = require('../models/user.js');
var Post = require('../models/post.js');


// Mongo connect class that provides an interface for database interaction;
function MongoConnect() {
	var MongoClient = require('mongodb').MongoClient;
	var assert      = require('assert');
	var ObjectId    = require('mongodb').ObjectID;
	var url         = 'mongodb://noussommesdiary:noussommesdiarypassword@ds027825.mongolab.com:27825/diarydatabase';//'mongodb://localhost:27017/DiaryDatabase';

	// gets the array of all users from the database and applies 'callbackForUsers' function to this array;
	this.getAllUsers = function(callbackForUsers) {
		var data = [];
		var findUsers = function(db, callback) {
			var cursor = db.collection('users').find();
			cursor.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					 data.push(User(doc.login, doc.password));
				} else {
					 callback(data);
				}
			});
		}

		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			findUsers(db, function(arr) {
				callbackForUsers(arr);
				db.close();
			});
		}); 
	};

	// gets the array of all posts from the database and applies 'callbackForPosts' function to this array;
	this.getAllPosts = function(callbackForPosts) {
		var data = [];
		var findPosts = function(db, callback) {
			var cursor = db.collection('posts').find();
			cursor.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					 data.push(doc);
				} else {
					 callback(data);
				}
			});
		}

		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			findPosts(db, function(arr) {
				callbackForPosts(arr);
				db.close();
			});
		}); 
	};


	// gets the user by a specified login from the database and applies 'callbackForSuccess' function to this user if it is found;
	// if the found user is null, calls 'callbackForFail' function.
	// [for Ivan: later think of using findOne to perform this task];
	this.getUserByLogin = function(userLogin, callbackForSuccess, callbackForFail) {
		var foundUser = null;
		var findUser = function(db, callback) {
			var cursor = db.collection('users').find({ login : userLogin });
			cursor.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					foundUser = User(doc.login, doc.password);
				} else {
					callback(foundUser);
				}
			});
		}

		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			findUser(db, function(user) {
				if (user === null) {
					callbackForFail();
				} else {
					callbackForSuccess(user);
				}
				db.close();
			});
		});
	};

	// gets the post by a specified id from the database and applies 'callbackForSuccess' function to this post if it is found; 
	// if the found post is null, calls 'callbackForFail' function.
	// [for Ivan: later think of using findOne to perform this task];
	this.getPostById = function(postId, callbackForSuccess, callbackForFail) {
		var foundPost = null;
		var findPost = function(db, callback) {
			var cursor = db.collection('posts').find({ id : postId });
			cursor.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					foundPost = Post(doc.id, doc.userLogin, doc.date, doc.title, doc.text);
				} else {
					callback(foundPost);
				}
			});
		}

		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			findPost(db, function(post) {
				if (post === null) {
					callbackForFail();
				} else {
					callbackForSuccess(post);
				}
				db.close();
			});
		});
	};


	// gets the array of all posts from the database by user with specified login and applies 'callbackForSuccess' function to this array;
	// in case of database connection error calls 'callbackForFail' function;
	this.getPostsByUserLogin = function(userLoginParam, callbackForSuccess, callbackForFail) {
		var data = [];
		var findPosts = function(db, callback) {
			var cursor = db.collection('posts').find({ userLogin : userLoginParam });
			cursor.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					 data.push(Post(doc.id, doc.userLogin, doc.date, doc.title, doc.text));
				} else {
					callback(data);
				}
			});
		}

		MongoClient.connect(url, function(err, db) {
			if (err != null) {
				callbackForFail();
			} else {
				findPosts(db, function(posts) {
					callbackForSuccess(posts);
					db.close();
				});
			}
		});
	};


	// inserts specified user into the database and calls 'onInsertionSucceed' function after the insertion secceeded;
	// otherwise calls 'onInsertionFailed' function;
	this.insertUser = function(user, onInsertionSucceed, onInsertionFailed) {
		var insertDocument = function(db, callback) {
			db.collection('users').insertOne(
				{ 
					"login"     : user.getLogin(),
					"password"  : user.getPassword()
				}, 
				function() {
						db.close(); 
						callback();
				});
		};

		MongoClient.connect(url, function(err, db) {
				//assert.equal(null, err);
				if (err !== null) {
					onInsertionFailed();
				} else {
					insertDocument(db, onInsertionSucceed);
				}
			});
		};

	// inserts specified post into the database and calls 'onInsertionSucceed' function after the insertion secceeded;
	// otherwise calls 'onInsertionFailed' function;
	this.insertPost = function(post, onInsertionSucceed, onInsertionFailed) {
		var insertDocument = function(db, callback) {
			db.collection('posts').insertOne(
				{ 
					"userLogin"	: post.getLogin(),
					"id"   		: post.getId(),
					"date"  	: post.getDate(),
					"title" 	: post.getTitle(),
					"text"  	: post.getText()
				}, 
				function() {
					db.close(); 
					callback();
				});
		};

		MongoClient.connect(url, function(err, db) {
			//assert.equal(null, err);
			if (err !== null) {
					onInsertionFailed();
				} else {
					insertDocument(db, onInsertionSucceed);
				}
		});
	};



	// removes user by specified login and calls 'onRemoveSucceed' after the deletion secceed;
	// in case of database error calls 'onRemoveFail' function;
	this.removeUser = function(userLogin, onRemoveSucceed, onRemoveFail) {
		var removeDocument = function(db, callback) {
			db.collection('users').deleteMany({ login: userLogin }, function(err, results) {
				callback();
			});
		};

		MongoClient.connect(url, function(err, db) {
			//assert.equal(null, err);
			if (err !== null) {
				onRemoveFail();
			} else {
				removeDocument(db, function() {
					onRemoveSucceed();
					db.close();
				});
			}
		});
	};

	// removes post by specified id and calls 'onRemoveSucceed' after the deletion secceed;
	// in case of database error calls 'onRemoveFail' function;
	this.removePost = function(postId, onRemoveSucceed, onRemoveFail) {
		var removeDocument = function(db, callback) {
				db.collection('posts').deleteMany({ id: postId }, function(err, results) {
				callback();
			});
		};

		MongoClient.connect(url, function(err, db) {
			//assert.equal(null, err);
				if (err !== null) {
				onRemoveFail();
			} else {
				removeDocument(db, function() {
					onRemoveSucceed();
					db.close();
				});
			}
		});
	};



	// updates specified user by looking up user login in the datbase and replacing password with the new one;
	// calls 'onUpdateSuccess' function after the updating secceed;
	// in case of database error calls 'onUpdateFail' function;
	this.updateUser = function(user, onUpdateSuccess, onUpdateFail) {
		var updateDocument = function(db, callback) {
			db.collection('users').update(
				{ "login" : user.getLogin() },
				{
					"login"   : user.getLogin(),
					"password"  : user.getPassword()
				}, callback);
		}

		MongoClient.connect(url, function(err, db) {
			//assert.equal(null, err);
			if (err !== null) {
				onUpdateFail();
			} else {
				updateDocument(db, function() {
					onUpdateSuccess();
					db.close();
				});
			}
		});
	};

	// updates specified post by looking up post id in the datbase and replacing the rest of fields with the new ones;
	// calls 'onUpdateSuccess' function after the updating secceed;
	// in case of database error calls 'onUpdateFail' function;
	this.updatePost = function(post, onUpdateSuccess, onUpdateFail) {
		var updateDocument = function(db, callback) {
			db.collection('posts').update(
				{ "id" : post.getId() },
				{
					"userLogin"	: post.getLogin(),
					"id"  		: post.getId(),
					"date"  	: post.getDate(),
					"title" 	: post.getTitle(),
					"text"  	: post.getText(),
				}, callback);
		}

		MongoClient.connect(url, function(err, db) {
			//assert.equal(null, err);
			if (err !== null) {
				onUpdateFail();
			} else {
				updateDocument(db, function() {
					onUpdateSuccess();
					db.close();
				});
			}
		});
	};
}

/*var conn = new MongoConnect();
conn.getPostById(2, function(post) {
	console.log(post.getTitle() + ' ' + post.getText());
});*/