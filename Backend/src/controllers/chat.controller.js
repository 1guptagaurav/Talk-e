import { asyncHandler } from "../utils/AsyncHandler.js";
import {Chat} from "../models/chat.model.js"
import { ApiError } from "../utils/ApiError.js";
export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if(!userId){
    return res.sendStatus(400)
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: req.userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "fullname pic email",
  });

  if(isChat>0){
    res.send(isChat[0]);
  }else{
    var chatData={
      chatName:'sender',
      isGroupChat:false,
      users:[req.user._id,userId]
    }
  }
  try{
    const createdChat= await Chat.create(chatData)
    const fullChat=await Chat.findOne({id:createdChat._id}).populate(
      "users","-password"
    ).lean()
    res.status(200).send(fullChat)
  }catch{
    res.status(400)
    throw new Error(error.message);
  }

});


export const fetchChats=asyncHandler(async(req,res)=>{
  try {
    Chat.find({ users: { $elemMatch: req.user._id } })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin","-password")
      .sort({updatedAt:-1})
      .then(async(results)=>{
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "fullname pic email",
        });
      })
  } catch (error) {
    throw new ApiError(401,"Unauthorized Access")
  }
})

export const groupChat=asyncHandler(async(req,res)=>{
  const {users,fullname}=req.body
  if(!users || !fullname){
    return req.status(401).send({message:"Please Select All the fields"})
  }
})