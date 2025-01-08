import React, { useState, useEffect } from "react";
import axios from "axios";

const URDPurchases = ({ selectedCustomerId }) => {
  const [purchaseCounts, setPurchaseCounts] = useState({
    total: 0,
    today: 0,
    thisMonth: 0,
  });

  const fetchPurchases = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-purchases");
      const data = response.data;

      // Filter purchases by customer if `selectedCustomerId` is provided
      const filteredPurchases = selectedCustomerId
        ? data.filter((purchase) => purchase.customer_id === selectedCustomerId)
        : data;

      const todayDate = new Date().toISOString().slice(0, 10);
      const todayCount = filteredPurchases.filter(
        (purchase) => purchase.date.slice(0, 10) === todayDate
      ).length;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthCount = filteredPurchases.filter((purchase) => {
        const purchaseDate = new Date(purchase.date);
        return (
          purchaseDate.getMonth() === currentMonth &&
          purchaseDate.getFullYear() === currentYear
        );
      }).length;

      setPurchaseCounts({
        total: filteredPurchases.length,
        today: todayCount,
        thisMonth: monthCount,
      });
    } catch (error) {
      console.error("Error fetching URD purchases:", error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [selectedCustomerId]);

  return (
    <div>
      <h2>URD Purchases</h2>
      <p>Total URD Purchases: {purchaseCounts.total }</p>
      <p>Today's URD Purchases: {purchaseCounts.today }</p>
      <p>This Month's URD Purchases: {purchaseCounts.thisMonth }</p>
    </div>
  );
};

export default URDPurchases;
