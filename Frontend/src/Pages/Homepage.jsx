import React ,{useEffect} from 'react'
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from '../Components/Authentication/Login.jsx';
import SignUp from "../Components/Authentication/SignUp.jsx";
import {useNavigate} from "react-router-dom"
import useChat from '../Context/ContextApi.jsx';
function HomePage() {
  const navigate = useNavigate();
    const savedUser = useChat()
  // useEffect(() => {
  //   if (savedUser) navigate("/chats");
  // }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="Center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        textAlign="center"
      >
        <Text fontSize="4xl">Walk-e-Talk-e</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export { HomePage }