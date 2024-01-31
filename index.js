//Set up dotenv
const dotenv = require('dotenv');
dotenv.config();

//Setup CORS 
const cors = require("cors");


//Set up Express server
const express = require('express');
const app = express();


// Authorize cross-origin requests
app.use(cors({ 
    origin: "*", 
}));

// Body parser to provide res in JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser for  application/x-www-urlencoded

//Use router TO point on index.js in router
const router = require('./router');
app.use('/api' , router);


//server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening @ http://localhost:${port} ...`);
});