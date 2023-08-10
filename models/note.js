const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: String,
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// create model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
