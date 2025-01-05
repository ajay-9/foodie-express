// express server framework - helps in settiong up server and passing configurations
//This initializes an instance of the Express application (app) that will be used to define routes, middleware, and server behavior.
const express = require("express");
// bosy parser to parse the req and create body.request when we make API calls, we want 
//want requests from calls made from clients
const bodyParser = require('body-parser');
// cors (cross-origin-resourse-sharing) - to help in determining which configurations/domains can make calls to our server
// Determines which origins (domains) can make requests to your server.
// Prevents security errors when APIs are accessed from different domains.
const cors = require('cors');

const db = require('./db');

const app = express(); // setting up the connection

const productRouter = require('./routes/productRouter');
var corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Food Ordering"});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/', productRouter);