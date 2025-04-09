import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Button} from "react-bootstrap";
import InputField from "./../../../Pages/InputField/InputField";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation, useNavigate  } from "react-router-dom";
import axios from "axios";
import baseURL from './../../../../Url/NodeBaseURL';

const CustomerDetails = ({
  formData,
  handleCustomerChange,
  handleAddCustomer,
  customers,
  setSelectedMobile,
  mobileRef
}) => {
   const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(0); // State to store balance
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedMobile, setSelectedMobileState] = useState(""); // Added state to hold selected mobile

  useEffect(() => {
    if (location.state?.mobile) {
      console.log("Received Mobile from navigation:", location.state.mobile);
      const customer = customers.find(
        (cust) => cust.mobile === location.state.mobile
      );
      if (customer) {
        handleCustomerChange(customer.account_id); // Update formData
        setSelectedMobileState(location.state.mobile); // Pass the mobile number
        fetchBalance(location.state.mobile); // Fetch balance for the selected mobile
      }
    }
  }, [location.state?.mobile, customers]);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-unique-repair-details`);
        // Filter only the records where transaction_status is 'Sales'
        const filteredData = response.data.filter(
          (item) =>
            item.transaction_status === "Sales" || item.transaction_status === "ConvertedInvoice"
        );
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching repair details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  // Function to fetch balance based on mobile
  const fetchBalance = (mobile) => {
    setLoading(true);
    const customerData = data.filter((item) => item.mobile === mobile);

    const totalBalance = customerData.reduce((sum, item) => {
      const bal_amt = Number(item.bal_amt) || 0;
      const bal_after_receipts = Number(item.bal_after_receipts) || 0;
      const receipts_amt = Number(item.receipts_amt) || 0;

      // If bal_amt equals receipts_amt, use bal_after_receipts
      const balance = bal_amt === receipts_amt ? bal_after_receipts : bal_after_receipts || bal_amt;

      return sum + balance;
    }, 0);

    setBalance(totalBalance.toFixed(2)); // Set the calculated balance
    setLoading(false); // Set loading to false once balance is fetched
  };

  // Trigger balance fetch when selectedMobile changes
  useEffect(() => {
    if (selectedMobile) {
      fetchBalance(selectedMobile);
    }
  }, [selectedMobile]);

  const handleAddReceipt = () => {
    const selectedCustomer = customers.find(
      cust => cust.account_id === formData.customer_id
    );
    
    if (selectedCustomer) {
      navigate("/receipts", {
        state: {
          from: "/sales",
          invoiceData: {
            account_name: selectedCustomer.account_name,
            mobile: selectedCustomer.mobile,
            total_amt: balance // The balance amount calculated earlier
          }
        }
      });
    } else {
      alert("Please select a customer first");
    }
  };

  return (
    <Col className="sales-form-section">
      <Row>
        <Col xs={12} md={3} className="d-flex align-items-center">
          <div style={{ flex: 1 }}>
            <InputField
              label="Mobile"
              name="mobile"
              type="select"
              value={formData.customer_id || ""}

              onChange={(e) => {
                handleCustomerChange(e.target.value);
                const selectedCustomer = customers.find(
                  (customer) => customer.account_id === e.target.value
                );
                const selectedMobile = selectedCustomer?.mobile || "";
                setSelectedMobile(selectedMobile);
                if (selectedMobile) {
                  fetchBalance(selectedMobile); // Fetch balance for the selected mobile
                }
              }}
              options={[
                ...customers.map((customer) => ({
                  value: customer.account_id,
                  label: customer.mobile,
                })),
              ]}
              ref={mobileRef}
            />
          </div>
          <AiOutlinePlus
            size={20}
            color="black"
            onClick={handleAddCustomer}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          />
        </Col>

        <Col xs={12} md={3}>
          <InputField
            label="Customer Name:"
            name="account_name"
            type="select"
            value={formData.customer_id || ""}
            onChange={(e) => handleCustomerChange(e.target.value)}
            options={[
              ...customers.map((customer) => ({
                value: customer.account_id,
                label: customer.account_name,
              })),
            ]}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Email:"
            name="email"
            type="email"
            value={formData.email || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Address1:"
            name="address1"
            value={formData.address1 || ""}
            readOnly
          />
        </Col>
        {/* <Col xs={12} md={2}>
          <InputField
            label="Address2:"
            name="address2"
            value={formData.address2 || ""}
            readOnly
          />
        </Col> */}
        <Col xs={12} md={2}>
          <InputField
            label="City"
            name="city"
            value={formData.city || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="PIN"
            name="pincode"
            value={formData.pincode || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="State:"
            name="state"
            value={formData.state || ""}
            readOnly
          />
        </Col>
        {/* <Col xs={12} md={1}>
          <InputField
            label="St Code:"
            name="state_code"
            value={formData.state_code || ""}
            readOnly
          />
        </Col> */}
        <Col xs={12} md={2}>
          <InputField
            label="Aadhar"
            name="aadhar_card"
            value={formData.aadhar_card || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="GSTIN"
            name="gst_in"
            value={formData.gst_in || ""}
            readOnly
          />
        </Col>
        {/* <Col xs={12} md={2}>
          <InputField
            label="PAN"
            name="pan_card"
            value={formData.pan_card || ""}
            readOnly
          />
        </Col> */}
        <Col xs={12} md={2}>
          <InputField
            label="Balance Amount:"
            name="balance"
            value={loading ? "Loading..." : `₹ ${balance}`}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
        <Button
  style={{
    backgroundColor: '#28a745',
    borderColor: '#28a745',
    fontSize: '0.875rem',
    padding: '0.25rem 0.5rem',
  }}
  onClick={handleAddReceipt}
>
  Add Receipt
</Button>

        </Col>
      </Row>
    </Col>
  );
};

export default CustomerDetails;
