import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

const dbConnect=async () =>{
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
        console.log("Mongo Db Connected")
    } catch (error) {
        console.log(error,"Mongo DB Connection Failed")
        throw error
    }
}

export default dbConnect;