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

<<<<<<< HEAD

//forms' validation
	
    var _validate_login = function(login) {
	// TODO: Forbid having a digit as a first character
	return login.match('[^a-zA-Z0-9_\-]') == null;
    };

    var _validate_pass = function(password) {
	// TODO: Allow using $ as in the Pa$$word
	return password.match('[^a-zA-Z0-9_\-]') == null;
    };

    
    var _confirm_password = function(password, passwordConfirm)
    {
    	console.log( passwordSignUp == passwordConfirm);
    	return passwordSignUp == passwordConfirm;
    };
    

    
        // TODO: Avoid hardcoding the responses
        // TODO: Consider using callbacks instead of passing the responses

    function signInValidation() {
		var login = document.getElementById("login").value;
    	var password = document.getElementById("password").value;
            if (_validate_login(login)
             && _validate_pass(password)) {
                    return "SUCCESS";
            }
            else {
                alert( "INVALID LOGIN OR PASSWORD");
            }
        };

   function signUpValidation() {
    	var login = document.getElementById("login").value;
    	var password = document.getElementById("password").value;
    	var passwordConfirm = document.getElementById("passwordConfirm").value;
            if (_validate_login(login)
             && _validate_pass(password)
             && _confirm_password(password, passwordConfirm) ) 
            {
                console.log("SUCCESS");        
               }
            else {
                console.log("INVALID LOGIN OR PASSWORD");
            }
        };
=======
// Delete profile  
$('#deleteProfile').on('click', deleteProfile);
function deleteProfile(event) {
	event.preventDefault();

	$.ajax({
		type: 'DELETE',
		url: '/users/deleteuser' + $(this).attr('rel')
	});
}
>>>>>>> 8434ca6bbc6d6f017cd134d20de6e43ed30e619f
