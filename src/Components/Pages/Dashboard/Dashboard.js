
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Repairs from './Repairs';
import Sales from './Sales';
import Orders from './Orders';
import URDPurchase from './URDPurchase';
import Customers from './Customers';
import CustomerDashboard from './CustomerDashboard';

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
            <h2>Payables</h2>
            <p>100000</p>
          </div>
          <div className="dashboard_card bg-dash3">
            <h2>Receivables</h2>
            <p>100000</p>
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
      <div className="dashboard-customers-row">
        <div className="dashboard-customers-container">
          <h2 className="dashboard-section-title">TOP CUSTOMERS</h2>
          <div className="dashboard-table-wrapper">
            <Customers />
          </div>
        </div>
        <div className="dashboard-customers-container">
          <h2 className="dashboard-section-title">TOP SELLING PRODUCTS</h2>
          <div className="dashboard-table-wrapper">
            <table className="dashboard-responsive-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Units Sold</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gold Necklace</td>
                  <td>₹1,00,000</td>
                  <td>Gold</td>
                  <td>30</td>
                  <td>Elegant design with pure gold</td>
                </tr>
                <tr>
                  <td>Diamond Ring</td>
                  <td>₹75,000</td>
                  <td>Diamond</td>
                  <td>25</td>
                  <td>Exquisite ring with high-grade diamonds</td>
                </tr>
                <tr>
                  <td>Silver Bracelet</td>
                  <td>₹20,000</td>
                  <td>Silver</td>
                  <td>20</td>
                  <td>Stylish bracelet suitable for all occasions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;