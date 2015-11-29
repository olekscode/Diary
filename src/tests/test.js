var User = require('../models/user');
var authorizer = require('../controllers/authorizer');

console.log(authorizer.signin('usr1', 'pass1'));
console.log(authorizer.signin('usr2', 'pass1'));
console.log(authorizer.signin('***', 'pass1'));
console.log(authorizer.signin('Dubhcloch', 'pass1'));

console.log(authorizer.signup(new User('usr1', 'pass1')));
console.log(authorizer.signup(new User('usr2', 'pass1')));
console.log(authorizer.signup(new User('***', 'pass1')));
console.log(authorizer.signup(new User('Dubhcloch', 'pass1')));

console.log(authorizer.signin('***', 'pass1'));
console.log(authorizer.signin('Dubhcloch', 'pass1'));

console.log(authorizer.signup(new User('un-olk', 'Pa$$word')));
