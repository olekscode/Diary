//var User = module.require(User); // ???
//var Post = module.require(Post); // ???

// should be removed / commented out; see module.require(...);
function Post(id, date, title, text){
  this.id = id;
  this.date = date;
  this.title = title;
  this.text = text;
}

function User(login, password){
  this.login = login;
  this.password = password;
}
// 


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



  // gets the user by a specified login from the database and applies 'callbackForUser' function to this user; 
  // if the user is not found returns null;
  // [for Ivan: later think of using findOne to perform this task];
  this.getUserByLogin = function(userLogin, callbackForUser) {
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
        callbackForUser(user);
        db.close();
      });
    });
  }

  // gets the post by a specified id from the database and applies 'callbackForPost' function to this post; 
  // if the post is not found returns null;
  // [for Ivan: later think of using findOne to perform this task];
  this.getPostById = function(postId, callbackForPost) {
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
        callbackForPost(post);
        db.close();
      });
    });
  }



  // inserts specified user into the database and calls 'onInsertionSucceed' function after the insertion secceeded;
  this.insertUser = function(user, onInsertionSucceed) {
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
      assert.equal(null, err);
      insertDocument(db, onInsertionSucceed);
    });
  };

  // inserts specified post into the database and calls 'onInsertionSucceed' function after the insertion secceeded;
  this.insertPost = function(post, onInsertionSucceed) {
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
      assert.equal(null, err);
      insertDocument(db, onInsertionSucceed);
    });
  };



  // removes user by specified login and calls 'onRemoveSucceed' after the deletion secceed;
  this.removeUser = function(userLogin, onRemoveSucceed) {
    var removeDocument = function(db, callback) {
      db.collection('users').deleteMany({ login: userLogin },
          function(err, results) {
             callback();
          });
    };

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      removeDocument(db, function() {
        onRemoveSucceed();
        db.close();
      });
    });
  }

  // removes post by specified id and calls 'onRemoveSucceed' after the deletion secceed;
  this.removePost = function(postId, onRemoveSucceed) {
    var removeDocument = function(db, callback) {
      db.collection('posts').deleteMany({ id: postId },
          function(err, results) {
             callback();
          });
    };

    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      removeDocument(db, function() {
        onRemoveSucceed();
        db.close();
      });
    });
  }
}




/* examples; */

// instantiates new MongoConnect object;
var connect = new MongoConnect();

var sampleUser = new User("SAMPLE_USER_LOGIN", "SAMPLE_PASSWORD");
var samplePost = new Post("SAMPLE_POST_ID", "SAMPLE_DATE", "SAMPLE_TITLE", "SAMPLE_TEXT");

// inserts and passes callback;
connect.insertUser(sampleUser, function() {
  console.log("User has been inserted successfully");
});
connect.insertPost(samplePost, function() {
  console.log("Post has been inserted successfully");
});


// gets all users / posts and applies to the array of users / posts specified callback;
connect.getAllPosts(function(arr) {
  //console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i].id + ' ' + arr[i].date + ' ' + arr[i].title + ' ' + arr[i].text);
  };
  console.log("\n");
});
connect.getAllUsers(function(arr) {
  //console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i].login + ' ' + arr[i].password);
  };
  console.log("\n");
});



// gets user/post by login/id and applies specified callback to required user/post;
connect.getUserByLogin("SAMPLE_USER_LOGIN", function(user) {
  console.log("Required user is - '" + user.login + " " + user.password + "'\n");
});
connect.getPostById("SAMPLE_POST_ID", function(post) {
  console.log("Required post is: \n\t" + post.id + "\n\t" + post.title + "\n\t" + post.text + "\n");
});



// removes sample user, calls callback function and shows the result database content;
connect.removeUser("SAMPLE_USER_LOGIN", function() {
  console.log("User has been successfully removed");
});
connect.getAllUsers(function(arr) {
  //console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i].login + ' ' + arr[i].password);
  };
  console.log("\n");
});


// removes sample post, calls callback function and shows the result database content;
connect.removePost("SAMPLE_POST_ID", function() {
  console.log("Post has been successfully removed");
});
connect.getAllPosts(function(arr) {
  //console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i].id + ' ' + arr[i].date + ' ' + arr[i].title + ' ' + arr[i].text);
  };
  console.log("\n");
});
