import { createContext,useContext, useState } from "react";


export const ChatContext = createContext({
  user: null,
  setUservalue: () => {},
});

export const ChatProvider=ChatContext.Provider

export default function useChat() {
  return useContext(ChatContext);
}