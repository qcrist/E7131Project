import * as express from "express";

namespace server {
    const app = express();

    app.use(express.static('../client'));

    app.listen(8080);
}