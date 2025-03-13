import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js"

dotenv.config();
connectDB();
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))

app.use("/api/books",bookRoutes)

// app.get('/',(req,res)=>{
//     res.send('server connected')
// })

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`)
})