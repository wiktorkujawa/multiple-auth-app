const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model('user', userSchema);