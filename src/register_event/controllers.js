const errorHandler = require('../../Settings/errorHandler');
const register_event = require('./services/register_event');

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

module.exports = {registerevent};