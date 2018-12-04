const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user-model');

passport.use(new LocalStrategy( (username, password, done) => {
    console.log("Trying to login!")
    console.log("username: ", username)
    console.log("password: ", password)
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
}))
