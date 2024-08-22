import mongoose, { Schema } from "mongoose"

const messageSchema=new mongoose.Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:"Chat"
    }
},{timestamps:true})


export default Message=mongoose.model("Message",messageSchema)