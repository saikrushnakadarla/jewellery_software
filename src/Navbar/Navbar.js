import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [offlineDropdownOpen, setOfflineDropdownOpen] = useState(false);
  const [onlineDropdownOpen, setOnlineDropdownOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const [transactionsDropdownOpen, setTransactionsDropdownOpen] = useState(false);
  const [mastersDropdownOpen, setMastersDropdownOpen] = useState(false);
  const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false);
  const [utilityDropdownOpen, setUtilityDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdownType) => {
    switch (dropdownType) {
      case 'masters':
        setMastersDropdownOpen(!mastersDropdownOpen);
        break;
      case 'reports':
        setReportsDropdownOpen(!reportsDropdownOpen);
        break;
      case 'utility':
        setUtilityDropdownOpen(!utilityDropdownOpen);
        break;
      case 'transactions':
        setTransactionsDropdownOpen(!transactionsDropdownOpen);
        break;
      default:
        break;
    }
  };

  return (
    <header className="navbar-header">
       <div className="navbar-brand">Jewellery App</div>

      <div
        className={`navbar-hamburger ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <div className="navbar-bar"></div>
        <div className="navbar-bar"></div>
        <div className="navbar-bar"></div>
      </div>

      <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
        {/* Masters Dropdown */}
        <div
          className="navbar-dropdown"
          onMouseEnter={() => toggleDropdown('masters')}
          onMouseLeave={() => toggleDropdown('masters')}
        >
          <span>MASTERS</span>
          {mastersDropdownOpen && (
            <div className="navbar-dropdown-content">
              <Link to="/customerstable">Customer_Master</Link>
              <Link to="/suppliertable">Supplier_Master</Link>
              <Link to="/itemmastertable">Product</Link>
              <Link to="/purity">Purity</Link>
              <Link to="/accounts">Accounts</Link>
            </div>
          )}
        </div>

        {/* Transactions Dropdown */}
        <div
          className="navbar-dropdown"
          onMouseEnter={() => toggleDropdown('transactions')}
          onMouseLeave={() => toggleDropdown('transactions')}
        >
          <span>TRANSACTIONS</span>
          {transactionsDropdownOpen && (
            <div className="navbar-dropdown-content">
              <Link to="/sales">Sales</Link>
              <Link to="/estimates">Estimate</Link>
              <Link to="/stockEntryTable">Stock Entry</Link>
              <Link to="/paymentstable">Payments</Link>
              <Link to="/receiptstable">Receipts</Link>
              <Link to="/purchasetable">Purchase</Link>
              <Link to="/repairstable">Repairs</Link>
              <Link to="/urd_purchase">URD Purchase</Link>
            </div>
          )}
        </div>

        {/* Reports Dropdown */}
        <div
          className="navbar-dropdown"
          onMouseEnter={() => toggleDropdown('reports')}
          onMouseLeave={() => toggleDropdown('reports')}
        >
          <span>REPORTS</span>
          {reportsDropdownOpen && (
            <div className="navbar-dropdown-content">
              <Link to="/salesReport">Sales Report</Link>
              <Link to="/estimateReport">Estimate Report</Link>
              <Link to="/purchaseReport">Purchase Report</Link>
              <Link to="/repairsReport">Repairs Report</Link>
              <Link to="/urdPurchaseReport">URDPurchase Report</Link>
            </div>
          )}
        </div>

        {/* Utility/Settings Dropdown */}
        <div
          className="navbar-dropdown"
          onMouseEnter={() => toggleDropdown('utility')}
          onMouseLeave={() => toggleDropdown('utility')}
        >
          <span>UTILITY/SETTINGS</span>
          {utilityDropdownOpen && (
            <div className="navbar-dropdown-content">
              <Link to="/settings/profile">Profile</Link>
              <Link to="/settings/preferences">Preferences</Link>
              <Link to="/settings/security">Security</Link>
              <Link to="/settings/notifications">Notifications</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
