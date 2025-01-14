import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

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
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Invoice Number</th>
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
          <th>image</th>
          <th>Action</th> {/* Add Action column for delete */}
        </tr>
      </thead>
      <tbody>
        {repairDetails.length > 0 ? (
          repairDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.date}</td>
              <td>{detail.invoice_number}</td>
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
                {detail.product_image ? (
                  <img
                    src={detail.product_image instanceof File ? URL.createObjectURL(detail.product_image) : detail.product_image}
                    alt="Product"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'placeholder-image-url.jpg'; // Add a placeholder image URL
                    }}
                  />
                ) : (
                  'No Image'
                )}
              </td>
               <td>
                            <Button
                            variant="primary"
                            onClick={() => onEdit(index)}
                            style={{ marginRight: "8px" }}
                          >
                           <FaEdit style={{ marginRight: "4px" }} />
                          </Button>
                              <Button variant="danger" onClick={() => onDelete(index)}>  <FaTrashAlt style={{ marginRight: "4px" }} /></Button>
                            </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="25" className="text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
      {/* <tfoot>
        <tr>
          <td colSpan="20" className="text-right">Taxable Amount</td> 
          <td colSpan="5">{taxableAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td colSpan="20" className="text-right">Tax Amount</td> 
          <td colSpan="5">{taxAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td colSpan="20" className="text-right">Net Amount</td> 
          <td colSpan="5">{netAmount.toFixed(2)}</td>
        </tr>
      </tfoot> */}
    </Table>
  );
};

export default ProductTable;
