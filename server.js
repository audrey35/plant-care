// Code source: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
import express from "express";
import mongoose from "mongoose";
import keys from "./config/keys.js";
const { port, mongoURI } = keys;
import passport from "passport";
import users from "./routes/api/users.js";
import posts from "./routes/api/posts.js";
import passportFunc from "./config/passport.js";
// import path from "path";
// import { fileURLToPath } from "url";

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MongoDB config
const db = mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config https://stackoverflow.com/a/32798594
passportFunc(passport);

// Routes
app.use("/api/users", users);
app.use("/api/posts", posts);

// Start back-end server
app.listen(port, () => console.log(`Backend running on port ${port}!`));

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.json());

// const withDB = async (operations, res) => {
//   try {
//     // connect to MongoDB database
//     const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/my-blog";
//     const client = await MongoClient.connect(uri, {
//       useNewUrlParser: true,
//     });
//     const db = client.db("my-blog");

//     // run the code in the callback defined for this function when it is being used
//     await operations(db);

//     // close MongoDB database connection
//     client.close();
//   } catch (error) {
//     res.status(500).json({ message: "Error connecting to db", error });
//   }
// };

// app.get("/api/articles/:name", async (req, res) => {
//   withDB(async (db) => {
//     const articleName = req.params.name;

//     // find article matching the name in the url
//     const articleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });

//     res.status(200).json(articleInfo);
//   }, res);
// });

// app.post("/api/articles/:name/upvote", async (req, res) => {
//   withDB(async (db) => {
//     const articleName = req.params.name;

//     // increment upvote
//     const articleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });
//     await db.collection("articles").updateOne(
//       { name: articleName },
//       {
//         $set: {
//           upvotes: articleInfo.upvotes + 1,
//         },
//       }
//     );

//     // send updated article info back to client
//     const updatedArticleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });

//     res.status(200).json(updatedArticleInfo);
//   }, res);
// });

// app.post("/api/articles/:name/add-comment", (req, res) => {
//   const { username, text } = req.body;
//   const articleName = req.params.name;

//   withDB(async (db) => {
//     const articleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });
//     await db.collection("articles").updateOne(
//       { name: articleName },
//       {
//         $set: {
//           comments: articleInfo.comments.concat({ username, text }),
//         },
//       }
//     );
//     const updatedArticleInfo = await db
//       .collection("articles")
//       .findOne({ name: articleName });

//     res.status(200).json(updatedArticleInfo);
//   }, res);
// });

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });
