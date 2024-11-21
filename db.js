const mongoose = require('mongoose');

const MongoURL = process.env.MONGODB_URL;
mongoose.connect(MongoURL)
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.error('Cound not connect to MongoDb:',err));