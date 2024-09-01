import { useState ,useEffect} from "react";
import { CloseButton } from "@chakra-ui/react";
import "./App.css";
import { Route, useNavigate } from "react-router-dom";
import { HomePage } from "./Pages/Homepage.jsx";
import { ChatProvider } from "./Context/ContextApi.jsx";
function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate(); 

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) navigate("/");
  }, [navigate]);

  return (
    <ChatProvider value={{ user, setUser }}>
      <div className="App">
        <HomePage />
      </div>
    </ChatProvider>
  );
}

export default App;
