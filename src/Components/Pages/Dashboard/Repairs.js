import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from "../../../Url/NodeBaseURL";

function Repairs() {
  const [repairs, setRepairs] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    assignToWorkshop: 0,
    receiveFromWorkshop: 0,
    deliverToCustomer: 0,
  });

  const fetchRepairs = async () => {
    try {
      const response = await axios.get(`${baseURL}/get/repairs`);
      setRepairs(response.data);
      const counts = response.data.reduce(
        (acc, repair) => {
          if (repair.status === 'Pending') acc.pending += 1;
          if (repair.status === 'Assign To Workshop') acc.assignToWorkshop += 1;
          if (repair.status === 'Receive from Workshop') acc.receiveFromWorkshop += 1;
          if (repair.status === 'Delivery to Customer') acc.deliverToCustomer += 1;
          return acc;
        },
        { pending: 0, assignToWorkshop: 0, receiveFromWorkshop: 0, deliverToCustomer: 0 }
      );
      setStatusCounts(counts);
    } catch (error) {
      console.error('Error fetching repairs:', error);
    }
  };

  useEffect(() => {
    fetchRepairs();  
  }, []);  

  return (
    <div>
      <h2>Repairs</h2>
        <p>Pending: {statusCounts.pending}</p>
        <p>Assign to Workshop: {statusCounts.assignToWorkshop}</p>
        <p>Receive from Workshop: {statusCounts.receiveFromWorkshop}</p>
        {/* <p>Delivery to Customer: {statusCounts.deliverToCustomer}</p> */}
    </div>
  );
}

export default Repairs;
