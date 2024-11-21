const errorHandler = require('../../Settings/errorHandler')
const createevent = require('./services/create_event')

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

module.exports = {create_event};
