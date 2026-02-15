const mongoose = require("mongoose");
const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log("connected")

    }
    catch{
        console.log("database is not connected")
    }
}

module.exports = {connectDB}