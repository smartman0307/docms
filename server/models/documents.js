// grab the things we need
var mongoose = require('mongoose'),
  User = require('./users'),
  Schema = mongoose.Schema;

// create a schema
var DocumentSchema = new Schema({
  id: String,
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  content: String,
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  lastModified: {
    type: Date,
    default: Date.now()
  },
  ownerRole:{
    type: Schema.Types.Mixed,
    ref: 'User'
  }
});


// make the model available to our users in our Node applications
module.exports = mongoose.model('Document', DocumentSchema);
