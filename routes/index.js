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
        return res.render('allDungeons',{title:'All Dungeons',Dungeons:dungeonsDocs, error:req.flash('error')});
    });
});
router.get('/3_rooms',function(req,res,next){
    Dungeon.find({number_of_rooms:3},function(err, dungeonDocs){
        if(err){return next(err); }
        return res.render('allDungeons', {title:' 3 Room Dungeons ',Dungeons:dungeonDocs, error:req.flash('error in 3 rooms')})
    });
});
router.get('/4_rooms',function(req,res,next){
    Dungeon.find({number_of_rooms:4},function(err, dungeonDocs){
        if(err){return next(err); }
        return res.render('allDungeons', {title:' 4 Room Dungeons ',Dungeons:dungeonDocs, error:req.flash('error in 3 rooms')})
    });
});
router.get('/5_rooms',function(req,res,next){
    Dungeon.find({number_of_rooms:5},function(err, dungeonDocs){
        if(err){return next(err); }
        return res.render('allDungeons', {title:' 5 Room Dungeons ',Dungeons:dungeonDocs, error:req.flash('error in 3 rooms')})
    });
});
router.get('/6_rooms',function(req,res,next){
    Dungeon.find({number_of_rooms:6},function(err, dungeonDocs){
        if(err){return next(err); }
        return res.render('allDungeons', {title:' 6 Room Dungeons ',Dungeons:dungeonDocs, error:req.flash('error in 3 rooms')})
    });
});
router.get('/7_rooms',function(req,res,next){
    Dungeon.find({number_of_rooms:7},function(err, dungeonDocs){
        if(err){return next(err); }
        return res.render('allDungeons', {title:' 7 Room Dungeons ',Dungeons:dungeonDocs, error:req.flash('error in 3 rooms')})
    });
});
router.get('/8_rooms',function(req,res,next){
    Dungeon.find({number_of_rooms:8},function(err, dungeonDocs){
        if(err){return next(err); }
        return res.render('allDungeons', {title:' 8 Room Dungeons ',Dungeons:dungeonDocs, error:req.flash('error in 3 rooms')})
    });
});
router.get('/9_rooms',function(req,res,next){
    Dungeon.find({number_of_rooms:9},function(err, dungeonDocs){
        if(err){return next(err); }
        return res.render('allDungeons', {title:' 9 Room Dungeons ',Dungeons:dungeonDocs, error:req.flash('error in 3 rooms')})
    });
});
router.get('/10_rooms',function(req,res,next){
    Dungeon.find({number_of_rooms:10},function(err, dungeonDocs){
        if(err){return next(err); }
        return res.render('allDungeons', {title:' 10 Room Dungeons ',Dungeons:dungeonDocs, error:req.flash('error in 3 rooms')})
    });
});
router.post('/', function(req,res,next){
    var new_dungeon=Dungeon
})
module.exports = router;
