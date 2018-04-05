
// ************************************************************************
// ********************* INITIAL SETUP / DEPENDENCIES *********************
// ************************************************************************

// UTILITIES THAT NODE REALLY LIKES
require('dotenv').load();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// INSTANTIATE AN EXPRESS INSTANCE
const app = express();



// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ************************************************************************
// ********************** DATABASE CONNECTION *****************************
// ************************************************************************

// CONNECT AND CONFIG MONGODB
require('./models/db');


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ***************************************************************************
// ************************ EXPRESS MIDDLEWARE *******************************
// ***************************************************************************

// PARSING REQUESTS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// PLUGIN FOR LOGGING ALL REQUESTS MADE VIA HTTP
// DEV MODE ONLY
const logger = require('morgan');
app.use(logger('dev'));


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ************************************************************************
// ****************************** AUTH ************************************
// ************************************************************************

// DISABLED IN DEV MODE FOR INITIAL API SETUP
// SHOULD ENABLE EVENTUALLY FOR ALL REQUESTS

// NOTE: THIS HAS TO COME BEFORE ANY
// AUTH-PROTECTED ROUTES ARE INSTANTIATED
const authHandler = require('./auth');
authHandler(app);


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ************************************************************************
// ************************ EXPRESS ROUTING *******************************
// ************************************************************************

// PREVENT FLAVICON REQUESTS B/C THIS IS API-ONLY SERVICE
app.get('/favicon.ico', (req, res) => {
    res.status(204);
});

// THESE ROUTES ARE OUR KEY API ROUTES
const routes = require('./routes/routes.js');
app.use('/', routes);



module.exports = app;
