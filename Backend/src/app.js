import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter  from "./routes/user.routes.js"
import chatRouter from "./routes/chat.routes.js"
import messageRouter from "./routes/message.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app=express()
const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    credentials:true
  }
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    console.log(`Socket ${socket.id} left room ${room}`);
  });

  socket.on("message", ({ room, data }) => {
    console.log(`Message to room ${room}:`, data);
    socket.to(room).emit("recieve-message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});


export {app,server}