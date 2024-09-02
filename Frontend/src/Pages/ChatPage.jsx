import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useChat from "../Context/ContextApi"
import {Box, Flex} from "@chakra-ui/react"
import SideBar from '../Components/Miscelleneous/SideBar'
import ChatBox from '../Components/ChatBox'
import MyChats from '../Components/MyChats'
import { useNavigate } from 'react-router-dom'

function ChatPage() {
  const navigate=useNavigate()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) navigate("/");
  }, [navigate]);
  const {user}=useChat()
  console.log(user)
  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box
      display={'flex'}
      justifyContent={'space-between'}
      width={'100%'}
      h={'91.5vh'}
      p={'10px'}
      >
        {user && <ChatBox />}
        {user && <MyChats />}
      </Box>
    </div>
  );
}

export {ChatPage}