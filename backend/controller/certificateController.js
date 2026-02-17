const Certificate = require("../models/certificate.model")
exports.createCertificate = async(req,res)=>{
    try{
    const {certificateId,studentName,studentEmail,internshipDomain,startDate,endDate} = req.body;
    if(!certificateId ||!studentName||!internshipDomain||!startDate||!endDate){
        return res.status(400).json({msg:"Please fill all the required feilds."})
    }
    const newCertificate = new Certificate({
        certificateId,
        studentName,
        studentEmail,
        internshipDomain,
        startDate,
        endDate
    })
    await newCertificate.save();
    return res.status(201).json({msg:"Certificate created"})
}
catch{
    return res.status(500).json({msg:"Something went Wrong."})
}
}
exports.verifyCertificate = async(req,res) =>{
    try{
        const {certificateId} = req.params;
        const certificate = await Certificate.findOne({certificateId});
        if(!certificate){
            return res.status(404).json({msg:"not found",certificate})
        }
        return res.status(200).json({msg:"found"})

    }
    catch{
        return res.status(500).json({msg:"Something went Wrong in verification."})
    }
}