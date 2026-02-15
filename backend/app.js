const express = require("express")
const app = express()
require('dotenv').config()
const port = process.env.PORT||3000
const {connectDB} = require("./config/db")
connectDB();

const authRouter = require("./router/authRouter")
app.use("/api/User",authRouter)


app.listen(port,()=>{
    console.log(`The server is Running on port : ${port}`);
})



