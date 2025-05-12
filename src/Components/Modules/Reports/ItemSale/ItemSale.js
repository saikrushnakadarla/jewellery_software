import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, useExpanded } from 'react-table';
import { FaEdit, FaTrash, FaEye, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Button, Row, Col, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import baseURL from '../../../../Url/NodeBaseURL';

const ItemSale = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [repairDetails, setRepairDetails] = useState(null);

  // Group data by category, sub_category, and design_name
  const groupByItem = (data) => {
    const grouped = data.reduce((acc, item) => {
      const key = `${item.category}-${item.sub_category}-${item.design_name}`;
      if (!acc[key]) {
        acc[key] = {
          category: item.category,
          sub_category: item.sub_category,
          design_name: item.design_name,
          metal_type: item.metal_type,
          invoices: []
        };
      }
      acc[key].invoices.push(item);
      return acc;
    }, {});

    return Object.values(grouped);
  };

  // Main columns for the grouped data
  const columns = React.useMemo(
    () => [
      {
        Header: '',
        id: 'expander',
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        ),
      },
      {
        Header: 'Sr. No.',
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Sub Category',
        accessor: 'sub_category',
      },
      {
        Header: 'Metal Type',
        accessor: 'metal_type',
      },
      {
        Header: 'Design Name',
        accessor: 'design_name',
      },
      {
        Header: 'Total Qty',
        accessor: 'invoices',
        Cell: ({ value }) => value.length,
      },
    //   {
    //     Header: 'Total Amt',
    //     accessor: 'total_amount',
    //     Cell: ({ row }) => {
    //       const total = row.original.invoices.reduce(
    //         (sum, invoice) => sum + (parseFloat(invoice.net_amount) || 0),
    //         0
    //       );
    //       return total.toFixed(2);
    //     },
    //   },
    ],
    []
  );

  // Columns for the expanded invoice rows
  const invoiceColumns = React.useMemo(
    () => [
      {
        Header: 'Invoice No.',
        accessor: 'invoice_number',
      },
      {
        Header: 'Account Name',
        accessor: 'account_name',
      },
       {
        Header: 'Sub Category',
        accessor: 'sub_category',
      },
       {
        Header: 'Gross Weight',
        accessor: 'gross_weight',
      },
       {
        Header: 'Net Weight',
        accessor: 'weight_bw',
      },
       {
        Header: 'Purity',
        accessor: 'purity',
      },
      {
        Header: 'Total Amt',
        accessor: 'total_price',
        Cell: ({ value }) => parseFloat(value || 0).toFixed(2)
      },
    //   {
    //     Header: 'Old Amt',
    //     accessor: 'old_exchange_amt',
    //     Cell: ({ value }) => parseFloat(value || 0).toFixed(2)
    //   },
    //   {
    //     Header: 'Scheme Amt',
    //     accessor: 'scheme_amt',
    //     Cell: ({ value }) => parseFloat(value || 0).toFixed(2)
    //   },
    //   {
    //     Header: 'Net Amt',
    //     accessor: 'net_bill_amount',
    //     Cell: ({ value }) => parseFloat(value || 0).toFixed(2)
    //   },
    //   {
    //     Header: 'Paid Amt',
    //     accessor: 'paid_amt',
    //     Cell: ({ row }) => {
    //       const paid_amt = Number(row.original.paid_amt) || 0;
    //       const receipts_amt = Number(row.original.receipts_amt) || 0;
    //       return (paid_amt + receipts_amt).toFixed(2);
    //     },
    //   },
    //   {
    //     Header: 'Bal Amt',
    //     accessor: 'bal_amt',
    //     Cell: ({ row }) => {
    //       const bal_amt = Number(row.original.bal_amt) || 0;
    //       const bal_after_receipts = Number(row.original.bal_after_receipts) || 0;
    //       const receipts_amt = Number(row.original.receipts_amt) || 0;
    //       let finalBalance = bal_amt === receipts_amt
    //         ? bal_after_receipts || 0
    //         : bal_after_receipts ? bal_after_receipts : bal_amt || 0;
    //       return finalBalance.toFixed(2);
    //     },
    //   },
    //   {
    //     Header: 'Actions',
    //     accessor: 'actions',
    //     Cell: ({ row }) => (
    //       <FaEye
    //         style={{ cursor: 'pointer', color: 'green' }}
    //         onClick={() => handleViewDetails(row.original.invoice_number)}
    //       />
    //     ),
    //   },
    ],
    []
  );

  // Fetch unique repair details from the API
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/repair-details`);

        // Filter the data based on the 'transaction_status' column
        const filteredData = response.data.filter(
          (item) => item.transaction_status === 'Sales' || item.transaction_status === "ConvertedInvoice"
        );

        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repair details:', error);
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  const handleViewDetails = async (invoice_number) => {
    try {
      const response = await axios.get(`${baseURL}/get-repair-details/${invoice_number}`);
      setRepairDetails(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching repair details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRepairDetails(null);
  };

  // Group the data for display
  const groupedData = useMemo(() => groupByItem(data), [data]);

  // Create a table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable(
    {
      columns,
      data: groupedData,
    },
    useExpanded
  );

  return (
    <div className="main-container">
      <div className="payments-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Item Sales Report</h3>
          </Col>
        </Row>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table striped bordered hover responsive {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <React.Fragment key={row.id}>
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          );
                        })}
                      </tr>
                      {row.isExpanded && (
                        <tr>
                          <td colSpan={columns.length}>
                            <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
                              <Table striped bordered responsive>
                                <thead>
                                  <tr>
                                    {invoiceColumns.map((column, i) => (
                                      <th key={i}>{column.Header}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {row.original.invoices.map((invoice, i) => (
                                    <tr key={i}>
                                      {invoiceColumns.map((column, j) => {
                                        if (column.accessor) {
                                          return (
                                            <td key={j}>
                                              {column.Cell ?
                                                column.Cell({
                                                  value: invoice[column.accessor],
                                                  row: { original: invoice }
                                                }) :
                                                invoice[column.accessor]
                                              }
                                            </td>
                                          );
                                        }
                                        if (column.id) {
                                          return (
                                            <td key={j}>
                                              {column.Cell({ row: { original: invoice } })}
                                            </td>
                                          );
                                        }
                                        return null;
                                      })}
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="xl" className='m-auto'>
        <Modal.Header closeButton>
          <Modal.Title>Sales Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '13px' }}>
          {repairDetails && (
            <>
              <h5>Customer Info</h5>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Customer ID</td>
                    <td>{repairDetails.uniqueData.customer_id}</td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>{repairDetails.uniqueData.mobile}</td>
                  </tr>
                  <tr>
                    <td>Account Name</td>
                    <td>{repairDetails.uniqueData.account_name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{repairDetails.uniqueData.email}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{repairDetails.uniqueData.address1}</td>
                  </tr>
                  <tr>
                    <td>Invoice Number</td>
                    <td>{repairDetails.uniqueData.invoice_number}</td>
                  </tr>
                  <tr>
                    <td>Total Amount</td>
                    <td>{repairDetails.uniqueData.net_amount}</td>
                  </tr>
                </tbody>
              </Table>

              <h5>Products</h5>
              <div className="table-responsive">
                <Table bordered>
                  <thead style={{ whiteSpace: 'nowrap' }}>
                    <tr>
                      <th>BarCode</th>
                      <th>Product Name</th>
                      <th>Metal</th>
                      <th>Purity</th>
                      <th>Gross Wt</th>
                      <th>Stone Wt</th>
                      <th>W.Wt</th>
                      <th>Total Wt</th>
                      <th>MC</th>
                      <th>Rate</th>
                      <th>Tax Amt</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody style={{ whiteSpace: 'nowrap' }}>
                    {repairDetails.repeatedData.map((product, index) => (
                      <tr key={index}>
                        <td>{product.code}</td>
                        <td>{product.product_name}</td>
                        <td>{product.metal_type}</td>
                        <td>{product.purity}</td>
                        <td>{product.gross_weight}</td>
                        <td>{product.stone_weight}</td>
                        <td>{product.wastage_weight}</td>
                        <td>{product.total_weight_av}</td>
                        <td>{product.making_charges}</td>
                        <td>{product.rate}</td>
                        <td>{product.tax_amt}</td>
                        <td>{product.total_price}</td>
                      </tr>
                    ))}
                    <tr style={{ fontWeight: 'bold' }}>
                      <td colSpan="11" className="text-end">
                        Total Amount
                      </td>
                      <td>{repairDetails.uniqueData.net_amount}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemSale;