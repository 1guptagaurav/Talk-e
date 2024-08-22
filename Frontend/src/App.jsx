import { useState } from 'react'
import { CloseButton } from "@chakra-ui/react";
import "./App.css";
import {Route} from "react-router-dom"
import {HomePage} from "./Pages/Homepage.jsx"
function App() {

  return (
      <div className="App">
       <HomePage/>
      </div>
  );
}

export default App
