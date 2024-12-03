
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Purchase.css';
import InputField from '../../../Pages/InputField/InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Purchase = () => {

        const [formData, setFormData] = useState({
                name: "",
                metal: "",
                purity: "",
                a_c_address: "",
                gst_in: "",
                indent: "",
                bill_no: "",
                type: "",
                rate_cut: "",
                date: "",
                bill_date: "",
                category: "",
                due_date: "",
                rate: "",
                item_name: "",
                design_code: "",
                hsn: "",
                type_unit: "",
                stock_type: "",
                pcs: "",
                gross: "",
                stone: "",
                net: "",
                purity_unit: "",
                rate_unit_one: "",
                unit: "",
                w_percentage: "",
                waste: "",
                pure_wt: "",
                alloy: "",
                cost: "",
                total_wt: "",
                wt_rate_amount: "",
                mc_per_gm: "",
                mc: "",
                stn_amount: "",
                total: "",
                stone_unit: "",
                pcs_stn: "",
                ct: "",
                gms: "",
                cwp: "",
                rate_unit_two: "",
                clear: "",
                class_type: "",
                cut: "",
                clarity: "",
        });

        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                        const response = await axios.post("http://localhost:5000/post/purchase_form", formData);
                        console.log("Form submitted successfully:", response.data);
                        alert("Form submitted successfully!");
                } catch (error) {
                        console.error("Error submitting form:", error);
                        alert("Error submitting form. Please try again.");
                }
        };


        const navigate = useNavigate();
  const handleBack = () => {
    navigate('/purchasetable'); 
  };

        const [metal, setMetal] = useState("");
        return (
                <div className="main-container ">
                        <div className="box-last first ">
                                <div className="row  mar-left">
                                        {/* Name Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2">
                                                {/* <InputField label=" Name:" /> */}
                                                <InputField
                                                        label="Name:"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2">
                                                {/* <InputField
                                                        label="Metal:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "gold", label: "gold" },
                                                                { value: "silver", label: "silver" },
                                                                { value: "platinum", label: "platinum" },
                                                        ]}
                                                /> */}
                                                <InputField
                                                        label="Metal:"
                                                        name="metal"
                                                        type="select"
                                                        value={formData.metal}
                                                        onChange={handleChange}
                                                        options={[
                                                                { value: "Gold", label: "Gold" },
                                                                { value: "Silver", label: "Silver" },
                                                                { value: "Platinum", label: "Platinum" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2">
                                                {/* <InputField
                                                        label="Purity:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "918HM", label: "918HM" },
                                                                { value: "916KDM", label: "916KDM" },
                                                                { value: "24K", label: "24K" },
                                                        ]}
                                                /> */}
                                                <InputField
                                                        label="Purity:"
                                                        type="select"
                                                        name="purity"
                                                        value={formData.purity}
                                                        onChange={handleChange}
                                                        options={[
                                                                { value: "22.5", label: "22.5" },
                                                                { value: "24", label: "24" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3 mb-2">
                                                <InputField
                                                        label="A/C Address:"
                                                        name="a_c_address"
                                                        value={formData.a_c_address}
                                                        onChange={handleChange}
                                                />                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3 mb-2">
                                                <InputField
                                                        label="GSTIN:"
                                                        name="gst_in"
                                                        value={formData.gst_in}
                                                        onChange={handleChange}
                                                />                                        </div>
                                </div>
                        </div>
                        <div className="box-last">
                                <div className="row mar-left">
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">
                                                {/* <InputField label=" Indent:" /> */}
                                                <InputField
                                                        label="Indent:"
                                                        name="indent"
                                                        value={formData.indent}
                                                        onChange={handleChange}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">
                                                {/* <InputField label=" Bill No:" /> */}
                                                <InputField
                                                        label="Bill No:"
                                                        name="bill_no"
                                                        value={formData.bill_no}
                                                        onChange={handleChange}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">
                                                {/* <InputField
                                                        label="Type:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "Within State", label: "Within State" },
                                                                { value: "Out of State", label: "Out of State" },
                                                        ]}
                                                /> */}


                                                <InputField
                                                        label="Type:"
                                                        type="select"
                                                        name="type"
                                                        value={formData.type}
                                                        onChange={handleChange}
                                                        options={[
                                                                { value: "Within State", label: "Within State" },
                                                                { value: "Out of State", label: "Out of State" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">
                                                <InputField
                                                        label="Rate-Cut:"
                                                        name="rate_cut"
                                                        type="select"
                                                        value={formData.rate_cut}
                                                        onChange={handleChange}
                                                        options={[
                                                                { value: "RATE-CUT 1", label: "RATE-CUT 1" },
                                                                { value: "RATE-CUT 2", label: "RATE-CUT 2" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">
                                                {/* <InputField label=" Date:" type="date" /> */}
                                                <InputField
                                                        label="Date:"
                                                        name="date"
                                                        type="date"
                                                        value={formData.date}
                                                        onChange={handleChange}
                                                />

                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">
                                                {/* <InputField label=" Bill Date:" type="date" /> */}
                                                <InputField
                                                        label="Bill Date:"
                                                        name="bill_date"
                                                        type="date"
                                                        value={formData.bill_date}
                                                        onChange={handleChange}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">
                                                <InputField
                                                        label="Category:"
                                                        name="category"
                                                        type="select"
                                                        value={formData.category}
                                                        onChange={handleChange}
                                                        options={[
                                                                { value: "NEW", label: "NEW" },
                                                                { value: "OLD", label: "OLD" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">
                                                {/* <InputField label=" Due Date:" type="date" /> */}
                                                <InputField
                                                        label="Due Date:"
                                                        name="due_date"
                                                        type="date"
                                                        value={formData.due_date}
                                                        onChange={handleChange}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">
                                                {/* <InputField label="Rate:" /> */}
                                                <InputField
                                                        label="Rate:"
                                                        name="rate"
                                                        value={formData.rate}
                                                        onChange={handleChange}
                                                />
                                        </div>
                                </div>
                        </div>
                        <div className="main-sec">
                                <div className="row mar-left ">
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                {/* <InputField label="Item Name:" /> */}
                                                <InputField
                                                        label="Item Name:"
                                                        name="item_name"
                                                        value={formData.item_name}
                                                        onChange={handleChange}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                {/* <InputField label="Design Code:" /> */}
                                                <InputField
                                                        label="Design Code:"
                                                        name="item_name"
                                                        value={formData.item_name}
                                                        onChange={handleChange}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" HSN:" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField
                                                        label="Type:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "Finished", label: "Finished" },
                                                                { value: "Raw", label: "Raw" },
                                                                { value: "Semi-Finished", label: "Semi-Finished" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField
                                                        label="Stock Type:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "In Stock", label: "In Stock" },
                                                                { value: "Out of Stock", label: "Out of Stock" },
                                                                { value: "Reserved", label: "Reserved" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Pcs:" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Gross:" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Stone:" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Net:" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Purity:" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Rate:" />
                                        </div>
                                </div>
                                <div className="row mar-left">
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Unit:" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" W% :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Waste :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Pure Wt :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Alloy :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Cost :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Tot Wt :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width ">
                                                <InputField label=" WT*Rate Amt :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" MC/GM :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" MC :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label=" Stn. Amt :" />
                                        </div>
                                </div>
                                <div className="row mar-left">
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label="Total :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField
                                                        label="Stone :"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "Diamond", label: "Diamond" },
                                                                { value: "Ruby", label: "Ruby" },
                                                                { value: "Emerald", label: "Emerald" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label="Pcs :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label="CT :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label="Gms :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField
                                                        label="CWP :"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "Yes", label: "Yes" },
                                                                { value: "No", label: "No" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label="Rate :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label="Clear :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField
                                                        label="Class :"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "Class A", label: "Class A" },
                                                                { value: "Class B", label: "Class B" },
                                                                { value: "Class C", label: "Class C" },
                                                        ]}
                                                />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">
                                                <InputField label="Cut :" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width ">
                                                <InputField label="Clarity :" />
                                        </div>
                                </div>
                        </div>
                        {/* <button type="submit" className="pur-submit-btn">Save</button> */}
                        <div className="sup-button-container">
                                <button
                                        type="button"
                                        className="pur-cus-back-btn"
                                        onClick={handleBack}
                                >
                                        Back
                                </button>
                                <button
                                        type="submit"
                                        className="pur-submit-btn"
                                >
                                        Save
                                </button>
                        </div>
                </div>
        );
};
export default Purchase;
