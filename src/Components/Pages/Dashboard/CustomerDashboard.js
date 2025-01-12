import React, { useState, useEffect } from "react";
import baseURL from "../../../Url/NodeBaseURL";
import InputField from "../../Pages/InputField/InputField";

function Customers({ onSelectCustomer }) {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ customer_id: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/account-details`);
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const result = await response.json();
        const filteredCustomers = result.filter(
          (item) => item.account_group === "CUSTOMERS"
        );
        setCustomers(filteredCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, []);

  const handleCustomerChange = (selectedCustomerId) => {
    const selectedCustomer = customers.find(
      (customer) => customer.account_id === selectedCustomerId
    );
    setFormData({ customer_id: selectedCustomerId });
    onSelectCustomer(selectedCustomer?.mobile); // Pass selected mobile to parent
  };

  const selectedCustomer = customers.find(
    (customer) => customer.account_id === formData.customer_id
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-3" style={{ marginLeft: '-80px' }}>Dashboard</div>
        <div className="col-3"></div>
        <div className="col-3"></div>
        <div className="col-3" style={{ marginLeft: '80px' }}>
          <InputField
            label="Mobile"
            name="mobile"
            type="select"
            value={formData.customer_id || ""}
            onChange={(e) => handleCustomerChange(e.target.value)}
            options={customers.map((customer) => ({
              value: customer.account_id,
              label: customer.mobile,
            }))}
          />
        </div>
      </div>
    </div>

  );
}

export default Customers;
