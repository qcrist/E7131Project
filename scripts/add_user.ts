import * as $ from "jquery"

namespace adduserpage {
    function do_register() {
        let name = document.forms["registrationForm"]["name"].value;
        let photo = document.forms["registrationForm"]["photo"].value;

        /**
         * There is an official standard for valid email addresses known as RFC 2822
         * The regex below validates email addresses on this format
         * If interested, read more here:
         * https://www.ietf.org/rfc/rfc2822.txt
         * http://www.regular-expressions.info/email.html
         **/
        let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;


        let failed = false;
        let alertMessage = "Registration Failed. Please fix the following: ";

        if (name == "" || name.length < 3) {
            failed = true;
            alertMessage += "\n **Please enter your full name";
        }

        if (!photo) {
            failed = true;
            alertMessage += "\n **Please provide a photo (click on image at the top)";
        }

        if (failed) {
            alert(alertMessage);
            return false;
        }
        return true;
    }

    $("#submit").click(do_register);
}
