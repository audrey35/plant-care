var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var hbs = require('hbs');

var blogEngine = require('./blog');
//var bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
//app.use(express.bodyParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
});
app.get('/about', function(req, res) {
	res.render('about',{title:"About Me"});
});
app.get('/article/:id', function(req, res) {
	var entry = blogEngine.getBlogEntry(req.params.id);
	res.render('article',{title:entry.title, blog:entry});
});

app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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

module.exports = app;
