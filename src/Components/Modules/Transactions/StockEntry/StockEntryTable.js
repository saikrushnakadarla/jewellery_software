import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import your reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
import InputField from '../../../Modules/Masters/ItemMaster/Inputfield'; // Assuming you have this reusable input field component
import './StockEntryTable.css';
import StoneDetailsModal from "./StoneDetailsModal";
import baseURL from "../../../../Url/NodeBaseURL";
import axios from 'axios';


const StockEntryTable = (selectedProduct) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store fetched table data
  const [isEditMode, setIsEditMode] = useState(false); // State to toggle form visibility
  const [formData, setFormData] = useState({}); // State to store the form data
  const [subCategories, setSubCategories] = useState([]);
  const handleCloseModal = () => setShowModal(false);
  const [designOptions, setdesignOptions] = useState([]);
  // Fetch data from the API
  useEffect(() => {
    fetch(`${baseURL}/get/opening-tags-entry`) // Correct URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch stock entries');
        }
        return response.json();
      })
      .then((data) => {
        setData(data.result); // Use data.result since the backend sends { result: [...] }
      })
      .catch((error) => {
        console.error('Error fetching stock entries:', error);
      });
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      fetch(`${baseURL}/delete/opening-tags-entry/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete the record');
          }
          return response.json();
        })
        .then(() => {
          // Update the table data after successful deletion
          setData((prevData) => prevData.filter((item) => item.opentag_id !== id));
          alert("Record deleted successfully.");
        })
        .catch((error) => {
          console.error('Error deleting record:', error);
        });
    }
  };

  // Handle edit action
  const handleEdit = (rowData) => {
    setFormData(rowData); // Populate the form with the row data
    setIsEditMode(true); // Show the form
  };

  // Handle form input changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // Handle form submission

  // Automatically calculate Weight_BW when Gross_Weight or Stones_Weight changes
  useEffect(() => {
    const grossWeight = parseFloat(formData.Gross_Weight) || 0;
    const stonesWeight = parseFloat(formData.Stones_Weight) || 0;
    const weightBW = grossWeight - stonesWeight;

    setFormData((prev) => ({
      ...prev,
      Weight_BW: weightBW.toFixed(2), // Ensures two decimal places
    }));
  }, [formData.Gross_Weight, formData.Stones_Weight]);
  // Automatically calculate WastageWeight and TotalWeight_AW
  useEffect(() => {
    const wastagePercentage = parseFloat(formData.Wastage_Percentage) || 0;
    const grossWeight = parseFloat(formData.Gross_Weight) || 0;
    const weightBW = parseFloat(formData.Weight_BW) || 0;

    let wastageWeight = 0;
    let totalWeight = 0;

    if (formData.Wastage_On === "Gross Weight") {
      wastageWeight = (grossWeight * wastagePercentage) / 100;
      totalWeight = weightBW + wastageWeight;
    } else if (formData.Wastage_On === "Weight BW") {
      wastageWeight = (weightBW * wastagePercentage) / 100;
      totalWeight = weightBW + wastageWeight;
    }

    setFormData((prev) => ({
      ...prev,
      WastageWeight: wastageWeight.toFixed(2),
      TotalWeight_AW: totalWeight.toFixed(2),
    }));
  }, [formData.Wastage_On, formData.Wastage_Percentage, formData.Gross_Weight, formData.Weight_BW]);

  const handleMakingChargesCalculation = () => {
    const totalWeight = parseFloat(formData.TotalWeight_AW) || 0;
    const mcPerGram = parseFloat(formData.MC_Per_Gram) || 0;
    const makingCharges = parseFloat(formData.Making_Charges) || 0;

    if (formData.Making_Charges_On === "By Weight") {
      const calculatedMakingCharges = totalWeight * mcPerGram;
      setFormData((prev) => ({
        ...prev,
        Making_Charges: calculatedMakingCharges.toFixed(2),
      }));
    } else if (formData.Making_Charges_On === "Fixed") {
      const calculatedMcPerGram = makingCharges / totalWeight;
      setFormData((prev) => ({
        ...prev,
        MC_Per_Gram: calculatedMcPerGram.toFixed(2),
      }));
    }
  };
  useEffect(() => {
    handleMakingChargesCalculation();
  }, [formData.Making_Charges_On, formData.MC_Per_Gram, formData.Making_Charges, formData.TotalWeight_AW]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseURL}/update/opening-tags-entry/${formData.opentag_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update the record');
        }
        return response.json();
      })
      .then(() => {
        alert('Record updated successfully');
        setIsEditMode(false); // Hide the form
        // Refresh the table data
        setData((prevData) =>
          prevData.map((item) =>
            item.opentag_id === formData.opentag_id ? formData : item
          )
        );
      })
      .catch((error) => {
        console.error('Error updating record:', error);
      });
  };

  // Define the columns for the table
  const columns = React.useMemo(
    () => [

      // { Header: 'Product ID', accessor: 'product_id' },
      { Header: 'Category', accessor: 'category' },
      { Header: 'Sub Category', accessor: 'sub_category' },
      { Header: 'Product Name', accessor: 'product_Name' },
      // { Header: 'Metal Type', accessor: 'metal_type' },
      { Header: 'Design Master', accessor: 'design_master' },
      { Header: 'Pricing', accessor: 'Pricing' },
      { Header: 'Pcode/Barcode', accessor: 'PCode_BarCode' },
      // { Header: 'Purity', accessor: 'Purity' },
      // { Header: 'Prefix', accessor: 'Prefix' },
      // { Header: 'BarCode', accessor: 'PCode_BarCode' },
      { Header: 'Gross Weight', accessor: 'Gross_Weight' },
      { Header: 'Stones Weight', accessor: 'Stones_Weight' },
      { Header: 'Stones Price', accessor: 'Stones_Price' },
      { Header: 'Weight (WW)', accessor: 'Weight_BW' },
      { Header: 'Wastage On', accessor: 'Wastage_On' },

      { Header: 'Wasatage%', accessor: 'Wastage_Percentage' },
      { Header: 'Wastage', accessor: 'WastageWeight' },
      { Header: 'Weight', accessor: 'TotalWeight_AW' },
      { Header: 'Making Charges On', accessor: 'Making_Charges_On' },
      { Header: 'Making Charges', accessor: 'Making_Charges' },
      { Header: 'Stock Point', accessor: 'Stock_Point' },
      { Header: 'Status', accessor: 'Status' },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <button
              className="action-button edit-button"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </button>
            <button
              className="action-button delete-button"
              onClick={() => handleDelete(row.original.opentag_id)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const [productOptions, setProductOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  // Fetch product options for P ID dropdown (product_id)
  useEffect(() => {
    axios.get(`${baseURL}/get/products`)
      .then((response) => {
        const options = response.data.map((product) => ({
          value: product.product_id,
          label: `${product.product_id}`,
        }));
        setProductOptions(options);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      sub_category: data.sub_category, // Assuming `sub_category` is the existing value
    });
    setFormData({ ...formData, [name]: value });

    if (name === "product_id" && value) {
      // Fetch details for the selected product ID
      axios.get(`${baseURL}/get/products/${value}`)
        .then((response) => {
          const product = response.data;
          setFormData({
            ...formData,
            product_id: value,
            product_Name: product.product_name,
            Design_Master: product.design_master,
            Category: product.Category,
            Purity: product.purity,
          });
        })
        .catch((error) =>
          console.error(`Error fetching product details for ID: ${value}`, error)
        );
    }
  };

  const handleUpdateStoneDetails = (totalWeight, totalPrice) => {
    setFormData({
      ...formData,
      Stones_Weight: totalWeight.toFixed(2),
      Stones_Price: totalPrice.toFixed(2),
    });
  };
  const [isFormVisible, setFormVisible] = useState(true);
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  // Fetch design master options from the API
  useEffect(() => {
    const fetchDesignMaster = async () => {
      try {
        const response = await axios.get(`${baseURL}/designmaster`);
        const designMasters = response.data.map((item) => {
          console.log('Design ID:', item.design_id); // Log design_id
          return {
            value: item.design_name, // Assuming the column name is "design_name"
            label: item.design_name,
            id: item.design_id, // Assuming the column name is "design_id"
          };
        });
        setdesignOptions(designMasters);
      } catch (error) {
        console.error('Error fetching design masters:', error);
      }
    };

    fetchDesignMaster();
  }, []);

  const handleBack = () => {
    console.log("Navigating to /stockEntryTable");
    navigate("/stockEntryTable");
  };
  const handleCancel = () => {
    setFormVisible(false); // Hide the form when the cancel button is clicked
    // navigate("/stockEntryTable");
    window.location.reload();
  };

  return (
    <div className="main-container">
      {!isEditMode ? (
        <div className="stockentry-table-container">
          <Row className="mb-3">
            <Col className="d-flex justify-content-between align-items-center">
              <h3>Stock Entry</h3>
              <Button
                className="create_but"
                onClick={() => navigate('/stockEntry')}
                style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
              >
                + Create
              </Button>
            </Col>
          </Row>
          {/* DataTable component */}
          <DataTable columns={columns} data={[...data].reverse()} />
        </div>
      ) : (
        <div className="container mt-4">
          {isFormVisible && (
          <form className="p-4 border rounded form-container-stockentry" onSubmit={handleSubmit}>
            <h4>Stock Entry</h4>

            {/* Section 1 */}
            <div className="row g-3">

              <div className="col-md-3">
                <InputField
                  label="Category:"
                  name="category"
                  value={formData.category}
                  onChange={(e) => handleChange(e)}
                  readOnly
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="Sub Category:"
                  name="sub_category"
                  value={formData.sub_category || ''}
                  onChange={(e) => handleChange(e)}
                 readOnly
                />
              </div>
              <div className="col-md-2">
                <InputField
                  label="Product Name:"
                  name="product_Name"
                  value={formData.product_Name}
                  onChange={handleChange}  // Pass the event handler correctly
                />
              </div>


              <div className="col-md-2">
                <InputField
                  label="Design Master:"
                  name="design_master"
                  type="select"
                  value={formData.design_master || ''}
                  onChange={handleChange}
                  // options={designOptions}
                  options={designOptions.map(option => ({ value: option.value, label: option.label }))}
                />
              </div>

              <div className="col-md-2">
                <InputField
                  label="Pricing:"
                  name="Pricing"
                  type="select"
                  value={formData.Pricing || ''}
                  onChange={handleChange}
                  options={[
                    { value: "By Weight", label: "By Weight" },
                    { value: "By fixed", label: "By fixed" },
                  ]}
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="PCode/BarCode:"
                  name="PCode_BarCode"
                  type="text"
                  value={formData.PCode_BarCode}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <div className="col-md-3">
                <InputField
                  label="Gross Weight:"
                  name="Gross_Weight"
                  value={formData.Gross_Weight || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <InputField
                  label="Stones Weight:"
                  name="Stones_Weight"
                  value={formData.Stones_Weight || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2">
                <InputField
                  label="Stones Price:"
                  name="Stones_Price"
                  value={formData.Stones_Price || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <InputField
                  label="Weight BW:"
                  name="Weight_BW"
                  value={formData.Weight_BW || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-4">
              <div className="row g-3">

              </div>
            </div>

            {/* Section 3 */}
            <div>
              <div className="row g-3">
                <div className="col-md-3">
                  <InputField
                    label="Wastage On:"
                    name="Wastage_On"
                    type="select"
                    value={formData.Wastage_On || ''}
                    onChange={handleChange}
                    options={[
                      { value: "Gross Weight", label: "Gross Weight" },
                      { value: "Weight BW", label: "Weight BW" },
                    ]}
                  />
                </div>
                <div className="col-md-3">
                  <InputField
                    label="Wastage %:"
                    name="Wastage_Percentage"
                    value={formData.Wastage_Percentage || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <InputField
                    label="Wastage Weight:"
                    name="WastageWeight"
                    value={formData.WastageWeight || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <InputField
                    label="Total Weight:"
                    name="TotalWeight_AW"
                    value={formData.TotalWeight_AW || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <InputField
                    label="Making Charges On:"
                    name="Making_Charges_On"
                    type="select"
                    value={formData.Making_Charges_On || ''}
                    onChange={handleChange}
                    options={[
                      { value: "By Weight", label: "By Weight" },
                      { value: "Fixed", label: "Fixed" },
                    ]}
                  />
                </div>
                <div className="col-md-3">
                  <InputField
                    label="MC Per Gram:"
                    name="MC_Per_Gram"
                    value={formData.MC_Per_Gram || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="Making Charges:"
                    name="Making_Charges"
                    value={formData.Making_Charges || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="HUID No:"
                    name="HUID_No"
                    value={formData.HUID_No || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="Stock Point:"
                    name="Stock_Point"
                    type="select"
                    value={formData.Stock_Point || ''}
                    onChange={handleChange}
                    options={[
                      { value: "Main Store", label: "Main Store" },
                      { value: "Secondary Store", label: "Secondary Store" },
                    ]}
                  />
                </div>
              </div>
            </div>


            <Button
            type="button"
            className="cus-back-btn"
            onClick={handleCancel}
            style={{ backgroundColor: "gray", marginRight: "10px" }}
          >
            Cancel
          </Button>
            <Button className="create_but" type="" variant="success"
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>
              update
            </Button>

          </form>
          )}
        </div>
      )}
      <StoneDetailsModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleUpdateStoneDetails={handleUpdateStoneDetails}
      />
    </div>
  );
};

export default StockEntryTable;
