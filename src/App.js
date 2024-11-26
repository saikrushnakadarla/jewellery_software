
import logo from './logo.svg';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Repairs from "./Components/Modules/Transactions/Repairs/Repairs"; 
import ItemMaster from "./Components/Modules/Masters/ItemMaster/ItemMaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/itemmaster" exact element={<ItemMaster />} />
        <Route path="/repairs" element={<Repairs />} />
      </Routes>
    </Router>
  );
}

export default App;
