//two model organise, register
const organisemodel = require('../../Models/organisemodel');
const RegisterEventModel = require('../../Models/registereventmodel');

// in argument took the event_id
// get the current date
//prevent user dubplicate entry
// first create the data for the register event 
// check if the fullfill < capacity and capacity !== 0
// filled seat 
//response the the event data 

// add set in event
const add_seat = async(event_id,fill_seatp)=>{
 try{
    const event_update = await organisemodel.findByIdAndUpdate(event_id, {
      $set:{
        fill_seat:fill_seatp+1
      }
      },
      {new:true}
   );
   return event_update;
  }
  catch{
    throw({status:500,message:"Internal Error occurs"});
  }
  
};

//create the event
const register_bd = async(user_id, event_id)=>{
 try{
  const event_reg = await RegisterEventModel.create({
    u_id: user_id,
    or_id: event_id,
    register_date: Date.now(),
  });
  return event_reg
  } 
catch (err) {
  if (err.code === 11000) {
    throw({status:400,message:"You have already enroll the event"});
  } else {
    throw({status:500,message:"Internal Error occurs"});
  }
}

}

//create main register event
const register_event = async(user_id,{event_id})=>{
    
       if (!event_id){
        throw({status:400,message:"Please provide all require fields"});
       }
       const event_obj = await organisemodel.findById(event_id);
       if (!event_obj){
         throw({status:400,message:"This Event is not availale"});
       }

       if (event_obj.capacity>0){
         if (event_obj.capacity > event_obj.fill_seat){
          const regiter_eventdata = await register_bd(user_id,event_id);
          const updateteData = await add_seat(event_id, event_obj.fill_seat);
          return regiter_eventdata;
         } 
         else{
          throw({status:400,message:"The seat are Full for this event"});
      
         }
       }
       
       const regiter_eventdata = await register_bd(user_id,event_id);
       const updateteData = await add_seat(event_id, event_obj.fill_seat);
       return regiter_eventdata;
      
   
      
    
};

module.exports = register_event;