const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const session = require("express-session");
const connection = require('./config/database');
const routes = require('./routes/index')
const app = express();

const MongoStore = require('connect-mongo')(session)



dotenv.config({ path: "config.env" });
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'User Favorites' })

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}))

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(PORT, () => {
    console.log(`Server is running on http:/localhost:${PORT}`);
  });
