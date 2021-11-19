import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db.js";

process.env.JWT_SECRET = "sdfgfghfgret";
export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { username, password } = req.body;

    const db = getDbConnection("my-blog");
    const user = await db.collection("users").findOne({ username });

    if (user) {
      res.sendStatus(409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const startingInfo = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };

    const result = await db.collection("users").insertOne({
      username,
      passwordHash,
      info: startingInfo,
      isVerified: false,
    });
    const { insertedId } = result;

    jwt.sign(
      {
        id: insertedId,
        username,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};