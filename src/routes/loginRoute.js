import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db.js";

process.env.JWT_SECRET = "sdfgfghfgret";
export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { username, password } = req.body;

    const db = getDbConnection("my-blog");
    const user = await db.collection("users").findOne({ username });

    if (!user) return res.sendStatus(401);

    const { _id: id, isVerified, passwordHash, info } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { id, isVerified, username, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.status(500).json(err);
          }

          res.status(200).json({ token });
        }
      );
    } else {
      res.sendStatus(401);
    }
  },
};
