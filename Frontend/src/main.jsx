import { createRoot } from 'react-dom/client'
import App from './App.jsx' 
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  breakpoints: {
    smm:"325",
    sm: "404",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
});

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ChakraProvider>
);
