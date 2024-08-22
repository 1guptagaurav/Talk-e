import mongoose, { mongo } from "mongoose"

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    isGroupAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


export default Chat= mongoose.model("Chat",chatSchema)