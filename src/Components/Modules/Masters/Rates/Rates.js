import React from 'react'
import './Rates.css'
import InputField from "../../../Pages/InputField/InputField";


const Rates = () => {
        return (
                <div className="main-container">

                <div className="rate-container">
                        <h3 style={{textAlign:'center'}} className="title">ENTER TODAY RATE</h3>
                        <div className="form-section">
                              
                                <InputField
                                       label="Current Date:"
                                       name="currentDate"
                                       type="date"
                                       required={true}
                                       value="2024-11-19"
                                       readOnly={true}
                                     />
                               
                        </div>

                        <div className="form-section">
                                <h3  style={{textAlign:'center', marginBottom:'20px'}} className="sub-title">Enter Today Gold Rate</h3>
                                <div className="form-row">
                                        <InputField
                                                label="16 Crt"
                                                name="gold16"
                                                type="text"
                                                value="70000.00"
                                                readOnly={true}
                                        />
                                        <InputField
                                                label="18 Crt"
                                                name="gold18"
                                                type="text"
                                                value="75000.00"
                                                readOnly={true}
                                        />
                                        <InputField
                                                label="22 Crt"
                                                name="gold22"
                                                type="text"
                                                value="77000.00"
                                                readOnly={true}
                                        />
                                        <InputField
                                                label="24 Crt"
                                                name="gold24"
                                                type="text"
                                                value="85000.00"
                                                readOnly={true}
                                        />
                                </div>
                        </div>

                        <div className="form-section">
                                <h3 style={{textAlign:'center'}} className="sub-title">Enter Today Silver Rate</h3>
                                <InputField
                                        label="Silver Rate:"
                                        name="silverRate"
                                        type="text"
                                        value="1000.00"
                                        readOnly={true}
                                />
                        </div>

                        <button className="continue-btn">CONTINUE</button>
                </div>
                </div>

        )
}

export default Rates
