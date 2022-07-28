const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connection successful"))
.catch((error)=>console.log(error.message));

app.use(express.json());

app.use('/',authRoute);
app.use('/edit',userRoute);

app.listen(8800, ()=>{
  console.log("Server running")
});