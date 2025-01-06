import dotenv from "dotenv";
import dbConnect from "./db/index.js";
import { server,app } from "./app.js";

dotenv.config({
  path: "./env",
});

dbConnect().then(() => {
  
  server.listen(process.env.PORT, () => {
    console.log(`App successfully started on port ${process.env.PORT}`);
  });
  
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
});
