var models = require('../models');

module.exports = {
  getDocument: function (req, res) {
    var id = req.param('id');

    return models.Document.findById(id)
      .then(document => res.json(document))
      .catch((err) => res.status(400).send(err));
  },

  getAllDocuments: function (req, res) {
    return models.Document.findAll()
      .then(documents => res.json(documents))
      .catch((err) => res.status(400).send(err));
  },

  createDocument: function (req, res) {
    var document = {
      UserId: req.decoded.id,
      title: req.body.title,
      content: req.body.content
    };

    return models.Document.create(document)
      .then(() => res.json({
        success: true,
        message: 'Document has been created!'
      }))
      .catch((err) => res.status(400).send(err));
  },

  updateDocument: function (req, res) {
    var id = req.param('id'),
      updatedDocument = {
        title: req.body.title,
        content: req.body.content
      };

    return models.Document.update(updatedDocument, { where: { id: id } })
      .then(() => res.status(200).json({
        success: true,
        message: `Document with id: ${id} has been updated!`
      }))
      .catch((err) => res.status(400).send(err));
  },

  deleteDocument: function (req, res) {
    var id = req.param('id');

    return models.Document.destroy({ where: { id: id } })
      .then(() => res.status(200).json({
        success: true,
        message: `Document with id: ${id} has been deleted!`
      }))
      .catch((err) => res.status(400).send(err));
  },

  getDocumentsByUserId: function (req, res, next) {
    var user_id = req.param('id');

    return models.Document.findAll({ where: { owner_id: user_id } })
      .then((documents) => res.json(documents))
      .catch((err) => res.status(400).send(err));
  }
};
