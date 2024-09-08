import {
  Tooltip,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  DrawerHeader,
  Input,
  position,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import useChat from "../../Context/ContextApi";
import { Avatar } from "@chakra-ui/react";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserListitem from "../UserAvatar/UserListitem";
function SideBar() {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setSelectedChats, chats, setChats } = useChat();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) navigate("/");
  // }, [navigate]);

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      };

      await axios
        .post("http://localhost:8000/api/chat", { userId }, config)
        .then((data) => setSelectedChats(data));
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setLoadingChat(false);
      onClose();
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

  const logouthandler = async () => {
    await axios.post(
      "http://localhost:8000/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    localStorage.removeItem("user");
    navigate("/");
  };
  const submitHandler = () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    setLoading(true);
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${user}`,
    //   },
    // }
    axios
      .get(`http://localhost:8000/api/user?search=${search}`, {
        withCredentials: true,
      })
      .then((response) => setResult(response.data));
    setLoading(false);
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button varient="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Walk-e-Talk-e
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.fullname}
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem> My Profile </MenuItem>
              </ProfileModal>
              <MenuItem onClick={logouthandler}> Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={submitHandler}>Go</Button>
            </Box>
            <span>
              {result.map((user) => (
                <UserListitem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))}
            </span>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideBar;
