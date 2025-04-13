import express from "express"
import { db } from "./db/db.js"
import cors from "cors"
import dotenv from "dotenv"
import postRoutes from "./routes/post.routes.js"

dotenv.config()


db()

const app = express()
app.use(express.json())
app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      credentials: true,
    })
  );

app.use("/api",postRoutes)
  
const PORT = process.env.PORT



app.listen(PORT,()=>{
    console.log(`server runing on ${PORT} `)
})