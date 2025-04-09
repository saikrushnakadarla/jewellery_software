import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../Pages/InputField/TableLayout";
import { Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import baseURL from "../../../../Url/NodeBaseURL";

const FestOffersTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/offers`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Sr. No.",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Offer Name",
        accessor: "offer_name",
      },
      {
        Header: "Discount On Rate",
        accessor: "discount_on_rate",
      },
      {
        Header: "Discount % on MC",
        accessor: "discount_percentage",
      },
      {
        Header: "Valid From",
        accessor: "valid_from",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Valid To",
        accessor: "valid_to",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => {
          const offer = row.original;

          return (
            <div>
              <FaEdit
                style={{ cursor: "pointer", color: "blue", marginRight: "10px" }}
                onClick={() => handleEdit(offer.offer_id)}
              />
              <FaTrash
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDelete(offer)}
              />
            </div>
          );
        },
      },
    ],
    [data]
  );

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`${baseURL}/api/offers/${id}`);
      const offerData = res.data;

      navigate("/festoffers", {
        state: {
          offer_id: id,
          location: offerData,
        },
      });
    } catch (err) {
      console.error("Error fetching offer by ID:", err);
      Swal.fire("Error", "Failed to fetch offer data for editing", "error");
    }
  };

  const handleDelete = async (offer) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/api/offers/${offer.offer_id}`, {
          data: offer,
        });

        // Update state to remove the deleted offer
        setData((prev) => prev.filter((item) => item.offer_id !== offer.offer_id));
        Swal.fire("Deleted!", "The offer has been deleted.", "success");
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error!", "Failed to delete offer.", "error");
      }
    }
  };

  const handleCreate = () => {
    navigate("/festoffers");
  };

  return (
    <div className="main-container">
      <div className="customers-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Fest Offers</h3>
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
          <DataTable columns={columns} data={[...data].reverse()} />
        )}
      </div>
    </div>
  );
};

export default FestOffersTable;
