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
  const [purityOptions, setPurityOptions] = useState([]);

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


  const handleEdit = (rowData) => {
    setFormData(rowData); // Populate the form with the row data
    setIsEditMode(true); // Show the form
  };

  useEffect(() => {
    const grossWeight = parseFloat(formData.Gross_Weight) || 0;
    const stonesWeight = parseFloat(formData.Stones_Weight) || 0;
    const weightBW = grossWeight - stonesWeight;

    setFormData((prev) => ({
      ...prev,
      Weight_BW: weightBW.toFixed(2), // Ensures two decimal places
    }));
  }, [formData.Gross_Weight, formData.Stones_Weight]);

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

    if (formData.Making_Charges_On === "MC / Gram") {
      // Calculate Making Charges based on MC/Gram
      const calculatedMakingCharges = totalWeight * mcPerGram;
      setFormData((prev) => ({
        ...prev,
        Making_Charges: calculatedMakingCharges.toFixed(2), // Automatically set Making Charges
      }));
    } else if (formData.Making_Charges_On === "MC / Piece") {
      // Calculate MC/Gram based on fixed Making Charges
      const calculatedMcPerGram = totalWeight ? makingCharges / totalWeight : 0;
      setFormData((prev) => ({
        ...prev,
        MC_Per_Gram: calculatedMcPerGram.toFixed(2), // Automatically set MC/Gram
      }));
    }
  };

  useEffect(() => {
    handleMakingChargesCalculation();
  }, [
    formData.Making_Charges_On,
    formData.MC_Per_Gram,
    formData.Making_Charges,
    formData.TotalWeight_AW,
  ]);

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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr. No.',
        Cell: ({ row }) => row.index + 1, // Generate a sequential number based on the row index
      },
      { Header: 'Category', accessor: 'category' },
      { Header: 'Sub Category', accessor: 'sub_category' },
      { Header: 'Product Design Name', accessor: 'design_master' },
      { Header: 'Barcode', accessor: 'PCode_BarCode' },
      { Header: 'Gross Wt', accessor: 'Gross_Weight' },
      { Header: 'Stones Wt', accessor: 'Stones_Weight' },
      { Header: 'Wasatage%', accessor: 'Wastage_Percentage' },
      { Header: 'Total Wt', accessor: 'TotalWeight_AW' },
      { Header: 'MC', accessor: 'Making_Charges' },
      { Header: 'Status', accessor: 'Status' },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <FaEdit
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
                color: 'blue',
              }}
              onClick={() => handleEdit(row.original)}
            />
            {/* <FaTrash
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
                color: 'red',
              }}
              onClick={() => handleDelete(row.original.opentag_id)}
            /> */}
          </div>
        ),
      },
    ],
    []
  );

  const handleDelete = async (opentag_id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await axios.delete(`${baseURL}/delete/opening-tags-entry/${opentag_id}`);
        alert(response.data.message);
        window.location.reload(); // Reload data after deletion
      } catch (error) {
        console.error("Error deleting record:", error.response?.data || error.message);
        alert("Failed to delete record.");
      }
    }
  };
  

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

  const isGoldCategory = formData.category && formData.category.toLowerCase().includes("gold");
  const isSilverCategory = formData.category && formData.category.toLowerCase().includes("silver");

  useEffect(() => {
    if (isGoldCategory) {
      setFormData((prevData) => ({
        ...prevData,
        Making_Charges_On: "MC %",
        MC_Per_Gram_Label: "MC%",
        Making_Charges: "", // Reset field when hidden
      }));
    } else if (isSilverCategory) {
      setFormData((prevData) => ({
        ...prevData,
        Making_Charges_On: "MC / Gram",
        MC_Per_Gram_Label: "MC/Gm",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        MC_Per_Gram_Label: "MC/Gm",
      }));
    }
  }, [formData.category]);


  const handleChange = async (fieldOrEvent, valueArg) => {
       
    let field, value;
    if (fieldOrEvent && fieldOrEvent.target) {
        
        field = fieldOrEvent.target.name;
        value = fieldOrEvent.target.value;
    } else {
        
        field = fieldOrEvent;
        value = valueArg;
    }
    setFormData((prevData) => {
        let updatedData = { ...prevData, [field]: value };

        // Update MC field only if Making_Charges_On is "MC / Gram" or "MC / Piece"
        if (field === "Making_Charges_On") {
            if (value === "MC / Gram" || value === "MC / Piece") {
                updatedData.Making_Charges = prevData.Making_Charges || "";
            } else {
                updatedData.Making_Charges = ""; // Hide field
            }
        }

        // Update MC_Per_Gram_Label when Making_Charges_On changes
        if (field === "Making_Charges_On") {
            let newLabel = "MC/Gm"; // Default
            if (value === "MC %") newLabel = "MC%";
            else if (value === "MC / Gram") newLabel = "MC/Gm";
            else if (value === "MC / Piece") newLabel = "MC/Gm";

            updatedData.MC_Per_Gram_Label = newLabel;
        }

        // --- Calculate Stones Price ---
        if (field === "Stones_Weight" || field === "stone_price_per_carat") {
            const stoneWeight =
                parseFloat(
                    field === "Stones_Weight" ? value : prevData.Stones_Weight
                ) || 0;
            const stonePricePerCarat =
                parseFloat(
                    field === "stone_price_per_carat"
                        ? value
                        : prevData.stone_price_per_carat
                ) || 0;
            if (stoneWeight > 0 && stonePricePerCarat > 0) {
                const calculatedStonePrice = (stoneWeight / 0.20) * stonePricePerCarat;
                updatedData.Stones_Price = calculatedStonePrice.toFixed(2);
            } else {
                updatedData.Stones_Price = "";
            }
        }

        // --- Recalculate Weight BW ---
        if (
            field === "Gross_Weight" ||
            field === "Stones_Weight" ||
            field === "deduct_st_Wt"
        ) {
            const grossWt = parseFloat(updatedData.Gross_Weight) || 0;
            const stonesWt = parseFloat(updatedData.Stones_Weight) || 0;
            // Use deduct_st_Wt value if available; default to "yes" if not set.
            const deductOption = updatedData.deduct_st_Wt
                ? updatedData.deduct_st_Wt.toLowerCase()
                : "yes";
            if (deductOption === "yes") {
                updatedData.Weight_BW = (grossWt - stonesWt).toFixed(2);
            } else {
                updatedData.Weight_BW = grossWt.toFixed(2);
            }
        }

        return updatedData;
    });

    // --- Handle Category Change ---
    if (field === "category") {
        setFormData((prevData) => ({
            ...prevData,
            category: value,
        }));
        return;
    }

    // --- Handle Sub-Category Change and Fetch Prefix/PCode_BarCode ---
    if (field === "sub_category") {
        const selectedCategory = subCategories.find(
            (category) => category.subcategory_id === parseInt(value)
        );

        const newPrefix = selectedCategory ? selectedCategory.prefix : "";
        if (newPrefix) {
            try {
                const response = await axios.get(`${baseURL}/getNextPCodeBarCode`, {
                    params: { prefix: newPrefix },
                });
                const nextPCodeBarCode = response.data.nextPCodeBarCode;
                setFormData((prevData) => ({
                    ...prevData,
                    sub_category: selectedCategory
                        ? selectedCategory.sub_category_name
                        : "",
                    subcategory_id: selectedCategory
                        ? selectedCategory.subcategory_id
                        : "",
                    item_prefix: newPrefix,
                    Prefix: newPrefix,
                    PCode_BarCode: nextPCodeBarCode,
                }));
            } catch (error) {
                console.error("Error fetching PCode_BarCode:", error);
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                sub_category: selectedCategory
                    ? selectedCategory.sub_category_name
                    : "",
                subcategory_id: selectedCategory
                    ? selectedCategory.subcategory_id
                    : "",
                item_prefix: "",
                Prefix: "",
                PCode_BarCode: "",
            }));
        }
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

  useEffect(() => {
    const fetchPurity = async () => {
      try {
        const response = await axios.get(`${baseURL}/purity`);
        const filteredPurity = response.data.filter(
          (item) => item.metal.toLowerCase() === formData.metal_type.toLowerCase()
        );
        setPurityOptions(filteredPurity);

        console.log("Purity=", filteredPurity);

        // Set the default option based on metal type
        if (formData.metal_type.toLowerCase() === "gold") {
          const defaultOption = filteredPurity.find((option) =>
            ["22k", "22 kt", "22"].some((match) =>
              option.name.toLowerCase().includes(match)
            )
          );
          if (defaultOption) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              purity: defaultOption.name, // Adjust based on your form data structure
            }));
          }
        } else if (formData.metal_type.toLowerCase() === "silver") {
          const defaultOption = filteredPurity.find((option) =>
            ["22k", "22 kt", "22"].some((match) =>
              option.name.toLowerCase().includes(match)
            )
          );
          if (defaultOption) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              purity: defaultOption.name, // Adjust based on your form data structure
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (formData.metal_type) {
      fetchPurity();
    }
  }, [formData.metal_type]);

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
              <h3>Stock</h3>
              {/* <Button
                className="create_but"
                onClick={() => navigate('/stockEntry')}
                style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
              >
                + Create
              </Button> */}
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

                <div className="col-md-2">
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
                {/* <div className="col-md-2">
                <InputField
                  label="Product Name:"
                  name="product_Name"
                  value={formData.product_Name}
                  onChange={handleChange}  
                />
              </div> */}
                <div className="col-md-3">
                  <InputField
                    label="Product Design Name"
                    name="design_master"
                    type="select"
                    value={formData.design_master || ''}
                    onChange={handleChange}
                    options={designOptions.map(option => ({ value: option.value, label: option.label }))}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="Purity"
                    name="Purity"
                    type="select"
                    value={formData.Purity || ''}
                    onChange={handleChange}
                    options={purityOptions.map((option) => ({
                      value: `${option.name} | ${option.purity}`, // Combined name and purity
                      label: `${option.name} | ${option.purity}`,
                    }))}
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
                <div className="col-md-2">
                  <InputField
                    label="Cut"
                    name="cut"
                    value={formData.cut || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="Color"
                    name="color"
                    value={formData.color || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="Clarity"
                    name="clarity"
                    value={formData.clarity || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="PCode/BarCode"
                    name="PCode_BarCode"
                    type="text"
                    value={formData.PCode_BarCode}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="Gross Wt"
                    name="Gross_Weight"
                    value={formData.Gross_Weight || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="Stones Wt"
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
                <div className="col-md-2">
                  <InputField
                    label="Wastage On"
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
                <div className="col-md-2">
                  <InputField
                    label="Wastage %"
                    name="Wastage_Percentage"
                    value={formData.Wastage_Percentage || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="W.Wt"
                    name="WastageWeight"
                    value={formData.WastageWeight || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="Total Weight:"
                    name="TotalWeight_AW"
                    value={formData.TotalWeight_AW || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="MC On"
                    name="Making_Charges_On"
                    type="select"
                    value={formData.Making_Charges_On}
                    onChange={handleChange}
                    options={[
                      { value: "MC / Gram", label: "MC / Gram" },
                      { value: "MC / Piece", label: "MC / Piece" },
                      { value: "MC %", label: "MC %" },
                    ]}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label={formData.MC_Per_Gram_Label}
                    name="MC_Per_Gram"
                    value={formData.MC_Per_Gram}
                    onChange={handleChange}
                  />
                </div>
                {(formData.Making_Charges_On === "MC / Gram" || formData.Making_Charges_On === "MC / Piece") && (
                  <div className="col-md-2">
                    <InputField
                      label="MC"
                      name="Making_Charges"
                      value={formData.Making_Charges}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="col-md-2">
                  <InputField
                    label="HUID No"
                    name="HUID_No"
                    value={formData.HUID_No || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <InputField
                    label="Stock Point"
                    name="Stock_Point"
                    type="select"
                    value={formData.Stock_Point || ''}
                    onChange={handleChange}
                    options={[
                      { value: "Display Floor1", label: "Display Floor1" },
                      { value: "Display Floor2", label: "Display Floor2" },
                      { value: "Strong room", label: "Strong room" },
                    ]}
                  />
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
