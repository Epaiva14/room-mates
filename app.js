const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport);
// create app
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.get('/', (req, res) => {
    return res.json({ message: 'Welcome Room-Mates! :D' });
});

app.use('/users', require('./controllers/users'));
app.use('/chat', require('./controllers/chatMessages'));
app.use('/calendar', require('./controllers/calendarEvents'));
app.use('/chores', require('./controllers/chores'));
app.use('/shoppingList', require('./controllers/shoppingLists'));
app.use('/notes', require('./controllers/notes'));
app.use('/roomDetail', require('./controllers/roomDetails'));
app.use('/chatRoom', require('./controllers/chatRooms'));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`);
});

module.exports = app;