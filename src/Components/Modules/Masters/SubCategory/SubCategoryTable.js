import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../Pages/InputField/TableLayout"; // Import the reusable DataTable component
import { Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2"; // Import SweetAlert2

const SubCategoryTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Table columns configuration
  const columns = React.useMemo(
    () => [
      {
        Header: "Sr. No.",
        Cell: ({ row }) => row.index + 1, // Generate a sequential number based on the row index
      },
      {
        Header: "Metal Type",
        accessor: "metal_type", // Accessor for metal_type
      },
      {
        Header: "Category",
        accessor: "category", // Accessor for category
      },
      {
        Header: "Sub Category",
        accessor: "sub_category_name", // Accessor for sub_category_name
      },
      {
        Header: "Prefix",
        accessor: "prefix", // Accessor for prefix
      },
    ],
    []
  );

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/subcategory"); // Use the correct API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
  
        // Log the result for debugging
        console.log("API Response:", result);
  
        // Ensure the data is an array and sort it by `created_at` in descending order
        let sortedData = [];
        if (Array.isArray(result)) {
          sortedData = result.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        } else if (result && Array.isArray(result.data)) {
          sortedData = result.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        } else {
          throw new Error("Unexpected API response format");
        }
  
        setData(sortedData); // Update state with sorted data
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Failed to load data from the server.", "error");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
  
    fetchData();
  }, []);
  

  // Navigate to create subcategory page
  const handleCreate = () => {
    navigate("/subcategory");
  };

  return (
    <div className="main-container">
      <div className="customers-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Sub Category</h3>
            <Button
              className="create_but"
              onClick={handleCreate}
              style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}
            >
              + Create
            </Button>
          </Col>
        </Row>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataTable columns={columns} data={[...data].reverse()} /> // Render DataTable with columns and data
        )}
      </div>
    </div>
  );
};

export default SubCategoryTable;
