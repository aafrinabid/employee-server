const mongoose = require("mongoose");
const Schema=mongoose.Schema

const EmployeeSchema = new Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:String,
    gender:String,
    status:String,
    image:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model("Employee", EmployeeSchema)