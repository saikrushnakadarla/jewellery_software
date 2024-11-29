
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Purchase.css';
import InputField from '../../../Pages/InputField/InputField';


const Purchase = () => {
        const [metal, setMetal] = useState("");

        return (

                <div className="main-container ">

                        <div className="box-last first ">
                                <div className="row  mar-left">
                                        {/* Name Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2">

                                                <InputField label=" Name:" />

                                        </div>

                                        {/* Metal Dropdown */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2">

                                                <InputField
                                                        label="Metal:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "gold", label: "gold" },
                                                                { value: "silver", label: "silver" },

                                                                { value: "platinum", label: "platinum" },


                                                        ]}
                                                />
                                        </div>

                                        {/* Purity Dropdown */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2">

                                                <InputField
                                                        label="Purity:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "918HM", label: "918HM" },
                                                                { value: "916KDM", label: "916KDM" },

                                                                { value: "24K", label: "24K" },


                                                        ]}
                                                />

                                        </div>

                                        {/* A/C Address Input */}
                                        <div className="col-12 col-md-6 col-lg-3 mb-2">

                                                <InputField label=" A/C Address:" />

                                        </div>

                                        {/* GSTIN Input */}
                                        <div className="col-12 col-md-6 col-lg-3 mb-2">

                                                <InputField label=" GSTIN:" />

                                        </div>
                                </div>
                        </div>



                        <div className="box-last">
                                <div className="row mar-left">
                                        {/* Indent Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">

                                                <InputField label=" Indent:" />

                                        </div>

                                        {/* Bill No Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">

                                                <InputField label=" Bill No:" />

                                        </div>

                                        {/* Type Dropdown */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">


                                                <InputField
                                                        label="Type:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "Within State", label: "Within State" },
                                                                { value: "Out of State", label: "Out of State" },



                                                        ]}
                                                />

                                        </div>

                                        {/* Rate-Cut Dropdown */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">

                                                <InputField
                                                        label="Rate-Cut:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "RATE-CUT 1", label: "RATE-CUT 1" },
                                                                { value: "RATE-CUT 2", label: "RATE-CUT 2" },



                                                        ]}
                                                />

                                        </div>

                                        {/* Date Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">

                                                <InputField label=" Date:" type="date" />

                                        </div>

                                        {/* Bill Date Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">

                                                <InputField label=" Bill Date:" type="date" />

                                        </div>

                                        {/* Category Dropdown */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">

                                                <InputField
                                                        label="Category:"
                                                        type="select"
                                                        value={metal}
                                                        onChange={(e) => setMetal(e.target.value)}
                                                        options={[
                                                                { value: "NEW", label: "NEW" },
                                                                { value: "OLD", label: "OLD" },

                                                        ]}
                                                />

                                        </div>

                                        {/* Due Date Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">

                                                <InputField label=" Due Date:" type="date" />

                                        </div>

                                        {/* Rate Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 one-width">

                                                <InputField label="Rate:" />

                                        </div>
                                </div>
                        </div>




                        <div className="main-sec">

                                {/* Section: Row 1 */}
                                <div className="row mar-left ">


                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">

                                                <InputField label="Item Name:" />


                                        </div>

                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">

                                                <InputField label="Design Code:" />
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

                                {/* Section: Row 2 */}
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

                                        {/* Class Dropdown */}
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

                                        {/* Cut Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width">

                                                <InputField label="Cut :" />
                                        </div>

                                        {/* Clarity Input */}
                                        <div className="col-12 col-md-6 col-lg-2 mb-2 r_width ">

                                                <InputField label="Clarity :" />

                                        </div>
                                </div>
                        </div>


                        <button type="submit" className="pur-submit-btn">Save</button>




                </div>

        );
};

export default Purchase;
