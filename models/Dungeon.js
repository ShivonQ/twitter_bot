/**
 * Created by School on 3/31/2016.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Room = require('./Room.js');

var dungeons_Schema= Schema({
    date_created:[{type:Date,default:Date.now}],
    dungeon_id:{type:String},
    number_of_rooms:{type:Number},
    all_rooms:[Room],
    wall_type:{type:String}


});

var Dungeon_Schema = mongoose.model('Dungeon',dungeons_Schema,'Dungeons');

module.exports = Dungeon_Schema;