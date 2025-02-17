import React, { useState, useEffect } from 'react';
import './Rates.css';
import InputField from '../../../Pages/InputField/InputField';
import baseURL from "../../../../Url/NodeBaseURL";
import { useNavigate } from 'react-router-dom';

const Rates = () => {
    const [rates, setRates] = useState({
        currentDate: new Date().toISOString().split('T')[0], // Set today's date by default
        gold16: '',
        gold18: '',
        gold22: '',
        gold24: '',
        silverRate: '',
    });

    const navigate = useNavigate(); // Initialize navigate
    // const [allowEdit, setAllowEdit] = useState(false); // Track if editing is allowed for all fields

     // Separate state for each field confirmation
     const [allowEdit16, setAllowEdit16] = useState(false);
     const [allowEdit18, setAllowEdit18] = useState(false);
     const [allowEdit24, setAllowEdit24] = useState(false);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch(`${baseURL}/get/current-rates`);
                const result = await response.json();

                if (response.ok) {
                    const utcDate = new Date(result.rate_date);
                    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
                    const formattedDate = localDate.toISOString().split('T')[0];

                    setRates({
                        // currentDate: formattedDate,
                        gold16: result.rate_16crt,
                        gold18: result.rate_18crt,
                        gold22: result.rate_22crt,
                        gold24: result.rate_24crt,
                        silverRate: result.silver_rate,
                    });
                } else {
                    console.error('Error fetching rates:', result);
                }
            } catch (error) {
                console.error('An error occurred while fetching rates:', error);
            }
        };

        fetchRates();
    }, []);

    const calculateRates = (gold22) => {
        const gold22Value = parseFloat(gold22) || 0;
    
        return {
            gold16: Math.round((gold22Value * 16) / 22),
            gold18: Math.round((gold22Value * 18) / 22),
            gold24: Math.round((gold22Value * 24) / 22),
        };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'gold16' && !allowEdit16) {
            const confirmChange = window.confirm("You are modifying the 16K gold rate. Do you want to proceed?");
            if (!confirmChange) return;
            setAllowEdit16(true);
        }

        if (name === 'gold18' && !allowEdit18) {
            const confirmChange = window.confirm("You are modifying the 18K gold rate. Do you want to proceed?");
            if (!confirmChange) return;
            setAllowEdit18(true);
        }

        if (name === 'gold24' && !allowEdit24) {
            const confirmChange = window.confirm("You are modifying the 24K gold rate. Do you want to proceed?");
            if (!confirmChange) return;
            setAllowEdit24(true);
        }
        
        if (name === 'gold22') {
            const calculatedRates = calculateRates(value);
            setRates((prevRates) => ({
                ...prevRates,
                gold22: value,
                gold16: calculatedRates.gold16.toFixed(2),
                gold18: calculatedRates.gold18.toFixed(2),
                gold24: calculatedRates.gold24.toFixed(2),
            }));
        } else {
            setRates((prevRates) => ({
                ...prevRates,
                [name]: value,
            }));
        }
    };

    const handleUpdateRates = async () => {
        const { currentDate, gold16, gold18, gold22, gold24, silverRate } = rates;

        const requestData = {
            rate_date: new Date().toISOString().split('T')[0],
            rate_time: new Date().toLocaleTimeString(),
            rate_16crt: gold16,
            rate_18crt: gold18,
            rate_22crt: gold22,
            rate_24crt: gold24,
            silver_rate: silverRate,
        };

        try {
            const response = await fetch(`${baseURL}/post/rates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Rates updated successfully!');
                console.log(result);
                navigate('/dashboard'); // Redirect to Dashboard
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            alert('An error occurred while updating the rates.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="main-container">
            <div className="rate-container">
                <h3 style={{ textAlign: 'center' }} className="title">
                    ENTER TODAY RATE
                </h3>
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
                    <h3 style={{ textAlign: 'center', marginBottom: '20px' }} className="sub-title">
                        Enter Today Gold Rate
                    </h3>
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
                    <h3 style={{ textAlign: 'center' }} className="sub-title">
                        Enter Today Silver Rate
                    </h3>
                    <InputField
                        label="Silver Rate:"
                        name="silverRate"
                        type="text"
                        value={rates.silverRate}
                        onChange={handleInputChange}
                    />
                </div>

                <button className="continue-btn" onClick={handleUpdateRates}>
                    UPDATE
                </button>
            </div>
        </div>
    );
};
export default Rates;
