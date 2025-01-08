import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersData = () => {
  const [salesData, setSalesData] = useState([]);
  const [salesCounts, setSalesCounts] = useState({
    totalSalesCount: 0,
    todaysSalesCount: 0,
    monthSalesCount: 0,
  });

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get/repair-details');
      const data = response.data;

      // Filter data where transaction_status is "Sales"
      const filteredSales = data.filter(item => item.transaction_status === "Orders");
      setSalesData(filteredSales);

      const today = new Date();
      const counts = filteredSales.reduce(
        (acc, sale) => {
          const saleDate = new Date(sale.date);

          // Total sales count
          acc.totalSalesCount += 1;

          // Today's sales count
          if (
            saleDate.getDate() === today.getDate() &&
            saleDate.getMonth() === today.getMonth() &&
            saleDate.getFullYear() === today.getFullYear()
          ) {
            acc.todaysSalesCount += 1;
          }

          // This month's sales count
          if (
            saleDate.getMonth() === today.getMonth() &&
            saleDate.getFullYear() === today.getFullYear()
          ) {
            acc.monthSalesCount += 1;
          }

          return acc;
        },
        { totalSalesCount: 0, todaysSalesCount: 0, monthSalesCount: 0 }
      );

      setSalesCounts(counts);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div>
      <h2>Orders Details</h2>
      <p>Total Orders: {salesCounts.totalSalesCount}</p>
      <p>Today's Orders: {salesCounts.todaysSalesCount}</p>
      <p>This Month's Orders: {salesCounts.monthSalesCount}</p>
    </div>
  );
};

export default OrdersData;
