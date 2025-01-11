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
    const balance = item.balance_after_receipt
      ? parseFloat(item.balance_after_receipt) || 0
      : parseFloat(item.balance_amount) || 0;
    return sum + balance;
  }, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Payables</h2>
      <p>
        <strong>
          {totalBalance}
        </strong>
      </p>
    </div>
  );
}

export default Receivables;
