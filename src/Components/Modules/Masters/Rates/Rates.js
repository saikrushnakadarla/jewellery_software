import React, { useState } from 'react';
import './Rates.css';
import InputField from "../../../Pages/InputField/InputField";

const Rates = () => {
    const [rates, setRates] = useState({
        currentDate: "2024-11-19",
        gold16: "70000.00",
        gold18: "75000.00",
        gold22: "77000.00",
        gold24: "85000.00",
        silverRate: "1000.00",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRates((prevRates) => ({
            ...prevRates,
            [name]: value,
        }));
    };

    const handleUpdateRates = () => {
        console.log("Updated Rates:", rates);
        // Add logic to save rates to the database or API
        alert("Rates updated successfully!");
    };

    return (
        <div className="main-container">
            <div className="rate-container">
                <h3 style={{ textAlign: 'center' }} className="title">ENTER TODAY RATE</h3>
                <div className="form-section">
                    <InputField
                        label="Current Date:"
                        name="currentDate"
                        type="date"
                        value={rates.currentDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-section">
                    <h3 style={{ textAlign: 'center', marginBottom: '20px' }} className="sub-title">Enter Today Gold Rate</h3>
                    <div className="form-row">
                        <InputField
                            label="16 Crt"
                            name="gold16"
                            type="text"
                            value={rates.gold16}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="18 Crt"
                            name="gold18"
                            type="text"
                            value={rates.gold18}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="22 Crt"
                            name="gold22"
                            type="text"
                            value={rates.gold22}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="24 Crt"
                            name="gold24"
                            type="text"
                            value={rates.gold24}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3 style={{ textAlign: 'center' }} className="sub-title">Enter Today Silver Rate</h3>
                    <InputField
                        label="Silver Rate:"
                        name="silverRate"
                        type="text"
                        value={rates.silverRate}
                        onChange={handleInputChange}
                    />
                </div>

                <button className="continue-btn" onClick={handleUpdateRates}>UPDATE</button>
            </div>
        </div>
    );
};

export default Rates;


// import React, { useState } from 'react';
// import './Rates.css';
// import InputField from "../../../Pages/InputField/InputField";

// const Rates = () => {
//     const [rates, setRates] = useState({
//         currentDate: "",
//         gold16: "",
//         gold18: "",
//         gold22: "",
//         gold24: "",
//         silverRate: "",
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setRates((prevRates) => ({
//             ...prevRates,
//             [name]: value,
//         }));
//     };

//     const handleUpdateRates = () => {
//         console.log("Updated Rates:", rates);
//         // Add logic to save rates to the database or API
//         alert("Rates updated successfully!");
//     };

//     return (
//         <div className="main-container">
//             <div className="rate-container">
//                 <h3 style={{ textAlign: 'center' }} className="title">ENTER TODAY RATE</h3>
//                 <div className="form-section">
//                     <InputField
//                         label="Current Date:"
//                         name="currentDate"
//                         type="date"
//                         value={rates.currentDate}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 <div className="form-section">
//                     <h3 style={{ textAlign: 'center', marginBottom: '20px' }} className="sub-title">Enter Today Gold Rate</h3>
//                     <div className="form-row">
//                         <InputField
//                             label="16 Crt"
//                             name="gold16"
//                             type="text"
//                             value={rates.gold16}
//                             onChange={handleInputChange}
//                         />
//                         <InputField
//                             label="18 Crt"
//                             name="gold18"
//                             type="text"
//                             value={rates.gold18}
//                             onChange={handleInputChange}
//                         />
//                         <InputField
//                             label="22 Crt"
//                             name="gold22"
//                             type="text"
//                             value={rates.gold22}
//                             onChange={handleInputChange}
//                         />
//                         <InputField
//                             label="24 Crt"
//                             name="gold24"
//                             type="text"
//                             value={rates.gold24}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                 </div>

//                 <div className="form-section">
//                     <h3 style={{ textAlign: 'center' }} className="sub-title">Enter Today Silver Rate</h3>
//                     <InputField
//                         label="Silver Rate:"
//                         name="silverRate"
//                         type="text"
//                         value={rates.silverRate}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 <button className="continue-btn" onClick={handleUpdateRates}>UPDATE</button>
//             </div>
//         </div>
//     );
// };

// export default Rates;
