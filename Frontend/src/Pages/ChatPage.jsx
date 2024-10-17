import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import SideBar from "../Components/Miscelleneous/SideBar";
import ChatBox from "../Components/Miscelleneous/ChatBox";
import MyChats from "../Components/Miscelleneous/MyChats";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { socket } from "../socket/socket";

function ChatPage() {
  const navigate = useNavigate();
  const currUser = localStorage.getItem("user");
  const user = JSON.parse(currUser);
  const [connectSocketed, setConnectSocketed] = useState(false);


  const connectSocket = () => {
    // Emit after socket listener is setup
    socket.emit("inqueue", user._id);
  };

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user")); // Assuming "user" is stored in JSON format

    if (currUser && currUser._id) {
      console.log("hi there, I am Gaurav Gupta");

      // Set up the socket listener when the component mounts
      socket.on("ac", (val) => {
        console.log(
          "Socket connected successfully for user with ID:",
          currUser._id
        );
      });

      // Call the function to connect the socket and emit "inqueue"
      connectSocket();

      // Clean up the socket listener when the component unmounts
      return () => {
        socket.off("ac"); // Remove the listener to avoid memory leaks
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount


  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
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
