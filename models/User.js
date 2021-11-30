import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  favoritePlant: { type: String, default: "" },
  email: { type: String, default: "" },
});

// replace module.exports = User with export var User: https://stackoverflow.com/a/34645767
export var User = mongoose.model("Users", UserSchema);
