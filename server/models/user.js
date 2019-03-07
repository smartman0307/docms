'use strict';

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function hashPassword(user) {
  if (user.changed('password')) {
    return bcrypt.hash(user.password, SALT_ROUNDS)
      .then((hashedPass) => { user.password = hashedPass; });
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Administrator', 'User'),
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Document, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};