require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the note model
const { Note } = require('../models');

// GET route for /note
router.get('/', (req, res) => {
    Note.find({}).populate('creator')
        .then(note => {
            console.log('Populated note********', note)
            if (note) {
                return res.json({ note: note });
            } else {
                return res.json({ message: 'No note exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// private
// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//     console.log('====> inside /note/profile');
//     console.log(req.body);
//     console.log('====> note')
//     console.log(req.user);
//     const { id, name, email } = req.user; // object with user object inside
//     res.json({ success: true, user: req.user });
// });

// GET route to find the note
router.get('/:id', (req, res) => {
    console.log('route to get note', req.params); // { id: 'aklsdjfkalsd', commentId: 'aldmsfaldkmfalkmdf' }
    // find the note
    Note.findById(req.params.id)
        .then(note => {
            if (!note) {
                console.log('note cannot be found');
                return res.json({ message: 'note cannot be found' });
            }
            // return the note to the user
            return res.json({ note }); // res.json({ note: note })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});


// POST route to create a note
router.post('/', (req, res) => {
    console.log('POST route to create a note');
    console.log('req.body', req.body);
    const { content, creator } = req.body;

    Note.create({ content, creator })
        .then(note => {
            console.log('note', note)
            if (note) {
                return res.json({ note });
            } else {
                return res.json({ message: 'note cannot be created' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// PUT route to update a note
router.put('/:id', (req, res) => {
    console.log('PUT route to update a note');
    console.log('req.body', req.body);
    console.log('req.params', req.params);
    const { content, creator } = req.body;

    Note.findById(req.params.id)
        .then(note => {
            if (!note) {
                console.log('note cannot be found');
                return res.json({ message: 'note cannot be found' });
            }
            // update the note
            note.content = content;
            note.creator = creator;
            note.save()
                .then(note => {
                    return res.json({ note });
                })
                .catch(error => {
                    console.log('error', error);
                    return res.json({ message: 'this is an issue, please try again' });
                });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// DELETE route to delete a note
router.delete('/:id', (req, res) => {
    console.log('DELETE route to delete a note');
    console.log('req.params', req.params);
    Note.findByIdAndDelete(req.params.id)
        .then(note => {
            if (!note) {
                console.log('note cannot be found');
                return res.json({ message: 'note cannot be found' });
            }
            return res.json({ message: 'note has been deleted' });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

module.exports = router;