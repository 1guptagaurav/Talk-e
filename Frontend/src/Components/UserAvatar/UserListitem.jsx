import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

function UserListitem({ user, handleFunction }) {
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bg={"gray"}
      _hover={{ bg: "#38B2AC", color: "green" }}
      w="100%"
      d="flex"
      alignItems={"center"}
      color={"black"}
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar
        mr={2}
        size={"sm"}
        cursor={"pointer"}
        name={user.fullname}
        src={user.pic}
      />
      <Box
      ml={12}
      mt={-8}
      >
        <Text>{user.fullname}</Text>
        <Text fontSize={"xs"}>
          <b>Email:</b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
}

export default UserListitem;
