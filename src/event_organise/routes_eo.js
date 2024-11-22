const express = require('express');
const {authenticate} = require('../../Settings/middleware/auth_token')
const {create_event, get_all_events } = require('./controllers');

const router = express.Router();
//create the event 
router.post('/create_event',authenticate,create_event)
//get all the event 
router.get('/events',authenticate,get_all_events);

module.exports = router;