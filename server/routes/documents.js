var express = require('express');
var router = express.Router();

var controller = require('../controllers/index');

/* GET all Documents. ADMIN access is required */
router.get('/', controller.documents.getAllDocuments);

/* CREATE a Document. */
router.post('/', controller.documents.createDocument);

/* UPDATE document by id */
router.put('/:id', controller.documents.updateDocument);

/* GET document by id */
router.get('/:id', controller.documents.getDocument);

/* DELETE document by id */
router.delete('/:id', controller.documents.deleteDocument);


module.exports = router;
