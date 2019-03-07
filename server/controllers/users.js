var serverConfig = require('../../config/serverConfig'),
  jsonwebtoken = require('jsonwebtoken'),
  secretKey = serverConfig.secretKey,
  db = require('../../models/index'),
  User = require('../../models/user');

// create token for authentication
function createToken(user) {
  console.log(user);
  return jsonwebtoken.sign({
    id: user._id,
    name: user.name,
    username: user.username
  }, secretKey, {
      expiresInMinute: 1440
    });
}

module.exports = {
  createUser: function (req, res, next) {
    var user = {
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    };


    return db.sequelize.sync()
      .then(() => User.create(user))
      .then((user) => res.json({
        success: true,
        message: 'User has been created!',
        token: createToken(user)
      }))
      .catch((err) => res.send(err));
  },

  login: function (req, res, next) {
    return db.sequelize.sync()
      .then(() => User.findOne({ where: { username: req.body.username } }))
      .then((user) => {
        // compare passwords with db user's password
        var validPassword = user.comparePassword(req.body.password);

        if (!validPassword) {
          throw new Error('Invalid Password');
        }

        return user;
      })
      .then(() => {
        var token = createToken(user);

        return res.json({
          id: user._id,
          success: true,
          message: "Successfully logged in!",
          token: token
        });
      })
      .catch((err) => res.send(err));
  },

  logout: function (req, res) {
    delete req.headers['x-access-token'];

    return res.status(200).json({
      "message": "User has been successfully logged out"
    });
  },

  getAllUsers: function (req, res, next) {
    return db.sequelize.sync()
      .then(() => User.findAll().then(users => res.json(users)))
      .catch((err) => res.send(err));
  },

  getUser: function (req, res) {
    var id = req.param('id');

    return db.sequelize.sync()
      .then(() => User.findById(id).then(user => res.json(user)))
      .catch((err) => res.send(err));
  },

  getAllUsersRoles: function () {
    return db.sequelize.sync()
      .then(() => User.findAll({ where: { role: 'User' } }).then(users => res.json(users)))
      .catch((err) => res.send(err));
  },

  getAllAdminRoles: function () {
    return db.sequelize.sync()
      .then(() => User.findAll({ where: { role: 'Administrator' } }).then(users => res.json(users)))
      .catch((err) => res.send(err));
  },

  deleteUser: function (req, res) {
    var id = req.param('id');

    return db.sequelize.sync()
      .then(() => User.destroy({ where: { id: id } }))
      .then(() => res.status(200).json({
        success: true,
        message: `User with id: ${id} has been deleted!`
      }))
      .catch((err) => res.send(err));
  },

  updateUser: function (req, res) {
    var id = req.param('id'),
      updatedUser = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      };

    return db.sequelize.sync()
      .then(() => User.update(updatedUser, { where: { id: id } }))
      .then(() => res.status(200).json({
        success: true,
        message: `User with id: ${id} has been updated!`
      }))
      .catch((err) => res.send(err));
  },
}