const moment = require("moment");
const Event_org = require('../Models/organisemodel');
const Bull = require('bull');
const ProcessEvent = require('./event_task/usere_messageloop');
const sendEmail = require('./mail');

const emailQueue = new Bull("emailQueue");
emailQueue.process(async(job)=>{
    const data = job.data;
    await sendEmail(data);
});
const Scheduke_cron = async()=>{
try{

    const start= moment().add(1,"days").set({hours:8, minute:0, second:0});
    const end = moment().add(2,"days").set({hour:8, minute:0, second:0});
    
    //ftech events 
    const events = await Event_org.find({event_time:
        {$gte:start.toDate(), $lt:end.toDate()},
    });
    
    for (const event of events){
        await ProcessEvent(event,emailQueue);
        console.log("checked");
    }


}
catch(error){
    console.error("Error in crm job,error");
}


};

module.exports=Scheduke_cron;