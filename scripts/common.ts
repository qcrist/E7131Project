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
