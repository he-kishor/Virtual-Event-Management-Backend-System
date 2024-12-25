const bcrypt = require('bcrypt');
const checkhashPassword = async (plainpassword, expectedpassword) => {
    
        const  hasedPassword= await bcrypt.hash(plainpassword,10);
        //compar the hashed passwordwith excepted password
        const isMatch = await bcrypt.compare(expectedpassword, hasedPassword);
        return isMatch;

}

module.exports = checkhashPassword;