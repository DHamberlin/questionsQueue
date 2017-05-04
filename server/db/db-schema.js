const db = require('./db-config');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  votes: Number,
  answered: Boolean,
  // time: { type: Date, default: Date.now },
  // timestamps: { createdAt: 'created_at' },
});

// exporting the questionQueue schema with questionQueue instance
module.exports = mongoose.model('Question', questionSchema);
