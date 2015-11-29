var User = require('../models/user');

var users = [
    new User('usr1', 'pass1'),
    new User('usr2', 'pass2'),
    new User('usr3', 'pass3')
];

// DataManager
module.exports = {
    getUser: function(login) {
	for (var i = 0; i < users.length; ++i) {
	    if (users[i].login == login) {
		return users[i];
	    }
	}
	return null;
    },

    addUser: function(usr) {
	users.push(usr);
    }
};
