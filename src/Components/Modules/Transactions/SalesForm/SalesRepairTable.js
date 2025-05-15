import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import axios from 'axios';
import baseURL from "../../../../Url/NodeBaseURL";

const RepairsTable = ({ selectedMobile, tabId, setRepairDetails, handleRepairCheckboxChange }) => {
    const [repairs, setRepairs] = useState([]);
    const [selectedRepairs, setSelectedRepairs] = useState({});

    const fetchRepairs = async () => {
        try {
            const response = await axios.get(`${baseURL}/get/repairs`);
            setRepairs(response.data);
            console.log("Repairs=", response.data);
        } catch (error) {
            console.error('Error fetching repairs:', error);
        }
    };

    useEffect(() => {
        fetchRepairs();
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Filter repairs based on selectedMobile and status
    const filteredRepairs = repairs.filter(
        (repair) =>
            repair.mobile === selectedMobile &&
            repair.status === 'Receive from Workshop'
    );

    const handleCheckboxChange = (repair, isChecked) => {
        const storageKey = `repairDetails_${tabId}`;
        const existingData = JSON.parse(localStorage.getItem(storageKey)) || [];

        if (isChecked) {
            // Pick only the desired fields
            const filteredRepair = {
                sub_category: repair.item,
                product_name: repair.item,
                customer_id: repair.customer_id,
                account_name: repair.account_name,
                mobile: repair.mobile,
                email: repair.email,
                address1: repair.address1,
                address2: repair.address2,
                city: repair.city,
                metal_type: repair.metal_type,
                purity: repair.purity,
                category: repair.category,
                gross_weight: repair.gross_weight,
                total_weight_av:repair.gross_weight,
                printing_purity:repair.purity,
                selling_purity:repair.purity,
                qty: repair.qty,
                total_price: repair.total_amt,
                repair_no: repair.repair_no, // Include to identify uniquely
            };

            // Add only if not already present
            const alreadyExists = existingData.some(item => item.repair_no === repair.repair_no);
            if (!alreadyExists) {
                const updatedData = [...existingData, filteredRepair];
                localStorage.setItem(storageKey, JSON.stringify(updatedData));
                setRepairDetails(updatedData);
            }

            

            setSelectedRepairs({ ...selectedRepairs, [repair.repair_no]: true });

        } else {
            // Remove item by repair_no
            const updatedData = existingData.filter(item => item.repair_no !== repair.repair_no);
            localStorage.setItem(storageKey, JSON.stringify(updatedData));

            const updatedSelection = { ...selectedRepairs };
            delete updatedSelection[repair.repair_no];
            setSelectedRepairs(updatedSelection);
            setRepairDetails([]); 
        }
    };

    return (
        <div style={{ paddingBottom: "15px" }}>
            <div className="table-responsive">
                <Table bordered hover style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>SI</th>
                            <th>Date</th>
                            <th>Mobile</th>
                            <th>Account</th>
                            <th>Repair No</th>
                            <th>Item Name</th>
                            <th>Metal Type</th>
                            <th>Purity</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRepairs.length > 0 ? (
                            filteredRepairs.map((repair, index) => (
                                <tr key={index}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={!!selectedRepairs[repair.repair_no]}
                                            onChange={(e) =>
                                                handleRepairCheckboxChange(repair, e.target.checked)
                                            }
                                        />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{formatDate(repair.date)}</td>
                                    <td>{repair.mobile}</td>
                                    <td>{repair.account_name}</td>
                                    <td>{repair.repair_no || '-'}</td>
                                    <td>{repair.item || '-'}</td>
                                    <td>{repair.metal_type || '-'}</td>
                                    <td>{repair.purity || '-'}</td>
                                    <td>{repair.total_amt || '-'}</td>
                                    <td>{repair.status || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center">No Repairs found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default RepairsTable;
