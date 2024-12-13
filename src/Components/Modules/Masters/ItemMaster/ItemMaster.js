import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputField from "./Inputfield"; // Assuming you have this component
import StoneDetailsModal from "../../Transactions/StockEntry/StoneDetailsModal";
import "./ItemMaster.css";
import { BsCursor } from "react-icons/bs";

const FormWithTable = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    Pricing: "",
    rbarcode: "",
    design_master: "",
    short_name: "",
    sale_account_head: "",
    purchase_account_head: "",
    tax_slab: "",
    tax_slab_id:"",
    hsn_code: "",
    op_qty: 0,
    op_value: "",
    op_weight: 0,
    maintain_tags: false, // Default as false
    Tag_ID: "",
    Prefix: "tag",
    item_prefix: "",
    Category: "Gold", // Set a default value for Category
    Purity: "",
    purity: "",
    PCode_BarCode: "",
    Gross_Weight: "",
    Stones_Weight: "",
    Stones_Price: "",
    WastageWeight: "",
    huid_no: "",
    HUID_No: "",
    Wastage_On: "",
    Wastage_Percentage: "",
    status: "Available",
    Source: "Tags Entry",
    Stock_Point: "",
    Weight_BW: "",
    TotalWeight_AW: "",
    MC_Per_Gram: "",
    Making_Charges_On: "",
    Making_Charges: "",
    Design_Master: "gold",
    product_name: "",
  });


  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [openTagsEntries, setOpenTagsEntries] = useState([]);
  const navigate = useNavigate();
  const [isMaintainTagsChecked, setIsMaintainTagsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsMaintainTagsChecked((prev) => {
      const newCheckedState = !prev;
      setFormData((prevFormData) => ({
        ...prevFormData,
        maintain_tags: newCheckedState, // Update maintain_tags in formData
      }));
      return newCheckedState;
    });
  };

  const maintainTagsStyle = !isMaintainTagsChecked
    ? {}
    : { backgroundColor: "#f5f5f5", color: "#888", };

  const openingTagsStyle = isMaintainTagsChecked
    ? {}
    : { backgroundColor: "#f5f5f5", color: "#888", cursor: "not-allowed" };

    const handleChange = (e) => {
      const { name, value } = e.target;
    
      if (name === "tax_slab") {
        // Fetch the TaxSlabID based on the selected TaxSlab name
        const selectedTaxSlab = taxOptions.find((option) => option.value === value);
        if (selectedTaxSlab) {
          setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            tax_slab_id: selectedTaxSlab.id, // Store the TaxSlabID
          }));
        }
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    };

  const handleAddOpenTagEntry = (e) => {
    e.preventDefault();

    const newEntry = {
      Pricing: formData.Pricing,
      Tag_ID: formData.Tag_ID,
      Prefix: formData.Prefix,
      Category: formData.Category,
      Purity: formData.Purity,
      PCode_BarCode: formData.PCode_BarCode,
      Gross_Weight: formData.Gross_Weight,
      Stones_Weight: formData.Stones_Weight,
      Stones_Price: formData.Stones_Price,
      WastageWeight: formData.WastageWeight,
      HUID_No: formData.HUID_No,
      Wastage_On: formData.Wastage_On,
      Wastage_Percentage: formData.Wastage_Percentage,
      status: formData.status,
      Source: formData.Source,
      Stock_Point: formData.Stock_Point,
      Weight_BW: formData.Weight_BW,
      TotalWeight_AW: formData.TotalWeight_AW,
      MC_Per_Gram: formData.MC_Per_Gram,
      Making_Charges_On: formData.Making_Charges_On,
      Making_Charges: formData.Making_Charges,
      Design_Master: formData.Design_Master,
    };

    // Update the `op_qty` and `op_weight` fields
    setFormData((prev) => ({
      ...prev,
      op_qty: prev.op_qty + 1, // Increment op_qty
      op_weight: parseFloat(prev.op_weight) + parseFloat(formData.Gross_Weight || 0), // Add Gross_Weight
    }));

    // Add the new entry to the table
    setOpenTagsEntries((prev) => [...prev, newEntry]);

    // Reset other form fields
    setFormData((prev) => ({
      ...prev,
      Pricing: "",
      Tag_ID: "",
      Prefix: "Gold",
      Category: "",
      Purity: "",
      PCode_BarCode: "",
      Gross_Weight: "",
      Stones_Weight: "",
      Stones_Price: "",
      WastageWeight: "",
      HUID_No: "",
      Wastage_On: "",
      Wastage_Percentage: "",
      status: "",
      Source: "",
      Stock_Point: "",
      Weight_BW: "",
      TotalWeight_AW: "",
      MC_Per_Gram: "",
      Making_Charges_On: "",
      Making_Charges: "",
      Design_Master: "",
    }));
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
  // Automatically calculate WastageWeight and TotalWeight_AW
  useEffect(() => {
    const wastagePercentage = parseFloat(formData.Wastage_Percentage) || 0;
    const grossWeight = parseFloat(formData.Gross_Weight) || 0;
    const weightBW = parseFloat(formData.Weight_BW) || 0;

    let wastageWeight = 0;
    let totalWeight = 0;

    if (formData.Wastage_On === "Gross Weight") {
      wastageWeight = (grossWeight * wastagePercentage) / 100;
      totalWeight = grossWeight + wastageWeight;
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

  const [taxOptions, setTaxOptions] = useState([]);
  useEffect(() => {
    const fetchProductIds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get/taxslabs");
        const Data = response.data; // Ensure the response structure matches this
        const options = Data.map((tax) => ({
          value: tax.TaxSlabName,
          label: tax.TaxSlabName,
          id: tax.TaxSlabID, // Ensure you have the TaxSlabID
        }));
        setTaxOptions(options);
      } catch (error) {
        console.error("Error fetching product IDs:", error);
      }
    };
  
    fetchProductIds();
  }, []);

  useEffect(() => {
    handleMakingChargesCalculation();
  }, [formData.Making_Charges_On, formData.MC_Per_Gram, formData.Making_Charges, formData.TotalWeight_AW]);


  const handleSave = async () => {

  try {
    // Ensure Category and other fields are not empty
    const updatedFormData = { ...formData, Category: formData.Category || "Gold" };

    // Save product details, now including tax_slab_id
    const productResponse = await axios.post("http://localhost:5000/api/products", updatedFormData);
    const { product_id } = productResponse.data;

    // Append product_id to openTagsEntries
    const entriesWithProductId = openTagsEntries.map((entry) => ({
      ...entry,
      product_id, // Append product_id to entries
    }));

    // Save opening tag entries
    const saveEntriesPromises = entriesWithProductId.map((entry) =>
      axios.post("http://localhost:5000/api/opening-tags-entry", entry)
    );

    await Promise.all(saveEntriesPromises);
    alert("Data saved successfully!");

    // Reset the form fields
    setFormData({
      product_name: "",
      rbarcode: "",
      Category: "",
      design_master: "",
      purity: "",
      item_prefix: "",
      short_name: "",
      sale_account_head: "",
      purchase_account_head: "",
      status: "",
      tax_slab: "",
      tax_slab_id: "", // Reset tax_slab_id
      hsn_code: "",
      op_qty: "",
      op_value: "",
      op_weight: "",
      huid_no: "",
    });
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Failed to save data. Please try again.");
  }
};

  const handleBack = () => {
    navigate("/itemmastertable");
  };

  return (
    <div style={{ paddingTop: "90px" }}>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            {/* Tab Navigation */}
          </div>
        </div>
        <div className="row mt-3 itemmaster-form-container">
          <div className="col-12" style={{ marginTop: '-55px' }}>

            {/* product details dection */}
            <div className="form-container">
              <h4 style={{ marginBottom: "15px" }}>Product Details</h4>
              <div className="form-row">

                <InputField
                  label="Product Name:"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                />
                <InputField
                  label="Rbarcode:"
                  name="rbarcode"
                  value={formData.rbarcode}
                  onChange={handleChange}
                />
                <InputField
                  label="Categories:"
                  name="Category"
                  type="select"
                  value={formData.Category}
                  onChange={handleChange}
                  options={[
                    { value: "Jewellery", label: "Jewellery" },
                    { value: "Gold", label: "Gold" },
                    { value: "Silver", label: "Silver" },
                  ]}
                />
                <InputField

                  label="Design Master:"
                  name="design_master"
                  type="select"
                  value={formData.design_master}
                  onChange={handleChange}
                  options={[
                    { value: "Jewellery", label: "Jewellery" },
                    { value: "Gold", label: "Gold" },
                    { value: "Silver", label: "Silver" },
                  ]}
                />
                <InputField
                  label="Purity:"
                  type="select"
                  name="purity"
                  value={formData.purity}
                  onChange={handleChange}
                  options={[
                    { value: "91.6HM", label: "91.6HM" },
                    { value: "22K", label: "22K" },
                    { value: "18K", label: "18K" },
                  ]}
                />
                <InputField
                  label="Item Prefix:"
                  name="item_prefix"
                  value={formData.item_prefix}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Short Name:"
                  name="short_name"
                  value={formData.short_name}
                  onChange={handleChange}
                />
                <InputField
                  label="Sale Account Head:"
                  name="sale_account_head"
                  type="select"
                  value={formData.sale_account_head}
                  onChange={handleChange}
                  options={[
                    { value: "Sales", label: "Sales" },
                    { value: "Purchase", label: "Purchase" },
                  ]}
                />
                <InputField
                  label="Purchase Account Head:"
                  name="purchase_account_head"
                  type="select"
                  value={formData.purchase_account_head}
                  onChange={handleChange}
                  options={[
                    { value: "Purchase", label: "Purchase" },
                    { value: "Sales", label: "Sales" },
                  ]}
                />
                <InputField
                  label="Status:"
                  name="status"
                  type="select"
                  value={formData.status}
                  onChange={handleChange}
                  options={[
                    { value: "ACTIVE", label: "ACTIVE" },
                    { value: "INACTIVE", label: "INACTIVE" },
                  ]}
                />
                <InputField
                  label="Tax Slab:"
                  name="tax_slab"
                  type="select"
                  value={formData.tax_slab}
                  onChange={handleChange}
                  options={taxOptions}
                />
                <InputField label="HSN Code:"
                  name="hsn_code"
                  value={formData.hsn_code}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* maintain tags section */}
            <div className="form-container" style={{ marginTop: "15px" }}>
              {/* Maintain Tags Section */}
              <div className="main-tags-row" style={{ marginBottom: "15px" }}>
                <input
                  type="checkbox"
                  id="main-tags"
                  name="maintain_tags"
                  style={{ width: "35px" }}
                  checked={isMaintainTagsChecked}
                  onChange={handleCheckboxChange}
                  value={formData.maintain_tags}
                />
                <label htmlFor="main-tags">
                  <h4>Maintain Tags</h4>
                </label>
              </div>
              <div className="form-row" style={{ marginBottom: "-20px" }}>
                <InputField
                  label="OP.Qty:"
                  name="op_qty"
                  value={formData.op_qty}
                  onChange={handleChange}
                  readOnly={isMaintainTagsChecked}
                  style={maintainTagsStyle}
                />
                <InputField
                  label="OP.Value:"
                  name="op_value"
                  value={formData.op_value}
                  onChange={handleChange}
                  readOnly={isMaintainTagsChecked}
                  style={maintainTagsStyle}
                />
                <InputField
                  label="OP.Weight:"
                  name="op_weight"
                  value={formData.op_weight}
                  onChange={handleChange}
                  readOnly={isMaintainTagsChecked}
                  style={maintainTagsStyle}
                />
                <InputField
                  label="HUID No:"
                  name="huid_no"
                  value={formData.huid_no}
                  onChange={handleChange}
                  readOnly={isMaintainTagsChecked}
                  style={maintainTagsStyle}
                />
              </div>


            </div>
          </div>

          {/* Opening Tags Entry Section */}
          <div className="form-container" style={{ marginTop: "15px" }}>
            <h4 style={{ marginBottom: "15px" }}>Opening Tags Entry</h4>
            <form onSubmit={handleAddOpenTagEntry}>
              <div className="form-row">
                <InputField
                  label="Pricing:"
                  type="select"
                  name="Pricing"
                  value={formData.Pricing}
                  onChange={handleChange}
                  options={[
                    { value: "By Weight", label: "By Weight" },
                    { value: "By Fixed", label: "By Fixed" },
                  ]}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="Tag ID:"
                  name="Tag_ID"
                  type="text"
                  value={formData.Tag_ID}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="Prefix:"
                  value="Gold"
                  readOnly
                  style={openingTagsStyle}
                />
                <InputField
                  label="Purity:"
                  type="select"
                  name="Purity"
                  value={formData.Purity}
                  onChange={handleChange}
                  options={[
                    { value: "916HM", label: "916HM" },
                    { value: "22K", label: "22K" },
                    { value: "18K", label: "18K" },
                  ]}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="PCode/BarCode:"
                  name="PCode_BarCode"
                  type="text"
                  value={formData.PCode_BarCode}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Gross Weight:"
                  name="Gross_Weight"
                  value={formData.Gross_Weight}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="Stones Weight:"
                  name="Stones_Weight"
                  value={formData.Stones_Weight}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <button
                  type="button"
                  style={{ backgroundColor: '#a36e29' }}
                  className="stone-details-btn"
                  onClick={handleOpenModal}
                  readOnly={!isMaintainTagsChecked}
                >
                  Stone Details
                </button>
                <InputField
                  label="Stones Price:"
                  name="Stones_Price"
                  value={formData.Stones_Price}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="Weight BW:"
                  name="Weight_BW"
                  value={formData.Weight_BW}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="HUID No:"
                  name="HUID_No"
                  value={formData.HUID_No}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
              </div>
              <div className="form-row" style={{ marginBottom: '-20px' }}>
                <InputField
                  label="Wastage On:"
                  type="select"
                  name="Wastage_On"
                  value={formData.Wastage_On}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                  options={[
                    { value: "Gross Weight", label: "Gross Weight" },
                    { value: "Weight BW", label: "Weight BW" },
                  ]}
                />
                <InputField
                  label="Wastage %:"
                  value={formData.Wastage_Percentage}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                  name="Wastage_Percentage"
                />
                <InputField
                  label="Wastage Weight:"
                  name="WastageWeight"
                  value={formData.WastageWeight}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="Total Weight AW:"
                  name="TotalWeight_AW"
                  value={formData.TotalWeight_AW}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="Making Charges On:"
                  type="select"
                  value={formData.Making_Charges_On}
                  onChange={handleChange}
                  name="Making_Charges_On"
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                  options={[
                    { value: "By Weight", label: "By Weight" },
                    { value: "Fixed", label: "Fixed" },
                  ]}
                />
                <InputField
                  label="Mc Per Gram:"
                  name="MC_Per_Gram"
                  value={formData.MC_Per_Gram}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="Making Charges:"
                  name="Making_Charges"
                  value={formData.Making_Charges}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                />
                <InputField
                  label="Stock Point:"
                  type="select"
                  name="Stock_Point"
                  value={formData.Stock_Point}
                  onChange={handleChange}
                  readOnly={!isMaintainTagsChecked}
                  style={openingTagsStyle}
                  options={[
                    { value: "Main Store", label: "Main Store" },
                    { value: "Secondary Store", label: "Secondary Store" },
                  ]}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                readOnly={!isMaintainTagsChecked}
                disabled={!isMaintainTagsChecked} // Disable the button when isMaintainTagsChecked is false
                style={{
                  backgroundColor: isMaintainTagsChecked ? "#a36e29" : "#f5f5f5",
                  borderColor: isMaintainTagsChecked ? "#a36e29" : "#f5f5f5",
                  marginLeft: "95%",
                  marginTop: "15px",
                  ...openingTagsStyle,
                }}
              >
                Add
              </button>


            </form>

            <button
              type="button"
              className="cus-back-btn"
              variant="secondary"
              onClick={handleBack} style={{ backgroundColor: 'gray', marginRight: '10px', marginTop: '10px' }}
            >
              cancel
            </button>
            {/* Add additional fields similarly */}
            <button className="btn btn-primary" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }} onClick={handleSave}>
              Save
            </button>

            {/* table Section */}
            <div style={{ overflowX: "scroll" }}>
              <table className="table mt-4">
                <thead>
                  <tr>
                    {Object.keys(openTagsEntries[0] || {}).map((key) => (
                      <th key={key}>{key.replace(/_/g, " ")}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {openTagsEntries.map((entry, index) => (
                    <tr key={index}>
                      {Object.keys(entry).map((key) => (
                        <td key={key}>{entry[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <StoneDetailsModal
              showModal={showModal}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWithTable;