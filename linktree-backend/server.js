const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./database/db");
const app = express();


dotenv.config({path: path.join(__dirname, "config/config.env")})
connectDB();

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server Running on PORT ${process.env.PORT || 5000}`);
})