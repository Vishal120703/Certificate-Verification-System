const mongoose = require("mongoose")
const certificateSchema = new mongoose.Schema({
    certificateId :{
        type:String,
        require:true,
        unique:true
    },
    studentName:{
        type:String,
        required:true
    },
    studentEmail:{
        type:String,
    },
    internshipDomain:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    issuedBy:{
        type:mongoose.Schema.Types.ObjectId,
        red:"User"
    }
},{timestamps:true}
)
module.exports = mongoose.model("Certificate",certificateSchema)