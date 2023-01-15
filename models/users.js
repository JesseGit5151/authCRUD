const mongoose = require("mongoose");

//User schema: user, hash, salt, favorites [{  }]

const userSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  favorites: [
    {
      _id: false,
      category: String,
      name: String,
      description: String,
      image: String,
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
