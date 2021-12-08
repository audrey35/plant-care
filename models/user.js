const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  bio: { type: String, default: "" },
  favoritePlant: { type: String, default: "" },
  email: { type: String, default: "" },
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
