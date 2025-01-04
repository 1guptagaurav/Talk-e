import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";



export const sendMessage=asyncHandler(async(req,res)=>{
    const {messageToSend,chatId}=req.body
    if(!messageToSend || !chatId){
        throw new ApiError(401,"Something went wrong")
        return;
    }
    var newMessage={
        sender:req.user._id,
        content:messageToSend,
        chat:chatId
    }
    try {
        var message=await Message.create(newMessage)
        message=await message.populate("sender","fullname pic")
        message=await message.populate("chat")
        message=await User.populate(message,{
            path:"chat.users",
            select:"fullname pic email"
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })
        res.json(message)
    } catch (error) {
        res.status(400)
        throw new ApiError(400,error.message)
    }
})

export const allMessages=asyncHandler(async(req,res)=>{
    try {
        const messages=await Message.find({chat:req.params.chatId}).populate("sender","name pic email")
        .populate("chat")
        res.json(messages)
    } catch (error) {
        res.send(400)
        throw new ApiError(400,error.message)
    }
})