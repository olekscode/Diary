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


// Add post button click
$('#btnAddPost').on('click', addPost);

// Add post
function addPost (event) {
	var errorCount = 0;
	$('#addPost input').each(function (index, val) {
		if($(this).val() === '') {
			errorCount++;
		}
	});
	if(errorCount === 0) {
		var newPost = {
			'title': $('#addPost div input#inputTitle').val(),
			'text': $('#addPost textarea#inputText').val()
		};

		$.ajax ({
			type: 'POST',
			data: newPost,
			url: '/posts/addpost',
			datatype: 'JSON'
		}).done(function(response) {
			if(response.msg === '') {
				$('#addPost div input').val('');
				$('#addPost textarea').val('');
			} else {
				alert('Error: ' + response.msg);
			}
		});
	} else {
		alert('Please fill in all fields');
	}
}

// Delete post button click
$('#deleteSubmit').on('click', deletePost);

// Delete post
function deletePost (event) {
	event.preventDefault();

	$.ajax({
		type: 'DELETE',
		url: '/posts/deletepost' + $(this).attr('rel')
	}).done(function(response) {
		if(response.msg === '') {
		} else {
			alert('Error: ' + response.msg);
		}
		populateList();
	});
}