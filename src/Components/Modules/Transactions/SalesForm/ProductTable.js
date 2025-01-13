import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const RepairDetailsTable = ({ repairDetails, onEdit, onDelete }) => {
  const location = useLocation(); // Access location object
  const repairDetail = location.state?.repairDetails.repeatedData || []; // Retrieve the repairDetails from state

  // Determine the data to display based on navigation
  const dataToDisplay = repairDetail.length > 0 ? repairDetail : repairDetails;

  useEffect(() => {
    console.log('Data passed to /sales:', repairDetail); // Log the repairDetails
  }, [repairDetail]);

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Invoice Number</th>
          <th>Code</th>
          <th>Product Name</th>
          <th>Metal Type</th>
          <th>Design Name</th>
          <th>Purity</th>
          <th>Gross Weight</th>
          <th>Stone Weight</th>
          <th>Stone Price</th>
          <th>Weight BW</th>
          <th>Wastage On</th>
          <th>VA%</th>
          <th>Wastage Weight</th>
          <th>Total Weight AW</th>
          <th>Making Charges On</th>
          <th>MC Per Gram</th>
          <th>Making Charges</th>
          <th>Rate</th>
          <th>Rate Amount</th>
          <th>Tax %</th>
          <th>Tax Amount</th>
          <th>Total Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {dataToDisplay.length > 0 ? (
          dataToDisplay.map((detail, index) => (
            <tr key={index}>
              <td>{detail.date}</td>
              <td>{detail.invoice_number}</td>
              <td>{detail.code}</td>
              <td>{detail.product_name}</td>
              <td>{detail.metal_type}</td>
              <td>{detail.design_name}</td>
              <td>{detail.purity}</td>
              <td>{detail.gross_weight}</td>
              <td>{detail.stone_weight}</td>
              <td>{detail.stone_price}</td>
              <td>{detail.weight_bw}</td>
              <td>{detail.va_on}</td>
              <td>{detail.va_percent}</td>
              <td>{detail.wastage_weight}</td>
              <td>{detail.total_weight_av}</td>
              <td>{detail.mc_on}</td>
              <td>{detail.mc_per_gram}</td>
              <td>{detail.making_charges}</td>
              <td>{detail.rate}</td>
              <td>{detail.rate_amt}</td>
              <td>{detail.tax_percent}</td>
              <td>{detail.tax_amt}</td>
              <td>{detail.total_price}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => onEdit(index)}
                  style={{ marginRight: '8px' }}
                >
                  <FaEdit style={{ marginRight: '4px' }} />
                </Button>
                <Button variant="danger" onClick={() => onDelete(index)}>
                  <FaTrashAlt style={{ marginRight: '4px' }} />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="24" className="text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default RepairDetailsTable;
