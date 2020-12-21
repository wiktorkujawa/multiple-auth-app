const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  content: {
    type: String
  },
  path: {
    type: String
  },
  email: {
    type: String
  },
  fileImage:{
    type: Boolean
  },
  files_id: {
    type: Schema.Types.ObjectId
  }
  ,created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = Message = mongoose.model('message', messageSchema);