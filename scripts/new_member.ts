import * as $ from "jquery"

$('#add').click(function() {
    var alertMessage = "Could not add new group member. ";

    var name = $('#userName').val().toString();
    if (name.length < 3) {
        alertMessage += " Name must be longer than three characters.";
        alert(alertMessage);
        return false;
    }
    location.href = "group_info.html";
    return true;

});

$('#cancel').click(function() {
    location.href = "group_info.html";
    return false;
});
