import dotenv from "dotenv";
import dbConnect from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({
  path: "./env",
});

dbConnect().then(() => {
  const server = createServer(app);

  server.listen(process.env.PORT, () => {
    console.log(`App successfully started on port ${process.env.PORT}`);
  });

  // Set up the route
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("inqueue", (userId) => {
      console.log("user connected with Id: ", userId);
      socket.join(userId);
      socket.to(userId).emit("ac", { connected: true });
    });

    socket.on("send message", (message) => {
      console.log("message recieved at backend",message);
      // message?.senders.forEach((senderId) => {
      //   if (userId!==senderId && senderId && io.sockets.adapter.rooms.has(senderId)) {
      //     console.log('message send to user who is currently online',senderId);
      //     socket.to(senderId).emit("recieve message", message);
      //   }
      // });
    });
  });

  // {
  //   userId:"",
  //   senderId:"",
  //   payload:""
  // }

  // Initialize socket.io
  // const io = new Server(server, {
  //   pingTimeout: 60000,
  //   cors: {
  //     origin: "http://localhost:5173",
  //   },
  // });
  // io.on("connection", (socket) => {
  //   console.log("Connected to socket.io");
  //   socket.on("setup", (userData) => {
  //     socket.join(userData);
  //     // console.log(userData._id);
  //     socket.emit("connected");
  //   });
  //   socket.on("user chat", (room) => {
  //     socket.join(room);
  //     // console.log("user joined room ", room);
  //   });
  //   socket.on("new message", (newMessageRecieved) => {
  //     var chat = newMessageRecieved.chat;
  //     if (!chat.users) return;
  //     chat.users.forEach((user) => {
  //       console.log(newMessageRecieved);
  //       if (user._id == newMessageRecieved.sender._id) return;
  //       socket.in(user._id).emit("message recieved", newMessageRecieved);
  //     });
  //   });
  // Handle disconnection
  //   socket.on("disconnect", () => {
  //     console.log("User disconnected");
  //   });
  //   });
  // })
  // .catch((err) => {
  //   console.log("MongoDB connection failed!", err);
});
