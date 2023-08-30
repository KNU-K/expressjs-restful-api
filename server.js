const express = require("express");
const app = express();
const routers = require("./routers");
<<<<<<< Updated upstream
=======
const db = require("./models");
const session = require("express-session");
const { strategyMiddleware } = require("./middlewares/strategy");
const passport = require("passport");

>>>>>>> Stashed changes
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", routers);

app.listen(port, () => {
  console.log(`Server open port : ${port}`);
});
