import * as $ from "jquery"

namespace loginpage {

    function do_login() {
        let email = document.forms["loginForm"]["email"].value;
        let password = document.forms["loginForm"]["password"].value;

        /**
         * There is an official standard for valid email addresses known as RFC 2822
         * The regex below validates email addresses on this format
         * If interested, read more here:
         * https://www.ietf.org/rfc/rfc2822.txt
         * http://www.regular-expressions.info/email.html
         **/
        let regex : string = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

        let failed = false;
        let alertMessage = "Login Failed. Please fix the following: ";

        if (email == "" || !email.match(regex)) {
            failed = true;
            alertMessage += "\n **Please enter a valid email address";
        }

        if (password == "" || password.length < 5) {
            failed = true;
            alertMessage += "\n **Please fix password. Has to be more than five characters.";
        }

        if (failed) {
            alert(alertMessage);
            return false;
        }

        return true;
    }

    function do_register() {
        location.href = "registration.html";
        return false; //block form submit
    }

    function do_forgot() {
        alert("stretch goal");
        return false; //block form submit
    }

    $("#login").click(do_login);
    $("#register").click(do_register);
    $("#forgot").click(do_forgot);
    console.log("INIT");
}
