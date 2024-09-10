import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);
  const [selectedChats, setSelectedChats] = useState();
  const [fetchAgain, setFetchAgain] = useState()
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);
    if (!userInfo) navigate("/");
    else navigate("/chats ")
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        selectedChats,
        setSelectedChats,
        fetchAgain,
        setFetchAgain,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default function useChat() {
  return useContext(ChatContext);
}
