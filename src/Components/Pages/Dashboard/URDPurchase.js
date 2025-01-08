import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URDPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [purchaseCounts, setPurchaseCounts] = useState({
    total: 0,
    today: 0,
    thisMonth: 0,
  });

  const fetchPurchases = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-purchases');
      const data = response.data;

      // Set the fetched data
      setPurchases(data);

      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      const counts = data.reduce(
        (acc, purchase) => {
          const purchaseDate = new Date(purchase.date);

          // Total count
          acc.total += 1;

          // Today's count
          if (
            purchaseDate.getDate() === today.getDate() &&
            purchaseDate.getMonth() === today.getMonth() &&
            purchaseDate.getFullYear() === today.getFullYear()
          ) {
            acc.today += 1;
          }

          // This month's count
          if (
            purchaseDate.getMonth() === currentMonth &&
            purchaseDate.getFullYear() === currentYear
          ) {
            acc.thisMonth += 1;
          }

          return acc;
        },
        { total: 0, today: 0, thisMonth: 0 }
      );

      // Update the counts state
      setPurchaseCounts(counts);
    } catch (error) {
      console.error('Error fetching URD purchases:', error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div>
      <h2>URD Purchases</h2>
      <p>Total URD Purchases: {purchaseCounts.total}</p>
      <p>Today's URD Purchases: {purchaseCounts.today}</p>
      <p>This Month's URD Purchases: {purchaseCounts.thisMonth}</p>
    </div>
  );
};

export default URDPurchases;
