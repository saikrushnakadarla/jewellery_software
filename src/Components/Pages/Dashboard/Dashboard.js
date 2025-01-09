import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Sales from "./Sales";
import Customers from "./CustomerDashboard";

function Dashboard() {
  const [selectedMobile, setSelectedMobile] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="dashboard_main-container">
        <div className="dashboard_card-row">
          <div className="dashboard_card bg-dash1">
            <h2>Payables</h2>
            <p>100000</p>
          </div>
          <div className="dashboard_card bg-dash3">
            <h2>Receivables</h2>
            <p>100000</p>
          </div>
        </div>
        <div className="dashboard_card-row" style={{ marginTop: "15px" }}>
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
                navigate("/sales");
              }}
            >
              New
            </a>
          </div>
        </div>
      </div>
      <div className="dashboard_main-container">
        <Customers onSelectCustomer={setSelectedMobile} />
      </div>
    </div>
  );
}

export default Dashboard;
