var express = require('express');
var router = express.Router();
var Dungeon = require('../models/Dungeon.js');
var Room = require('../models/Room.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Dungeon_Gen TwitterBot' });
});
router.get('/allDungeons', function(req, res, next) {
  //  request all Dungeon Documents
    Dungeon.find(function(err, dungeonsDocs){
        if(err){return next(err); }
        return res.render('allDungeons',{Dungeons:dungeonsDocs, error:req.flash('error')});
    });
});
router.post('/', function(req,res,next){
    var new_dungeon=Dungeon
})
module.exports = router;
