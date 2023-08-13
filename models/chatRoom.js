const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    roomName: String,
    roomDetail: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RoomDetail' }],
    creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
},
    { timestamps: true });

// create model
const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;

