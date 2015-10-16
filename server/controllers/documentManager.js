(function() {
  'use strict';
  // get the required models and db connection
  var config = require('../config/config'),
    User = require('../models/users'),
    Document = require('../models/documents'),
    jsonwebtoken = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    secretKey = config.secretKey;

  // create token for authentication
  function createToken(user) {
    var token = jsonwebtoken.sign({
      id: user._id,
      name: user.name,
      username: user.username
    }, secretKey, {
      expiresInMinute: 1440
    });
    return token;
  }

  module.exports = {
    // to add a user to the db
    createUser: function(req, res, next) {
      var user = new User({
        name: {
          first: req.body.firstname,
          last: req.body.lastname
        },
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      });
      var token = createToken(user);
      user.save(function(err) {
        if (err) {
          res.send(err);
          return;
        }

        res.json({
          success: true,
          message: 'User has been created!',
          token: token
        });
      });
    },

    // to login user into docms system
    login: function(req, res, next) {
      User.findOne({
        username: req.body.username
      }).select('name username password').exec(function(err, user) {
        if (err) throw err;

        if (!user) {
          res.status(500).send({
            message: "User doesnt exist"
          });
        } else if (user) {
          var validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.status(500).send({
              message: "Invalid Password"
            });
          } else {
            ///// token
            var token = createToken(user);

            res.json({
              id: user._id,
              success: true,
              message: "Successfully logged in!",
              token: token
            });
          }
        }
      });
    },

    logout: function(req, res) {
      delete req.headers['x-access-token'];
      return res.status(200).json({
        "message": "User has been successfully logged out"
      });
    },


    // to get the mongo cluster of all the users stored on the db
    getAllUsers: function(req, res, next) {
      User.find({}, 'username', function(err, users) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(users);
      });
    },

    // get user by id
    getUser: function(req, res) {
      var id = req.param('id');
      User.find({
        _id: id
      }, function(err, users) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(users);
      });
    },

    // to get the mongo cluster of all the user roles
    getAllUsersRoles: function() {
      User.find({
        "role": "User"
      }, function(err, users) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(users);
      });
    },

    // to get the mongo cluster of all the user roles
    getAllAdminRoles: function() {
      User.find({
        "role": "Administrator"
      }, function(err, users) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(users);
      });
    },

    // get document by id
    getDocument: function(req, res) {
      var id = req.param('id');
      Document.find({
        _id: id
      }, function(err, documents) {
        if (err) {
          res.send(err);
          return;
        }
        res.send(documents);
      });
    },

    // to get the mongo cluster of all the documents stored
    getAllDocuments: function(req, res) {
      Document.find({}, function(err, documents) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(documents);
      });
    },

    createDocument: function(req, res) {
      var document = new Document({
        ownerId: req.decoded.id,
        title: req.body.title,
        content: req.body.content
      });
      document.save(function(err) {
        if (err) {
          res.send(err);
          return;
        }

        res.json({
          success: true,
          message: 'Document has been created!'
        });
      });
    },

    // update user by id
    updateUser: function(req, res) {
      var id = req.param('id');
      User.findOneAndUpdate({
          _id: id
        }, {
          name: {
            first: req.body.firstname,
            last: req.body.lastname
          },
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          role: req.body.role
        }, {
          name: {
            first: req.body.firstname,
            last: req.body.lastname
          },
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          role: req.body.role
        },

        function(err, users) {
          if (err) {
            res.send(err);
            return;
          } else {
            // res.send(users);
            res.json({
              success: true,
              message: "Successfully updated User!"
            });
          }
        });
    },

    // update document by id
    updateDocument: function(req, res) {
      var id = req.param('id');
      Document.findOneAndUpdate({
          _id: id
        }, {
          title: req.body.title,
          content: req.body.content
        }, {
          title: req.body.title,
          content: req.body.content
        },

        function(err, documents) {
          if (err) {
            res.send(err);
            return;
          } else {
            // res.send(users);
            res.json({
              success: true,
              message: "Successfully updated Document!"
            });
          }
        });
    },

    // delete user by id
    deleteUser: function(req, res) {
      var id = req.param('id');
      User.findOneAndRemove({
        _id: id
      }, function(err, users) {
        if (err) {
          res.json(401, {
            message: err
          });
          return;
        } else {
          res.json(200, {
            message: users
          });
        }
      });
    },

    // delete document by id
    deleteDocument: function(req, res) {
      var id = req.param('id');
      Document.findOneAndRemove({
        _id: id
      }, function(err, documents) {
        if (err) {
          res.json(401, {
            message: err
          });
          return;
        } else {
          res.json(200, {
            message: documents
          });
        }
      });
    },


    // to get the mongo cluster of all the documents filtered by 'User' role
    getAllDocumentsByRoleUser: function(req, res, next) {
      Document.find({
          role: User
        })
        .populate('ownerId')
        .exec(function(err, documents) {
          if (err) {
            res.send(err);
            return;
          }

          var filtered = documents.map(
            function(obj) {
              if (obj.ownerId.role === 'User') {
                return obj;
              }
            });
          for (var i = 0; i < filtered.length; i++) {
            if (filtered[i] == null) {
              filtered.splice(i, 1);
            }
          }
          res.json(filtered);
        });
    },


    // to get the mongo cluster of all the documents filtered by 'Administrator' role
    getAllDocumentsByRoleAdministrator: function(req, res, next) {
      Document.find({})
        .populate('ownerId')
        .exec(function(err, documents) {
          if (err) {
            res.send(err);
            return;
          }

          var filtered = documents.map(
            function(obj) {
              if (obj.ownerId.role === 'Administrator') {
                return obj;
              }
            });
          for (var i = 0; i < filtered.length; i++) {
            if (filtered[i] == null) {
              filtered.splice(i, 1);
            }
          }
          res.json(filtered);
        });
    },

    // to get the mongo cluster of all the documents filtered by date
    getAllDocumentsByDate: function(req, res, next) {
      Document.find({})
        .sort('dateCreated')
        .exec(function(err, documents) {
          if (err) {
            res.send(err);
            return;
          }
          res.json(documents);
        });
    }
  };
})();
