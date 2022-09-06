const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 2, maxLength: 20 },
  description: { type: String, required: true },
  author: { type: ObjectId, ref: 'User' },
  date: { type: Date, required: true, default: new Date().toISOString() },
});

module.exports = mongoose.model('Message', MessageSchema);
