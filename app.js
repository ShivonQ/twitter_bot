var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'jjmUSM0GY84uXRRZD5grCKMdV',
  consumer_secret: '7cm8HQ7pPK33rF20Ju0bObxDsA2AoPUn7oTIlp6Cb0qNhJxYDd',
  access_token_key: '708360964744171524-VjgnI4nscSeiBua5B10FBadSeoVUILy',
  access_token_secret: 'OszYVZH0WrVFmmwcYJ5MLlMFF3zTRf8rZsKAn8ILtFsoh'
});

var params = {screen_name: 'DerdleBop'};
// client.get('statuses/user_timeline', params, function(error, tweets, response){
//   if (!error) {
//     console.log(tweets);
//   }
// });
var testPost="| Dimensions: 20 x 30 | Walls: Worked Stone | Water Source: Fountain | Doors: N & S & E Walls | Trap: Yes [ECL+2] | Encounter: Yes [ECL-1] |"
client.post('statuses/update',{status: testPost},function(error,tweet,response){
  if(!error){
    console.log(tweet);
  }
  else{
    console.log(error);
  }
})
module.exports = app;

// Major Furnishings
