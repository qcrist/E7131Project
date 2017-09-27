import * as $ from "jquery"

namespace loginpage {

    function do_login() {
        let email : string = (<HTMLInputElement>document.getElementById("email")).value;
        let password : string = (<HTMLInputElement>document.getElementById("password")).value;

        /**
         * There is an official standard for valid email addresses known as RFC 2822
         * The regex below validates email addresses on this format
         * If interested, read more here:
         * https://www.ietf.org/rfc/rfc2822.txt
         * http://www.regular-expressions.info/email.html
         **/
        let regex : string = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

        if (!email.match(regex)) {
            alert("Invalid email address.");
        }

        else if (password.length < 5) {
            alert("Wrong password.");
        }

        else {
            location.href = "main.html";
            return true; //do form submit
        }
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
