import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

function ProfileModal({ user, children }) {
  if(undefined==user) user = JSON.parse(localStorage.getItem("user"));


  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        ></IconButton>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"40px"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            Profile Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" gap="4">
              <Image
                borderRadius={"full"}
                boxSize={"150px"}
                src={user.pic}
                alt={user.email}
              />
              <Text fontSize="5xl" fontWeight="bold">
                {user.fullname}
              </Text>
            </Flex>
            <Text >
              {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
