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
import { useNavigate } from "react-router-dom";
import useChat from "../../Context/ContextApi";
import axios from "axios";

function Login() {
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); 
  const postDetails = (pic) => {};
  const { setUser } = useChat();
   const submitHandler =async (e) => {
     e.preventDefault();
     const response =await axios.post("http://localhost:8000/api/user/login",{
          email,
          password
        });
        const {user, accessToken,refreshToken}=response.data.data
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user)
         document.cookie = `accessToken=${accessToken}; path=/;`;
         document.cookie = `refreshToken=${refreshToken}; path=/;`;
        navigate("/chats");
   };
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
