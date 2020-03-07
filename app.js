const session = require('express-session');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoute = require('./app/routes/auth.js');
const userRoute = require('./app/routes/user.js');

const app = express();

app.use(cors());


app.use(logger('dev'));
app.use(cookieParser());


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// set public folder
app.use(express.static(path.resolve('./docs')));

// api end points v1.0
app.use('/v1/auth/', authRoute);
app.use('/v1/user/', userRoute);

module.exports = app;
