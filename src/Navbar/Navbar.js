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
              <Link to="/masters/customers">CUSTOMER_MASTER</Link>
              <Link to="/itemmastertable">PRODUCT</Link>
              <Link to="/masters/products">BANKS</Link>
              <Link to="/masters/employees">EXPENSE</Link>
              <Link to="/masters/employees">STOCK POINT</Link>
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
              <Link to="/sales">SALES</Link>
              <Link to="/purchases">ESTIMATE</Link>
              <Link to="/refunds">STOCK ENTRY</Link>
              <Link to="/refunds">Customized Oders</Link>
              <Link to="/refunds">Payments & Reciepts</Link>
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
              <Link to="/reports/overview">STOCK BY STATUS/CATEGORY</Link>
              <Link to="/reports/financial">RE PRINT BILLS</Link>
              <Link to="/reports/operations">BARCODE PRINTING</Link>
              <Link to="/reports/analytics">DAILY SALES REPORT</Link>
              <Link to="/reports/analytics">DAILY SALES REPORT</Link>
              <Link to="/reports/analytics">DAILY SALES REPORT</Link>

              

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
