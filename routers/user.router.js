const passport = require("passport");

const router = require("express").Router();

router.post("/join", (req, res, next) => {
  passport.authenticate("local_join", (user, err) => {
    if (err) return next(err);

    res.json({
      statusCode: 200,
      msg: `welcome ${user.username}, succeed your register`,
    });
  })(req, res, next);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local_login", (user, err) => {
    if (err) return next(err);

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({
        statusCode: 200,
        msg: "login successful .. !",
      });
    });
  })(req, res, next);
});

//valid auth identification
router.post("/", (req, res, next) => {
  res.send("test");
});

module.exports = router;
