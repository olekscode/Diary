module.exports = function (){
	var login;
	var password;

	//Getters and setters.
	return{
		setLogin: function(_login){
			login = _login;
		},

		getLogin: function(){
			return login;
		},

		setPassword: function(_password){
			password = _password;
		},

		getPassword: function(){
			return password;
		}
	}
};