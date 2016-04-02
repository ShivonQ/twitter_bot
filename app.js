var express = require('express');
//var MongoClient=require("mongodb").MongoClient;
var engines = require("jade");
var assert = require("assert");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Dungeon_Gen=require('./random_data/data_and_dice.js');

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
}, 600000);
var a_day=86400000;
var ten_minutes=600000;

var dun = Dungeon_Gen;
console.log(dun);

var how_many_tweets=function(JSON_object_string_length){
  var tweet_limit=140;
  //by adding one here I take care of any stragglers from the rounding.
  return Math.floor(JSON_object_string_length/tweet_limit)+1;
};
var how_often_to_tweet=function(number_of_tweets_required){
  var twenty_three_hours=82800000;
  return Math.floor(twenty_three_hours/number_of_tweets_required);
}
var string_dun=JSON.stringify(dun);
var length_of_object=string_dun.length;
console.log(string_dun);
console.log("The Length of that string was: "+length_of_object);
var final_number_of_tweets = how_many_tweets(length_of_object);
console.log(how_often_to_tweet(final_number_of_tweets)+" milliseconds is how often This twitter bot will tweet to tell the whole dungeon")
console.log("There will be "+final_number_of_tweets+" tweets once this is working.")
var seperate_rooms_from_dungeon=function(dun){
  for (var k=0;k<dun.all_rooms.length;k++){
    console.log("Room Number: "+ dun.all_rooms[k].room_number+"\n"+JSON.stringify(dun.all_rooms[k]));
    console.log("This many tweets for a room: "+how_many_tweets(JSON.stringify(dun.all_rooms[k]).length+14));
    //console.log("Room Number: "+JSON.stringify(room.room_number)+"\n"+ JSON.stringify(room))
  }
}
seperate_rooms_from_dungeon(dun);
module.exports = app;

// Major Furnishings
