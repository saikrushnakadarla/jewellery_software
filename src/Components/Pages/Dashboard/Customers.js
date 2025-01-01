
import React, { useState, useEffect } from "react";
import baseURL from "../../../Url/NodeBaseURL";

function Customers() {

    const [data, setData] = useState([]);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${baseURL}/get/account-details`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const result = await response.json();
    
            // Filter only customers and format dates
            const customers = result
              .filter((item) => item.account_group === 'CUSTOMERS')
              .map((item) => ({
                ...item,
                birthday: formatDate(item.birthday),
                anniversary: formatDate(item.anniversary),
              }));
    
            setData(customers);
            console.log("Customers=",customers)
          } catch (error) {
            console.error('Error fetching data:', error);
            
          }
        };
    
        fetchData();
      }, []);
  return (
    <table className="dashboard-responsive-table">
    <thead>
      <tr>
        <th>Name</th>
        {/* <th>Product</th>
        <th>Amount</th> */}
        <th>Contact</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((customer, index) => (
          <tr key={index}>
            <td>{customer.account_name || 'N/A'}</td>
            {/* <td>{customer.product || 'N/A'}</td>
            <td>₹{customer.amount || '0'}</td> */}
            <td>{customer.mobile || 'N/A'}</td>
            <td>{customer.email || 'N/A'}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5">No customers available</td>
        </tr>
      )}
    </tbody>
  </table>
  )
}

export default Customers