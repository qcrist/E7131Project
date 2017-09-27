import * as $ from "jquery"

namespace registrationpage {

    function do_register() {
        return true; //allow form submit
    }

    function do_cancel() {
        location.href = "login.html";
        return false; //block form submit
    }

    $("#submit").click(do_register);
    $("#cancel").click(do_cancel);
    console.log("INIT");
}
