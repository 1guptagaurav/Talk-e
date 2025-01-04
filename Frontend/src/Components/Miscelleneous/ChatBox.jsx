import { Tooltip,Button,Box } from '@chakra-ui/react';
import React, { useState } from 'react'
import useChat from '../../Context/ContextApi';
import SingleChat from './SingleChat';

function ChatBox() {

  const { selectedChats } = useChat();
  return (
    <Box
      display={{ base: selectedChats ? "flex" : "none", md: "flex" }}
      // alignItems="center"
      flexDir={"column"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "68%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
      h={'full'}
    >
      <SingleChat />
    </Box>
  );
}

export default ChatBox