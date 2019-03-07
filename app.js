// The main application script, ties everything together.
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var favicon = require('serve-favicon');
var app = express();

var auth = require('./server/controllers/auth');
var usersRouter = require('./server/routes/users');
var documentsRouter = require('./server/routes/documents');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/documents', documentsRouter);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));
// authentication middleware
app.use(auth.authenticate);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
