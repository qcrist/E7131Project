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
        

        var alertMessage = "Registration Failed. Please fix the following: ";

        if (name == "" || name.length < 3) {
            correctNameFormat = false;
            alertMessage += "\n\t **Please fix name. Has to be more than three characters.";
        }

        if (email == "" || email.length < 5) {
            correctEmail = false;
            alertMessage += "\n\t **Please fix email. Has to be more than five characters.";

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
    }

    function do_cancel() {
        location.href = "login.html";
        return false; //block form submit
    }

    $("#submit").click(do_register);
    $("#cancel").click(do_cancel);
    console.log("INIT");
}
