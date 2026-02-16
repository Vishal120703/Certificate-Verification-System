const express = require("express")
const app = express()
require('dotenv').config()
const port = process.env.PORT||3000
const {connectDB} = require("./config/db")
const cookieParser = require("cookie-parser")
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRouter = require("./router/authRouter")
app.use("/api/User",authRouter)


app.listen(port,()=>{
    console.log(`The server is Running on port : ${port}`);
})



