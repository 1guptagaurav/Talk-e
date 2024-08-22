import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";


function Login() {
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const postDetails = (pic) => {};
  const submitHandler = () => {};
  return (
    <div>
      <VStack spacing="5px">
        <FormControl id="login-email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your Email Id"
            onChange={(e) => setemail(e.target.value)}
          />
        </FormControl>
        <FormControl id="login-password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="green"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Login
        </Button>
      </VStack>
    </div>
  );
}
export default Login;
