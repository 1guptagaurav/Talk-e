import { useState } from 'react'
import { CloseButton } from "@chakra-ui/react";
import "./App.css";
import {Route} from "react-router-dom"
import {HomePage} from "./Pages/Homepage.jsx"
import { ChatProvider } from './Context/ContextApi.jsx';
function App() {

  return (
    <ChatProvider>
      <div className="App">
        <HomePage/>
      </div>
    </ChatProvider>
  );
}

export default App
