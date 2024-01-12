//Set up dotenv
const dotenv = require('dotenv');
dotenv.config();

//Set up Express server
const express = require('express');
const app = express();

// Body parser to provide res in JSON format
app.use(express.json());

//Use router TO point on index.js in router
const router = require('./router');
app.use('/api' , router);

//server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening @ http://localhost:${port} ...`);
});