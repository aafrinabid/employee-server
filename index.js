require('dotenv').config()
const express=require('express');
const {v4:uuidv4}=require('uuid');
const mongoose=require('mongoose');
const cors= require('cors')
const app=express()
const employeeModel = require('./models/employeeModel');
const { findByIdAndDelete } = require('./models/employeeModel');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connected with mongodatabase')
});

app.post('/getEmployees',async(req,res)=>{
    const employee= await employeeModel.find({}).sort({name:1})
    console.log(employee)
    res.json({result:employee})
})

app.post('/addEmployee',async(req,res)=>{
  try{  
    console.log(req.body)
    const employee= new employeeModel(req.body)
    await employee.save();
    res.json({success:true})
}catch(e){
    console.log(e)
}
})

app.post('/editEmployee',async(req,res)=>{
try{
    const data=req.body.data
    console.log(data.name)
const id=req.body.id
console.log(id)
const employee =await employeeModel.findByIdAndUpdate(id,data)
await employee.save();
// console.log(employee)
res.json(employee)
}
catch(e){
    console.log(e)
}
})

app.post('/deleteEmployee',async(req,res)=>{
    try{
        console.log(req.body)
        const id=req.body.id
        const employee= await employeeModel.findByIdAndDelete(id)
        res.json(true)

    }catch(e){
        console.log(e)
    }
})

app.listen(4000,()=>{
    console.log('running on 4000')
})
