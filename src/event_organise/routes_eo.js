const express = require('express');
const {authenticate} = require('../../Settings/middleware/auth_token')
const {create_event } = require('./controllers');

const router = express.Router();
router.post('/create_event',authenticate,create_event)

module.exports = router;