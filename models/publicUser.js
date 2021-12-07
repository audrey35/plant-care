const mongoose = require("mongoose");
const PublicUserSchema = new mongoose.Schema({
  username: String,
  password: String,
  phone: Number,
});
module.exports = mongoose.model("PublicUser", PublicUserSchema);
