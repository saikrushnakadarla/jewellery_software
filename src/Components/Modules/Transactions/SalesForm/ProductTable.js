import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ProductTable.css";

const ProductTable = ({ repairDetails, onDelete,onEdit }) => {
  const taxableAmount = repairDetails.reduce((sum, item) => {
    const stonePrice = parseFloat(item.stone_price) || 0;
    const makingCharges = parseFloat(item.making_charges) || 0;
    const rateAmt = parseFloat(item.rate_amt) || 0;
    return sum + stonePrice + makingCharges + rateAmt;
  }, 0);
  const taxAmount = repairDetails.reduce((sum, item) => sum + parseFloat(item.tax_amt || 0), 0);
  const netAmount = taxableAmount + taxAmount;

  return (
 
    <div style={{ maxHeight: "200px", overflowY: "auto", position: "relative" }}>
    <Table className='dataTable_headerCell1' bordered hover responsive>
      <thead style={{ position: "sticky", top: 0, background: "white", zIndex: 2 }}>
        <tr>
          <th>Code</th>
          <th>Product Name</th>
          <th>Metal Type</th>
          <th>Design Name</th>
          <th>Purity</th>
          <th>Gr Wt</th>
          <th>St Wt</th>
          <th>St Pr</th>
          <th>VA%</th>
          <th>Total Wt AW</th>
          <th>MC On</th>
          <th>MC Per Gram</th>
          <th>MC</th>
          <th>Discount %</th>
          <th>Discount</th>
          <th>Rate</th>
          <th>Tax %</th>
          <th>Tax Amount</th>
          <th>Total Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {repairDetails.length > 0 ? (
          repairDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.code}</td>
              <td>{detail.product_name}</td>
              <td>{detail.metal_type}</td>
              <td>{detail.design_name}</td>
              <td>{detail.purity}</td>
              <td>{detail.gross_weight}</td>
              <td>{detail.stone_weight}</td>
              <td>{detail.stone_price}</td>
              <td>{detail.va_percent}</td>
              <td>{detail.total_weight_av}</td>
              <td>{detail.mc_on}</td>
              <td>{detail.mc_per_gram}</td>
              <td>{detail.making_charges}</td>
              <td>{detail.disscount_percentage}</td>
              <td>{detail.disscount}</td>
              {/* <td>{detail.pieace_cost ?? detail.rate}</td> */}
              <td>{detail.pieace_cost ? detail.pieace_cost : detail.rate}</td>

              <td>{detail.tax_percent}</td>
              <td>{detail.tax_amt}</td>
              <td>{detail.total_price}</td>
              <td>
                {detail.imagePreview ? (
                  <img
                    src={detail.imagePreview}
                    alt="Uploaded"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaEdit
                    onClick={() => onEdit(index)}
                    style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }}
                  />
                  <FaTrash
                    style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
                    onClick={() => onDelete(index)}
                  />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="20" className="text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
  

  );
};

export default ProductTable;
