module.exports = function (_id, _date, _title, _text){
	var id = _id;
	var date = _date;
	var title = _title;
	var text = _text;

	//Getters and setters.
	return{
		getId: function(){
			return id;
		}

		setId: function(_id){
			id = _id;
		}

		getDate: function(){
			return date;
		}

		setDate: function(_date){
			date = _date;
		}

		getTitle: function(){
			return title;
		}

		setTitle: function(_title){
			title = _title;
		}

		getText: function(){
			return text;
		}

		setText: function(_text){
			text = _text;
		}
	}
}