var docManager = require('../controllers/documentManager'),
  auth = require('../controllers/auth');

module.exports = function(app, express) {
  var api = express.Router();

  api.post('/users', docManager.createUser);

  api.get('/users', docManager.getAllUsers);

  api.post('/users/login', docManager.login);

  // middleware
  api.use(auth.authenticate);

  // Destination B, checking for a legitimate token

  api.get('/documents', docManager.getAllDocuments);

  api.get('/users/logout', docManager.logout);

  api.post('/documents', docManager.createDocument);

  api.get('/users/:id/documents', function(req, res) {
    var id = req.param('id');
    User.find({
      ownerId: id
    }, function(err, documents) {
      if (err) {
        res.send(err);
        return;
      }
      console.log(documents);
      res.json(documents);
    });
  });

  api.get('/users/:id', docManager.getUser);

  api.put('/documents/:id', docManager.updateDocument);

  api.put('/users/:id', docManager.updateUser);

  api.delete('/users/:id', docManager.deleteUser);

  api.get('/documents/:id', docManager.getDocument);

  api.delete('/documents/:id', docManager.deleteDocument);

  api.get('/me', function(req, res) {
    res.send(req.decoded);
  });

  return api;
};
