const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    email:{type:String,required:true,lowercase:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["super_admin","admin","student"],default:"admin"},
    isVerified: {type: Boolean,default: true},
    otp: {type: String},
    otpExpires: {type: Date}
},{timestamps:true})
module.exports = mongoose.model("user",userSchema);