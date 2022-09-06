const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 10,
  },
  password: { type: String, required: true },
  message: [{ type: ObjectId, ref: 'Message' }],
  membership: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
