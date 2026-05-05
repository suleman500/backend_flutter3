const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 3000;
const userModel = require("./model/user_model");
const userRoute=require('./routers/user_route');
require('dotenv').config();


// connect to database
connectDB();
 
app.ususerRoutee('/api',userRoute);

app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});