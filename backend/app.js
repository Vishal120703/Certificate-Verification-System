const express = require("express")
const app = express()
require('dotenv').config()
const port = process.env.PORT||3000
const {connectDB} = require("./config/db")
const cookieParser = require("cookie-parser")
const cors = require("cors")
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173",credentials: true}));

const authRouter = require("./router/authRouter")
const certificateRouter = require("./router/certificateRouter")
app.use("/api/User",authRouter);
app.use("/api/User/certificate",certificateRouter);


app.listen(port,()=>{
    console.log(`The server is Running on port : ${port}`);
})



