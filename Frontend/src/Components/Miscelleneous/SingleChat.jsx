import React, { useEffect, useState,useMemo } from "react";
import useChat from "../../Context/ContextApi";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import UpateGroupChatModal from "./UpateGroupChatModal";
import axios from "axios";
import "./styles.css";
import ScrollableChats from "./ScrollableChats";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";

function SingleChat() {
  const { fetchAgain, setFetchAgain, user, selectedChats, setSelectedChats } =
    useChat();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  // const [room,setRoom]=useState([]);
  const navigate=useNavigate()
  const toast = useToast();
  const fetchMessages = async (e) => {
    if (!selectedChats || !selectedChats._id) return;
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/message/${selectedChats._id}`,
        config
      );
      setMessages(data);
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
  useEffect(() => {
    fetchMessages();
    // selectedChatCompare = selectedChats;
  }, [selectedChats]);
  // const socket = useMemo(
  //   () =>
  //     io("http://localhost:8000", {
  //       withCredentials: true,
  //     }),
  //   []
  // );
// useEffect(() => {
//   // console.log(room);
//   socket.on("connect", () => {
//     console.log(`connected`);
//   });
//   socket.on("hello", (e) => {
//     console.log(e);
//   });
  
//   return () => {
//     socket.disconnect();
//   };
// }, []);
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
        // console.log(`message send ${newMessage}`)
        const { data } = await axios.post(
          "http://localhost:8000/api/message",
          {
            messageToSend: newMessage,
            chatId: selectedChats._id,
          },
          config
        );
        // socket.emit("join-room", room);
        // socket.emit("message", { room, data });
        // socket.on("recieve-message", (data) => {
        //   console.log("i am inside recieve messages");
        //   setMessages([...messages, data]);
        // });
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "unable to send message",
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
        <div>
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
              <>
                <Text as="span" fontSize={{ base: "10px", smm: "30px" }}>
                  {selectedChats.users[0] === user._id
                    ? selectedChats.users[1].fullname
                    : selectedChats.users[0].fullname}
                </Text>
                {<ProfileModal />}
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            p={3}
            bg={"#E8E8E8"}
            w="100%"
            h="70vh"
            borderRadius={"lg"}
            overflow={"hidden"}
          >
            <div className="messages">
              <ScrollableChats messages={messages} />
            </div>
          </Box>
          <div>
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant={"filled"}
                bg={"#E0E0E0"}
                placeholder="Enter a message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </div>
        </div>
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