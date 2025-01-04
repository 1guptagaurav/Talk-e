import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import SideBar from "../Components/Miscelleneous/SideBar";
import ChatBox from "../Components/Miscelleneous/ChatBox";
import MyChats from "../Components/Miscelleneous/MyChats";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const navigate = useNavigate();
  const currUser = localStorage.getItem("user");
  const user = JSON.parse(currUser);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        h={"90vh"}
        p={"10px"}
        overflowY={'hidden'}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}

export { ChatPage };
