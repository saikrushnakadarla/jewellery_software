import React, { useState } from "react";
import InputField from "../../Masters/ItemMaster/Inputfield";
import DataTable from "../../../Pages/InputField/TableLayout"; // Adjust the path as needed
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios"; // Import Axios for making API requests

const StoneDetailsModal = ({ showModal, handleCloseModal }) => {
  // Define state for the input fields
  const [subproductname, setSubProductName] = useState("");
  const [weight, setWeight] = useState("");
  const [ratepergram, setRatePerGram] = useState("");
  const [amount, setAmount] = useState("");
  const [totalweight, setTotalWeight] = useState("");
  const [totalprice, setTotalPrice] = useState("");

  // Define state for the data table and editing
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Define columns for the DataTable
  const columns = React.useMemo(
    () => [
      { Header: "Sub Product Name", accessor: "subproductname" },
      { Header: "Weight", accessor: "weight" },
      { Header: "Rate per Gram", accessor: "ratepergram" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Total Weight", accessor: "totalweight" },
      { Header: "Total Price", accessor: "totalprice" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(row.original.id)}
            >
              <FaTrash />
            </button>
          </>
        ),
      },
    ],
    []
  );

 // Handle adding or updating data in the table
 const handleAddOrUpdate = () => {
  const payload = {
    subproductname,
    weight,
    ratepergram,
    amount,
    totalweight,
    totalprice,
  };

  if (isEditing) {
    // Update existing row
    setData((prevData) =>
      prevData.map((item) =>
        item.id === editId
          ? { ...item, ...payload }
          : item
      )
    );
    setIsEditing(false);
    setEditId(null);
  } else {
    // Add new row
    const newRow = {
      id: data.length + 1,
      ...payload,
    };
    setData((prevData) => [...prevData, newRow]);
  }

  // Clear input fields after saving
  setSubProductName("");
  setWeight("");
  setRatePerGram("");
  setAmount("");
  setTotalWeight("");
  setTotalPrice("");
};

  // Edit handler
  const handleEdit = (rowData) => {
    setIsEditing(true);
    setEditId(rowData.id);
    setSubProductName(rowData.subproductname);
    setWeight(rowData.weight);
    setRatePerGram(rowData.ratepergram);
    setAmount(rowData.amount);
    setTotalWeight(rowData.totalweight);
    setTotalPrice(rowData.totalprice);
  };

  // Delete handler
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // Save changes handler (to save all data in the table to the DB)
  const handleSaveChanges = async () => {
    try {
      for (const row of data) {
        await axios.post("http://localhost:5000/post/addProductstonedetails", row);
      }
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving changes to DB", error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ marginTop: "-30px" }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="stockentrymodalformcontainer">
          <div className="modal-content bg-light">
            <div className="modal-header">
              <h5 className="modal-title">Stone Details</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body" style={{ backgroundColor: "rgba(163, 110, 41, 0.08)" }}>
              <div className="row g-3">
                <div className="col-md-4">
                  <InputField label="Sub Product Name:" value={subproductname} onChange={(e) => setSubProductName(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <InputField label="Weight:" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <InputField label="Rate per Gram:" value={ratepergram} onChange={(e) => setRatePerGram(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <InputField label="Amount:" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <InputField label="Total Weight:" value={totalweight} onChange={(e) => setTotalWeight(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <InputField label="Total Price:" value={totalprice} onChange={(e) => setTotalPrice(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <button type="button" className="btn btn-primary" onClick={handleAddOrUpdate}>
                    {isEditing ? "Update" : "Add"}
                  </button>
                </div>
              </div>
              {/* Table Section */}
              <div className="mt-4">
                <h6 className="fw-bold">Stone List</h6>
                <DataTable columns={columns} data={data} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoneDetailsModal;
