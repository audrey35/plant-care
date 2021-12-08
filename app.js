const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  pL = require("passport-local"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
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
              res.render("privateHome", {
                post: post,
                privatePost: privatePost,
              });
            }
          }
        );
      } else {
        res.render("home", { post: post });
      }
    }
  });
});

//// FORUM ////
app.get("/forum", (req, res) => {
  Post.find({}, function (err, posts) {
    if (err) {
      res.send(err);
    }
    res.render("forum", { posts: posts });
  });
});

app.get("/post", isLoggedIn, (req, res) => {
  res.render("post");
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
      res.send(err);
    }
    res.redirect("/forum");
  });
});

app.get("/post/:postname/comment", isLoggedIn, (req, res) => {
  res.render("comment", { postname: req.params.postname });
});

app.post("/post/:postname/comment", isLoggedIn, (req, res) => {
  var comment = { username: req.user.username, text: req.body.text };
  Post.findOneAndUpdate(
    { name: req.params.postname },
    { $push: { comments: comment } },
    { new: true },
    function (err, post) {
      if (err) {
        res.send(err);
      }
      res.redirect("/forum");
    }
  );
});

//// PROFILE ////
app.get("/profile/:username", (req, res) => {
  PublicUser.findOne({ username: req.params.username }, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.render("publicProfile", { user: user });
  });
});

app.get("/profile", isLoggedIn, (req, res) => {
  res.render("privateProfile", { user: req.user });
});

//// AUTHENTICATION ////
app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  var private = {
    username: req.body.username,
    phone: req.body.phone,
    telephone: req.body.telephone,
  };
  var public = { username: req.body.username, phone: req.body.phone };
  var new_user = new PublicUser(public);
  new_user.save();
  User.register(new User(private), req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/login");
    });
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//Listen On Server

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
