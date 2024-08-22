import dotenv from "dotenv"
import dbConnect from "./db/index.js"

import {app} from "./app.js"
dotenv.config({
    path:'./env'
})

dbConnect()
.then(() =>{
    app.listen(process.env.PORT,()=>{
        console.log(`App Successfully started on port ${process.env.PORT}`);
    })
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
})
.catch((err)=>{
    console.log("MongoDB connect failed!!!", err);
})