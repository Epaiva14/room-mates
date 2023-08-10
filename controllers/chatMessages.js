require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the chatMessage model
const { ChatMessage } = require('../models');

// GET route for /chatMessage
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    ChatMessage.find({})
        .then(chatMessage => {
            if (chatMessage) {
                return res.json({ chatMessage: chatMessage });
            } else {
                return res.json({ message: 'No chatMessage exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// private
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('====> inside /chatMessage/profile');
    console.log(req.body);
    console.log('====> chatMessage')
    console.log(req.user);
    const { id, name, email } = req.user; // object with user object inside
    res.json({ success: true, user: req.user });
});

// GET route to find the chatMessage
router.get('/:id', (req, res) => {
    ChatMessage.findById(req.params.id)
        .then(chatMessage => {
            if (!chatMessage) {
                console.log('chatMessage cannot be found');
                return res.json({ message: 'chatMessage cannot be found' });
            }
            // return the chatMessage to the user
            return res.json({ chatMessage }); // res.json({ chatMessage: chatMessage })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route to create a chatMessage
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('POST route to create a chatMessage');
    console.log('req.body', req.body);
    const { message } = req.body;
    ChatMessage.create({ message })
        .then(chatMessage => {
            console.log('chatMessage', chatMessage);
            return res.json({ chatMessage });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
}
);

// PUT route to update a chatMessage
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const updateQuery = {}
    const updateableFields = ['message'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updateQuery[field] = req.body[field];
        }
    })
    ChatMessage.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
        .then(chatMessage => {
            if (!chatMessage) {
                console.log('chatMessage cannot be found');
                return res.json({ message: 'chatMessage cannot be found' });
            }
            return res.json({ chatMessage });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// DELETE route to delete a chatMessage
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    ChatMessage.findByIdAndRemove(req.params.id)
        .then(chatMessage => {
            if (!chatMessage) {
                console.log('chatMessage cannot be found');
                return res.json({ message: 'chatMessage cannot be found' });
            }
            return res.json({ chatMessage });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

module.exports = router;