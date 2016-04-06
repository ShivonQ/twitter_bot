var express = require('express');
//var MongoClient=require("mongodb").MongoClient;
var engines = require("jade");
var assert = require("assert");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Dungeon_Gen = require('./random_data/data_and_dice.js');
var twit_keys=require('./keys_and_such.js');

var Dungeon = require('./models/Dungeon');
var Room = require('./models/Room');
var mongoose = require("mongoose");
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongourl=process.env.MONGOLAB_URI;
var db = mongoose.connect('mongodb://localhost:27017/random_dungeon_gen/');

var app = express();
app.use(session({'secret': 'Secret Tunnel'}));
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
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


var Twitter = require('twitter');

var client = new Twitter({
    consumer_key:twit_keys[0] ,
    consumer_secret:twit_keys[1],
    access_token_key:twit_keys[2],
    access_token_secret:twit_keys[3]
});
//var server = app.listen(process.env.PORT || 3000, function(){
//    var port = server.address().port;
//    console.log("server running on port: " + port);
//});

var params = {screen_name: 'DerdleBop'};
// client.get('statuses/user_timeline', params, function(error, tweets, response){
//   if (!error) {
//     console.log(tweets);
//   }
// });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var a_day = 86400000;
var ten_minutes = 600000;
var insert_dun_to_db = function (a_dungeon) {
    var new_dungeon_to_db = Dungeon({
        date_created: a_dungeon.date_created,
        dungeon_id: a_dungeon.dungeon_id,
        number_of_rooms: a_dungeon.number_of_rooms,
        all_rooms: a_dungeon.all_rooms,
        wall_type:a_dungeon.wall_type
    });
    new_dungeon_to_db.save(function (err) {
        if (err) {
            console.log("An error occurred while trying to save the new dungeon to the database.")
        }
    })
};

var how_many_tweets = function (JSON_object_string_length) {
    var tweet_limit = 140;
    //by adding one here I take care of any stragglers from the rounding.
    return Math.floor(JSON_object_string_length / tweet_limit) + 1;
};
var how_often_to_tweet = function (number_of_tweets_required) {
    var twenty_three_hours = 82800000;
    return Math.floor(twenty_three_hours / number_of_tweets_required);
}
//var string_dun=JSON.stringify(dun);
//var length_of_object=string_dun.length;
//console.log(string_dun);
//console.log("The Length of that string was: "+length_of_object);
//var final_number_of_tweets = how_many_tweets(length_of_object);
//console.log(how_often_to_tweet(final_number_of_tweets)+" milliseconds is how often This twitter bot will tweet to tell the whole dungeon")
//console.log("There will be "+final_number_of_tweets+" tweets once this is working.");
var seperate_rooms_from_dungeon = function (dun) {
    var total_tweets_for_all_rooms = 0;
    for (var k = 0; k < dun.all_rooms.length; k++) {
        console.log("Room Number: " + dun.all_rooms[k].room_number + "\n" + JSON.stringify(dun.all_rooms[k]));
        console.log(JSON.stringify(dun.all_rooms[k]).length + 14);
        console.log("This many tweets for a room: " + how_many_tweets(JSON.stringify(dun.all_rooms[k]).length + 14));
        total_tweets_for_all_rooms += how_many_tweets(JSON.stringify(dun.all_rooms[k]).length + 14);
        //console.log("Room Number: "+JSON.stringify(room.room_number)+"\n"+ JSON.stringify(room))
    }
    return total_tweets_for_all_rooms;
};
//TODO this is one of my attempts at solving my issue
//var start_interval_for_dun=setInterval(function(){run_dun()},3000);
//
//function run_dun(){
//    dun=Dungeon_Gen;
//    console.log(dun.number_of_rooms);
//    return dun;
//}
//
//function reset_dun(){
//    clearInterval(start_interval_for_dun);
//}
setInterval(function () {
    //This is the 24 hour interval function

    var dun = Dungeon_Gen();
    console.log(dun);
    var room_tweet_counter = 0;
    var final_number_of_tweets = how_many_tweets(JSON.stringify(dun).length);
    console.log("This will take " + final_number_of_tweets + " Tweets to fully output.");
    var how_often_to_tweet_variable = how_often_to_tweet(final_number_of_tweets);
    insert_dun_to_db(dun);
    //FIGURE OUT THE INTERVAl
    //TODO uncomment and then run this aspect
    //String(new Date()).slice(0,25)
    var first_tweet = "Dungeon ID: " + dun.dungeon_id + " was created " + String(dun.date_created).slice(0,15) + " and has " + dun.number_of_rooms + " rooms and " +dun.wall_type+" walls.";
    client.post('statuses/update', {status: first_tweet}, function (err, tweet, response) {
        if (!err) {console.log("TWEETED:" + tweet)}
        else {console.log(err)}
    });
    setInterval(function () {
        //  THIS IS THE variable INTERVAL FUNCTION:  FIGURE OUT HOW MANY TWEETS determined by sting length


    }, how_often_to_tweet_variable);
    //client.post('statuses/update', {status: "A"}, function (error, tweet, response) {
    //    if (!error) {
    //        console.log(tweet);
    //    }for(var j=0;j<dun.all_rooms.length;j++){
    //
    //    }
    //    else {
    //        console.log(error);
    //    }
    //}, 82800000);
}, ten_minutes);
//clearInterval()
module.exports = app;

// Major Furnishings
