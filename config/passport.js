// Code source: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
import passportJwt from "passport-jwt";
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
import mongoose from "mongoose";
import { User } from "../models/User.js";
import keys from "./keys.js";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Passport config https://stackoverflow.com/a/32798594
export default function (passport) {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
}
