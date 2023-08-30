"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(Post) {
      // define association here
      User.hasMany(Post, {
        foreignKey: "userid", // �ܷ� Ű �ʵ� �̸�
        as: "posts",
      });
    }
  }
  User.init(
    {
      userid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userpw: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
