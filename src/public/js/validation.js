function funcBefore(){
    	$("information").text ("Waiting for Data");
    }

    function funcSuccess(data){
    	$("information").text (data);
    }    

    (function(){
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

    function checkForm(form)
   {
    if(form.login.value == "") {
      alert("Error: Log in cannot be blank!");
      form.login.focus();
      return false;
    }
    re = /^\w+$/;
    if(!re.test(form.login.value)) {
      alert("Error: Log in must contain only letters, numbers and underscores!");
      form.login.focus();
      return false;
    }

    if(form.password1.value != "" && form.password1.value == form.password2.value) {
      if(form.password1.value.length < 6) {
        alert("Error: Password must contain at least six characters!");
        form.password1.focus();
        return false;
      }
      if(form.password1.value == form.login.value) {
        alert("Error: Password must be different from log in!");
        form.password1.focus();
        return false;
      }
      re = /[0-9]/;
      if(!re.test(form.password1.value)) {
        alert("Error: password must contain at least one number (0-9)!");
        form.password1.focus();
        return false;
      }
      re = /[a-z]/;
      if(!re.test(form.password1.value)) {
        alert("Error: password must contain at least one lowercase letter (a-z)!");
        form.password1.focus();
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(form.password1.value)) {
        alert("Error: password must contain at least one uppercase letter (A-Z)!");
        form.password1.focus();
        return false;
      }
    } else {
      alert("Error: Please check that you've entered and confirmed your password!");
      form.password1.focus();
      return false;
    }

    alert("You entered a valid password: " + form.pwd1.value);
    return true;
  }
