
import logo from './logo.svg';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Repairs from "./Components/Modules/Transactions/Repairs/Repairs"; 
// import ItemMaster from "./Components/Pages/ItemMasters/ItemMaster";
import URDPurchase from "./Components/Modules/Transactions/URDPurchase/URDPurchase";
import ItemMaster from "./Components/Modules/Masters/ItemMaster/ItemMaster";
import Supplier_Table from './Components/Modules/Masters/Supplier/Supplier_Table';
import Customers_Table from './Components/Modules/Masters/Customer/Customers_Table';
import RepairsTable from './Components/Modules/Transactions/Repairs/RepairsTable';


import ItemMasterTable from './Components/Modules/Masters/ItemMaster/ItemMasterTable';


import Navbar from './Navbar/Navbar';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Estimate from './Components/Modules/Transactions/Estimate/EstimateForm'
import Customer_Master from './Components/Modules/Masters/Customer/Customer_Master';
import Supplier_Master from './Components/Modules/Masters/Supplier/Supplier_Master';

function App() {
  return (
    <Router>
      < Navbar />
      <Routes>
      <Route path="/" exact element={<Dashboard />} />
        <Route path="/itemmaster" exact element={<ItemMaster />} />
        <Route path="/repairs" element={<Repairs />} />
        <Route path="/urd_purchase" element={<URDPurchase />} />
        <Route path="/repairstable" element={<RepairsTable />} />
        <Route path="/itemmastertable" element={<ItemMasterTable />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/suppliertable" element={<Supplier_Table />} />
        <Route path="/customerstable" element={<Customers_Table />} />
        <Route path="/customermaster" element={<Customer_Master />} />
        <Route path="/suppliermaster" element={<Supplier_Master />} />
      </Routes>
    </Router>
  );
}

export default App;
