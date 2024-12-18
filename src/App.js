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
import StockEntry from './Components/Modules/Transactions/StockEntry/StockEntry';
import StockEntryTable from './Components/Modules/Transactions/StockEntry/StockEntryTable';
import EstimateTable from './Components/Modules/Transactions/Estimate/EstimateTable';
import Purchase from './Components/Modules/Transactions/Purchase/Purchase';
import PurchaseTable from './Components/Modules/Transactions/Purchase/PurchaseTable';
import Receipts from './Components/Modules/Transactions/Receipts/Receipts';
import ReceiptsTable from './Components/Modules/Transactions/Receipts/ReceiptsTable';
import PurchaseReport from './Components/Modules/Reports/PurchaseReport/PurchaseReport'
import SalesReport from './Components/Modules/Reports/SalesReport/SalesReport'
import EstimateReport from './Components/Modules/Reports/EstimateReport/EstimateReport'
import RepairsReport from './Components/Modules/Reports/RepairsReport/RepairsReport'
import URDPurchaseReport from './Components/Modules/Reports/URDPurchaseReport/URDPurchase'
import Payments from './Components/Modules/Transactions/Payments/Payments';
import PaymentsTable from './Components/Modules/Transactions/Payments/PaymentsTable';
import Accounts from './Components/Modules/Masters/Accounts/Accounts';
import AccountsTable from './Components/Modules/Masters/Accounts/AccountsTable';
import Sales from './Components/Modules/Transactions/Sales/SalesForm';
import MetalType from './Components/Modules/Masters/MetalType/MetalType';
import DesignMaster from './Components/Modules/Masters/DesignMaster/DesignMaster';
import Purity from './Components/Modules/Masters/Purity/Purity';
import Rates from './Components/Modules/Masters/Rates/Rates';
import SalesTable from './Components/Modules/Transactions/Sales/SalesTable';
import URDPurchasetable from './Components/Modules/Transactions/URDPurchase/URDPurchasetable';
import PurityTable from './Components/Modules/Masters/Purity/PurityTable';
import OrdersTable from './Components/Modules/Transactions/Orders/OrdersTable';
import Orders from './Components/Modules/Transactions/Orders/Orders';
import BarCodePrinting from './Components/Modules/Reports/BarcodePrinting/BarCodePrinting';
import SalesNew from './Components/Modules/Transactions/Sales/SalesNew';

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
        <Route path="/repairs/:id" element={<Repairs />} />
        <Route path="/repairstable" element={<RepairsTable />} />
        <Route path="/urd_purchase" element={<URDPurchase />} />
        <Route path="/itemmastertable" element={<ItemMasterTable />} />
        <Route path="/estimates/" element={<Estimate />} />
        <Route path="/estimatetable" element={<EstimateTable />} />
        <Route path="/suppliertable" element={<Supplier_Table />} />
        <Route path="/customerstable" element={<Customers_Table />} />
        <Route path="/customermaster" element={<Customer_Master />} />
        <Route path="/customermaster/:id" element={<Customer_Master />} />
        <Route path="/suppliermaster" element={<Supplier_Master />} />
        <Route path="/suppliermaster/:id" element={<Supplier_Master />} />
        <Route path="/stockEntry" element={<StockEntry />} />
        <Route path="/stockEntryTable" element={<StockEntryTable />} />
        <Route path="/estimates/:product_id" element={<Estimate />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchasetable" element={<PurchaseTable />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/receiptstable" element={<ReceiptsTable />} />
        <Route path="/purchaseReport" element={<PurchaseReport />} />
        <Route path="/salesReport" element={<SalesReport />} />
        <Route path="/estimateReport" element={<EstimateReport />} />
        <Route path="/repairsReport" element={<RepairsReport />} />
        <Route path="/urdPurchaseReport" element={<URDPurchaseReport />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/paymentstable" element={<PaymentsTable />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/:id" element={<Accounts />} />
        <Route path="/accountstable" element={<AccountsTable />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/metaltype" element={<MetalType />}/>
        <Route path="/purity" element={<Purity />}/>
        <Route path="/rates" element={<Rates />}/>
        <Route path="/designmaster" element={<DesignMaster />}/>
        {/* <Route path="/suppliereditform/:id" element={<SupplierEditForm />}/> */}
        <Route path="/salestable" element={<SalesTable />} />
        <Route path="/urdpurchasetable" element={<URDPurchasetable />} />
        <Route path="/puritytable" element={<PurityTable />} />
        <Route path="/orderstable" element={<OrdersTable />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/barcodeprinting" element={<BarCodePrinting />} />


        <Route path="/salesNew" element={<SalesNew />} />
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
