import * as $ from "jquery"

namespace registrationpage {
    function do_register() {
        var name = document.forms["registrationForm"]["name"].value;
        var password = document.forms["registrationForm"]["password"].value;
        var confirmPassword = document.forms["registrationForm"]["confirmpassword"].value;
        var email = document.forms["registrationForm"]["email"].value;

        var correctNameFormat = true;
        var correctEmail = true;
        var correctPasswordFormat = true;
        var correctPasswordMatch = true;

        /**
         * There is an official standard for valid email addresses known as RFC 2822
         * The regex below validates email addresses on this format
         * If interested, read more here: 
            * https://www.ietf.org/rfc/rfc2822.txt 
            * http://www.regular-expressions.info/email.html
        **/
        var regExp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
        

        var alertMessage = "Registration Failed. Please fix the following: ";

        if (name == "" || name.length < 3) {
            correctNameFormat = false;
            alertMessage += "\n\t **Please fix name. Has to be more than three characters.";
        }

        if (email == "" || email.length < 5 || !email.match(regExp)) {
            correctEmail = false;
            alertMessage += "\n\t **Please fix email. Has to be more than five characters and valid email address";
        }

        if (password == "" || password.length < 5) {
            correctPasswordFormat = false;
            alertMessage += "\n\t **Please fix password. Has to be more than five characters.";
        }

        if (confirmPassword == "" || password != confirmPassword) {
            correctPasswordMatch = false;
            alertMessage += "\n\t **Please fix confirmation password. Passwords do not match";
        }

        if (!correctNameFormat || !correctEmail ||  !correctPasswordFormat || !correctPasswordMatch) {
            alert(alertMessage);
            return false;
        } else {
            alert("Registration Successful!");
            location.href = "main.html";
            return false;
        }
      return true;
    }

    function do_cancel() {
        location.href = "login.html";
        return false; //block form submit
    }

    $("#submit").click(do_register);
    $("#cancel").click(do_cancel);
    console.log("INIT");
}
