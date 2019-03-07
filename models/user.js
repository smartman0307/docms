'use strict';
const bcrypt = require('bcrypt-nodejs');

function encryptPasswordIfChanged(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('User', 'Administrator'),
      allowNull: false
    }
  }, {});

  User.associate = function (models) {
    // associations can be defined here
  };

  User.beforeCreate(encryptPasswordIfChanged);

  User.beforeUpdate(encryptPasswordIfChanged);

  return User;
};
