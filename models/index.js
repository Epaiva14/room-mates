require('dotenv').config();
const mongoose = require('mongoose');

// import all models
const User = require('./user');
const Chat = require('./chatMessage');
const RoomDetail = require('./roomDetail');
const CalendarEvent = require('./calendarEvent');
const Chore = require('./chore');
const ShoppingList = require('./shoppingList');
const Note = require('./note');
const ChatRoom = require('./chatRoom');

console.log('mongo uri =>', process.env.MONGO_URI);

// connect to the database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create connection object
const db = mongoose.connection;

// once the database opens
db.once('open', () => {
    console.log('Connected to MongoDB Database: Mongoose App at HOST: ', db.host, 'PORT: ', db.port);
});

// if there is a database error
db.on('error', (err) => {
    console.log(`Database error: `, err);
});

module.exports = {
    User,
    Chat,
    RoomDetail,
    CalendarEvent,
    Chore,
    ShoppingList,
    Note,
    ChatRoom
}