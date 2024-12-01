import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FiAlignJustify } from 'react-icons/fi';
import { Button, Row, Col, Overlay, Popover, Modal, Form } from 'react-bootstrap';
import './RepairsTable.css';

const RepairsTable = () => {
  const navigate = useNavigate();

  const [showPopover, setShowPopover] = useState(false);
  const [popoverData, setPopoverData] = useState({ rowIndex: null, target: null });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState({
    particulars: '',
    rate: '',
    qty: ''
  }); // State for the modal form fields

  // Function to handle popover visibility toggle
  const handlePopoverToggle = (event, rowIndex) => {
    setPopoverData({
      rowIndex: popoverData.rowIndex === rowIndex ? null : rowIndex, // Toggle the visibility of the popover
      target: event.target, // Set the target for the popover
    });
    setShowPopover((prev) => popoverData.rowIndex !== rowIndex); // Toggle state
  };

  // Handle modal visibility when "Receive from Workshop" is clicked
  const handleReceiveFromWorkshop = () => {
    setShowPopover(false); // Close the popover
    setShowModal(true); // Open the modal
  };

  // Handle form changes for the modal fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Submit the form and close the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setShowModal(false); // Close the modal after submitting
  };

  // Define the columns for the DataTable
  const columns = React.useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: '', // Key from the data
      },
      {
        Header: 'Mobile',
        accessor: '',
      },
      {
        Header: 'Email',
        accessor: '',
      },
      {
        Header: 'Address1',
        accessor: '',
      },
      {
        Header: 'Address2',
        accessor: '',
      },
      {
        Header: 'Address3',
        accessor: '',
      },
      {
        Header: 'Staff',
        accessor: '',
      },
      {
        Header: 'Delivery Date',
        accessor: '',
      },
      {
        Header: 'Place',
        accessor: '',
      },
      {
        Header: 'Metal',
        accessor: '',
      },
      {
        Header: 'Counter',
        accessor: '',
      },
      {
        Header: 'Entry Type',
        accessor: '',
      },
      {
        Header: 'Receipt No',
        accessor: '',
      },
      {
        Header: 'Date',
        accessor: '',
      },
      {
        Header: 'Type',
        accessor: '',
      },
      {
        Header: 'Item',
        accessor: '',
      },
      {
        Header: 'Tag No',
        accessor: '',
      },
      {
        Header: 'Description',
        accessor: '',
      },
      {
        Header: 'Purity',
        accessor: '',
      },
      {
        Header: 'Extra Weight',
        accessor: '',
      },
      {
        Header: 'Stone Value',
        accessor: '',
      },
      {
        Header: 'Making Charge (MC)',
        accessor: '',
      },
      {
        Header: 'Handling Charge (HC)',
        accessor: '',
      },
      {
        Header: 'Total',
        accessor: '',
      },
      {
        Header: 'ACTION',
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <button className="action-button edit-button">
              <FaEdit />
            </button>
            <button className="action-button delete-button">
              <FaTrash />
            </button>
            <button
              className="action-button sticky-note-button"
              onClick={(e) => handlePopoverToggle(e, row.index)} // Open popover on button click
            >
              <FiAlignJustify />
            </button>
          </div>
        ),
      },
    ],
    [popoverData.rowIndex] // Update when popover state changes
  );

  // Example data
  const data = React.useMemo(
    () => [
      { id: 1, name: 'John Doe', contact: '1234567890', createdBy: 'Admin' },
      // Add more data rows here as needed...
    ],
    []
  );

  // Navigate to the /repairs page on button click
  const handleCreate = () => {
    navigate('/repairs');
  };

  return (
    <div className="main-container">
      <div className="repairs-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Repairs</h3>
            <Button variant="success" onClick={handleCreate}>
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={data} />
        
        {/* Popover below the table */}
        <Overlay
          show={showPopover}
          target={popoverData.target}
          placement="right"
          containerPadding={10}
          rootClose
          onHide={() => setShowPopover(false)} // Close popover when clicked outside
        >
          <Popover id={`popover-${popoverData.rowIndex}`}>
            <Popover.Body>
              <ul className="popover-options">
                <li
                  onClick={() => {
                    setShowPopover(false); // Close popover
                  }}
                >
                  Assign to Workshop
                </li>
                <li
                  onClick={handleReceiveFromWorkshop} // Open modal on this option click
                >
                  Receive from Workshop
                </li>
                <li
                  onClick={() => {
                    setShowPopover(false); // Close popover
                  }}
                >
                  Send to Deliver Counter
                </li>
              </ul>
            </Popover.Body>
          </Popover>
        </Overlay>

        {/* Modal for receiving from the workshop */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Receive from Workshop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formParticulars">
                <Form.Label>Particulars</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter particulars"
                  name="particulars"
                  value={formData.particulars}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formRate">
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formQty">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  name="qty"
                  value={formData.qty}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className='mt-3'>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default RepairsTable;
