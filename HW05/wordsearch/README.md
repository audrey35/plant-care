# Word Search Game

## Environment Setup
### Install Express
```
mkdir wordsearch // create a project
cd wordsearch
npm init // creates a node package 
npm install express --save // install express for project and add it as a dependency for the project
```

### Run Express App using Node (blank browser)
- create wordsearch/app.js
```
const express = require('express');
const app = express();
const hostname = '192.168.0.21';
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at
http://${hostname}:${port}`);
});
```
- run app.js
```
node app.js
```
- returns `Cannot GET /` because we didn't tell the app to deliver anything

### Run Express App using Node (Hello world text on browser)
- edit wordsearch/app.js
```
const express = require('express');
const app = express();
const hostname = '192.168.0.21';
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at
http://${hostname}:${port}`);
});
```
- run app.js
```
node app.js
```
- returns `Hello World!`

### Run Express App using Node (Dynamic content on browser)
- edit wordsearch/app.js
```
const express = require('express');
const app = express();
const hostname = '192.168.0.21';
const port = 3000;

app.get('/', (req, res) => {
	var d = new Date()
	res.send('Greetings! <br/> Today is <b>' + d + '</b>');

app.listen(port, () => {
        console.log(`Example app listening at http://${hostname}:${port}`);
});
```
- run app.js
```
node app.js
```
- returns `Greetings! Today is Fri Oct 15 2021 05:08:22 GMT+0000 (Coordinated Universal Time)`

### Install express generator
- a tool that can create and initialize an application skeleton
   - set up a directory structure for isolating your business and presentation logic
   - can be used as a starting point; feel free to edit
```
cd ..
sudo npm install express-generator -g
express wordsearch
cd wordsearch
npm install
DEBUG=wordsearch:* npm start
```
- run wordsearch in debug mode
```
DEBUG=wordsearch:* npm start
```
- run wordsearch
```
npm start
```
- returns default Express page (`Express Welcome to Express`)

### Serve static files in Express
```
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', function(req, res) {
	res.sendfile('./views/index.html');
});

module.exports = app;
```
- create views/index.html
```
<html>
    <head>
        <title>Word Search Game</title>
    </head>

	<body>
        <h1>Word Search Game</h1>

        <footer>
        </footer>
    </body>
</html>
```
- edit package.json
```
{
  "name": "wordsearch",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "^0.29.0",
    "morgan": "~1.9.1",
    "hbs": "*"
  }
}
```
- Update app.js
```
var express = require('express');
var app = express();
var hbs = require('hbs');

app.set('view engine', 'html'); // replace jade with html
app.engine('html', hbs.__express);

app.get('/', function(req, res) {
    res.render('index');
});
```
- run the server
```
npm install
DEBUG=wordsearch:* npm start
```

