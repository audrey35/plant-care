import jwt from "jsonwebtoken";
import pkg from "mongodb";
const { ObjectID } = pkg;
import { getDbConnection } from "../db.js";

export const viewProfileRoute = {
  path: "/api/users/:username",
  method: "get",
  handler: async (req, res) => {
    const { userName } = req.params;

    const db = getDbConnection("my-blog");

    // find user matching the username in the url
    const user = await db.collection("users").findOne({ username: userName });

    res.status(200).json(user);
  },
};
