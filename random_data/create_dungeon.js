/**
 * Created by School on 3/31/2016.
 */

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
        var feature=major_features_table[random_num_with_single_param(100)+1];
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
module.exports=Dungeon();