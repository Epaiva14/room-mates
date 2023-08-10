require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the shoppingList model
const { ShoppingList } = require('../models');

// GET route for /shoppingList
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    ShoppingList.find({})
        .then(shoppingList => {
            if (shoppingList) {
                return res.json({ shoppingList: shoppingList });
            } else {
                return res.json({ message: 'No shoppingList exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// private
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('====> inside /shoppingList/profile');
    console.log(req.body);
    console.log('====> shoppingList')
    console.log(req.user);
    const { id, name, email } = req.user; // object with user object inside
    res.json({ success: true, user: req.user });
});

// GET route to find the shoppingList
router.get('/:id', (req, res) => {
    console.log('route to get shoppingList', req.params); // { id: 'aklsdjfkalsd', commentId: 'aldmsfaldkmfalkmdf' }
    // find the shoppingList
    ShoppingList.findById(req.params.id)
        .then(shoppingList => {
            if (!shoppingList) {
                console.log('shoppingList cannot be found');
                return res.json({ message: 'shoppingList cannot be found' });
            }
            // return the shoppingList to the user
            return res.json({ shoppingList }); // res.json({ shoppingList: shoppingList })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route to create a shoppingList
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('POST route to create a shoppingList');
    console.log('req.body', req.body);
    const { name, description, items } = req.body;
    ShoppingList.create({ name, description, items })
        .then(shoppingList => {
            console.log('shoppingList', shoppingList);
            return res.json({ shoppingList });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
}
);

// PUT route to update a shoppingList
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('PUT route to update a shoppingList');
    console.log('req.body', req.body);
    console.log('req.params', req.params);
    const { name, description, items } = req.body;
    ShoppingList.findByIdAndUpdate(req.params.id, { name, description, items }, { new: true })
        .then(shoppingList => {
            console.log('shoppingList', shoppingList);
            return res.json({ shoppingList });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// DELETE route to delete a shoppingList
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('DELETE route to delete a shoppingList');
    console.log('req.params', req.params);
    ShoppingList.findByIdAndDelete(req.params.id)
        .then(shoppingList => {
            console.log('shoppingList', shoppingList);
            return res.json({ shoppingList });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

module.exports = router;