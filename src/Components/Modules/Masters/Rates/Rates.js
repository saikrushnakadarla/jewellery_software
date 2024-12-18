

import React, { useState, useEffect } from 'react';
import './Rates.css';
import InputField from '../../../Pages/InputField/InputField';

const Rates = () => {
    const [rates, setRates] = useState({
        currentDate: '',
        gold16: '',
        gold18: '',
        gold22: '',
        gold24: '',
        silverRate: '',
    });

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('http://localhost:5000/get/current-rates');
                const result = await response.json();

                if (response.ok) {
                    // Adjust UTC date to the local timezone
                    const utcDate = new Date(result.rate_date);
                    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000); // Adjust to local timezone
                    const formattedDate = localDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

                    setRates({
                        currentDate: formattedDate,
                        gold16: result.rate_16crt,
                        gold18: result.rate_18crt,
                        gold22: result.rate_22crt,
                        gold24: result.rate_24crt,
                        silverRate: result.silver_rate,
                    });
                    console.log("Rates=",rates)
                } else {
                    console.error('Error fetching rates:', result);
                }
            } catch (error) {
                console.error('An error occurred while fetching rates:', error);
            }
        };

        fetchRates();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRates((prevRates) => ({
            ...prevRates,
            [name]: value,
        }));
    };

    const handleUpdateRates = async () => {
        const { currentDate, gold16, gold18, gold22, gold24, silverRate } = rates;

        const requestData = {
            rate_date: currentDate,
            rate_time: new Date().toLocaleTimeString(),
            rate_16crt: gold16,
            rate_18crt: gold18,
            rate_22crt: gold22,
            rate_24crt: gold24,
            silver_rate: silverRate,
        };

        try {
            const response = await fetch('http://localhost:5000/post/rates', {
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


