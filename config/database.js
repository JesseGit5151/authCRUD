const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const conn = process.env.DB_STRING;

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


// Expose the connection
module.exports = db;