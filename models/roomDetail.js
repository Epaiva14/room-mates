const mongoose = require('mongoose');

const roomDetailSchema = new mongoose.Schema({
    roomName: String,
    inviteCode: String,
    roommates: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    chores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chore' }],
    shoppingList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList' }],
    calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    landlord: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rent: Number,
    rentDue: Date,
    rentPaid: Boolean,
}, { timestamps: true });

// create model
const RoomDetail = mongoose.model('RoomDetail', roomDetailSchema);

// export the model to be used
module.exports = RoomDetail;