
import logo from './logo.svg';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Repairs from "./Components/Modules/Transactions/Repairs/Repairs"; 
import RepairsTable from './Components/Modules/Transactions/Repairs/RepairsTable';
import ItemMaster from "./Components/Pages/ItemMasters/ItemMaster";
import Navbar from './Navbar/Navbar';
import Dashboard from './Components/Pages/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      < Navbar />
      <Routes>
      <Route path="/" exact element={<Dashboard />} />
        <Route path="/itemmaster" exact element={<ItemMaster />} />
        <Route path="/repairs" element={<Repairs />} />
        <Route path="/repairstable" element={<RepairsTable />} />
      </Routes>
    </Router>
  );
}

export default App;
