require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// import the calendarEvent model
const { CalendarEvent } = require('../models');

// GET route for /calendarEvent
router.get('/', (req, res) => {
    CalendarEvent.find({})
        .then(calendarEvent => {
            if (calendarEvent) {
                return res.json({ calendarEvent: calendarEvent });
            } else {
                return res.json({ message: 'No calendarEvent exists' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// private
// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//     console.log('====> inside /calendarEvent/profile');
//     console.log(req.body);
//     console.log('====> calendarEvent')
//     console.log(req.user);
//     const { id, name, email } = req.user; // object with user object inside
//     res.json({ success: true, user: req.user });
// });

// GET route to find the calendarEvent
router.get('/:id', (req, res) => {
    console.log('route to get calendarEvent', req.params); // { id: 'aklsdjfkalsd', commentId: 'aldmsfaldkmfalkmdf' }
    // find the calendarEvent
    CalendarEvent.findById(req.params.id)
        .then(calendarEvent => {
            if (!calendarEvent) {
                console.log('calendarEvent cannot be found');
                return res.json({ message: 'calendarEvent cannot be found' });
            }
            // return the calendarEvent to the user
            return res.json({ calendarEvent }); // res.json({ calendarEvent: calendarEvent })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// POST route to create a calendarEvent
router.post('/', (req, res) => {
    console.log('POST route to create a calendarEvent');
    console.log('req.body', req.body);
    // create a calendarEvent
    CalendarEvent.create(req.body)
        .then(calendarEvent => {
            console.log('calendarEvent', calendarEvent);
            // return the calendarEvent to the user
            return res.json({ calendarEvent });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

// PUT route to update a calendarEvent
router.put('/:id', (req, res) => {
    const updateQuery = {}
    const updateableFields = ['title', 'start', 'end', 'allDay', 'description']

    updateableFields.forEach(field => {
        if (field in req.body) {
            updateQuery[field] = req.body[field]
        }
    })
});

// DELETE route to delete a calendarEvent
router.delete('/:id', (req, res) => {
    console.log('route to delete a calendarEvent', req.params); // { id: 'aklsdjfkalsd', commentId: 'aldmsfaldkmfalkmdf' }
    // find the calendarEvent
    CalendarEvent.findByIdAndDelete(req.params.id)
        .then(calendarEvent => {
            if (!calendarEvent) {
                console.log('calendarEvent cannot be found');
                return res.json({ message: 'calendarEvent cannot be found' });
            }
            // return the calendarEvent to the user
            return res.json({ calendarEvent }); // res.json({ calendarEvent: calendarEvent })
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'this is an issue, please try again' });
        });
});

module.exports = router;
