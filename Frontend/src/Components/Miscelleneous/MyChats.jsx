import React, { useEffect, useMemo, useState } from "react";
import useChat from "../../Context/ContextApi";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { json } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { Chat } from "../../../../Backend/src/models/chat.model";
import GroupChatModal from "./GroupChatModal";
import { useNavigate } from "react-router-dom";


function MyChats() {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChats, setSelectedChats, chats, setChats, fetchAgain } = useChat();
  const toast = useToast();
  const navigate = useNavigate(); 
  const fetchChats = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      await axios
        .get("http://localhost:8000/api/chat", config)
        .then((data) => setChats(data.data));
    } catch (error) {
      toast({
        title: "Unexpected Error Occured",
        description: error.message,
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "top-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
  }, [fetchAgain]);

  
  return (
    <Box
      display={{ base: selectedChats ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems={"center"}
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        MyChats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            Add to Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg="#F8F8F8"
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hideen"}
      >
        <Stack overflowY="scroll">
          {chats.map((chat) => (
            <Box
              onClick={() => setSelectedChats(chat)}
              cursor={"pointer"}
              bg={selectedChats === chat ? "#38B2AC" : "#E8E8E8"}
              px={3}
              py={2}
              borderRadius={"lg"}
              key={chat._id}
              color={selectedChats === chat ? "white" : "black"}
            >
              <Text>
                {!chat.isGroupChat ? chat.users[0].fullname===user.fullname?chat.users[1].fullname:chat.users[0].fullname : chat.chatName}
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default MyChats;
