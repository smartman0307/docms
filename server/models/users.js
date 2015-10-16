// grab the things we need
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

// create a schema
var UserSchema = new Schema({
  id: Number,
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  name: {
    first: String,
    last: String
  },
  email: String,
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['User', 'Administrator'],
    required: true
  }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

// make the model available to our users in our Node applications
module.exports = mongoose.model('User', UserSchema);
