module.exports = function (){
	var id;
	var date;
	var title;
	var text;

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