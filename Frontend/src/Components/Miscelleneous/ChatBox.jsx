import { Tooltip,Button,Box } from '@chakra-ui/react';
import React, { useState } from 'react'
import useChat from '../../Context/ContextApi';
import SingleChat from './SingleChat';

function ChatBox() {

  const { selectedChats } = useChat();
  return (
    <Box 
    display={{base:selectedChats?"flex":"none",md:"flex"}}

    flexDir={"column"}
    p={3}
    bg={"white"}
    w={{base:"100%",md:"68%"}}
    borderRadius={"lg"}
    borderWidth={"1px"}
    > 
        <SingleChat/>
    </Box>
  );
}

export default ChatBox