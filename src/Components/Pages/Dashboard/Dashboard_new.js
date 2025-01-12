import React, { useState } from 'react';
import './Dashboard_new.css'; 
import Repairs from './Repairs';
import Sales from './Sales';

const MetricCard = ({ title, todayCount, monthCount }) => {
  return (
    <div className="metric-card">
      <h3>{title}</h3>
      <p style={{ fontSize: '2rem' }}>Today: {todayCount}</p>
      <p>Month: {monthCount}</p>
      <div className="card-footer d-flex justify-content-between">
        <a href="#" className="btn btn-link">Details</a>
        <a href="#" className="btn btn-link">New</a>
      </div>
    </div>
  );
};

const Dashboard = () => {
    const [selectedMobile, setSelectedMobile] = useState('');
  const [repairsCount, setRepairsCount] = useState({ today: 0, month: 0 });

  const handleRepairsCountUpdate = (count) => {
    setRepairsCount(count);
  };
  const [salesCount, setSalesCount] = useState({ today: 0, month: 0 });

  const handleSalesUpdate = (data) => {
    setSalesCount(data); // Update sales count when Sales component provides new data
  };

  return (
    <div className='main-container'>
      <header className="dashboard-header">
        <div>Dashboard</div>
        <div className="search-bar" style={{ fontSize: '12px', paddingLeft: '20px' }}>
          <input type="text" placeholder="Select Customer by Phone number" />
        </div>
      </header>

      <div className="dashboard-container">
        <div className="row-cards" style={{ marginTop: '10px' }}>
          <MetricCard title="Customers-Count" todayCount="100" monthCount="3000" />
          <MetricCard title="Supplies-Count" todayCount="100" monthCount="3000" />
          <MetricCard title="Orders-Count" todayCount="100" monthCount="3000" />
           <MetricCard title="Repairs-Count" todayCount={repairsCount.today} monthCount={repairsCount.month} />
           <MetricCard
            title="Sales-Count"
            todayCount={salesCount.today}
            monthCount={salesCount.month}
          />
        </div>
        <div className="row-cards" style={{ marginTop: '10px' }}>
          <MetricCard title="Customers-Count" todayCount="100" monthCount="3000" />
          <MetricCard title="Supplies-Count" todayCount="100" monthCount="3000" />
          <MetricCard title="Orders-Count" todayCount="100" monthCount="3000" />
          <MetricCard title="Repairs-Count" todayCount="100" monthCount="3000" />
          <MetricCard title="Sales-Count" todayCount="100" monthCount="3000" /> 
        </div>
        <Repairs selectedCustomerMobile={selectedMobile} onUpdateCount={handleRepairsCountUpdate} />
        <Sales selectedCustomerMobile={selectedMobile} onSalesUpdate={handleSalesUpdate} />
      </div>
    </div>
  );
};

export default Dashboard;
