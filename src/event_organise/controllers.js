const errorHandler = require('../../Settings/errorHandler')
const createevent = require('./services/create_event')
const get_allevents = require('./services/get_all_events');
const create_event = async( req,res) =>{
    try{
        const id=req.userid;
        const role = req.userrole;
        const create_eventResponse = await createevent(id,role,req.body);
        res.status(201).json(create_eventResponse);

    }
    catch(error){
        errorHandler(res,error);
    }
}

// it will nothing take from the resquest
// it just send the response here
const get_all_events =async(req,res)=>{
    try{
        const event_data = await get_allevents();
        res.status(201).json(event_data);
    }
    catch(error){
        errorHandler(res,error); 
    }
}
module.exports = {create_event, get_all_events};
