import { useState, useEffect } from 'react';
import baseURL from '../../../../../Url/NodeBaseURL';

const useCustomerForm = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: "value001",
    mobile: "",
    account_name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    state_code: "",
    aadhar_card: "",
    gst_in: "",
    pan_card: "",
    date: "",
    invoice_number: "",
    code: "",
    product_id:"",
    metal: "",
    product_name: "",
    metal_type: "",
    design_name: "",
    purity: "",
    gross_weight: "",
    stone_weight: "",
    weight_bw: "",
    stone_price: "",
    va_on: "",
    va_percent: "",
    wastage_weight: "",
    total_weight_av: "",
    mc_on: "",
    mc_per_gram: "",
    making_charges: "",
    rate: "",
    rate_amt: "",
    tax_percent: "",
    tax_amt: "",
    total_price: "",
    transaction_status: "Sales",
    qty:"",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${baseURL}/get/account-details`);
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const result = await response.json();
        const customers = result.filter(
          (item) => item.account_group === 'CUSTOMERS'
        );
        setCustomers(customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerChange = (customerId) => {
    const customer = customers.find(
      (cust) => String(cust.account_id) === String(customerId)
    );
    if (customer) {
      setFormData({
        ...formData,
        customer_id: customerId,
        mobile: customer.mobile || "",
        account_name: customer.account_name || "",
        email: customer.email || "",
        address1: customer.address1 || "",
        address2: customer.address2 || "",
        city: customer.city || "",
        pincode: customer.pincode || "",
        state: customer.state || "",
        state_code: customer.state_code || "",
        aadhar_card: customer.aadhar_card || "",
        gst_in: customer.gst_in || "",
        pan_card: customer.pan_card || "",
      });
    }
  };

  return {
    formData,
    setFormData,
    customers,
    handleCustomerChange
  };
};

export default useCustomerForm;