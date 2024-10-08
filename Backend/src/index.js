import dotenv from "dotenv";
import dbConnect from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({
  path: "./env",
});

dbConnect()
  .then(() => {
    const server = createServer(app);

    server.listen(process.env.PORT, () => {
      console.log(`App successfully started on port ${process.env.PORT}`);
    });

    // Set up the route
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // Initialize socket.io
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:5173",
      },
    });
    io.on("connection", (socket) => {
      console.log("Connected to socket.io");
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
      });
      socket.on("user chat", (room) => {
        socket.join(room);
        console.log("user joined room ", room);
      });
      // Handle disconnection
      //   socket.on("disconnect", () => {
      //     console.log("User disconnected");
      //   });
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err);
  });
