const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./database/db");
const userRouter = require("./routes/userRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const linksRouter = require("./routes/linksRoute");
const app = express();

// Handling uncaught Exception
process.on("uncaughtException",err=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the Server due to uncaught exception`);
    process.exit(1);
})

dotenv.config({path: path.join(__dirname, "config/config.env")})
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api", userRouter);
app.use("/api", linksRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server Running on PORT ${process.env.PORT || 5000}`);
})

// Unhandled Promise Rejection Error
process.on("unhandledRejection", err=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting Down the Server due to Unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1);
    })
})