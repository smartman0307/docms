var db = require('../../models/index'),
  Document = require('../../models/document');

module.exports = {
  getDocument: function (req, res) {
    var id = req.param('id');

    return db.sequelize.sync()
      .then(() => Document.findById(id).then(document => res.json(document)))
      .catch((err) => res.send(err));
  },

  getAllDocuments: function (req, res) {
    return db.sequelize.sync()
      .then(() => Document.findAll().then(documents => res.json(documents)))
      .catch((err) => res.send(err));
  },

  createDocument: function (req, res) {
    var document = {
      ownerId: req.decoded.id,
      title: req.body.title,
      content: req.body.content
    };

    return db.sequelize.sync()
      .then(() => Document.create(document))
      .then(() => res.json({
        success: true,
        message: 'Document has been created!'
      }))
      .catch((err) => res.send(err));
  },

  updateDocument: function (req, res) {
    var id = req.param('id'),
      updatedDocument = {
        title: req.body.title,
        content: req.body.content
      };

    return db.sequelize.sync()
      .then(() => Document.update(updatedDocument, { where: { document_id: id } }))
      .then(() => res.status(200).json({
        success: true,
        message: `Document with id: ${id} has been updated!`
      }))
      .catch((err) => res.send(err));
  },

  deleteDocument: function (req, res) {
    var id = req.param('id');

    return db.sequelize.sync()
      .then(() => Document.destroy({ where: { document_id: id } }))
      .then(() => res.status(200).json({
        success: true,
        message: `Document with id: ${id} has been deleted!`
      }))
      .catch((err) => res.send(err));
  },

  getDocumentsByUserId: function (req, res, next) {
    var user_id = req.param('id');

    return db.sequelize.sync()
      .then(() => Document.findAll({ where: { owner_id: user_id } }))
      .then((documents) => res.json(documents))
      .catch((err) => res.send(err));
  }
};
