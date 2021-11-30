import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Schema
const PostSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  username: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ username: String, text: String }],
});

// replace module.exports = User with export var User: https://stackoverflow.com/a/34645767
export var Post = mongoose.model("Posts", PostSchema);
