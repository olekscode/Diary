module.exports = function (_login, _password){
	var login = _login;
	var password = _password;

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