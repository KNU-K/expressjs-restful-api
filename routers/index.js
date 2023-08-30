const router = require("express").Router();
const passport = require("passport");
const { local_login, local_join } = require("../middlewares/strategy");
const user = require("./user.router");
const { User } = require("../models");
// router.get("/", (req, res) => {
//   res.json({
//     test: "test",
//   });
// });

passport.use("local_login", local_login);
passport.use("local_join", local_join);
passport.serializeUser((user, done) => {
  console.log("serialize User ", user.userid);
  done(null, user.userid);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);

    console.log("succeed deserialize User ", id);
    done(null, user.dataValues);
  } catch (err) {
    done(err, null);
  }
});
router.use("/user", user);
module.exports = router;
