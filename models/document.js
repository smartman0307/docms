'use strict';
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      },
      allowNull: false
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    date_created: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    last_modified: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    }
  }, {});

  Document.associate = function (models) {
    // associations can be defined here
  };

  return Document;
};
