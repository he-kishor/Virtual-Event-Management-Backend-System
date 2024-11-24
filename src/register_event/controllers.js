const errorHandler = require('../../Settings/errorHandler');
const register_event = require('./services/register_event');
const get_userEvent = require('./services/get_usereventdata');


const registerevent =async(req,res)=>{
 try{
   const id = req.userid;
   const event_data = await register_event(id, req.body);
   res.status(201).json(event_data);
 }
 catch(error){
   errorHandler(res, error);
 }
};

const getUserEvent = async(req,res)=>{
   try{
    const id = req.userid;
    const user_data = await get_userEvent(id);
    res.status(200).json(user_data);
   }
   catch(error){
    errorHandler(res, error);
   }
}

module.exports = {registerevent, getUserEvent};