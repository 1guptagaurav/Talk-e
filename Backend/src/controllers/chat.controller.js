import { asyncHandler } from "../utils/AsyncHandler.js";
import {Chat} from "../models/chat.model.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";



export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if(!userId){
    return res.sendStatus(400)
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId._id } } },
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
    Chat.find({ users: { $elemMatch: {$eq:req.user._id} } })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin","-password")
      .sort({updatedAt:-1})
      .then(async(results)=>{
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "fullname pic email",
        });
        res.status(200).send(results);
      })
  } catch (error) {
    throw new ApiError(401,"Unauthorized Access")
  }
})

export const createGroupChat=asyncHandler(async(req,res)=>{
  if (!req.body.users || !req.body.name) {
    return res.status(401).send({ message: "Please Select All the fields" });
  }
  var users=JSON.parse(req.body.users)
  if(users.length<2){
    return res.status(401).send("more Users Required")
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChatName = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin","-password");
      res.status(200).json(fullGroupChatName);
  } catch (error) {
    res.status(400)
    throw new ApiError(401,error.message)
  }
})

export const renameGroupName=asyncHandler(async(req,res)=>{
  const {chatId,chatName}=req.body
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin","-password");
    if(!updatedChat){
      res.status(400)
      throw new Error("Chat Not found")
    }else{
      res.status(200).json(updatedChat)
    }
})

export const addNewUser=asyncHandler(async(req,res)=>{
  const {chatId,userId}=req.body
  const addToGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!addToGroup) {
    res.status(400);
    throw new Error("Chat Not found");
  } else {
    res.status(200).json(addToGroup);
  }
})

export const removeUser = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const removeFromGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removeFromGroup) {
    res.status(400);
    throw new Error("Chat Not found");
  } else {
    res.status(200).json(removeFromGroup);
  }
});