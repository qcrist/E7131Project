import * as $ from "jquery"

$("#save").click(() => {
    if (!$("[name=name]").val()) {
        alert("please enter a name");
        return false;
    }
});
