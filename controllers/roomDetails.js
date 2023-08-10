require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the roomDetail model
const { RoomDetail } = require('../models');



// GET route for /roomDetail
router.get('/', (req, res) => {
    RoomDetail.find({})
        .then(roomDetail => {
            if (roomDetail) {
                return res.json({ roomDetail: roomDetail });
            } else {
                return res.json({ message: 'No roomDetail exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// private
// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//     console.log('====> inside /roomDetail/profile');
//     console.log(req.body);
//     console.log('====> roomDetail')
//     console.log(req.user);
//     const { id, name, email } = req.user; // object with user object inside
//     res.json({ success: true, user: req.user });
// });

// GET route to find the roomDetail
router.get('/:id', (req, res) => {
    console.log('route to get roomDetail', req.params); // { id: 'aklsdjfkalsd', commentId: 'aldmsfaldkmfalkmdf' }
    // find the roomDetail
    RoomDetail.findById(req.params.id)
        .then(roomDetail => {
            if (!roomDetail) {
                console.log('roomDetail cannot be found');
                return res.json({ message: 'roomDetail cannot be found' });
            }
            // return the roomDetail to the user
            return res.json({ roomDetail }); // res.json({ roomDetail: roomDetail })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route to create a roomDetail
router.post('/', (req, res) => {
    console.log('POST route to create a roomDetail');
    console.log('req.body', req.body);
    // console.log('req.user', req.user);

    RoomDetail.create({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        roommates: req.body.roommates,
        landlord: req.body.landlord,
        // chores: req.body.chores,
        // shoppingList: req.body.shoppingList,
        // notes: req.body.notes,
        // creator: req.user._id,
    })
        .then(roomDetail => {
            console.log('roomDetail', roomDetail);
            return res.json({ roomDetail });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// PUT route to update a roomDetail
router.put('/:id', (req, res) => {
    const updateQuery = {}
    const updateableFields = ['name', 'roommates']

    updateableFields.forEach(field => {
        if (field in req.body) {
            updateQuery[field] = req.body[field]
        }
    })
});

// DELETE route to delete a roomDetail
router.delete('/:id', (req, res) => {

    RoomDetail.findByIdAndDelete(req.params.id)
        .then(roomDetail => {
            if (!roomDetail) {
                console.log('roomDetail cannot be found');
                return res.json({ message: 'roomDetail cannot be found' });
            }
            // return the roomDetail to the user
            return res.json({ roomDetail }); // res.json({ roomDetail: roomDetail })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

module.exports = router;