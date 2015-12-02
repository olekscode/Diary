// Postlist data array for filling in info box
var postListData = [];

$(document).ready(function() {
	populateList();
});

function populateList () {
	var listContent = "";

	$.getJSON('/posts/postlist', function(data) {
		$.each(data, function() {
			listContent += '<li><a href="#" class="linkshowpost" rel="' + this.postname + '"><i class="fa fa-circle-thin"></i>' + this.postname + '</a></li>';
		});

		$('#postlist div ul').html(listContent);
	});

}


// Show post information
function showPostInfo (event) {
	event.preventDefault();
	var thisPostName = $(this).attr('rel');
	var arrayPosition = postListData.map(function(arrayItem) {
		return arrayPosition.postname;
	}).indexOf(thisPostName);

	var thisPostObject = postListData[arrayPosition];

	$('postTitle').text(thisPostObject.postTitle);
	$('postText').text(thisPostObject.postText);

}

$('#postlist div ul').on('click', 'li a.linkshowpost', showPostInfo);