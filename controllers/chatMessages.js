require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the chatMessage model
const { Chat } = require('../models');

// GET route for /chat
router.get('/', (req, res) => {
    Chat.find({}).populate('sender').populate('recipient').populate('chatRoom')
        .then(chat => {
            if (chat) {
                return res.json({ chat: chat });
            } else {
                return res.json({ message: 'No chat exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// private
// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//     console.log('====> inside /chat/profile');
//     console.log(req.body);
//     console.log('====> chat')
//     console.log(req.user);
//     const { id, name, email } = req.user; // object with user object inside
//     res.json({ success: true, user: req.user });
// });

// GET route to find the chat
router.get('/:id', (req, res) => {
    Chat.findById(req.params.id)
        .then(chat => {
            if (!chat) {
                console.log('chat cannot be found');
                return res.json({ message: 'chat cannot be found' });
            }
            // return the chat to the user
            return res.json({ chat }); // res.json({ chat: chat })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route to create a chat
router.post('/', (req, res) => {
    console.log('POST route to create a chat');
    console.log('req.body', req.body);
    const { content, creator } = req.body;
    Chat.create({ content, creator })
        .then(chat => {
            console.log('chat', chat);
            return res.json({ chat });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
}
);

// PUT route to update a chat
router.put('/:id', (req, res) => {
    const updateQuery = {}
    const updateableFields = ['content'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updateQuery[field] = req.body[field];
        }
    })
    Chat.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
        .then(chat => {
            if (!chat) {
                console.log('chat cannot be found');
                return res.json({ message: 'chat cannot be found' });
            }
            return res.json({ chat });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// DELETE route to delete a chat
router.delete('/:id', (req, res) => {
    Chat.findByIdAndRemove(req.params.id)
        .then(chat => {
            if (!chat) {
                console.log('chat cannot be found');
                return res.json({ message: 'chat cannot be found' });
            }
            return res.json({ message: `${chat} has been deleted` });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

module.exports = router;