import React, { useState, useEffect } from "react";
import baseURL from "../../../Url/NodeBaseURL";
import InputField from "../../Pages/InputField/InputField"; // Adjust the path as necessary

function Customers() {
  const [customers, setCustomers] = useState([]); // State for customer data
  const [formData, setFormData] = useState({ customer_id: "" }); // Form data

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
        console.log("Customers=", filteredCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, []);

  const handleCustomerChange = (selectedCustomerId) => {
    setFormData({ ...formData, customer_id: selectedCustomerId });
  };

  const selectedCustomer = customers.find(
    (customer) => customer.account_id === formData.customer_id
  );

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <h3>Select Customer</h3>
          <InputField
            label="Mobile"
            name="mobile"
            type="select"
            value={formData.customer_id || ""} // Use customer_id to match selected value
            onChange={(e) => handleCustomerChange(e.target.value)}
            options={[
              // { value: "", label: "Select Mobile" }, // Default option
              ...customers.map((customer) => ({
                value: customer.account_id, // Use account_id as the value
                label: customer.mobile, // Display mobile as the label
              })),
            ]}
          />
        </div>
      </div>
      {formData.customer_id && selectedCustomer && (
        <div className="row ">
          <div className="col-4">
            <h4>Selected Customer Details:</h4>
           
            <p>
              <strong>Name:</strong> {selectedCustomer.account_name}
            </p>
            <p>
              <strong>Mobile:</strong> {selectedCustomer.mobile}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
