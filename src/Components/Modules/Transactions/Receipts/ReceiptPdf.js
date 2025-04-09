import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import QRCode from "qrcode";

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.2,
    backgroundColor: "#fff",
    width: 226, // Approx. 80mm in points
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  leftText: {
    fontSize: 10,
  },
  rightText: {
    fontSize: 10,
    textAlign: "right",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 3,
    paddingBottom: 3,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingBottom: 2,
  },
  tableCell: {
    fontSize: 10,
  },
  sno: {
    width: "10%",
    fontWeight: "bold",
    textAlign: "center",
  },
  inv: {
    width: "30%",
    textAlign: "center",
  },
  totalAmt: {
    width: "20%",
    textAlign: "right",
  },
  balanceAmt: {
    width: "20%",
    textAlign: "right",
  },
  paidAmt: {
    width: "20%",
    textAlign: "right",
  },
  footerRow: {
    flexDirection: "row",
    marginTop: 3,
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingTop: 3,
    paddingBottom: 3,

  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  qrCode: {
    width: 100,
    height: 100,
  },
});

const PDFContent = ({ formData }) => {
  const currentTime = new Date().toLocaleTimeString();
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrCodeDataUrl = await QRCode.toDataURL(formData[0]?.receipt_no || "", {
          width: 100,
          margin: 2,
        });
        setQrCodeUrl(qrCodeDataUrl);
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };

    generateQRCode();
  }, [formData]);

  return (
    <Document>
      <Page size={[250, 500]} style={styles.page}>
        {/* Heading */}
        <Text style={styles.heading}>Receipt</Text>

        {/* Details */}
        <View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Receipt No: {formData.receipt_no || "N/A"}</Text>
            <Text style={styles.rightText}>Account Name: {formData.account_name || "N/A"}</Text>
          
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Date: {formData.date || "N/A"}</Text>
            <Text style={styles.rightText}>Time: {currentTime}</Text>
          </View>
        </View>
       
        <View style={styles.row}>
        <Text style={styles.rightText}>Mobile Number: {formData.mobile || "N/A"}</Text>
        </View>
        

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.sno]}>S.No.</Text>
          <Text style={[styles.tableCell, styles.inv]}>Invoice ID</Text>
          <Text style={[styles.tableCell, styles.totalAmt]}>Total Amt</Text>
          <Text style={[styles.tableCell, styles.balanceAmt]}>Paid Amt</Text>
          <Text style={[styles.tableCell, styles.paidAmt]}>Bal Amt</Text>
        </View>

        {/* Table Rows */}
        {[1].map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableCell, styles.sno]}>{item}</Text>
            <Text style={[styles.tableCell, styles.inv]}>{formData.invoice_number}</Text>
            <Text style={[styles.tableCell, styles.totalAmt]}>{formData.total_amt}</Text>
            <Text style={[styles.tableCell, styles.balanceAmt]}>{formData.discount_amt}</Text>
            <Text style={[styles.tableCell, styles.paidAmt]}>{formData.cash_amt}</Text>
          </View>
        ))}

        {/* Footer Row */}
        <View style={styles.footerRow}>
          <Text style={[styles.tableCell, styles.sno]}></Text>
          <Text style={[styles.tableCell, styles.inv]}>Total</Text>
          <Text style={[styles.tableCell, styles.totalAmt]}>{formData.total_amt}</Text>
          <Text style={[styles.tableCell, styles.balanceAmt]}>{formData.discount_amt}</Text>
          <Text style={[styles.tableCell, styles.paidAmt]}>{formData.cash_amt}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          {qrCodeUrl && <Image style={styles.qrCode} src={qrCodeUrl} />}
        </View>
      </Page>
    </Document>
  );
};



export default PDFContent;
