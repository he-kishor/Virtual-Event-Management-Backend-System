const Registration_e = require('../../Models/registereventmodel');
const Users = require('../../Models/userModel');




const ProcessEvent=async(event, emailQueue)=>{
    try{
    const registration = await Registration_e.find({
        or_id:event._id
    });
    for (const reg of registration){
        const users = await Users.findById(reg.u_id);
        if (users){
            data={
                'event_name':event.e_name,
                'users_name':users.fname,
                'event_time':event.e_time,
                'users_email':users.email
            };
    
            await emailQueue.add({data});
        }
        
    }


}
catch (error) {
    console.error(`Error processing event ${event._id}:`, error);
  }
}
  
module.exports = ProcessEvent;