require('dotenv').config();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User = require('../../Models/userModel');

//register user
const registerUser = async({fname, lname, email, pass, role, gender,birth})=> {
    if (!fname || !lname || !email || !role || !birth){
        throw({status:400, message:"Please provide all required fields"});

    }
    const genderr = gender || 'NO response'
    const hasedPassword = await bcrypt.hash(pass,10);
    const current_date=Date.now();
    const newuser = await User.create({fname, lname, email, pass:hasedPassword,  role, gender:genderr,birth_date:birth,passwordChangedAt:current_date,resetPasswordOtp:'',otpExpires:current_date});

    const userResponse = { ...newuser._doc};
    delete userResponse.pass;
    delete userResponse.passwordChangedAt;
    delete userResponse.otpExpires;
    delete userResponse.resetPasswordOtp;

    return userResponse //return user detail
}

module.exports = registerUser;