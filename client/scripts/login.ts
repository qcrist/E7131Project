import * as $ from "jquery"

namespace loginpage {

    function do_login() {
        return true; //do form submit
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
