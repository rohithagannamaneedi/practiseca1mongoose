const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
},
{timestamps:true});

const userSchema = mongoose.model("user",schema);
module.exports = userSchema;