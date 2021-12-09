const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  pL = require("passport-local"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  axios = require("axios"),
  url = require("url"),
  User = require("./models/user"),
  PublicUser = require("./models/publicUser"),
  Post = require("./models/post"),
  mongoUrl = process.env.MONGODB_URI || "mongodb://localhost/auth_demo",
  port = process.env.PORT || 3000;

//Connecting database
// DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
// Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useFindAndModify", false);

// CSS
app.use(express.static(__dirname + "/public"));

// Authentication
app.use(
  require("express-session")({
    secret: "changeMe", //decode or encode session
    resave: false,
    saveUninitialized: false,
  })
);

passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000, //1 hour
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new pL(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=======================
//      R O U T E S
//=======================

//// PRIVACY POLICY ////
app.get("/privacy", (req, res) => {
  var private = "public";
  var msg = "";
  if (req.query.message === "success") {
    msg = "Success! Your account has been created and you are logged in!";
  }
  if (req.isAuthenticated()) {
    private = "private";
    res.render("privacypolicy", {
      private: private,
      message: msg,
    });
  } else {
    res.render("privacypolicy", { private: private, message: msg });
  }
});

//// HOME ////
app.get("/", (req, res) => {
  Post.findOne({}, {}, { sort: { createdDate: -1 } }, function (err, post) {
    if (err) {
      res.send(err);
    } else {
      if (req.isAuthenticated()) {
        Post.findOne(
          { username: req.user.username },
          {},
          { sort: { createdDate: -1 } },
          function (err, privatePost) {
            if (err) {
              res.send(err);
            } else {
              var msg = "";
              if (req.query.message === "success") {
                msg = "Success! You are logged in!";
              }
              res.render("privateHome", {
                post: post,
                privatePost: privatePost,
                message: msg,
              });
            }
          }
        );
      } else {
        var msg = "";
        if (req.query.message === "success") {
          msg = "Success! You are logged out!";
        }
        res.render("home", { post: post, message: msg });
      }
    }
  });
});

//// PLANT SEARCH ////
app.get("/plant", async (req, res) => {
  var private = "public";
  if (req.isAuthenticated()) {
    private = "private";
  }
  res.render("plant", { private: private, plants: null });
});

app.post("/plant", async (req, res) => {
  var private = "public";
  if (req.isAuthenticated()) {
    private = "private";
  }
  const result = await axios.get(
    `https://openfarm.cc/api/v1/crops/?filter=${req.body.search}`
  );
  const body = await result.data;
  res.render("plant", { private: private, plants: body.data });
});

//// FORUM ////
app.get("/forum", (req, res) => {
  var private = "public";
  if (req.isAuthenticated()) {
    private = "private";
  }
  var msg = "";
  if (req.query.message === null) {
    msg = "";
  } else if (req.query.message === "post-success") {
    msg = "Success! Your post has been created!";
  } else if (req.query.message === "comment-success") {
    msg = "Success! Your comment has been added to the post!";
  }
  Post.find({}, function (err, posts) {
    if (err) {
      res.send(err);
    } else {
      res.render("forum", { posts: posts, private: private, message: msg });
    }
  });
});

app.get("/post", isLoggedIn, (req, res) => {
  var msg = "";
  if (req.query.message !== null) {
    msg = req.query.message;
  }
  res.render("post", { message: msg });
});

app.post("/post", isLoggedIn, (req, res) => {
  // keep only letters and numbers https://stackoverflow.com/a/6555220
  var name = req.body.title.replace(/[^a-zA-Z0-9]/g, "");
  var new_post = new Post({
    name: name,
    title: req.body.title,
    text: req.body.content,
    username: req.user.username,
  });
  new_post.save(function (err, post) {
    if (err) {
      res.redirect(url.format({ pathname: "/post", query: { message: err } }));
    } else {
      res.redirect("/forum?message=post-success");
    }
  });
});

app.get("/post/:postname/comment", isLoggedIn, (req, res) => {
  var msg = "";
  if (req.query.message !== null) {
    msg = req.query.message;
  }
  res.render("comment", { postname: req.params.postname, message: msg });
});

app.post("/post/:postname/comment", isLoggedIn, (req, res) => {
  var comment = { username: req.user.username, text: req.body.text };
  Post.findOneAndUpdate(
    { name: req.params.postname },
    { $push: { comments: comment } },
    { new: true },
    function (err, post) {
      if (err) {
        res.redirect(
          url.format({
            pathname: `/post/${req.params.postname}/comment`,
            query: { message: err },
          })
        );
      } else {
        res.redirect("/forum?message=comment-success");
      }
    }
  );
});

//// PROFILE ////

app.get("/users", (req, res) => {
  var private = "public";
  if (req.isAuthenticated()) {
    private = "private";
  }
  PublicUser.find({}, function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.render("userList", { users: users, private: private });
    }
  });
});

app.get("/profile/:username", (req, res) => {
  var private = "public";
  if (req.isAuthenticated()) {
    private = "private";
  }
  PublicUser.findOne({ username: req.params.username }, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.render("publicProfile", { user: user, private: private });
    }
  });
});

app.get("/profile", isLoggedIn, (req, res) => {
  var msg = "";
  if (req.query.message === "success") {
    msg = "Success! The profile has been updated!";
  } else if (req.query.message !== null) {
    msg = req.query.message;
  }
  res.render("privateProfile", { user: req.user, message: msg });
});

app.post("/profile", isLoggedIn, (req, res) => {
  PublicUser.findOneAndUpdate(
    { username: req.user.username },
    {
      bio: req.body.bio,
      favoritePlant: req.body.favoritePlant,
    },
    { new: true },
    function (err, user) {
      if (err) {
        res.redirect(
          url.format({ pathname: "/profile", query: { message: err } })
        );
      }
    }
  );
  User.findOneAndUpdate(
    { username: req.user.username },
    {
      bio: req.body.bio,
      favoritePlant: req.body.favoritePlant,
      email: req.body.email,
    },
    { new: true },
    function (err, user) {
      if (err) {
        res.redirect(
          url.format({ pathname: "/profile", query: { message: err } })
        );
      } else {
        res.redirect("/profile?message=success");
      }
    }
  );
});

//// AUTHENTICATION ////
app.get("/login", (req, res) => {
  var msg = "";
  if (req.query.message === "fail") {
    msg =
      "UserNotFoundError: Could not login. Try a different username and password combination.";
  }
  res.render("login", { message: msg });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/?message=success",
    failureRedirect: "/login?message=fail",
  }),
  function (req, res) {}
);

app.get("/register", (req, res) => {
  var msg = "";
  res.render("register", { message: msg });
});

app.post("/register", (req, res) => {
  var values = { username: req.body.username };
  User.register(new User(values), req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.render("register", { message: err });
    } else {
      passport.authenticate("local")(req, res, function () {
        var new_user = new PublicUser(values);
        new_user.save();
        res.redirect("/privacy?message=success");
      });
    }
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/?message=success");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

//Listen On Server

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
