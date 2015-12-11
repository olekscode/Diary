module.exports = function (_id, _login ,_date, _title, _text){
	var id = _id;
	var login = _login;
	var date = _date;
	var title = _title;
	var text = _text;

	//Getters and setters.
	return{
		getId: function(){
			return id;
		},

		setId: function(_id){
			id = _id;
		},

		getLogin: function(){
			return login;
		},

		setLogin: function(_login){
			login = _login;
		},

		getDate: function(){
			return date;
		},

		setDate: function(_date){
			date = _date;
		},

		getTitle: function(){
			return title;
		},

		setTitle: function(_title){
			title = _title;
		},

		getText: function(){
			return text;
		},

		setText: function(_text){
			text = _text;
		}
	}
}