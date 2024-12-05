import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/DataTable'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col, Form } from 'react-bootstrap';
// import './EstimateTable.css';

const RepairsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID.',
        accessor: 'product_id',
      },

      {
        Header: 'Product Code',
        accessor: 'pcode',
      },
      {
        Header: 'Product Name',
        accessor: 'product_name',
      },
      {
        Header: 'Gross Weight',
        accessor: 'gross_weight',
      },
      {
        Header: 'Stone Weight',
        accessor: 'stones_weight',
      },
      {
        Header: 'Stone Price',
        accessor: 'stones_price',
      },
      {
        Header: 'Weight WW',
        accessor: 'weight_ww',
      },
      {
        Header: 'Wastage Percent',
        accessor: 'wastage_percent',
      },
      {
        Header: 'Wastage',
        accessor: 'wastage',
      },
      {
        Header: 'Net Weight',
        accessor: 'nett_weight',
      },
      {
        Header: 'Rate Average',
        accessor: 'rate_av',
      },
      {
        Header: 'Rate (10g)',
        accessor: 'rate_10g',
      },
      {
        Header: 'Rate (1g)',
        accessor: 'rate_1g',
      },
      {
        Header: 'MC Per Gram',
        accessor: 'mc_per_gram',
      },
      {
        Header: 'Total Before Tax',
        accessor: 'total_b4_tax',
      },
      {
        Header: 'Total MC',
        accessor: 'total_mc',
      },
      {
        Header: 'Tax Percent',
        accessor: 'tax_percent',
      },
      {
        Header: 'Tax VAT Amount',
        accessor: 'tax_vat_amount',
      },
      {
        Header: 'Total Rs',
        accessor: 'total_rs',
      },
     
      {
        Header: 'Action',
       

      },

    ],
    []
  );


  return (
    
     
      <DataTable columns={columns} data={data} />
   
  );
};

export default RepairsTable;
