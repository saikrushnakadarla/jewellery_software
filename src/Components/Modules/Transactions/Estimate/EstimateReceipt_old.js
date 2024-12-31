import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles optimized for thermal receipt printers
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


  timeText: {
    fontSize: 10,
    textAlign: 'right',
  },
  tableHeader: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#000",
    marginTop: 3,
    paddingTop: 3,
  },


  tableHeader1: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 3,
    paddingBottom: 3,
  },

  tableHeader2: {
    flexDirection: "row",
    marginBottom: 2,
    paddingBottom: 2,
  },

  tableHeader3: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 3,
    paddingBottom: 3,
  },
  tableCell: {
    fontSize: 10,
  },
  snHeader: {
    width: "10%",
    fontWeight: "bold",
  },
  itemHeader: {
    width: "70%",
    fontWeight: "bold",
  },
  stAmtHeader: {
    width: "20%",
    fontWeight: "bold",
    textAlign: "right",
  },

  grHeader: {
    width: "20%",
  },
  ntHeader: {
    width: "20%",
  },
  vaHeader: {
    width: "20%",
  },
  mcHeader: {
    width: "10%",
  },
  totalAmtHeader:{
    width: "50%",
    fontWeight: "bold",
    textAlign: "right",
  },

  footerRow: {
    flexDirection: "row",
    marginTop: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 5,
paddingBottom: 5,
  },
  footerText: {
    fontSize: 10,
    fontWeight: "bold",
  },



  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns all content to the right
    marginBottom: 3,
    fontWeight: "bold",

  },
  leftAlignedText: {
    fontSize: 10,
    textAlign: "right", // Aligns left text to the right
  },
  rightAlignedText: {
    fontSize: 10,
    textAlign: "right",
  },
  
});

// PDF Document Component optimized for receipt printers
const PDFContent = () => (
  <Document>
    <Page size={[226, 500]} style={styles.page}>
      {/* Heading */}
      <Text style={styles.heading}>Estimation</Text>

      {/* Details */}
      <View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Est No: 02</Text>
          <Text style={styles.rightText}>S.E: Sadashri Jewels</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Rate: 7125.00</Text>
          <Text style={styles.rightText}>Date: 26-12-24</Text>
        </View>
      </View>
      <View >
        <Text style={styles.timeText}>01:03:19PM</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, styles.snHeader]}>S.N</Text>
        <Text style={[styles.tableCell, styles.itemHeader]}>Item</Text>
        <Text style={[styles.tableCell, styles.stAmtHeader]}>st.Amt</Text>
      </View>
      <View style={styles.tableHeader1}>
        <Text style={[styles.tableCell, styles.snHeader]}></Text>
        <Text style={[styles.tableCell, styles.grHeader]}>Gr.wt</Text>
        <Text style={[styles.tableCell, styles.ntHeader]}>Nt.wt</Text>
        <Text style={[styles.tableCell, styles.vaHeader]}>VA</Text>
        <Text style={[styles.tableCell, styles.mcHeader]}>MC</Text>
        <Text style={[styles.tableCell, styles.stAmtHeader]}>Amt</Text>
      </View>

      {/* Table Rows */}
      <View>
        <View style={styles.row}>
          <Text style={[styles.tableCell, styles.snHeader]}>1</Text>
          <Text style={[styles.tableCell, styles.itemHeader]}>Pendant #: BVIF1</Text>
          <Text style={[styles.tableCell, styles.stAmtHeader]}>888</Text>
        </View>
        <View style={styles.tableHeader2}>
          <Text style={[styles.tableCell, styles.snHeader]}></Text>
          <Text style={[styles.tableCell, styles.grHeader]}>6.974</Text>
          <Text style={[styles.tableCell, styles.ntHeader]}>6.086</Text>
          <Text style={[styles.tableCell, styles.vaHeader]}>14.99%</Text>
          <Text style={[styles.tableCell, styles.mcHeader]}></Text>
          <Text style={[styles.tableCell, styles.stAmtHeader]}>51749</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.tableCell, styles.snHeader]}>2</Text>
          <Text style={[styles.tableCell, styles.itemHeader]}>Pendant #: EEWNS2</Text>
          <Text style={[styles.tableCell, styles.stAmtHeader]}>149</Text>
        </View>
        <View style={styles.tableHeader2}>
          <Text style={[styles.tableCell, styles.snHeader]}></Text>
          <Text style={[styles.tableCell, styles.grHeader]}>3.938</Text>
          <Text style={[styles.tableCell, styles.ntHeader]}>3.789</Text>
          <Text style={[styles.tableCell, styles.vaHeader]}>14.99%</Text>
          <Text style={[styles.tableCell, styles.mcHeader]}></Text>
          <Text style={[styles.tableCell, styles.stAmtHeader]}>31402</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.tableCell, styles.snHeader]}>3</Text>
          <Text style={[styles.tableCell, styles.itemHeader]}>Earrings #: GYZDRL</Text>
          <Text style={[styles.tableCell, styles.stAmtHeader]}>54</Text>
        </View>
        <View style={styles.tableHeader3}>
          <Text style={[styles.tableCell, styles.snHeader]}></Text>
          <Text style={[styles.tableCell, styles.grHeader]}>2.411</Text>
          <Text style={[styles.tableCell, styles.ntHeader]}>2.357</Text>
          <Text style={[styles.tableCell, styles.vaHeader]}>14.99%</Text>
          <Text style={[styles.tableCell, styles.mcHeader]}></Text>
          <Text style={[styles.tableCell, styles.stAmtHeader]}>19473</Text>
        </View>
      </View>

      {/* Footer Row */}
      <View style={styles.footerRow}>
      <Text style={[styles.tableCell, styles.snHeader]}></Text>
      <Text style={[styles.tableCell, styles.grHeader]}>13.323</Text>
      <Text style={[styles.tableCell, styles.ntHeader]}>12.232</Text>
      <Text style={[styles.tableCell, styles.totalAmtHeader]}>102623</Text>
      </View>

      {/* Additional Details */}
      <View>
  <View style={styles.rowContainer}>
    <Text style={styles.leftAlignedText}>Round off:</Text>
    <Text style={styles.rightAlignedText}>  -0.31</Text>
  </View>
  <View style={styles.rowContainer}>
    <Text style={styles.leftAlignedText}>GST Value:</Text>
    <Text style={styles.rightAlignedText}>  102623.30</Text>
  </View>
  <View style={styles.rowContainer}>
    <Text style={styles.leftAlignedText}>CGST@1.50%:</Text>
    <Text style={styles.rightAlignedText}>  1539.35</Text>
  </View>
  <View style={styles.rowContainer}>
    <Text style={styles.leftAlignedText}>SGST@1.50%:</Text>
    <Text style={styles.rightAlignedText}>  1539.35</Text>
  </View>
  <View style={styles.rowContainer}>
    <Text style={styles.leftAlignedText}>Final Amt:</Text>
    <Text style={styles.rightAlignedText}>  105702.00</Text>
  </View>
</View>

    </Page>
  </Document>
);

export default PDFContent;
