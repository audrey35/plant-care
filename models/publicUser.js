const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const PublicUserSchema = new mongoose.Schema({
  username: String,
  password: String,
  bio: { type: String, default: "" },
  favoritePlant: { type: String, default: "" },
});
PublicUserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("PublicUser", PublicUserSchema);
