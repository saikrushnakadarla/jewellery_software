import React from 'react';
import './Dashboard.css';
import Repairs from './Repairs';
import Customers from './Customers';
import CustomerDashboard from './CustomerDashboard'

function Dashboard() {
  return (
    <div className="main-container">
      <div className="dashboard_main-container">
        {/* <h1 className='dashboard_heading'>Dashboard</h1> */}

        <div className="dashboard_card-row"> 
          <div className="dashboard_card bg-dash2">         
            <Repairs />
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
      </div>
      <div className="dashboard_main-container">
      <CustomerDashboard />
      </div>
      <div className="dashboard-customers-row">
        <div className="dashboard-customers-container">
          <h2 className="dashboard-section-title">TOP CUSTOMERS</h2>
          <div className="dashboard-table-wrapper">
            {/* <table className="dashboard-responsive-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Contact</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>Gold Necklace</td>
                  <td>₹50,000</td>
                  <td>+91 9876543210</td>
                  <td>johndoe@example.com</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>Diamond Ring</td>
                  <td>₹45,000</td>
                  <td>+91 8765432109</td>
                  <td>janesmith@example.com</td>
                </tr>
                <tr>
                  <td>David Brown</td>
                  <td>Silver Bracelet</td>
                  <td>₹40,000</td>
                  <td>+91 7654321098</td>
                  <td>davidbrown@example.com</td>
                </tr>
              </tbody>
            </table> */}
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
