import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles optimized for thermal receipt printers
const styles = StyleSheet.create({
  page: {
    padding: 8,
    fontSize: 8,
    fontFamily: "Helvetica",
    lineHeight: 1.2,
    backgroundColor: "#fff",
    width: 226, // Approx. 80mm in points
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  leftText: {
    fontSize: 8,
  },
  rightText: {
    fontSize: 8,
    textAlign: "right",
  },


  timeText: {
    fontSize: 8,
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
    fontSize: 8,
  },
  snHeader: {
    width: "8%",
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
    width: "8%",
    marginRight:'30px'
  },
  totalAmtHeader:{
    width: "50%",
    fontWeight: "bold",
    textAlign: "right",
  },

  footerRow: {
    flexDirection: "row",
    marginTop: 3,
    paddingBottom: 5,
  },
  footerText: {
    fontSize: 8,
    fontWeight: "bold",
  },



  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns all content to the right
    marginBottom: 3,
    fontWeight: "bold",

  },
  leftAlignedText: {
    fontSize: 8,
    textAlign: "right", // Aligns left text to the right
  },
  rightAlignedText: {
    fontSize: 8,
    textAlign: "right",
  },
  
});

// PDF Document Component optimized for receipt printers
const PDFContent = ({ entries, totalAmount, date, estimateNumber, sellerName }) => (
  <Document>
    <Page size={[226, 500]} style={styles.page}>
      {/* Heading */}
      <Text style={styles.heading}>Estimation</Text>

      {/* Details */}
      {entries.length > 0 && (
        <View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Est No: {entries[0].estimate_number}</Text>
            <Text style={styles.rightText}>S.E: {sellerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.leftText}>Rate: {entries[0].rate}</Text>
            <Text style={styles.rightText}>Date: {entries[0].date}</Text>
          </View>
        </View>
      )}

      <View>
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
      <View>
      {entries.map((entry, index) => (
  <View key={index}>
    <View style={styles.row}>
      <Text style={[styles.tableCell, styles.snHeader]}>{index + 1}</Text>
      <Text style={[styles.tableCell, styles.itemHeader]}>{entry.product_name}</Text>
      <Text style={[styles.tableCell, styles.stAmtHeader]}>{entry.stones_price}</Text>
    </View>
    <View style={styles.tableHeader2}>
      <Text style={[styles.tableCell, styles.snHeader]}></Text>
      <Text style={[styles.tableCell, styles.grHeader]}>{entry.gross_weight}</Text>
      <Text style={[styles.tableCell, styles.ntHeader]}>{entry.total_weight}</Text>
      <Text style={[styles.tableCell, styles.vaHeader]}>{entry.wastage_percent}</Text>
      <Text style={[styles.tableCell, styles.mcHeader]}>{entry.total_mc}</Text>
      <Text style={[styles.tableCell, styles.stAmtHeader]}>{entry.rate_amt}</Text>
    </View>
  </View>
))}
</View>

{(() => {
  const totalGrossWeight = entries.reduce((sum, entry) => sum + parseFloat(entry.gross_weight || 0), 0);
  const totalNetWeight = entries.reduce((sum, entry) => sum + parseFloat(entry.total_weight || 0), 0);
  const totalAmount = entries.reduce((sum, entry) => sum + parseFloat(entry.rate_amt || 0), 0);
  const totalMakingCharge = entries.reduce((sum, entry) => sum + parseFloat(entry.total_mc || 0), 0);

  const taxPercent = parseFloat(entries[0]?.tax_percent || 0);
  const gstAmount = totalAmount * (taxPercent / 100);
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;
  const finalAmount = totalAmount + gstAmount + totalMakingCharge;

  return (
    <>
      <View style={{ borderTopWidth: 1, borderTopColor: "#000", borderBottomWidth: 1, borderBottomColor: "#000", paddingVertical: 5 }}>
        <View style={styles.footerRow}>
          <Text style={[styles.tableCell, styles.snHeader]}></Text>
          <Text style={[styles.tableCell, styles.grHeader]}>{totalGrossWeight.toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.ntHeader]}>{totalNetWeight.toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.totalAmtHeader]}>{totalAmount.toFixed(2)}</Text>
        </View>
      </View>
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.leftAlignedText}>Round off:</Text>
          <Text style={styles.rightAlignedText}>-0.31</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.leftAlignedText}>GST Value:</Text>
          <Text style={styles.rightAlignedText}>  {totalAmount.toFixed(2)}</Text> 
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.leftAlignedText}>CGST@{(taxPercent / 2).toFixed(2)}%:</Text>
          <Text style={styles.rightAlignedText}>  {cgst.toFixed(2)}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.leftAlignedText}>SGST@{(taxPercent / 2).toFixed(2)}%:</Text>
          <Text style={styles.rightAlignedText}>  {sgst.toFixed(2)}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.leftAlignedText}>Final Amt:</Text>
          <Text style={styles.rightAlignedText}>  {finalAmount.toFixed(2)}</Text>
        </View>
      </View>
    </>
  );
})()}
    </Page>
  </Document>
);

export default PDFContent;


