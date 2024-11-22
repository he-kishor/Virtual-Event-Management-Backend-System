const express = require('express');
const {authenticate} = require('../../Settings/middleware/auth_token')
const {registerevent} = require('./controllers');

const router = express.Router();
//register the event 
router.post('/register_event',authenticate,registerevent)


module.exports = router;