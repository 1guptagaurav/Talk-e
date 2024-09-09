import {
    Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useChat from "../../Context/ContextApi";
import axios from "axios";
import UserListitem from "../UserAvatar/UserListitem";
import UserBadgeItems from "../UserAvatar/UserBadgeItems";

function GroupChatModal({ children }) {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState();
  const [SearchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats } = useChat();
  const handleSearch = async (e) => {
    if (!e) {
      setSearch();
      setSearchResult([]);
      return;
    }
    setSearch(e);
    setLoading(true);
    await axios
      .get(`http://localhost:8000/api/user?search=${e}`, {
        withCredentials: true,
      })
      .then((response) => setSearchResult(response.data))
      .finally(() => setLoading(false));
  };
  const handleSubmit = async () => {
    if(!groupChatName || !selectedUsers){
      toast({
        title: "Please provide all the details",
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      await axios
        .post(`http://localhost:8000/api/chat/group`,{
          name:groupChatName,
          users:JSON.stringify(selectedUsers.map((u)=>u._id))
        } ,{
          withCredentials: true,
        })
        .then((response) => setChats([response.data,...chats]));
        onClose()
        toast({
          title: "Group Chat Created",
          status: "info",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:error.message,
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleDelete=(userToDelete)=>{
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userToDelete._id));
  }
  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((user) => user._id === userToAdd._id)) {
      toast({
        title: "User already added",
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="Column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              ></Input>
              <Input
                placeholder="Search Users"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              ></Input>
            </FormControl>
            <Box w={"100%"} display="flex" flexWrap="wrap">
              {selectedUsers.map((users) => (
                <UserBadgeItems
                  key={users._id}
                  user={users}
                  handleFunction={() => handleDelete(users)}
                />
              ))}
            </Box>
            {SearchResult.slice(0, 4).map((user) => (
              <UserListitem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
