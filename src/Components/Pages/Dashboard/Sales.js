import React, { useEffect, useState } from "react";
import axios from "axios";

const Sales = ({ selectedCustomerId }) => {
  const [salesCounts, setSalesCounts] = useState({
    totalSalesCount: 0,
    todaysSalesCount: 0,
    monthSalesCount: 0,
  });

  const fetchSalesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get/repair-details");
      const data = response.data;

      // Filter for all sales or specific customer sales
      const filteredSales = selectedCustomerId
        ? data.filter((item) => item.transaction_status === "Sales" && item.customer_id === selectedCustomerId)
        : data.filter((item) => item.transaction_status === "Sales");

      const today = new Date();
      const counts = filteredSales.reduce(
        (acc, sale) => {
          const saleDate = new Date(sale.date);

          acc.totalSalesCount += 1;

          if (
            saleDate.getDate() === today.getDate() &&
            saleDate.getMonth() === today.getMonth() &&
            saleDate.getFullYear() === today.getFullYear()
          ) {
            acc.todaysSalesCount += 1;
          }

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
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [selectedCustomerId]);

  return (
    <div>
      <h2>Sales Details</h2>
      <p>Total: {salesCounts.totalSalesCount }</p>
      <p>Today: {salesCounts.todaysSalesCount }</p>
      <p>This Month: {salesCounts.monthSalesCount}</p>
    </div>
  );
};

export default Sales;
