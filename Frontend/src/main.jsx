import { createRoot } from 'react-dom/client'
import App from './App.jsx' 
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Router>
      <App />
    </Router>
  </ChakraProvider>
);
