const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const { formatRelative } = require('date-fns');

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 2, maxLength: 50 },
  description: { type: String, required: true },
  author: { type: ObjectId, ref: 'User' },
  date: { type: Date, required: true, default: new Date().toISOString() },
});

MessageSchema.virtual('formattedDate').get(function () {
  const formattedDate = formatRelative(this.date, new Date());

  return formattedDate;
});

module.exports = mongoose.model('Message', MessageSchema);
