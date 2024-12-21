require('dotenv').config();
const express=require('express');
const connecDB=require('./Settings/DB/dbconnect');
const Routes=require('./src/routes');
const { logger } = require('./Settings/middleware/auth_token');
const cron = require("node-cron");
//app start
const app=express();

//middleware
app.use(express.json());
app.use(logger);


//simple get method
app.get("/",(req,res)=>{
   return res.send("Welcome in authentication and authorization")
});
//user route
app.use("/api",Routes);
const PORT=process.env.PORT;

//connect db then server will start 
connecDB().then(()=>{
    app.listen(PORT,()=>{
        console.log('The server is running on the port 3003');
    });
})