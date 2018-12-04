const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const passportSetup = require('./config/passport-setup');

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
    console.log('connected to mongodb')
})

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// middlewares
app.use(function (req, res, next) {
    console.log(Date.now() + ": " + req.method + " for " + req.url);
    setTimeout(function () {
        next();
    }, 300);
});

// routers
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Hello World!
app.get('/', function (req, res) {
    res.send('Hello World');
})
