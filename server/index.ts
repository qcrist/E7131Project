import * as express from "express";
import * as bodyparser from "body-parser";
import * as multer from "multer";
import * as cookies from "cookie-parser";
import * as path from "path";

namespace server {
    const secret = "CookieSecretE7131Project2017@(*$#&@*)($%!@)^";
    const app = express();
    const post = multer({
        storage: multer.memoryStorage()

    });
    //pages that can be accessed without logging in.
    const logged_out_pages = [
        "/login.html",
        "/registration.html",
    ];

    function handle_login(req: express.Request, res: express.Response, next: () => void) {
        console.log(req.body);
        res.cookie("user", "test_user", {signed: true});
        res.redirect("/main.html");
    }

    function handle_logout(req: express.Request, res: express.Response, next: () => void) {
        res.clearCookie("user");
        res.redirect("/login.html");
    }

    function handle_register(req: express.Request, res: express.Response, next: () => void) {
        //todo
        res.redirect("/login.html");
    }

    function is_valid_login(cookies: any) {
        return !!cookies["user"];
    }

    //redirect / to login
    app.use((req, res, next) => req.url === "/" ? res.redirect("/main.html") : next());

    app.use(bodyparser.urlencoded());
    app.use(cookies(secret));

    app.post("/action/logout", handle_logout);
    app.post("/action/login", post.fields([]), handle_login);
    app.post("/action/register", post.single("photo"), handle_register);

    // redirect to login if not logged in.
    app.use((req, res, next) => {
        let page = !!req.url.match(/^\/.*\.html$/) && logged_out_pages.indexOf(req.url) == -1;
        if (page && !is_valid_login(req.signedCookies))
            res.redirect("/login.html");
        else
            next();
    });

    app.use(express.static('../client'));

    app.listen(8090);
}