require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the ChatRoom model
const { ChatRoom } = require('../models');

// GET route for /chatRoom
router.get('/', (req, res) => {
    ChatRoom.find({}).populate('creator').populate('members').populate('messages')
        .then(chatRoom => {
            if (chatRoom) {
                return res.json({ chatRoom: chatRoom });
            } else {
                return res.json({ message: 'No chatRoom exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// private
// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//     console.log('====> inside /chatRoom/profile');
//     console.log(req.body);
//     console.log('====> chatRoom')
//     console.log(req.user);
//     const { id, name, email } = req.user; // object with user object inside
//     res.json({ success: true, user: req.user });
// });

// GET route to find the chatRoom
router.get('/:id', (req, res) => {
    ChatRoom.findById(req.params.id)
        .then(chatRoom => {
            if (!chatRoom) {
                console.log('chatRoom cannot be found');
                return res.json({ message: 'chatRoom cannot be found' });
            }
            // return the chatRoom to the user
            return res.json({ chatRoom }); // res.json({ chatRoom: chatRoom })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route to create a chatRoom
router.post('/', (req, res) => {
    console.log('POST route to create a chatRoom');
    console.log('req.body', req.body);
    const { content, creator, recipient, roomName, roomDetail, members, messages } = req.body;
    ChatRoom.create({ content, creator, recipient, roomName, roomDetail, members, messages })
        .then(chatRoom => {
            console.log('chatRoom', chatRoom);
            return res.json({ chatRoom });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        })
});

// PUT route to update a chatRoom
router.put('/:id', (req, res) => {
    console.log('PUT route to update a chatRoom');
    console.log('req.body', req.body);
    const { content, creator, recipient } = req.body;
    ChatRoom.findByIdAndUpdate(req.params.id, { content, creator, recipient }, { new: true })
        .then(chatRoom => {
            if (chatRoom) {
                return res.json({ chatRoom: chatRoom });
            } else {
                return res.json({ message: 'No chatRoom exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' })
        })
});

// DELETE route to delete a chatRoom
router.delete('/:id', (req, res) => {
    console.log('DELETE route to delete a chatRoom');
    console.log('req.params', req.params);
    ChatRoom.findByIdAndDelete(req.params.id)
        .then(chatRoom => {
            if (chatRoom) {
                return res.json({ message: 'chatRoom has been deleted' });
            } else {
                return res.json({ message: 'No chatRoom exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' })
        })
});

module.exports = router;