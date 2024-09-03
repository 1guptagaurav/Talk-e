import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user,setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export default function useChat() {
  return useContext(ChatContext);
}
