import { useState } from 'react';
import axios from 'axios';
import baseURL from '../../../../../Url/NodeBaseURL';

const usePaymentForm = (repairDetails, formData) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cash_amount: 0,
    card_amt: 0,
    chq: "",
    chq_amt: 0,
    online: "",
    online_amt: 0,
  });

  const handleSave = async () => {
    const dataToSave = repairDetails.map((item) => ({
      ...item,
      cash_amount: paymentDetails.cash_amount || 0,
      card_amount: paymentDetails.card || 0,
      card_amt: paymentDetails.card_amt || 0,
      chq: paymentDetails.chq || "",
      chq_amt: paymentDetails.chq_amt || 0,
      online: paymentDetails.online || "",
      online_amt: paymentDetails.online_amt || 0,
    }));

    try {
      await axios.post(`${baseURL}/save-repair-details`, {
        repairDetails: dataToSave,
      });
      alert("Data saved successfully");
      // Reset form data...
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

  return {
    paymentDetails,
    setPaymentDetails,
    handleSave
  };
};

export default usePaymentForm;