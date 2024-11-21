const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['admin_user', 'org_user', 'reg_user'], // Only these roles are allowed
  },
  birth_date:{type:Date,required:true},
  gender: { type: String, required: true },
  passwordChangedAt: { type: Date },  // Field for storing password change timestamp
  lastLoginAt: { type: Date }    // Field for storing last login timestamp
});


const User_m=mongoose.model("Users_EVM",UserSchema);
module.exports=User_m;