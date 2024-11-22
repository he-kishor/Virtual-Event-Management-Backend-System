const EventOrganiseModel = require('../../Models/organisemodel');
//when the function call
//it ftech data from model
// return all objects 
const get_allevents =async()=>{
  try{
        const event_data = await EventOrganiseModel.find();
        if (!event_data){
            throw({ status: 400, message: "Empty Event Registerd" });
   
        }
        const modified_event_data = event_data.map(event=>{
            const {capacity, ...rest} = event.toObject();
            return rest
        });

        return modified_event_data;
  }
  catch{
    throw({ status: 500, message: "Interanl Error Occured" });
    
  }

};

module.exports = get_allevents;