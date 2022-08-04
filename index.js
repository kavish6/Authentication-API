const express= require('express');
const app =express();
const mongoose= require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const user=require('./routes/User');
const recipes=require('./routes/Recipe');
const cookieParser = require('cookie-parser');
var cors=require('cors');
require('dotenv').config();
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const port=process.env.PORT || 5000;
const uri=`${process.env.MONGODB_CONNECTION_STRING}`;
mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser: true,});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection established successfully')
})

app.use("/recipe",recipes);
app.use("/user",user);
app.listen(port,()=>{
    console.log(`server listening on port: ${port}`);
});
