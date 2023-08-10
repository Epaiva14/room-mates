require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the Chore model
const { Chore } = require('../models');

// GET route for /chore
router.get('/', (req, res) => {
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

// // private
// router.get('/profile', (req, res) => {
//     console.log('====> inside /chore/profile');
//     console.log(req.body);
//     console.log('====> chore')
//     console.log(req.user);
//     const { id, name, email } = req.user; // object with user object inside
//     res.json({ success: true, user: req.user });
// });

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
router.post('/', (req, res) => {
    console.log('POST route to create a chore');
    console.log('req.body', req.body);
    const { chore, roomDetail, creator, assignee, completed, dueDate } = req.body;
    Chore.create({ chore, roomDetail, creator, assignee, completed, dueDate })
        .then(chore => {
            return res.json({ chore });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// PUT route to update a chore
router.put('/:id', (req, res) => {
    const updateQuery = {}
    const updateableFields = ["chore", "assignee", "completed", "dueDate"]

    updateableFields.forEach(field => {
        if (field in req.body) {
            updateQuery[field] = req.body[field]
        }
    })
});

// DELETE route to delete a chore
router.delete('/:id', (req, res) => {
    console.log('DELETE route to delete a chore');
    console.log('req.params', req.params);
    Chore.findByIdAndDelete(req.params.id)
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

module.exports = router;