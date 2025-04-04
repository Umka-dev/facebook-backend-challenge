const mongoose = require('mongoose');

const FEED = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [15, 'Name field must be no longer than 15 characters'],
    required: [true, 'The "Name" field is required.'],
  },
  message: {
    type: String,
    maxlength: [40, 'Message field must be no longer than 40 character'],
    required: [true, 'The "Message" field is required.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('feed', FEED);
