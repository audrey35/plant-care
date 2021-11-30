// Code source: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import keys from "../../config/keys.js";
import { validateRegisterInput } from "../../validation/register.js";
import { validateLoginInput } from "../../validation/login.js";
import { validateProfileInput } from "../../validation/profile.js";
import { User } from "../../models/User.js";

var router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });

      // Hash password before saving it in the database
      bcrypt.genSalt(10, (err, Salt) => {
        bcrypt.hash(newUser.password, Salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  User.findOne({ username }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: "Username not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 }, // 2 hours in seconds
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route PUT api/users/:username
// @desc Update user information
// @access Private
router.put(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userName = req.params.username;
    const { bio, favoritePlant, email } = req.body;

    // Form validation
    const { errors, isValid } = validateProfileInput({ email: email });

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Update user profile info
    User.findOneAndUpdate(
      { username: userName },
      {
        $set: {
          bio: bio,
          favoritePlant: favoritePlant,
          email: email,
        },
      },
      { returnOriginal: false }
    ).then((user) => {
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ usernotfound: "User not found" });
      }
    });
  }
);

export default router;
