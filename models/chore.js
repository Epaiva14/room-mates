const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
    chore: String,
    roomDetail: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'RoomDetail' },
    creator: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignee: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completed: Boolean,
    dueDate: Date,
}, { timestamps: true });

// create model
const Chore = mongoose.model('Chore', choreSchema);

// export the model to be used
module.exports = Chore;