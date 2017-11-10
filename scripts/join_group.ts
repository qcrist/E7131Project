import * as $ from "jquery"

namespace joingrouppage {
    function do_search() {
        let name = document.forms["joinForm"]["groupName"].value;

        if (name == "") {
            alert("Please enter a Group Name");
            return false;
        }

        return true;
    }

    function do_cancel() {
        location.href = "main.html";
        return false; // block form submit
    }

    $("#search").click(do_search);
    $("#cancel").click(do_cancel);
}