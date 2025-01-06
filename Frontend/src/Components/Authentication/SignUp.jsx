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
import React, { useMemo } from "react";
import { useState } from "react";
import axios from "axios";
import useChat from "../../Context/ContextApi";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [fullname, setFullName] = useState();
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [verify, setverify] = useState(false);
  const [sent, setsent] = useState(false);
  const [otp,setOTP]=useState();
  const [userOTP,setUserOTP]=useState(null)
  const [otpSent,setOTPSent]=useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setUser}=useChat()
  const toast = useToast();
  const navigate=useNavigate()
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
      if(!fullname){
        toast({
          title: "Name Required",
          status: "warning",
          duration: "4000",
          isClosable: true,
          position: "top",
        });
        return;
      }
      if(!otpSent){
        toast({
          title: "Please Click on Send OTP Button",
          status: "warning",
          duration: "4000",
          isClosable: true,
          position: "top",
        });
        return;
      }
      if(!verify){
        toast({
          title: "Please Verify OTP",
          status: "warning",
          duration: "4000",
          isClosable: true,
          position: "top",
        });
        return;
      }
      if (!password) {
        toast({
          title: "Password Required",
          status: "warning",
          duration: "4000",
          isClosable: true,
          position: "top",
        });
        return;
      }
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
          title: "Registered Sucessfully",
          status: "success",
          duration: "4000",
          isClosable: true,
          position: "top",
        });
        window.location.reload();
      }).catch((error)=>{
          toast({
              title: "User Already Registered",
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
  const sendOTP=async ()=>{
    if (!email) {
      toast({
        title: "Email Required",
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "top",
      });
      return;
    }
    const randOTP=Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    setOTP(randOTP)
    if (!otpSent) {
      axios.post("http://localhost:8000/api/mail", { email, randOTP });
    }
    setOTPSent(true)
  }
  const verifyOTP = () => {
    console.log(otp)
    if(parseInt(userOTP)===otp){
      setverify(true)
      return;
    }else{
      toast({
        title: "Wrong OTP",
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "top",
      });
    }
    console.log("Clicked on verified OTP");
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
          <InputGroup>
            <Input
              placeholder="Enter your Email Id"
              onChange={(e) => setemail(e.target.value)}
            />
            <InputRightElement width="6.5rem">
              <Button h="1.75rem" size="sm" onClick={() => sendOTP()}>
                {!otpSent? "Send OTP" : "OTP Send"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="otp" isRequired>
          <FormLabel>OTP</FormLabel>
          <InputGroup>
            <Input placeholder="Enter OTP" onChange={(e) => setUserOTP(e.target.value)} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => verifyOTP()}>
                {!verify ? "Verify" : "verified"}
              </Button>
            </InputRightElement>
          </InputGroup>
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
