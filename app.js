var express = require('express');
//var MongoClient=require("mongodb").MongoClient;
var engines = require("jade");
var assert = require("assert");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dung_generator=require('./random_data/data_and_dice.js');

var mongoose= require("mongoose");
var session= require('express-session');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');

var db = mongoose.connect('mongodb://localhost:27017/random_dungeon_gen/');

var app = express();
app.use(session({'secret':'Secret Tunnel'}));
app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//MongoClient.connect('mongodb://localhost:27017/random_dungeon_gen', function(err, db){
//  assert.equal(null, err);
//  console.log('Connected To Mongo Db Successfully');
//
//  // app.get('/',function(req, res){
//  //   db.collection('flowers').find({}, {"name":true,"color":true}).toArray(function(err, flowerdocs){
//  //     if (err){return res.sendStatus(500); }
//  //
//  //     var colordocs=db.collection('flowers').distinct("color",function(err, colordocs){
//  //       if (err) {return res.sendStatus(500);}
//  //       return res.render('allflowers',{'flowers':flowerdocs,"flowerColors":colordocs})
//  //     });
//  //   });
//  // });
//
//  app.get('/', function(req,res){
//
//    db.collection('Dungeons').find().toArray(function(err,dungeons_docs){
//      // if an error happens, 500 and log
//      if (err) {return res.sendStatus(500);console.log('Error finding collection via MongoDB client')}
//      // otherwise take the data and display it
//      return res.render('allDungeons',{'Dungeons': dungeons_docs});
//    });
//  });
//  app.use(function(req, res){
//    res.sendStatus(404);
//  });
//  var server = app.listen(3050, function(){
//    var port = server.address().port;
//    console.log("Server is listening to port" + port);
//  });
//});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
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
setInterval(function(){
  var timePost=String(new Date);
  var testPost="| Dimensions: 20 x 30 | Walls: Worked Stone | Water Source: Fountain | Doors: N & S & E Walls | Trap: Yes [ECL+2] | Encounter: Yes [ECL-1] |"
  client.post('statuses/update',{status: timePost},function(error,tweet,response){
    if(!error){
      console.log(tweet);
    }
    else{
      console.log(error);
    }
  });
}, 500000);

module.exports = app;

// Major Furnishings
