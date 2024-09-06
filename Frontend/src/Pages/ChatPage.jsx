import axios from "axios";
import React, { useEffect, useState } from "react";
import useChat from "../Context/ContextApi";
import { Box } from "@chakra-ui/react";
import SideBar from "../Components/Miscelleneous/SideBar";
import ChatBox from "../Components/Miscelleneous/ChatBox";
import MyChats from "../Components/Miscelleneous/MyChats";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const navigate = useNavigate();
   useEffect(() => {
     const user = localStorage.getItem("user");
     if (!user) {
       navigate("/");
     } else {
       setIsUserLoaded(true); // User is found, allow rendering
     }
   }, [navigate]);
  if (!isUserLoaded) {
    return null; // Prevent rendering until user is checked
  }
  return (
    <div style={{ width: "100%" }}>
      { < SideBar />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        h={"91.5vh"}
        p={"10px"}
      >
        {<ChatBox />}
        {<MyChats />}
      </Box>
    </div>
  );
}

export { ChatPage };
