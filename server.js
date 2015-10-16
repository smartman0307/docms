// The main application script, ties everything together.
var bodyParser = require('body-parser');
var config = require('./server/config/config');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
require('./app/cli/index');

// connect to Mongo when the app initializes
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database.');
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api = require('./server/routes/api')(app, express, io);
app.use('/api', api);


app.get('*', function(req, res) {
  res.send('System Under Construction...');
  // res.sendFile(__dirname + '/public/views/index.html');
});

http.listen(config.port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port: " + config.port);
  }
});