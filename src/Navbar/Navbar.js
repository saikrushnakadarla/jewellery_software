import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mastersDropdownOpen, setMastersDropdownOpen] = useState(false);
  const [transactionsDropdownOpen, setTransactionsDropdownOpen] = useState(false);
  const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false);
  const [utilityDropdownOpen, setUtilityDropdownOpen] = useState(false);

  const location = useLocation();  // Get the current location from React Router

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdownType) => {
    switch (dropdownType) {
      case 'masters':
        setMastersDropdownOpen(!mastersDropdownOpen);
        break;
      case 'transactions':
        setTransactionsDropdownOpen(!transactionsDropdownOpen);
        break;
      case 'reports':
        setReportsDropdownOpen(!reportsDropdownOpen);
        break;
      case 'utility':
        setUtilityDropdownOpen(!utilityDropdownOpen);
        break;
      default:
        break;
    }
  };

  const handleItemClick = () => {
    // Close all dropdowns and collapse the hamburger menu
    setMastersDropdownOpen(false);
    setTransactionsDropdownOpen(false);
    setReportsDropdownOpen(false);
    setUtilityDropdownOpen(false);
    setIsOpen(false);
  };

  // Function to check if the link is active based on the current location
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';  // Return 'active' if the path matches the current location
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
          <span className="navbar-dropdown-title">
            MASTERS{' '}
            <FontAwesomeIcon
              icon={mastersDropdownOpen ? faChevronUp : faChevronDown}
              className="dropdown-arrow-icon"
            />
          </span>
          {mastersDropdownOpen && (
            <div className="navbar-dropdown-content">
              
              
              {/* <Link to="/metaltype">Metal Type</Link>
              <Link to="/designmaster">Design Master</Link> */}
             

              <Link to="/customerstable" onClick={handleItemClick} className={isActive('/customerstable')}>Customer_Master</Link>
              <Link to="/suppliertable" onClick={handleItemClick} className={isActive('/suppliertable')}>Supplier_Master</Link>
              <Link to="/itemmastertable" onClick={handleItemClick} className={isActive('/itemmastertable')}>Product</Link>
              <Link to="/purity" onClick={handleItemClick} className={isActive('/purity')}>Purity</Link>
              <Link to="/accountstable" onClick={handleItemClick} className={isActive('/accountstable')}>Accounts</Link>
            </div>
          )}
        </div>

        {/* Transactions Dropdown */}
        <div
          className="navbar-dropdown"
          onMouseEnter={() => toggleDropdown('transactions')}
          onMouseLeave={() => toggleDropdown('transactions')}
        >
          <span className="navbar-dropdown-title">
            TRANSACTIONS{' '}
            <FontAwesomeIcon
              icon={transactionsDropdownOpen ? faChevronUp : faChevronDown}
              className="dropdown-arrow-icon"
            />
          </span>
          {transactionsDropdownOpen && (
            <div className="navbar-dropdown-content">

              <Link to="/salestable" onClick={handleItemClick} className={isActive('/sales')}>Sales</Link>
              <Link to="/estimates" onClick={handleItemClick} className={isActive('/estimates')}>Estimate</Link>
              <Link to="/stockEntryTable" onClick={handleItemClick} className={isActive('/stockEntryTable')}>Stock Entry</Link>
              <Link to="/paymentstable" onClick={handleItemClick} className={isActive('/paymentstable')}>Payments</Link>
              <Link to="/receiptstable" onClick={handleItemClick} className={isActive('/receiptstable')}>Receipts</Link>
              <Link to="/purchasetable" onClick={handleItemClick} className={isActive('/purchasetable')}>Purchase</Link>
              <Link to="/repairstable" onClick={handleItemClick} className={isActive('/repairstable')}>Repairs</Link>
              <Link to="/urdpurchasetable" onClick={handleItemClick} className={isActive('/urd_purchase')}>URD Purchase</Link>

             

            </div>
          )}
        </div>

        {/* Reports Dropdown */}
        <div
          className="navbar-dropdown"
          onMouseEnter={() => toggleDropdown('reports')}
          onMouseLeave={() => toggleDropdown('reports')}
        >
          <span className="navbar-dropdown-title">
            REPORTS{' '}
            <FontAwesomeIcon
              icon={reportsDropdownOpen ? faChevronUp : faChevronDown}
              className="dropdown-arrow-icon"
            />
          </span>
          {reportsDropdownOpen && (
            <div className="navbar-dropdown-content">
              <Link to="/salesReport" onClick={handleItemClick} className={isActive('/salesReport')}>Sales Report</Link>
              <Link to="/estimateReport" onClick={handleItemClick} className={isActive('/estimateReport')}>Estimate Report</Link>
              <Link to="/purchaseReport" onClick={handleItemClick} className={isActive('/purchaseReport')}>Purchase Report</Link>
              <Link to="/repairsReport" onClick={handleItemClick} className={isActive('/repairsReport')}>Repairs Report</Link>
              <Link to="/urdPurchaseReport" onClick={handleItemClick} className={isActive('/urdPurchaseReport')}>URDPurchase Report</Link>
              <Link to="/stockReort" onClick={handleItemClick} className={isActive('/stockReort')}>Stock Report</Link>
              <Link to="/barcodeprinting" onClick={handleItemClick} className={isActive('/barcodeprinting')}>Barcode Printing Report</Link>
              <Link to="/cashReport" onClick={handleItemClick} className={isActive('/cashReport')}>Cash Report</Link>
            </div>
          )}
        </div>

        {/* Utility/Settings Dropdown */}
        <div
          className="navbar-dropdown"
          onMouseEnter={() => toggleDropdown('utility')}
          onMouseLeave={() => toggleDropdown('utility')}
        >
          <span className="navbar-dropdown-title">
            UTILITY/SETTINGS{' '}
            <FontAwesomeIcon
              icon={utilityDropdownOpen ? faChevronUp : faChevronDown}
              className="dropdown-arrow-icon"
            />
          </span>
          {utilityDropdownOpen && (
            <div className="navbar-dropdown-content">
              <Link to="/invoice" onClick={handleItemClick} className={isActive('/invoice')}>Invoice</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
