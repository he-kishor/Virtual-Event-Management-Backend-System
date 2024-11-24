const RegisterEventModel = require('../../Models/registereventmodel')
const organisemodel = require('../../Models/organisemodel');
//user id from token
//find data user register event data 
//return the data
const get_userEvent = async(userId)=>{

    const user_data = await RegisterEventModel.find({u_id:userId});
    if (user_data.length===0){
        throw({status:400,message:"This user does't have register the Event"});

    }

    const enrichedEvents = await Promise.all(
        user_data.map(async (event) => {
            // Find the event details using `or_id`
            const eventDetails = await organisemodel.findById(event.or_id);
            if (eventDetails) {
                // Convert eventDetails to a plain object
                const plainEventDetails = eventDetails.toObject();
                // Delete unwanted keys
                delete plainEventDetails._id
                delete plainEventDetails.capacity;
                delete plainEventDetails.o_id;
            // Merge the event details into the original event object
            return {
                ...event.toObject(), // Convert Mongoose document to plain object
                eventDetails:plainEventDetails,       
            };
        }
        return {
            ...event.toObject(),
            eventDetails: null, // Indicate missing event details
        };
        })
    );
    return enrichedEvents
    

};

module.exports = get_userEvent;