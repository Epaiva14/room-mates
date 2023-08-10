const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    content: String,
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},
    { timestamps: true });

// create model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;