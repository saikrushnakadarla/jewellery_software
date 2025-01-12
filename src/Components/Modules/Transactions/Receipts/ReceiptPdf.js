import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
});

const PDFContent = ({ formData }) => {
  const currentTime = new Date().toLocaleTimeString(); // Fetch current time dynamically

  return (
    <Document>
      <Page size={[250, 500]} style={styles.page}>
        {/* Heading */}
        <Text style={styles.heading}>Receipt</Text>

        {/* Details */}
        <View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Receipt No: {formData.receipt_no}</Text>
            <Text style={styles.rightText}>Account Name: {formData.account_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Date: {formData.date}</Text>
            <Text style={styles.rightText}>Time: </Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.sno]}>S.No.</Text>
          <Text style={[styles.tableCell, styles.invoice_number]}>Invoice ID</Text>
          <Text style={[styles.tableCell, styles.total_amt]}>Total Amt</Text> 
          <Text style={[styles.tableCell, styles.discount_amt]}>Paid Amt</Text>
          <Text style={[styles.tableCell, styles.balanceAmt]}>Bal Amt</Text>
        </View>

        {/* Table Rows */}
        {formData.invoice_number && formData.total_amt && formData.discount_amt && formData.balanceAmt &&
          formData.invoice_number.map((invoice, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.tableCell, styles.sno]}>{index + 1}</Text>
              <Text style={[styles.tableCell, styles.invoice_number]}>{invoice}</Text>
              <Text style={[styles.tableCell, styles.total_amt]}>{formData.total_amt[index]}</Text>
              <Text style={[styles.tableCell, styles.discount_amt]}>{formData.discount_amt[index]}</Text>
              <Text style={[styles.tableCell, styles.balanceAmt]}>{formData.balanceAmt[index]}</Text>
            </View>
          ))}

        {/* Footer Row */}
        <View style={styles.footerRow}>
          <Text style={[styles.tableCell, styles.sno]}></Text>
          <Text style={[styles.tableCell, styles.invoice_number]}>Total</Text>
          <Text style={[styles.tableCell, styles.total_amt]}>
            {formData.total_amt.reduce((acc, curr) => acc + parseFloat(curr), 0).toFixed(2)}
          </Text>
          <Text style={[styles.tableCell, styles.discount_amt]}>
            {formData.discount_amt.reduce((acc, curr) => acc + parseFloat(curr), 0).toFixed(2)}
          </Text>
          <Text style={[styles.tableCell, styles.balanceAmt]}>
            {formData.balanceAmt.reduce((acc, curr) => acc + parseFloat(curr), 0).toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};


export default PDFContent;
