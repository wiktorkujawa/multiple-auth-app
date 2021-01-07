const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
  password: {
    type: String
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

userSchema.statics.hashPassword = function hashPassword(password){
  return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid = function(hashedpassword){
  return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = User = mongoose.model('user', userSchema);