import { createContext,useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ChatContext = createContext({
  user: null,
  setUser: () => {},
});

export const ChatProvider=ChatContext.Provider

export default function useChat(){
    return useContext(ChatContext)
}