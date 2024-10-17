import React, { useEffect, useState } from "react";
import useChat from "../../Context/ContextApi";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import UpateGroupChatModal from "./UpateGroupChatModal";
import axios from "axios";
import "./styles.css";
import ScrollableChats from "./ScrollableChats";
import io from "socket.io-client";
import { socket } from "../../socket/socket";

const ENDPOINT = "http://localhost:8000";
function SingleChat() {
  const { fetchAgain, setFetchAgain, user, selectedChats, setSelectedChats } =
    useChat();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();
  console.log("selectedcha", selectedChats);
  const fetchMessages = async (e) => {
    if (!selectedChats) return;
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/message/${selectedChats._id}`,
        config
      );
      setMessages(data);
      // socket.emit("user chat", selectedChats._id);
      
    } catch (error) {
      toast({
        title: "unable to fetch chat",
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "top-left",
      });
    }
  };
  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connected", () => {
  //     setSocketConnected(true);
  //   });
  // },[]);
  useEffect(() => {
    fetchMessages();
    // selectedChatCompare = selectedChats;
  }, [selectedChats]);
  // useEffect(() => {
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessageRecieved.chat._id
  //     ) {
  //     } else {
  //       setMessages([...messages, newMessageRecieved]);
  //     }
  //   });
  // });
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
          withCredentials: true,
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:8000/api/message",
          {
            messageToSend: newMessage,
            chatId: selectedChats._id,
          },
          config
        );
        // socket.emit("new message", data);
        setMessages([...messages, data]);

        console.log(
          "sending message to another user",
          user._id,
          selectedChats.users,
          data
        );

        socket.emit("send message", {
          userId: user._id,
          senders: selectedChats.users,
          payload: data,
        });

      } catch (error) {
        console.log('error while sending message',error);
        toast({
          title: "unable to fetch chat",
          status: "warning",
          duration: "4000",
          isClosable: true,
          position: "top-left",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
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
                {selectedChats.chatName.toUpperCase()}
                <UpateGroupChatModal fetchMessages={fetchMessages} />
              </>
            ) : (
              <>{<ProfileModal />}</>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-start"}
            p={3}
            bg={"#E8E8E8"}
            w="100%"
            h="600%"
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf={"center"}
                margin={"auto"}
              />
            ) : (
              <div className="messages">
                <ScrollableChats messages={messages} />
              </div>
            )}
            <div>
              <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                <Input
                  variant={"filled"}
                  bg={"#E0E0E0"}
                  placeholder="Enter a message... "
                  onChange={typingHandler}
                  value={newMessage}
                />
              </FormControl>
            </div>
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
