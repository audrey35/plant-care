const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  username: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  comments: [
    {
      text: String,
      username: String,
      createdDate: { type: Date, default: Date.now },
    },
  ],
});
module.exports = mongoose.model("Post", PostSchema);
