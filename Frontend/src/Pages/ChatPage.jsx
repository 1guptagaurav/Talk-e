import axios from "axios";
import React, { useEffect, useState } from "react";
import useChat from "../Context/ContextApi";
import { Box } from "@chakra-ui/react";
import SideBar from "../Components/Miscelleneous/SideBar";
import ChatBox from "../Components/Miscelleneous/ChatBox";
import MyChats from "../Components/Miscelleneous/MyChats";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  return (
    <div style={{ width: "100%" }}>
      { user && < SideBar />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        h={"91.5vh"}
        p={"10px"}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}

export { ChatPage };
