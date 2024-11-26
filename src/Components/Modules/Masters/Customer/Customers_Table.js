import React, { useState } from "react";
import "./Customers_Table.css";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import Customer_Master from "../Customer/Customer_Master";

const CustomerTable =() => {
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
         
        </>
      )}
      {showForm && <Customer_Master/>}
    </div>
  );
};

export default CustomerTable;
