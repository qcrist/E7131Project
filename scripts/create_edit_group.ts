import * as $ from "jquery"

$("#save").click(() => {
    if (!$("[name=name]").val()) {
        alert("please enter a name");
        return false;
    }
});

$(".remove_member").click(function() {
    if (confirm("Remove " + $(this).prev().text() + " from your group?")) {
        $(this).hide();
        $(this).prev().hide();
        $(this).prev().prev().hide();
        submit_removal($(this).next().text());
    }
});

let submit_removal = function(user_id: string) {
    $.post("/action/remove_user_from_group", {id: user_id})
}