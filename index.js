//Set up dotenv
const dotenv = require('dotenv');
dotenv.config();

//Setup CORS 
const cors = require("cors");


//Set up Express server
const express = require('express');
const app = express();


// Autorise cross-origin requests
app.use(cors({ // Ce middleware ajoute un header "Access-Control-Allow-Origin: "...." à la réponse que Express renvoie au client !
    origin: "*", // Ici, pour ne pas s'embêter, et parce qu'on a pas de donner sensible, je vous propose d'autoriser TOUS les domaines à accéder à notre API. Techniquement, il faudrait juste autoriser notre front ! 
}));

// Body parser to provide res in JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser pour les body de format application/x-www-urlencoded

//Use router TO point on index.js in router
const router = require('./router');
app.use('/api' , router);




// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin' , '*');
//     res.setHeader('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods' , 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

//server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening @ http://localhost:${port} ...`);
});