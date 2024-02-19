const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./database/db");
const userRouter = require("./routes/userRoute");
const app = express();


dotenv.config({path: path.join(__dirname, "config/config.env")})
app.use(cors());
app.use(express.json());
connectDB();


app.use("/api", userRouter);

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server Running on PORT ${process.env.PORT || 5000}`);
})