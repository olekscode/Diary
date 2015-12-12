function funcBefore(){
    	$("information").text ("Waiting for Data");
    }

    function funcSuccess(data){
    	$("information").text (data);
    }    

    $(document).ready (function(){
    	$('#load').bind("click", function(){
    		$.ajax({
    			// if I right understand, I must send data to authorizer 
    			url: "../../controllers/authorizer.js",
    			type: "POST",
    			data: ({login: "i1", password: "i2", email: "i3"}),
          dataType: "html",
          beforeSend: funcBefore,
          success: funcSuccess
    		});
    	});
    });

   function validate(form)
   {
    if(form.login.value == "") {
      alert("Error: Log in cannot be blank!");
      form.login.focus();
      return false;
    }
    
    if(form.login.value.match('[^a-zA-Z0-9_\-]') != null) {
      alert("Error: Log in must contain only letters, numbers and underscores!");
      form.login.focus();
      return false;
    }

      if(form.password.value == "" || form.password.value != form.passwordConfirm.value)
      {
        alert("Error: password and confirm password are different or password field is blank!");
        return false;
      }
      }