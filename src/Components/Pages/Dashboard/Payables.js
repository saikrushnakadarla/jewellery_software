import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../../Url/NodeBaseURL';

function Receivables({ selectedCustomerMobile }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await fetch(`${baseURL}/get/purchases`);
        const result = await response.json();
  
        console.log('Fetched purchases:', result); // Log the data to the console
  
        if (result) {
          setData(result); // Assuming API returns an array of purchases
        } else {
          console.error('Unexpected data structure:', result);
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRepairs();
  }, []);
  

  // Filter the data based on selectedCustomerMobile if provided
  const customerData = selectedCustomerMobile
    ? data.filter(item => item.mobile === selectedCustomerMobile)
    : data;

// Calculate the total balance amount
const totalBalance = customerData.reduce((sum, item) => {
  const balance_amount = Number(item.balance_amount) || 0;
  const balance_after_receipt = Number(item.balance_after_receipt) || 0;
  const paid_amt = Number(item.paid_amt) || 0;

  // Use balance_after_receipt if balance_amount equals paid_amt, else fallback to valid values
  const balance = balance_amount === paid_amt ? balance_after_receipt : balance_after_receipt || balance_amount;

  return sum + balance;
}, 0).toFixed(2);

console.log("Total balance =", totalBalance);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Payables</h3>
      <p style={{fontSize:'25px', color:'green', marginTop:'20px'}}>
        <strong>
        ₹ {totalBalance}
        </strong>
      </p>
    </div>
  );
}

export default Receivables;
