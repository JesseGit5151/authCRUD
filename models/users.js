const mongoose = require("mongoose");

//User schema: user, hash, salt, favorites [{  }]

const userSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  favorites: [{
      category: String,
      Name: String,
      Description: String,
      Image: String,
    }]
});
module.exports = mongoose.model('users', userSchema)