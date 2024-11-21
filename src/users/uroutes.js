// services/users/routes/user_routes.js
const express = require('express');
const { user_register, login_user} = require('./controllers');

const router = express.Router();


router.post('/signup', user_register);
router.post('/login',login_user);


module.exports = router;
