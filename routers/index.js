const router = require("express").Router();
const passport = require("passport");
const { strategy, serialize, deserialize } = require("../middlewares/passport");
const user = require("./user.router");
const post = require("./post.router");
const { User, Post } = require("../models");
passport.use("local_login", strategy.local_login);
passport.use("local_join", strategy.local_join);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

//api
router.use("/user", user);
router.use("/post", post);
module.exports = router;
