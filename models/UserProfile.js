const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    profilePic: {
      type: String, default:'https://www.gravatar.com/avatar/HASH?d=mp'
    }
  }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);