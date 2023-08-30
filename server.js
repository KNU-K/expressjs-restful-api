const express = require("express");
const app = express();
const routers = require("./routers");

const session = require("express-session");
const passport = require("passport");
const db = require("./models");

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

app.listen(port, async () => {
  try {
    //await db.sequelize.sync({ force: false });
    console.log("db conn ..!");

    console.log(`finally, Server open port : ${port}`);
  } catch (err) {
    throw err;
  }
});
