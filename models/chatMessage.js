const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    content: String,
    recipient: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sender: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    chatRoom: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' }],
},
    { timestamps: true });

// create model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;