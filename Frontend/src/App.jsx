import { useState ,useEffect} from "react";
import { CloseButton } from "@chakra-ui/react";
import "./App.css";
import { Route,Routes, useNavigate } from "react-router-dom";
import { HomePage } from "./Pages/Homepage.jsx";
import { ChatProvider } from "./Context/ContextApi.jsx";
import {ChatPage} from "./Pages/ChatPage.jsx";
function App() {
  const [user, setUser] =useState()
  
  return (
    <ChatProvider>
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
