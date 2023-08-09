const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    content: String,
    username: String,
}, { timestamps: true });

// create model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;