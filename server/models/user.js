"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, {
        foreignKey: "userId",
      });

      User.hasMany(models.Notification, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      otp: DataTypes.STRING,
      otpCreatedAt: DataTypes.DATE,
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Menetapkan nilai default isVerified menjadi false
      },
      role: {
        type: DataTypes.ENUM(["Admin", "User"]),
        defaultValue: "User",
      },
      resetPasswordToken: DataTypes.TEXT,
      googleId: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
