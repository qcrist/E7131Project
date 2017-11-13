import * as express from "express";
import * as bodyparser from "body-parser";
import * as multer from "multer";
import * as cookies from "cookie-parser";
import * as ejs from "ejs";
import * as parseurl from "parseurl";
import * as database from "./db";

export namespace nodejserver {
    const secret = "CookieSecretE7131Project2017@(*$#&@*)($%!@)^";
    const app = express();
    const post = multer({
        storage: multer.memoryStorage()

    });
    //pages that can be accessed without logging in.
    const logged_out_pages = [
        "page/login.html",
        "page/registration.html",
    ];

    export const db = new database.Database();

    let debug_user_email = "debug_user@gmail.com";
    db.load();
    if (!db.user_from_email(debug_user_email)) {
        let debug_user = db.add_user({
            name: "debug user",
            gender: "",
            email: debug_user_email,
            passwd: debug_user_email,
            photo: "/img/image.png"
        });
        let debug_group = db.new_group(debug_user);
        debug_group.owner = debug_user.id;
        debug_group.name = "DEBUG GROUP";
        debug_group.ispublic = false;
        db.add_user_to_group(debug_group.id, debug_user);

        let debug_group2 = db.new_group(debug_user);
        debug_group2.owner = debug_user.id;
        debug_group2.name = "DEBUG PUBLIC GROUP";
        debug_group2.ispublic = true;
        db.add_user_to_group(debug_group2.id, debug_user);
    }

    // let debug_group = data
    function handle_login(req: express.Request, res: express.Response, next: () => void) {
        let email = req.body["email"];
        let pass = req.body["password"];
        let user = db.user_from_email(email);
        if (!user || user.passwd != pass) {
            return res.status(400).send("invalid user");
        }
        set_cookie(res, "user", user.id + "");
        res.redirect("/page/main.html");
    }

    function handle_logout(req: express.Request, res: express.Response, next: () => void) {
        res.clearCookie("user");
        res.redirect("/page/login.html");
    }

    function handle_register(req: express.Request, res: express.Response, next: () => void) {
        let user: database.newuser = {
            name: req.body["name"],
            passwd: req.body["password"],
            email: req.body["email"],
            gender: req.body["gender"],
            photo: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
        };
        try {
            db.add_user(user);
            res.redirect("/page/login.html");
        } catch (ex) {
            return res.status(400).send(ex);
        }
    }

    function handle_join_group(req: express.Request, res: express.Response, next: () => void) {
        let gid = +req.params["gid"];
        db.add_user_to_group(gid, get_user(req));
        res.redirect("/page/main.html");
    }

    function handle_updategroup(req: express.Request, res: express.Response, next: () => void) {
        let group_id = nodejserver.cookie(req, 'group_id');
        if (!group_id) {
            return res.status(400).send("no group set, cookie timeout?");
        }
        db.add_user_to_group(group_id, get_user(req));
        let group = db.groups[group_id];
        group.name = req.body.name;
        group.ispublic = req.body.ispublic == "true";
        db.save();
        res.redirect("/page/create_edit_group.html");
    }

    function handle_add_user_to_group(req: express.Request, res: express.Response, next: () => void) {
        let group_id = nodejserver.cookie(req, 'group_id');
        if (!group_id) {
            return res.status(400).send("no group set, cookie timeout?");
        }
        let user = db.add_user({
            name: req.body.name,
            photo: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            passwd: null,
            email: Date.now() + req.body.name + Math.random(), //must be unique, this should hold
            gender: req.body.gender
        });
        db.add_user_to_group(group_id, user);
        res.redirect("/page/create_edit_group.html");
    }

    function handle_remove_user_from_group(req: express.Request, res: express.Response, next: () => void) {
        let group_id = nodejserver.cookie(req, 'group_id');
        if (!group_id) {
            return res.status(400).send("no group set, cookie timeout?");
        }
        let user_id = req.body.id;
        db.remove_user_from_group(group_id, user_id);
    }

    function handle_remove_self_from_group(req: express.Request, res: express.Response, next: () => void) {
        let user_id = req.body.user_id;
        let group_id = req.body.group_id;

        db.remove_user_from_group(group_id, user_id);
    }


    function is_valid_login(req: express.Request) {
        return !!db.users[cookie(req, "user")];
    }

    export function get_user(req: express.Request) {
        if (!is_valid_login(req)) {
            throw "not logged in!";
        }
        return db.users[cookie(req, "user")];
    }

    export function cookie(req: express.Request, text: string) {
        return req.cookies[text];
    }

    export function set_cookie(res: express.Response, text: string, value: string) {
        return res.cookie(text, value, {signed: false});
    }

    app.set('view engine', 'html');
    app.engine('html', ejs.renderFile);
    app.set('views', "../");

    app.use(bodyparser.urlencoded({extended: false}));
    app.use(cookies(secret));

    app.use("/action/logout", handle_logout);
    app.post("/action/login", post.fields([]), handle_login);
    app.post("/action/register", post.single("photo"), handle_register);
    app.post("/action/updategroup", post.fields([]), handle_updategroup);
    app.post("/action/add_user_to_group", post.single("photo"), handle_add_user_to_group);
    app.post("/action/remove_user_from_group", post.single("id"), handle_remove_user_from_group);
    app.post("/action/remove_self_from_group", post.fields([]), handle_remove_self_from_group);

    app.get("/action/join_group/:gid", handle_join_group);

    app.use("/page/", (req, res) => {
        let path = parseurl.original(req).pathname.replace(/(^\/)/g, "");
        // redirect to login if not logged in.
        if (!is_valid_login(req) && logged_out_pages.indexOf(path) == -1)
            res.redirect("/page/login.html");
        else {
            res.locals.req = req;
            res.locals.res = res;
            res.render(path);
        }
    });
    app.get('/', (req, res) => res.redirect("/page/main.html"));
    app.use(express.static('../'));


    app.listen(8090);

    export function shuffle(a: any[]) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }
}

global["nodejserver"] = nodejserver;