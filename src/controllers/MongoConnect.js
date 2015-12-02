var User = require('../models/user');
var Post = require('../models/post');


// Mongo connect class that provides an interface for database interaction;
function MongoConnect() {
	var MongoClient = require('mongodb').MongoClient;
	var assert      = require('assert');
	var ObjectId    = require('mongodb').ObjectID;
	var url         = 'mongodb://localhost:27017/DiaryDatabase';

	// gets the array of all users from the database and applies 'callbackForUsers' function to this array;
	this.getAllUsers = function(callbackForUsers) {
		var data = [];
		var findUsers = function(db, callback) {
			var cursor = db.collection('users').find();
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
						foundUser = doc;
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
					foundPost = doc;
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



	// inserts specified user into the database and calls 'onInsertionSucceed' function after the insertion secceeded;
	// otherwise calls 'onInsertionFailed' function;
	this.insertUser = function(user, onInsertionSucceed, onInsertionFailed) {
		var insertDocument = function(db, callback) {
			db.collection('users').insertOne(
				{ 
					"login"     : user.login,
						"password"  : user.password
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
					"id"    : post.id,
					"date"  : post.date,
					"title" : post.title,
					"text"  : post.text
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
				{ "login" : user.login },
				{
					"login"   : user.login,
						"password"  : user.password
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
				{ "id" : post.id },
				{
					"id"  : post.id,
						"date"  : post.date,
						"title" : post.title,
						"text"  : post.text,
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