const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");


//Database
const db = require("./config/database");

//Routes
const routes = require("./routes/index");
const app = express();

const MongoStore = require("connect-mongo")(session);

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT;

app.use(express.static("public"));
app.use("/my-images", express.static("my-images"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");


/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({
  mongooseConnection: db,
  collection: "users",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
// Need to require the entire Passport config module so app.js knows about it
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

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
