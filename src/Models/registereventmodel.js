const mongoose=require('mongoose');
const RegisterSchema = new mongoose.Schema({
u_id : {type:String,required:true},
or_id:{type:String,required:true},
register_date:{type:Date,required:true}

});

Registration_e = mongoose.model("event_registration", RegisterSchema)

module.exports = Registration_e;