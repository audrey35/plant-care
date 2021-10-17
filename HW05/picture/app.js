var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

// for res.render to render .html rather than default .jade
// handles Error: No default engine was specified and no extension was provided.
// https://stackoverflow.com/a/23596000
var hbs = require("hbs");
app.set("view engine", "html");
app.engine("html", hbs.__express);

// for retrieving API data
const https = require("https");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/picture", (req, res) => {
  var date = req.body.date;
  var url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
  var key = "?key=d2143e94-412a-448b-bb9d-51702131b42f";
  pre =
    "https://api.nasa.gov/planetary/apod?api_key=QE7r1w0Sdy3YDH8wkH3Fo7d3iZ1Ls6Mifbq7Hjzu";
  url = pre + "&date=" + date;

  request = https.get(url, (result) => {
    if (result.statusCode !== 200) {
      console.error(
        `Did not get an OK from the server. Code: ${result.statusCode}`
      );
      //res.sendStatus(400)
      res
        .status(400)
        .send(
          `Bad Request. No picture available for the selected date ${date}.`
        );
    }

    let data = "";

    result.on("data", (chunk) => {
      data += chunk;
    });

    result.on("close", () => {
      data = JSON.parse(data);
      res.render("picture", {
        copyright: data["copyright"],
        date: data["date"],
        explanation: data["explanation"],
        image: data["url"],
        title: data["title"],
      });
    });
  });

  request.on("error", (err) => {
    console.error(
      `Encountered an error trying to make a request: ${err.message}`
    );
    //res.sendStatus(400)
    res
      .status(400)
      .send(`Bad Request. No picture available for the selected date ${date}.`);
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
