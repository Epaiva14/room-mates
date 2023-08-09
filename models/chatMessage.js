const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    content: String,
    username: String,
}, { timestamps: true });

// create model
const Messages = mongoose.model('Messages', chatSchema);

module.exports = Messages;