
const  registerUser = require('./register_user');
const loginuser = require('./login_user');
const errorHandler = require('../../Settings/errorHandler');

//user register

const user_register = async (req, res) => {
try {
    const userResponse= await registerUser(req.body);
    res.status(201).json(userResponse);
} catch (error) {
    errorHandler(res,error);
   
   }
};

const login_user=async(req,res)=>{
    try{
      const loginresponse = await loginuser(req.body);
      res.status(201).json(loginresponse);
          
         
      }
      catch(error){
          errorHandler (res,error);
     }
  
      
  };
module.exports ={user_register, login_user};