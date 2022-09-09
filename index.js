require('dotenv').config()
const express=require('express');
const {v4:uuidv4}=require('uuid');
const mongoose=require('mongoose');
const cors= require('cors')
const app=express()
const employeeModel = require('./models/employeeModel')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connected with mongodatabase')
});


app.listen(4000,()=>{
    console.log('running on 4000')
})
