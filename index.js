//Set up dotenv
const dotenv = require('dotenv');
dotenv.config();

//Set up Express server
const express = require('express');
const app = express();

// Body parser to provide res in JSON format
app.use(express.json());

//Use router
const router = require('./router/main.router');
app.use('/api' , router);

//server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening @ http://localhost:${port} ...`);
});