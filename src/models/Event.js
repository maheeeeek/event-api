const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  organizerName: { type: String, required: true, trim: true },
  eventBanner: { type: String, trim: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
