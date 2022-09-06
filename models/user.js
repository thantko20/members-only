const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 20,
  },
  password: { type: String, required: true },
  messages: [{ type: ObjectId, ref: 'Message' }],
  membership: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
