import React, { useEffect, useState } from "react";
import "./BarCodePrinting.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import QRCode from "qrcode";
import jsPDF from "jspdf";

const RepairForm = () => {
  const [staticEntries, setStaticEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]); // Filtered data to display
  const [selectedDate, setSelectedDate] = useState(""); // State for the selected date

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get/opening-tags-entry");
        const data = await response.json();
        console.log("API Response:", data);

        if (data && Array.isArray(data.result)) {
          const formattedData = data.result.map((item) => ({
            pCode: item.PCode_BarCode,
            nameValue: item.product_Name,
            weight: item.Gross_Weight,
            date: item.added_at.split("T")[0], // Extract date part from ISO string
          }));

          console.log("Formatted Data:", formattedData);
          setStaticEntries(formattedData);
          setFilteredEntries(formattedData); // Initialize filtered data
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchData();
  }, []);

  // Handle date selection change
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    // Filter entries based on the selected date
    const filteredData = staticEntries.filter((entry) => entry.date === selectedDate);
    setFilteredEntries(filteredData);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    let yPosition = 10;

    for (const entry of filteredEntries) {
      const qrContent = `PCode: ${entry.pCode}, Name Value: ${entry.nameValue}, Weight: ${entry.weight}`;

      const qrImageData = await QRCode.toDataURL(qrContent);

      doc.addImage(qrImageData, "PNG", 10, yPosition, 40, 40);
      doc.text(
        `PCode: ${entry.pCode}\nName: ${entry.nameValue}\nWeight: ${entry.weight}`,
        60,
        yPosition + 20
      );

      yPosition += 50;

      if (yPosition > doc.internal.pageSize.height - 50) {
        doc.addPage();
        yPosition = 10;
      }
    }

    doc.save("Filtered_QR_Codes.pdf");
  };

  return (
    <div className="main-container">
      <Container className="barcode-form-container">
        <form className="barcode-form">
          <div className="barcode-form-left">
            <Col className="form-section">
              <Row>
                <InputField
                  label="Date"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </Row>
              <Row>
                <InputField label="Product Name" />
              </Row>
              <Row>
                <InputField label="Weight" />
              </Row>
              <Row>
                <div className="form-buttons">
                  <Button type="submit" variant="primary">
                    ADD
                  </Button>
                </div>
              </Row>
            </Col>
          </div>
          <div className="barcode-form-right">
            <Col className="form-section">
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>BarCode</th>
                    <th>Product Name</th>
                    <th>Gross Weight</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.pCode}</td>
                      <td>{entry.nameValue}</td>
                      <td>{entry.weight}</td>
                      <td>{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </div>
        </form>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button variant="success" onClick={generatePDF}>
            Generate QR PDF
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default RepairForm;
