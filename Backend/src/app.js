import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter  from "./routes/user.routes.js"
import chatRouter from "./routes/chat.routes.js"
const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);


export {app}