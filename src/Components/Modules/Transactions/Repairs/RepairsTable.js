import React, { useState } from "react";
import RepairForm from "./Repairs";
import "./RepairsTable.css";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const RepairsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample repair data
  const repairsData = [
    { id: 1, name: "Madan", contact: "7103947594", email: "madan@gmail.com", createdBy: "iiiQbets", date: "2024-11-25" },
    { id: 2, name: "Kumar", contact: "9854783938", email: "kumar@gmail.com", createdBy: "iiiQbets", date: "2024-11-25" },
    // Add more dummy data here
  ];

  // Filter data based on search input
  const filteredData = repairsData.filter((repair) =>
    repair.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginated data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div className={`repairs-table-container ${showForm ? "form-visible" : ""}`}>
      {!showForm && (
        <>
          <div className="table-header">
            {/* <div className="entries-dropdown">
              <label>Show</label>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <label>entries</label>
            </div> */}
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={() => setShowForm(true)} className="add-button">
            + Create
            </button>
          </div>
          <table className="repairs-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>CONTACT INFO</th>
                <th>CREATED BY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((repair) => (
                <tr key={repair.id}>
                  <td>
                    {repair.name}
                    
                  </td>
                  <td>
                    {repair.contact}
                   
                  </td>
                  <td>
                    {repair.createdBy}
                    
                  </td>
                  <td>
                    <button className="action-button edit-button">
                      <FaEdit />
                    </button>
                    <button className="action-button delete-button">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="4" className="no-data">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <div className="pagination">
            <span>
              Showing {Math.min(
                (currentPage - 1) * entriesPerPage + 1,
                filteredData.length
              )}{" "}
              to {Math.min(currentPage * entriesPerPage, filteredData.length)} of{" "}
              {filteredData.length} entries
            </span>
            <div className="pagination-controls">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div> */}
        </>
      )}
      {showForm && <RepairForm />}
    </div>
  );
};

export default RepairsTable;
