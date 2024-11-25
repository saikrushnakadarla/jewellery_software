import logo from './logo.svg';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';

import ItemMaster from "./Components/Pages/ItemMasters/ItemMaster";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/itemmaster" exact element={<ItemMaster />} />

      </Routes>
     
    </Router>
  );
}

export default App;
