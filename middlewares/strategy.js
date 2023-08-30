const passport = require("passport");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

// localLoginCallback(){

// }
// localJoinCallback(){

// }
const localLoginCallback = async (userid, userpw, done) => {
  try {
    const user = await User.findByPk(userid);
    if (!user) throw new Error("no exist your userid");
    const crytoPw = user.dataValues.userpw;

    if (!(await bcrypt.compare(userpw, crytoPw)))
      throw new Error("no same your userpw associated with your id");

    done(user.dataValues, null);
  } catch (err) {
    done(null, err);
  }
};
const localJoinCallback = async (req, userid, userpw, done) => {
  try {
    const { username } = req.body;

    const user = await User.findByPk(userid);
    if (user) throw new Error("already exist id");

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const cryptoPw = await bcrypt.hash(userpw, salt);

    const res = await User.create({
      userid: userid,
      userpw: cryptoPw,
      username: username,
    });

    done(res.dataValues, null);
  } catch (err) {
    done(null, err);
  }
};

const strategy = {
  local_login: new LocalStrategy(
    {
      usernameField: "userid",
      passwordField: "userpw",
    },
    localLoginCallback
  ),
  local_join: new LocalStrategy(
    {
      usernameField: "userid",
      passwordField: "userpw",
      passReqToCallback: true,
    },
    localJoinCallback
  ),
};

module.exports = strategy;
