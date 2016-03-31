/**
 * Created by School on 3/31/2016.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Room = require('./Room.js');
var dungeons_Schema= Schema({
    date_created:[{type:Date,default:Date.now}],
    dungeon_id:{type:String},
    all_rooms:[Room],
    number_of_rooms:{type:Number}

});

var Dungeon_Schema = mongoose.model('Dungeon',dungeons_Schema);

module.exports = Dungeon_Schema;

//THIS IS HERE FOR REFERENCE ONLY
//var Dungeon = function () {
//    this.date_created = new Date();
//    this.dungeon_id=dungeon_id_gen();
//    this.all_rooms=[];
//    this.number_of_rooms=random_num_with_single_param(6)+2;
//    //todo make the wall type randomize for dungeon
//    for (var i = 0;i<this.number_of_rooms;i++){
//
//        var room = new Room(this.dungeon_id,(i+1));
//        this.all_rooms.push(room);
//    }
//    //    Todo Make the rooms generate a reasonable amount of doors, or none at all.
//};