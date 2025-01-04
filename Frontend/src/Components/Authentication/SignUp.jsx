import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [fullname, setFullName] = useState();
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const postDetails = (pic) => {
    if (pic === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "top",
      });
    }
    setPic(pic);
  };

  
  const submitHandler = async () => {
    try {
      if (password !== confirmPassword) {
        toast({
          title: "Password and Confirm Password are different",
          status: "warning",
          duration: "4000",
          isClosable: true,
          position: "top",
        });
        return;
      }
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };


      // Call the function when the component mounts
      
      const res = await axios.post(
        "http://localhost:8000/api/user/register",
        {
          fullname,
          email,
          password,
          pic,
        },
        config
      ).then((response)=>{
        toast({
          title: "Something went right",
          status: "success",
          duration: "4000",
          isClosable: true,
          position: "top",
        });
      }).catch((error)=>{
          toast({
              title: "Something went wrong",
              description: error.message,
              status: "warning",
              duration: "4000",
          isClosable: true,
          position: "top",
        });
        console.log(error.message)
      });
    } 
    catch (error) {
      console.error("Unexpected error:", error);
    } 
  };

  return (
    <div>
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter your Name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your Email Id"
            onChange={(e) => setemail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
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
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="pic">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>

        <Button
          colorScheme="green"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Sign Up
        </Button>
      </VStack>
    </div>
  );
}
export default SignUp;
