import React, { useState } from "react";
import './ItemMasterTable.css';
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const ItemMasterTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Create navigate function
  // Sample repair data
  const productsData = [
    { id: 1, name: "Ring", category: "Gold", saleaccount: "Saale", purchaseaccount: "Purchase", purity: "91.6",weight:"10gmrs" },
    { id: 2, name: "Bangle", category: "Gold", saleaccount: "Sale", purchaseaccount: "Purchase", purity: "91.6",weight:"20grms" },
    // Add more dummy data here
  ];

  // Filter data based on search input
  const filteredData = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginated data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div style={{paddingTop:'50px'}}>
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
            {/* <button onClick={() => setShowForm(true)} className="add-button"> */}
            <button onClick={() => navigate("/itemmaster")} className="add-button"> 
            + Add Product
            </button>
          </div>
          <table className="repairs-table">
            <thead>
              <tr>
              <th>P_ID</th>
                <th>Product NAME</th>
                <th>Categories</th>
                <th>Sale Account</th>
                <th>Purchase Account</th>
                <th>Purity</th>
                <th>Weight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.id}
                    
                  </td>
                  <td>
                    {product.name}
                   
                  </td>
                  <td>
                    {product.category}
                    
                  </td>
                  <td>
                    {product.saleaccount}
                    
                  </td>
                  <td>
                    {product.purchaseaccount}
                    
                  </td>
                  <td>
                    {product.purity}
                    
                  </td>
                  <td>
                    {product.weight}
                    
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
     
    </div>
    </div>
  );
};

export default ItemMasterTable;
