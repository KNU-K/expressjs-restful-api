const Sequelize = require("sequelize");
const config = require("../config/config.json");
const { username, password, database, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const User = require("./user")(sequelize, Sequelize.DataTypes);
const Post = require("./post")(sequelize, Sequelize.DataTypes);

const db = {};
User.associate(Post);
Post.associate(User);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;

module.exports = db;
