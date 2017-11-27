requirejs.config({
    baseUrl: "/scripts/",
    paths: {
        jquery: "https://code.jquery.com/jquery-3.2.1.min"
    }
});

window.addEventListener("load", () => {
    document.querySelectorAll("a:not([target])").forEach((a: HTMLAnchorElement, i) => {
        a.setAttribute("prevent_and_redirect", "");
        a.addEventListener("click", (e) => {
            e.preventDefault();
            location.href = a.href;
        });
    });
});

for (let leave of document.querySelectorAll(".leave")) {
    leave.onclick = () => {
        $.post("/action/remove_self_from_group", {user_id: user.id, group_id: leave.id});
        location.href = "/page/main.html";
    }
}
