function User(login, password){
	this.login = login;
	this.password = password;
	//stores id's of Post user owns.
	this.idArray = new Array();
	//stores dates of that Posts.
	this.dateArray = new Array();
	//stores titles of thst Posts.
	this.titleArray = new Array();
}