
import logo from './logo.svg';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Repairs from "./Components/Modules/Transactions/Repairs/Repairs"; // Adjust the path based on your project structure


import ItemMaster from "./Components/Pages/ItemMasters/ItemMaster";

function App() {
  return (
    <Router>

    
      <Routes>
        <Route path="/itemmaster" exact element={<ItemMaster />} />

     
        {/* Other Routes */}
        <Route path="/repairs" element={<Repairs />} />
      </Routes>

    </Router>
  );
}

export default App;
