import React from "react";
import useChat from "../../Context/ContextApi";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";

function SingleChat() {
  const { fetchAgain, setFetchAgain, user, selectedChats, setSelectedChats } =useChat();
  return (
    <div>
      {selectedChats ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChats()}
            />
            {selectedChats.isGroupChat ? (
              <>
              {(selectedChats.chatName.toUpperCase())}
              {/* <UpateGroupChatModal /> */}
              </>
            ) : (
              <>{
                <ProfileModal/>
              }</>
            )}
          </Text>
          <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"flex-end"}
          p={3}
          bg={"#E8E8E8"}
          w="600%"
          h="900%"
          borderRadius={"lg"}
          overflowY={"hidden"}
          >
            
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize={"3xl"} pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </div>
  );
}

export default SingleChat;
