import * as $ from "jquery"

namespace loginpage {

    function do_login() {
        //FIXME handle login
        location.href = "main.html"; //FIXME URL
        return false; //block form submit
    }

    function do_register() {
        location.href = "registration.html"; //FIXME URL
        return false; //block form submit
    }

    function do_forgot() {
        alert("stretch goal");
    }

    $("#login").click(do_login);
    $("#register").click(do_register);
    $("#forgot").click(do_forgot);
    console.log("INIT");
}
