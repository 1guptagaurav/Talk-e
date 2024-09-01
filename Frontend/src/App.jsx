import { useState ,useEffect} from "react";
import { CloseButton } from "@chakra-ui/react";
import "./App.css";
import { Route,Routes, useNavigate } from "react-router-dom";
import { HomePage } from "./Pages/Homepage.jsx";
import { ChatProvider } from "./Context/ContextApi.jsx";
import {ChatPage} from "./Pages/ChatPage.jsx";
function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate(); 
  const setUservalue=(user)=>{
    setUser(user)
    return user;
  }
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo)
    if (!userInfo) navigate("/");
  }, [navigate]);
  return (
    <ChatProvider value={{ user, setUservalue }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </div>
    </ChatProvider>
  );
}

export default App;
