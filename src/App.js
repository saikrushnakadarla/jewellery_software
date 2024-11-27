import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Repairs from "./Components/Modules/Transactions/Repairs/Repairs"; 
import URDPurchase from "./Components/Modules/Transactions/URDPurchase/URDPurchase";
import ItemMaster from "./Components/Modules/Masters/ItemMaster/ItemMaster";
import Supplier_Table from './Components/Modules/Masters/Supplier/Supplier_Table';
import Customers_Table from './Components/Modules/Masters/Customer/Customers_Table';
import RepairsTable from './Components/Modules/Transactions/Repairs/RepairsTable';
import ItemMasterTable from './Components/Modules/Masters/ItemMaster/ItemMasterTable';
import Navbar from './Navbar/Navbar';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Estimate from './Components/Modules/Transactions/Estimate/EstimateForm';
import Customer_Master from './Components/Modules/Masters/Customer/Customer_Master';
import Supplier_Master from './Components/Modules/Masters/Supplier/Supplier_Master';
import Login from './Components/Pages/Login/Login';
import Signup from './Components/Pages/Signup/Signup';
import StockEntry from './Components/Modules/Transactions/StockEntry/StockEntry';
import StockEntryTable from './Components/Modules/Transactions/StockEntry/StockEntryTable';


function App() {
  const location = useLocation();

  // Check if the current route is login or signup
  const isAuthPage = location.pathname === "/login" || location.pathname === "/Signup";

  return (
    <>
      {!isAuthPage && <Navbar />}
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
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/stockEntry" element={<StockEntry />} />
        <Route path="/stockEntryTable" element={<StockEntryTable />} />

      </Routes>
    </>
  );
}

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
