const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: String,
    username: String,
}, { timestamps: true });

// create model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
