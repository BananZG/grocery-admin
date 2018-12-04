const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user-model');

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.send("login");
    });

router.put('/user', (req, res) => {
    new User({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
    }).save().then((result) => {
        console.log('new user created : ' + result);
    });
    res.send("login");
});

router.get('/logout', (req, res) => {
    res.send("logout");
});

module.exports = router;