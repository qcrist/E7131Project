import * as $ from "jquery"

$("button").click(() => {
    if (!$("[name=name]").val()) {
        alert("please enter a name");
        return false;
    }
});
