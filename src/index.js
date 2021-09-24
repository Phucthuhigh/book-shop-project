const express = require("express");
const path = require("path");
const route = require("./routes/main.route");
const routeApi = require("./api/routes/main.route");
const registerRouter = require("./routes/components/register.route");
const loginRouter = require("./routes/components/login.route");
const page404Router = require("./routes/components/404.route");
const authMiddleware = require("./middlewares/requireAuth.middleware");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const db = require("./databases/config/db");

app.set("views", "./src/views/pugs");
app.set("view engine", "pug");
db.connect();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"));
app.use(cookieParser("dsadsfbajbhsa231"));
app.use(
  session({
    secret: "dsadsfbajbhsa231",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.use("/", page404Router);

app.use("/", registerRouter);
app.use("/", loginRouter);

routeApi(app);
route(app);

app.get("/*", authMiddleware.queryIdAuth);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log("listening on port " + PORT));
