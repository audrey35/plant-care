import jwt from "jsonwebtoken";
import pkg from "mongodb";
const { ObjectID } = pkg;
import { getDbConnection } from "../db.js";

process.env.JWT_SECRET = "sdfgfghfgret";
export const updateProfileRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const publicUpdates = (({ bio, favoritePlant }) => ({
      bio,
      favoritePlant,
    }))(req.body);

    const privateUpdates = (({ email }) => ({
      email,
    }))(req.body);

    if (!authorization) {
      return res.status(401).json({ message: "No authorization header sent" });
    }

    // Bearer lfgdfgjoi.adfgdfg.dfgdf
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Unable to verify token" });

      const { id } = decoded;

      if (id !== userId)
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" });

      const db = getDbConnection("my-blog");
      const result = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectID(id) },
          { $set: { publicInfo: publicUpdates, privateInfo: privateUpdates } },
          { returnOriginal: false }
        );
      const { username, isVerified, publicInfo, privateInfo } = result.value;

      jwt.sign(
        { id, username, isVerified, publicInfo, privateInfo },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            return res.status(200).json(err);
          }
          res.status(200).json({ token });
        }
      );
    });
  },
};
