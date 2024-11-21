// gateway/routes/users.js
const express = require('express');
const userRoutes = require('./users/uroutes'); // Points to user service routes
const organiserRoutes= require('./event_organise/routes_eo');
const router = express.Router();

router.use('/users', userRoutes); // All /users-related routes will be forwarded to the user microservice
router.use('/organiser',organiserRoutes);
module.exports = router;