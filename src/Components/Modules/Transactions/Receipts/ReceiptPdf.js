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

const PDFContent = () => (
  <Document>
    <Page size={[250, 500]} style={styles.page}>
      {/* Heading */}
      <Text style={styles.heading}>Receipt</Text>

      {/* Details */}
      <View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Receipt No: </Text>
          <Text style={styles.rightText}>Account Name:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Date:</Text>
          <Text style={styles.rightText}>Time:</Text>
        </View>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, styles.sno]}>S.No.</Text>
        <Text style={[styles.tableCell, styles.inv]}>Invoice ID</Text>
        <Text style={[styles.tableCell, styles.totalAmt]}>Total Amt</Text> 
        <Text style={[styles.tableCell, styles.paidAmt]}>Paid Amt</Text>
        <Text style={[styles.tableCell, styles.balanceAmt]}>Bal Amt</Text>
      </View>

      {/* Table Rows */}
      {[1, 2, 3].map((item, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={[styles.tableCell, styles.sno]}>{item}</Text>
          <Text style={[styles.tableCell, styles.inv]}>INV{item}</Text>
          <Text style={[styles.tableCell, styles.totalAmt]}>100.00</Text>
          <Text style={[styles.tableCell, styles.paidAmt]}>50.00</Text>
          <Text style={[styles.tableCell, styles.balanceAmt]}>50.00</Text>
        </View>
      ))}

      {/* Footer Row */}
      <View style={styles.footerRow}>
        <Text style={[styles.tableCell, styles.sno]}></Text>
        <Text style={[styles.tableCell, styles.inv]}>Total</Text>
        <Text style={[styles.tableCell, styles.totalAmt]}>300.00</Text>
        <Text style={[styles.tableCell, styles.balanceAmt]}>150.00</Text>
        <Text style={[styles.tableCell, styles.paidAmt]}>150.00</Text>
      </View>
    </Page>
  </Document>
);

export default PDFContent;
