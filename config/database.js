const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Expose the connection
module.exports = connection;