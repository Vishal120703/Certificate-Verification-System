const Certificate = require("../models/certificate.model")
const User = require("../models/user.model")

exports.getUsers = async(req,res)=>{
    try{
        const user =await User.find({role:"admin"});
        return res.status(200).json({data:user})

    }
    catch{
        return res.status(500).json({msg:"something went wrong"})
    }
}
exports.getAllCertificates = async(req,res)=>{

    try{
        const allCertificates = await Certificate.find();
        return res.status(200).json({data:allCertificates});
    }
    catch{
        return res.status(500).json({msg:"Something went wrong"})
    }
}