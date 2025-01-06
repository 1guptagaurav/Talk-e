import React, { useEffect, useState, useMemo } from "react";
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
import { io } from "socket.io-client";

function SingleChat() {
  const { fetchAgain, setFetchAgain, user, selectedChats, setSelectedChats } =
    useChat();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  // Initialize socket
  const socket = useMemo(
    () => io("http://localhost:8000", { withCredentials: true }),
    []
  );

  // Fetch messages for the selected chat
  const fetchMessages = async () => {
    if (!selectedChats?._id) return;

    try {
      const config = { withCredentials: true };
      const { data } = await axios.get(
        `http://localhost:8000/api/message/${selectedChats._id}`,
        config
      );
      setMessages(data);
    } catch (error) {
      toast({
        title: "Unable to fetch chat",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  // Join the selected chat room
  useEffect(() => {
    if (selectedChats?._id) {
      const room = selectedChats._id;
      socket.emit("join-room", room);
      console.log(`Joined room: ${room}`);
      fetchMessages();
    }

    return () => {
      if (selectedChats?._id) {
        const room = selectedChats._id;
        socket.emit("leave-room", room);
        console.log(`Left room: ${room}`);
      }
    };
  }, [selectedChats, socket]);

  // Handle incoming messages via socket
  useEffect(() => {
    const handleNewMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("recieve-message", handleNewMessage);

    return () => {
      socket.off("recieve-message", handleNewMessage);
    };
  }, [socket]);

  // Handle sending a message
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage.trim() && selectedChats?._id) {
      try {
        const config = {
          headers: { "content-type": "application/json" },
          withCredentials: true,
        };
        const messageContent = {
          messageToSend: newMessage,
          chatId: selectedChats._id,
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:8000/api/message",
          messageContent,
          config
        );

        const room = selectedChats._id;
        socket.emit("message", { room, data });
        setMessages((prev) => [...prev, data]);
      } catch (error) {
        console.error(error);
        toast({
          title: "Unable to send message",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  };

  // Input change handler
  const handleInputChange = (e) => setNewMessage(e.target.value);

  // Render chat UI
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
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChats(null)}
            />
            {selectedChats.isGroupChat ? (
              <>
                {selectedChats.chatName.toUpperCase()}
                <UpdateGroupChatModal fetchMessages={fetchMessages} />
              </>
            ) : (
              <>
                {selectedChats.users.find((u) => u.fullname !== user.fullname)
                  ?.fullname || "Unknown User"}
                <ProfileModal />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="70vh"
            borderRadius="lg"
            overflow="hidden"
          >
            <div className="messages">
              <ScrollableChats messages={messages} />
            </div>
          </Box>
          <FormControl onKeyDown={sendMessage} isRequired mt={3}>
            <Input
              variant="filled"
              bg="#E0E0E0"
              placeholder="Enter a message..."
              onChange={handleInputChange}
              value={newMessage}
            />
          </FormControl>
        </div>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </div>
  );
}

export default SingleChat;
