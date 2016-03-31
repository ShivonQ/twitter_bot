var major_furnishing_table={"1":"Alcove","2":"Altar","3":"Arch","4":"Arrowslit","5":"Balcony","6":"Barrel","7":"Bed","8":"Bench","9":"Bookcase","10":"Brazier"
,"11":"Cage","12":"Cauldron","13":"Carpet","14":"Carving","15":"Casket","16":"Catwalk","17":"Chair","18":"Chandelier","19":"Charcoal Bin","20":"Chasm"
,"21":"Chest","22":"Chest of Drawers","23":"Chute","24":"Coat Rack","25":"Collapsed Wall","26":"Crate","27":"Cupboard","28":"Curtain","29":"Divan","30":"Dome"
,"31":"Broken Door","32":"Dung Heap","33":"Evil Sigil","34":"Fallen Stones","35":"Firepit","36":"Fireplace","37":"Font","38":"Forge","39":"Fountain","40":"Broken Furniture"
,"41":"Gong","42":"Hay Pile","43":"Hole","44":"Blasted Hole","45":"Idol","46":"Iron Bars","47":"Iron Maiden","48":"Kiln","49":"Ladder","50":"Ledge"
,"51":"Loom","52":"Loose Masonry","53":"Manacles","54":"Manger","55":"Mirror","56":"Mosaic","57":"Mound of Rubble","58":"Oven","59":"Overhang","60":"Painting"
,"61":"Partially Collapsed Room","62":"Pedestal","63":"Peephole","64":"Pillar","65":"Pillory","66":"Shallow Pit","67":"Platform","68":"Pool","69":"Portcullis","70":"Rack"
,"71":"Ramp","72":"Recess","73":"Relief","74":"Sconce","75":"Screen","76":"Shaft","77":"Shelf","78":"Shrine","79":"Spinning Wheel","80":"Stall or Pen"
,"81":"Statue","82":"Toppled Statue","83":"Steps","84":"Stool","85":"Taxidermied Creature","86":"Sunken Area","87":"Large Table","88":"Small Table","89":"Tapestry","90":"Throne"
,"91":"Trash Pile","92":"Tripod","93":"Trough","94":"Tub","95":"Wall Basin","96":"Wardrobe","97":"Weapon Rack","98":"Well","99":"Winch and Pulley","100":"Workbench"}

var minor_features_table={"1":"Anvil","2":"Ash","3":"Backpack","4":"Hay Bale","5":"Bellows","6":"Belt","7":"Bits of Fur","8":"Blanket","9":"Bloodstain","10":"Humanoid Bones"
,"11":"Non-human Bones","12":"Books","13":"Boots","14":"Bottle","15":"Box","16":"Branding Iron","17":"Broken Glass","18":"Bucket","19":"Candle","20":"Candelabra"
,"21":"Playing Cards","22":"Chains","23":"Claw Marks","24":"Cleaver","25":"Clothing","26":"Cobwebs","27":"Cold Spot","28":"Adventurer Corpse","29":"Monster Coprse","30":"Cracks"
,"31":"Dice","32":"Discarded Weapons","33":"Dishes","34":"Dripping Water","35":"Drum","36":"Dust","37":"Engraving","38":"Broken Equiptment","39":"Usable Equiptment","40":"Flask"
,"41":"Flint and Tinder","42":"Food (Spoiled)","43":"Food (Edible)","44":"Fungus","45":"Grinder","46":"Hook","47":"Horn","48":"Hourglass","49":"Insects","50":"Jar"
,"51":"Keg","52":"Key","53":"Lamp","54":"Lantern","55":"Markings","56":"Mold","57":"Mud","58":"Mug","59":"Musical Instrument","60":"Mysterious Stain"
,"61":"Animal Nest","62":"Odor","63":"Oil (Fuel)","64":"Oil (Scented)","65":"Paint","66":"Paper","67":"Pillows","68":"Smoking Pipe","69":"Pole","70":"Pot"
,"71":"Pottery Shard","72":"Pouch","73":"Puddle of Water","74":"Rags","75":"Razor","76":"Rivulet","77":"Ropes","78":"Runes","79":"Sack","80":"Scattered Stones"
,"81":"Scorch Marks","82":"Non-magical Scroll","83":"Empty Scrollcase","84":"Skull","85":"Slime","86":"Sounds","87":"Spices","88":"Spikes","89":"Teeth","90":"Tongs"
,"91":"Tools","92":"Torch","93":"Tray","94":"Trophy","95":"Twine","96":"Urn","97":"Utensils","98":"Whetstone","99":"Wood Scraps","100":"Words (Scrawled)"};

var weird_features_table={"1":"Small Acid Pool","2":"Ice Floor","3":"Bed of Coals","4":"Floor is 10 feet of water","5":"Walls are Flesh","6":"Eyes cover the Cieling","7":"No Gravity","8":"Fog","9":"Flammable Gas","10":"Pit Trap Filled With Stinging Nettles",
    "11":"Illusion of Outside","12":"Full of Feral Cats","13":"Endless(?) Pit","14":"Gelatinous Cube","15":"Floor Covered in Snakes","16":"Burned Books","17":"Cages","18":"Friendly NPC","19":"Dead Garden","20":"Stone Coffin","21":"Shackled Creature","22":"Spike Walls, Ceiling, and Floor"};

var wall_type_table={"1":"Masonry","2":"Superior Masonry","3":"Reinforced Masonry","4":"Hewn Stone","5":"Unworked Stone","6":"Iron","7":"Paper","8":"Wood"};
 //TODO:  1: Wall Type
//TODO:   2: Create Templates/Jade Sites
//TODO:   3: Create DB
//TODO:   4: Figure out the front end
//TODO:   5: Figure out the way to spit out info
//TODO:   6: Make an interval (use the one at the bottom of everything here) based website that does a function every hour
//TODO:   7:

 var Dungeon = function () {
     this.date_created = new Date();
     this.dungeon_id=dungeon_id_gen();
     this.all_rooms=[];
     this.number_of_rooms=random_num_with_single_param(6)+2;
     //todo make the wall type randomize for dungeon
     for (var i = 0;i<this.number_of_rooms;i++){

         var room = new Room(this.dungeon_id,(i+1));
         this.all_rooms.push(room);
     }
 //    Todo Make the rooms generate a reasonable amount of doors, or none at all.
 };
 var Room =  function(dungeon_id_num,room_number){
     this.l_w_h=roll_room_size();
     this.dungeon_id=dungeon_id_num;
     this.room_number=room_number;
     this.weird_feature="None";
     this.major_features=[];
     this.minor_features=[];
     //maybe hand out weird features
     var check_for_weirdness=random_num_with_single_param(100)+1;
     if (check_for_weirdness>=96){
         this.weird_feature=weird_features_table[random_num_with_single_param(22)+1];
     }
     var how_many_major=random_num_with_single_param(2)+1;
     var how_many_minor=random_num_with_single_param(3)+1;
     //hand out major features
     for ( var j = 0; j <= how_many_major; j++ ){
         var feature=major_furnishing_table[random_num_with_single_param(100)+1];
         this.major_features.push(feature);
     }
     //Hand out minor features
     for ( var k = 0; k <= how_many_minor; k++){
         var minor_feature=minor_features_table[random_num_with_single_param(100)+1];
         this.minor_features.push(minor_feature);
     }



     //this.number_of_doors=random_num_with_single_param(3)+2;
     //if (this.number_of_doors>4){
     //    this.number_of_doors=4;
     //}
 };
//This is working Flawlessly

var roll_percentile=function(){
     var rando_percent=Math.floor(Math.random()*100);
     console.log(rando_percent);
     return rando_percent;
 };
//This is working flawlessly
var dungeon_id_gen=function(){
    var  numbers=["1","2","3","4","5","6","7","8","9","0"];
    var letters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var id_length=6;
    var dung_id="";
    for (var j = 0;j<id_length;j++){
        var temp_num = random_num_with_single_param(2);
        if (temp_num==1){
            dung_id=dung_id+numbers[random_num_with_single_param(10)-1];
        }else{
            var upper_or_lower=random_num_with_single_param(2);

            if (upper_or_lower==1){
                dung_id=dung_id+letters[random_num_with_single_param(26)-1].toLowerCase();
            }else{
                dung_id=dung_id+letters[random_num_with_single_param(26)-1];
            }
        }
    }
    console.log(dung_id);
    return dung_id

};
//this is working, though have to subtract 1 from result for arrays.
var random_num_with_single_param=function(max_num){
    var number=Math.floor(Math.random()*max_num)+1;
    console.log(number +"--> Came from random_num_with_single_param()");
    return number;
}
//This is working perfectly
var roll_room_size=function(){
    var length=(Math.floor(Math.random()*12)+1)*5;
    if (length<=5){length=10;}
    var width=(Math.floor(Math.random()*12)+1)*5;
    if (width<=5){width=10;}
    var height=(Math.floor(Math.random()*12)+1)*5;
    if (height<=5){height =10;}
    var array_of_dimensions=[length,width,height];
    console.log(length+"  "+width+"  "+height+"--> Came from roll_room_size()");
    return array_of_dimensions;
};

var one_day=86400000;

//{ date_created: Tue Mar 22 2016 18:02:22 GMT-0500 (Central Daylight Time),dungeon_id: 'q31xsE',all_rooms:[ { l_w_h:[20,10,30],dungeon_id:'q31xsE',room_number:1,weird_feature: 'None',major_features: ['Feature 1','Feature 2'],minor_features: ['Minor feature 1','minor feature 2'] },{ l_w_h:[Object],dungeon_id:'q31xsE',room_number: 2,weird_feature: 'None',major_features: ['Feature 1','Feature 2'],minor_features: ['Minor feature 1','minor feature 2'] },{ l_w_h:[Object],dungeon_id: 'q31xsE',room_number: 3,weird_feature: 'Ice Floor',major_features: ['Feature 1','Feature 2'],minor_features: ['Minor feature 1','minor feature 2']} ],number_of_rooms: 3 }
