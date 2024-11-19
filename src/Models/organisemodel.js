const mongoose = require('mongoose');
const Event_organisationSchema = new mongoose.Schema({
e_name:{type:String,required:true},
event_time:{type:Date, required:true},
event_add:{type:String,required:true},
capacity:{type:Number},
fill_seat:{type:Number},
fees:{type:Number},
o_id:{type:String,required:true}

})

const Event_org = mongoose.model("event_organiser",Event_organisationSchema);
module.exports = Event_org;