const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
    title: String,
    description: String,
    start: Date,
    end: Date,
    allDay: Boolean,
    roomDetail: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'RoomDetail' },
    creator: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// create model
const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

// export the model to be used
module.exports = CalendarEvent;

