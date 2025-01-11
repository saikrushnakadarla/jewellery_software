
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Repairs from './Repairs';
import Sales from './Sales';
import Orders from './Orders';
import URDPurchase from './URDPurchase';
import Customers from './Customers';
import CustomerDashboard from './CustomerDashboard';
import Receivables from './Receivables';
import Payables from './Payables'

function Dashboard() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedMobile, setSelectedMobile] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="dashboard_main-container">
        <div className="dashboard_card-row">
          <div className="dashboard_card bg-dash2">
            <Repairs selectedCustomerMobile={selectedMobile} />
            <a
              href="#"
              className="details-link"
              onClick={(e) => {
                e.preventDefault();
                console.log("Selected Customer Mobile:", selectedMobile);
                navigate("/repairstable", { state: { mobile: selectedMobile } });
              }}
            >
              Details
            </a>
            <a
              style={{ marginLeft: '300px' }}
              href="#"
              className="new-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/repairs', { state: { mobile: selectedMobile } });
              }}
            >
              New
            </a>
          </div>
          <div className="dashboard_card bg-dash1">
          <Payables selectedCustomerMobile={selectedMobile} />
          </div>
          <div className="dashboard_card bg-dash3">
            <Receivables selectedCustomerMobile={selectedMobile} />
          </div>
        </div>
        <div className="dashboard_card-row" style={{ marginTop: '15px' }}>
          <div className="dashboard_card bg-dash2">
            <Sales selectedCustomerMobile={selectedMobile} />
            <a
              href="#"
              className="details-link"
              onClick={(e) => {
                e.preventDefault();
                console.log("Selected Customer Mobile:", selectedMobile);
                navigate("/salestable", { state: { mobile: selectedMobile } });
              }}
            >
              Details
            </a>
            <a
              style={{ marginLeft: "300px" }}
              href="#"
              className="new-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/sales", { state: { mobile: selectedMobile } });
              }}
            >
              New
            </a>
          </div>
          <div className="dashboard_card bg-dash1">
            <Orders selectedCustomerMobile={selectedMobile} />
            <a
              href="#"
              className="details-link"
              onClick={(e) => {
                e.preventDefault();
                console.log("Selected Customer Mobile:", selectedMobile);
                navigate("/orderstable", { state: { mobile: selectedMobile } });
              }}
            >
              Details
            </a>
            <a style={{ marginLeft: '300px' }}
              href="#"
              className="new-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/orders', { state: { mobile: selectedMobile } });
              }}
            >
              New
            </a>
          </div>
          <div className="dashboard_card bg-dash3">
            <URDPurchase selectedCustomerMobile={selectedMobile} />
            <a
              href="#"
              className="details-link"
              onClick={(e) => {
                e.preventDefault();
                console.log("Selected Customer Mobile:", selectedMobile);
                navigate("/urdpurchasetable", { state: { mobile: selectedMobile } });
              }}
            >
              Details
            </a>
            <a style={{ marginLeft: '300px' }}
              href="#"
              className="new-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/urd_purchase', { state: { mobile: selectedMobile } });
              }}
            >
              New
            </a>
          </div>
        </div>
      </div>
      <div className="dashboard_main-container">
        <CustomerDashboard onSelectCustomer={setSelectedMobile} />
      </div>
    </div>
  );
}

export default Dashboard;