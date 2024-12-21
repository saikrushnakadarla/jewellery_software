import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import your reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
import InputField from '../../../Modules/Masters/ItemMaster/Inputfield'; // Assuming you have this reusable input field component
import './StockEntryTable.css';
import baseURL from "../../../../Url/NodeBaseURL";
import axios from 'axios';


const StockEntryTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store fetched table data
  const [isEditMode, setIsEditMode] = useState(false); // State to toggle form visibility
  const [formData, setFormData] = useState({}); // State to store the form data

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
      { Header: 'Pricing', accessor: 'Pricing' },
      { Header: 'Product ID', accessor: 'product_id' },
      { Header: 'Product Name', accessor: 'product_Name' },
      { Header: 'Category', accessor: 'Category' },
      { Header: 'Prefix', accessor: 'Prefix' },
      { Header: 'Purity', accessor: 'Purity' },
      { Header: 'Product Code', accessor: 'PCode_BarCode' },
      { Header: 'Gross Weight', accessor: 'Gross_Weight' },
      { Header: 'Stones Weight', accessor: 'Stones_Weight' },
      { Header: 'Stones Price', accessor: 'Stones_Price' },
      { Header: 'Weight (WW)', accessor: 'Weight_BW' },
      { Header: 'Wastage On', accessor: 'Wastage_On' },
      { Header: 'Wastage', accessor: 'WastageWeight' },
      { Header: 'Percentage', accessor: 'Wastage_Percentage' },
      { Header: 'Weight', accessor: 'TotalWeight_AW' },
      { Header: 'Making Charges', accessor: 'Making_Charges' },
      { Header: 'Stock Point', accessor: 'Stock_Point' },
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
          <DataTable columns={columns} data={data} />
        </div>
      ) : (
        <div className="container mt-4">
          <form className="p-4 border rounded form-container-stockentry" onSubmit={handleSubmit}>
            <h4>Stock Entry</h4>

            {/* Section 1 */}
            <div className="row g-3">
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
              <div className="col-md-2">
                <InputField
                  label="P ID:"
                  name="product_id"
                  type="select"
                  value={formData.product_id || ''}
                  onChange={handleChange}
                  options={productOptions}
                />
              </div>
              <div className="col-md-2">
                <InputField
                  label="Tag ID:"
                  name="Tag_ID"
                  value={formData.Tag_ID || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="Product Name:"
                  name="product_Name"
                  value={formData.product_Name || ''}
                  readOnly
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="Design Master:"
                  name="Design_Master"
                  value={formData.Design_Master || ''}
                  readOnly
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="Category:"
                  name="Category"
                  value={formData.Category || ''}
                  readOnly
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="Prefix:"
                  value="tag"
                  readOnly
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="Purity:"
                  name="Purity"
                  value={formData.Purity || ''}
                  readOnly
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="PCode/BarCode:"
                  name="PCode_BarCode"
                  value={formData.PCode_BarCode || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-4">
              <div className="row g-3">
                <div className="col-md-3">
                  <InputField
                    label="Gross Weight:"
                    name="Gross_Weight"
                    value={formData.Gross_Weight || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <InputField
                    label="Stones Weight:"
                    name="Stones_Weight"
                    value={formData.Stones_Weight || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleOpenModal}
                    style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
                  >
                    Stone Details
                  </button>
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

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>

        </div>
      )}
    </div>
  );
};

export default StockEntryTable;
