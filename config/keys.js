// use export, not module.exports: https://stackoverflow.com/a/34645767

var port = process.env.PORT || 5000;
var mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/plant-care";
var secretOrKey = process.env.JWT_SECRET || "secret";
export default { port, mongoURI, secretOrKey };
