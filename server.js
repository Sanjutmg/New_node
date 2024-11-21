const express = require('express')
const app = express();
require('dotenv').config();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`listening on port 4000`);
})