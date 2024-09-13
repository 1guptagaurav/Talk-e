import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useChat from "../../Context/ContextApi";
import UserBadgeItems from "../UserAvatar/UserBadgeItems";
import axios from "axios";
import UserListitem from "../UserAvatar/UserListitem";

function UpateGroupChatModal({fetchMessages}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, selectedChats, setSelectedChats, fetchAgain, setFetchAgain } =
    useChat();
  const [groupChatName, setGroupChatName] = useState();
  const [SearchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const toast = useToast();
  const handleUserToAdd = async (userToAdd) => {
    if (selectedChats.users.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User Already Exist",
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    if (selectedChats.groupAdmin._id !== user._id ) {
      toast({
        title: "Only Admin Can add or remove users",
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    setLoading(true);
    const { data } = await axios.put(
      "http://localhost:8000/api/chat/add",
      {
        chatId: selectedChats._id,
        userId: userToAdd._id,
      },
      {
        withCredentials: true,
      }
    );
    setSelectedChats(data);
    setFetchAgain(!fetchAgain);
    setLoading(false);
  };
  const handleremove = async (userToRemove) => {
    if (selectedChats.groupAdmin._id !== user._id && userToRemove._id!==user._id) {
      toast({
        title: "Only Admin Can add or remove users",
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    const { data } = await axios.put(
      "http://localhost:8000/api/chat/remove",
      {
        chatId: selectedChats._id,
        userId: userToRemove._id,
      },
      {
        withCredentials: true,
      }
    );
    userToRemove._id===user._id?setSelectedChats([]):setSelectedChats(data);
    setFetchAgain(!fetchAgain);
    fetchMessages()
    setLoading(false);
  };
  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }
    setLoading(true);
    const { data } = await axios.put(
      "http://localhost:8000/api/chat/rename",
      {
        chatId: selectedChats._id,
        chatName: groupChatName,
      },
      {
        withCredentials: true,
      }
    );
    setSelectedChats(data);
    setFetchAgain(!fetchAgain);
    setLoading(false);
  };
  const handleSearch = async (e) => {
    if (!e) {
      setSearch();
      setSearchResult([]);
      return;
    }
    setSearch(e);
    await axios
      .get(`http://localhost:8000/api/user?search=${e}`, {
        withCredentials: true,
      })
      .then((response) => setSearchResult(response.data));
  };
  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<ViewIcon />}
        display={{ base: "flex" }}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChats.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb={3}>
              {selectedChats.users.map((u) => (
                <UserBadgeItems
                  key={u._id}
                  user={u}
                  handleFunction={() => handleremove(u)}
                />
              ))}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              ></Input>
              <Button
                variant={"solid"}
                colorScheme="teal"
                ml={1}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl display={"flex"}>
              <Input
                placeholder="Add Users to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              ></Input>
            </FormControl>
            {loading ? (
              <Spinner size={"lg"} />
            ) : (
              SearchResult.map((user) => (
                <UserListitem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleUserToAdd(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleremove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpateGroupChatModal;
