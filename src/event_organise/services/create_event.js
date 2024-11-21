const EventOrganiseModel = require('../../Models/organisemodel')
//check the role
//create the event in db
// create add the user organiser Id in the event 

const CreateEvent =async(user_id, user_role,{e_name,e_details, event_time,event_add,capacity,fees})=>{
    if (user_role === "org_user"){
            console.log(e_name,e_details,event_time,event_add)
            if (!e_name || !e_details || !event_time || !event_add){
                throw({status:400, message:"Please provide all required fields"});
            }

            const capicityy = capacity || 0;
            
            const event_fees = fees || 0;

            const create_event = await EventOrganiseModel.create({
                e_name,
                e_details,
                event_time,
                event_add,
                capacity:capicityy,
                fill_seat:0,
                fees:event_fees,
                o_id:user_id
            })
            const create_eventResponse = { ...create_event._doc};
            return create_eventResponse;
        }
    else{
        throw({ status: 403, message: "This user doesn't have access to register the Event" });
   
    }
}; 

module.exports = CreateEvent;