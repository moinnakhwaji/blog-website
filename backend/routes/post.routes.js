import express from "express"
import { checkapi, createpost, deletepost, getallPost, getonePost, getUserpost, updatePost } from "../controllers/postcontrollers.js"

const app = express.Router()

app.post("/create",createpost)
app.get("/check",checkapi)
app.get("/getall",getallPost)
app.get("/userpost/:clerkid",getUserpost)
app.get("/singlepost/:id",getonePost)
app.delete("/delete/:id", deletepost);
app.put('/update/:id', updatePost);

export default app