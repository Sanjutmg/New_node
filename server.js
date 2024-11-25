const express = require('express')
const app = express();

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

//or
//import router from "./routes/userRoutes.js";

require('dotenv').config();
const db = require('./db');



const bodyParser = require('body-parser');
app.use(bodyParser.json());

////use the routes
app.use("/user",userRoutes);
app.use("/blog",blogRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`listening on port 4000`);
})