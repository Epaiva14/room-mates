require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the chore model
const { Chore } = require('../models');

// GET route for /chore
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Chore.find({})
        .then(chore => {
            if (chore) {
                return res.json({ chore: chore });
            } else {
                return res.json({ message: 'No chore exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// private
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('====> inside /chore/profile');
    console.log(req.body);
    console.log('====> chore')
    console.log(req.user);
    const { id, name, email } = req.user; // object with user object inside
    res.json({ success: true, user: req.user });
});

// GET route to find the chore
router.get('/:id', (req, res) => {
    console.log('route to get chore', req.params); // { id: 'aklsdjfkalsd', commentId: 'aldmsfaldkmfalkmdf' }
    // find the chore
    Chore.findById(req.params.id)
        .then(chore => {
            if (!chore) {
                console.log('chore cannot be found');
                return res.json({ message: 'chore cannot be found' });
            }
            // return the chore to the user
            return res.json({ chore }); // res.json({ chore: chore })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route to create a chore
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('POST route to create a chore');
    console.log('req.body', req.body);
    const { name, description, roomDetailId } = req.body;
    // create a new chore
    Chore.create({ name, description, roomDetailId })
        .then(chore => {
            if (chore) {
                return res.json({ chore });
            } else {
                return res.json({ message: 'chore cannot be created' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// PUT route to update a chore
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('PUT route to update a chore');
    console.log('req.body', req.body);
    console.log('req.params', req.params);
    const { name, description, roomDetailId } = req.body;
    // find the chore
    Chore.findById(req.params.id)
        .then(chore => {
            if (!chore) {
                console.log('chore cannot be found');
                return res.json({ message: 'chore cannot be found' });
            }
            // update the chore
            chore.name = name;
            chore.description = description;
            chore.roomDetailId = roomDetailId;
            chore.save()
                .then(chore => {
                    return res.json({ chore });
                })
                .catch(error => {
                    console.log('error', error);
                    return res.json({ message: 'this is an issue, please try again' });
                });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        })
});

// DELETE route to delete a chore
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('DELETE route to delete a chore');
    console.log('req.params', req.params);
    // find the chore
    Chore.findById(req.params.id)
        .then(chore => {
            if (!chore) {
                console.log('chore cannot be found');
                return res.json({ message: 'chore cannot be found' });
            }
            // delete the chore
            chore.remove()
                .then(() => {
                    return res.json({ message: 'chore has been deleted' });
                })
                .catch(error => {
                    console.log('error', error);
                    return res.json({ message: 'this is an issue, please try again' });
                });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        })
});