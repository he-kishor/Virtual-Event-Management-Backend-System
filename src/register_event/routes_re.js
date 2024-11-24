const express = require('express');
const {authenticate} = require('../../Settings/middleware/auth_token')
const  {registerevent, getUserEvent} = require('./controllers');

const router = express.Router();
//register the event 
router.post('/register_event',authenticate,registerevent)

//get user register data
router.get('/get_registrevent',authenticate,getUserEvent);

module.exports = router;