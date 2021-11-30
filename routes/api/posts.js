// Code source: react-blog branch/server.js (LinkedIn Learning)
import express from "express";
import passport from "passport";
import { Post } from "../../models/Post.js";
import { validatePostInput } from "../../validation/post.js";
import { validateCommentInput } from "../../validation/comment.js";

var router = express.Router();

// @route POST api/posts
// @desc Add a post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const postTitle = req.body.title;
    const postText = req.body.text;

    // Form validation
    const { errors, isValid } = validatePostInput({
      title: postTitle,
      text: postText,
    });

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // keep only letters and numbers https://stackoverflow.com/a/6555220
    const postName = postTitle.replace(/[^a-zA-Z0-9]/g, "");

    // Find the post matching the name in the url
    Post.findOne({ name: postName }).then((post) => {
      if (post) {
        return res
          .status(400)
          .json({ name: `Post ${postName} already exists` });
      } else {
        const newPost = new Post({
          name: postName,
          title: postTitle,
          text: postText,
          username: req.user.username,
          createdDate: Date.now(),
        });
        newPost
          .save()
          .then((document) => res.json(document))
          .catch((err) => console.log(err));
      }
    });
  }
);

// @route GET api/posts/:name
// @desc Get a post
// @access Public
router.get("/:name", (req, res) => {
  const postName = req.params.name;

  // Find the post matching the name in the url
  Post.findOne({ name: postName }).then((post) => {
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ postnotfound: "Post not found" });
    }
  });
});

// @route PUT api/posts/:name/like
// @desc Like a post
// @access Public
router.put("/:name/like", (req, res) => {
  const postName = req.params.name;

  // increment like
  Post.findOneAndUpdate(
    { name: postName },
    { $inc: { likes: 1 } },
    { returnOriginal: false }
  ).then((post) => {
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ postnotfound: "Post not found" });
    }
  });
});

// @route PUT api/posts/:name/comment
// @desc Comment on a post
// @access Private
router.put(
  "/:name/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const postName = req.params.name;
    const { text } = req.body;

    // Form validation
    const { errors, isValid } = validateCommentInput({
      text: text,
    });

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Add comment to the post
    Post.findOneAndUpdate(
      { name: postName },
      {
        $push: {
          comments: {
            username: req.user.username,
            text: text,
            createdDate: Date.now(),
          },
        },
      },
      { returnOriginal: false }
    ).then((post2) => {
      if (post2) {
        return res.status(200).json(post2);
      } else {
        return res.status(404).json({ postnotfound: "Post not found" });
      }
    });
  }
);

export default router;
