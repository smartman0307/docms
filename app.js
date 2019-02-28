// The main application script, ties everything together.
var bodyParser = require('body-parser');
var config = require('./server/config/config');
var path = require('path');
var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var app = express();

var http = require('http').Server(app);
var api = require('./server/routes/api')(app, express);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// connect to Mongo when the app initializes
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database.');
  }
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
