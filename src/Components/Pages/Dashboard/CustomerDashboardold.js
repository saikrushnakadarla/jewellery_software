import React, { useState, useEffect } from "react";
import baseURL from "../../../Url/NodeBaseURL";
import InputField from "../../Pages/InputField/InputField";

function Customers({ onSelectCustomer }) {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({ customer_id: "", mobile: "" });
  
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
  
    const handleMobileChange = (e) => {
      const mobile = e.target.value;
      setFormData((prev) => ({ ...prev, mobile }));
      const matchedCustomer = customers.find(
        (customer) => customer.mobile === mobile
      );
      if (matchedCustomer) {
        onSelectCustomer(matchedCustomer.account_id); // Notify parent
        setFormData((prev) => ({
          ...prev,
          customer_id: matchedCustomer.account_id,
        }));
      }
    };
  
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-4">
            <h3>Search Customer</h3>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              className="form-control"
              value={formData.mobile}
              onChange={handleMobileChange}
            />
          </div>
        </div>
        {formData.customer_id && (
          <div className="row">
            <div className="col-4">
              <h4>Selected Customer Details:</h4>
              <p>
                <strong>Name:</strong> {customers.find(
                  (c) => c.account_id === formData.customer_id
                )?.account_name}
              </p>
              <p>
                <strong>Mobile:</strong> {formData.mobile}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
  

export default Customers;
