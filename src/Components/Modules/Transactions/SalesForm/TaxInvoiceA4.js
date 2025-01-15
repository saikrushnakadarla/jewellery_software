import React from "react";

import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logo1 from '../../../../logo_dark.png'
import { toWords } from "number-to-words";



// Define styles
const styles = StyleSheet.create({
        page: {
                padding: 5,
                fontSize: 8,

        },
        section: {
                marginBottom: 10,
        },
        row: {
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
        },
        // column: {
        //         width: '33%',
        // },
        boldText: {
                fontWeight: "bold",

        },
        image1: {
                // width: 100,F
                height: 50,
                marginTop: 0,

        },
        image2: {
                // width: 50,
                // height: 50,
                marginTop: 0,
        },
        divider: {
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#000",
                borderBottomStyle: "solid",
        },

        container: {
                flex: 1,
                // justifyContent: 'center', 
                alignItems: 'center',  // Centers the content horizontally
                padding: 20,
                marginTop: -60,
        },
        heading: {
                fontWeight: 'bold',
                fontSize: 10,
                textAlign: 'center',
                marginBottom: 5,
        },
        contentContainer: {
                flexDirection: 'row',  // Side by side layout
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,  // Horizontal line under both sections
                borderColor: 'black',
                // paddingBottom: 20,
                width: '100%',  // Ensure it spans the entire width
        },
        leftColumn: {
                // flex: 1,
                // paddingLeft: 100,
                marginLeft: 100,
                fontSize: 7,
        },
        rightColumn: {
                flex: 1,
                paddingLeft: 10,
                fontSize: 7,
        },
        flatNo: {
                marginBottom: 2,

        },
        cin: {
                marginBottom: 2,
        },
        branch: {
                fontWeight: 'bold',
                marginBottom: 2,
        },
        branchContent: {
                marginBottom: 2,
        },
        divider1: {
                width: 1,
                height: '100%',
                backgroundColor: 'black',
        },

        horizontalLine1: {
                width: '100%',  // Set width to 70%
                height: 1,
                // backgroundColor: 'black',
                alignSelf: 'center',  // Centers the line horizontally within its container
                marginBottom: 2,
        },

        horizontalLine: {
                width: '100%',  // Set width to 70%
                height: 1,
                backgroundColor: 'black',
                alignSelf: 'center',  // Centers the line horizontally within its container
                marginBottom: 2,
        },
        boxContainer: {
                width: '100%',
                height: 330,
                marginTop: 5,
                border: '1px solid black',
                marginBottom: 20,
        },
        table: {
                width: '100%',
                borderCollapse: 'collapse',
        },
        tableHeader: {
                backgroundColor: '#f2f2f2',
                fontWeight: 'bold',
                borderBottomWidth: 1,
                borderBottomColor: '#000',
        },
        tableCell: {
                // border: '1px solid #000',
                padding: 5,
                textAlign: 'center',
        },
        tableRow: {
                display: 'flex',
                flexDirection: 'row',
                fontFamily: 'Times-Roman'
        },
        tableCellHeader: {
                width: '4%',
                textAlign: 'right',
                marginTop: '-4'
        },
        tableCellDescription: {
                width: '24%',
                textAlign: 'left',
                marginTop: '-4'
        },
        tableCellHSN: {
                width: '8%',
                textAlign: 'center',
                marginTop: '-4'
        },
        tableCellQty: {
                width: '5%',
                textAlign: 'center',
                marginTop: '-4'
        },
        tableCellPurity: {
                width: '8%',
                textAlign: 'left',
                marginTop: '-4'
        },
        tableCellGrossWt: {
                width: '11%',
                textAlign: 'right',
                marginTop: '-4'
        },
        tableCellStoneWt: {
                width: '11%',
                textAlign: 'right',
                marginTop: '-4'
        },
        tableCellNetWt: {
                width: '11%',
                textAlign: 'right',
                marginTop: '-4'
        },
        tableCellRate: {
                width: '10%',
                textAlign: 'right',
                marginTop: '-4'
        },
        tableCellMC: {
                width: '8%',
                textAlign: 'right',
                marginTop: '-4'
        },
        tableCellStAmt: {
                width: '10%',
                textAlign: 'right',
                marginTop: '-4'
        },
        tableCellTotal: {
                width: '10%',
                textAlign: 'right',
                marginTop: '-4'
        },

        lastheight: {
                height: 28,
                // marginTop:'10'
        },
});


const TaxINVoiceReceipt = ({
        formData,
        repairDetails,
        cash_amount,
        card_amt,
        chq_amt,
        online_amt,
        taxAmount,
        oldItemsAmount,
        schemeAmount,
        netPayableAmount,
      }) => {
        // Log customer details to verify they are dynamically fetched
        console.log("Customer Details:");
        console.log("Account Name:", formData.account_name);
        console.log("City:", formData.city);
        console.log("Mobile:", formData.mobile);
        console.log("PAN No:", formData.pan_card);
        console.log("GSTIN:", formData.gst_in);
        console.log("Invoice Number:", formData.invoice_number);
        console.log("Date:", formData.date);
      
        // Calculate total values
        const totalValues = repairDetails.reduce(
          (totals, item) => {
            return {
              qty: totals.qty + Number(item.qty || 0),
              grossWeight: totals.grossWeight + Number(item.gross_weight || 0),
              stoneWeight: totals.stoneWeight + Number(item.stone_weight || 0),
              netWeight: totals.netWeight + Number(item.weight_bw || 0),
              rate: totals.rate + Number(item.rate || 0),
              makingCharges: totals.makingCharges + Number(item.making_charges || 0),
              stonePrice: totals.stonePrice + Number(item.stone_price || 0),
              rateAmount: totals.rateAmount + Number(item.rate_amt || 0),
            };
          },
          {
            qty: 0,
            grossWeight: 0,
            stoneWeight: 0,
            netWeight: 0,
            rate: 0,
            makingCharges: 0,
            stonePrice: 0,
            rateAmount: 0,
          }
        );
      
        const netBillValue = totalValues.rateAmount + totalValues.makingCharges + totalValues.stonePrice + taxAmount;
      
        // Convert the value into words
        const netBillValueInWords = toWords(netBillValue).replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()); // Capitalize words
      
        return (
          <Document>
            <Page size="A4" style={styles.page}>
              {/* First Row */}
              <View style={styles.row}>
                <View style={[styles.column, { marginTop: 20, width: "20%", marginLeft: 20, fontFamily: "Times-Bold" }]}>
                  <Text style={[styles.boldText, { marginBottom: 5 }]}>CUSTOMER DETAILS:</Text>
                  <Text style={{ marginBottom: 5 }}>Account Name:{formData.account_name || ""}</Text>
                  <Text style={{ marginBottom: 5 }}>{formData.city}</Text>
                  <Text style={{ marginBottom: 5 }}>MOBILE: {formData.mobile}</Text>
                  <Text style={{ marginBottom: 5 }}>PAN NO: {formData.pan_card}</Text>
                </View>
      
                <View style={[styles.column, { width: "40%" }]}>
                  <Image style={styles.image1} src={logo1} />
                </View>
      
                <View style={[styles.column, { width: "10%" }]}></View>
      
                <View style={[styles.column, { marginTop: 0, width: "20%", marginLeft: 20, fontFamily: "Times-Bold" }]}>
                  <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 10, marginLeft: 20 }}>TAX INVOICE</Text>
      
                  {/* BILL NO */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <Text>BILL NO:</Text>
                    <Text style={{ textAlign: "right", flex: 1 }}>{formData.invoice_number}</Text>
                  </View>
      
                  {/* DATE */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <Text>DATE:</Text>
                    <Text style={{ textAlign: "right", flex: 1 }}>{formData.date}</Text>
                  </View>
      
                  {/* STAFF */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <Text>STAFF:</Text>
                    <Text style={{ textAlign: "right", flex: 1 }}>Sadashri Jewels</Text>
                  </View>
      
                  {/* GSTIN */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                    <Text>GSTIN:</Text>
                    <Text style={{ textAlign: "right", flex: 1 }}>29ABMCS9253K1ZG</Text>
                  </View>
                </View>
              </View>


                                <View style={styles.container}>
                                        {/* Centered Heading */}
                                        <Text style={[styles.heading, { fontFamily: 'Times-Bold' }]}>SADASHRI VENTURES PRIVATE LIMITED</Text>

                                        {/* Flat No. and Branch section */}
                                        <View style={styles.contentContainer}>

                                                {/* Flat No. Section */}
                                                <View style={styles.leftColumn}>
                                                        <Text style={styles.flatNo}>Flat No : 1323/1324, 16th B Cross Housing </Text>
                                                        <Text style={styles.cin}>Board Colony EWS 3rd Phase, Yelahanka New </Text>
                                                        <Text style={styles.cin}>Town, Bengaluru Urban, Karnataka - 560064.</Text>
                                                        <Text style={styles.cin}>CIN : U46498KA2024PTC185784</Text>

                                                </View>

                                                {/* Vertical Divider */}
                                                <View style={styles.divider1} />

                                                {/* Branch Section */}
                                                <View style={styles.rightColumn}>
                                                        <Text style={[styles.branch, { fontFamily: 'Times-Bold' }]}>BRANCH:</Text>
                                                        <Text style={styles.branchContent}>Shop no. 1 No.2063, Dairy Circle, </Text>
                                                        <Text style={styles.branchContent}> Asha Arcade, 16th B Cross Rd,</Text>
                                                        <Text style={styles.branchContent}>Yalahanka New Town, Bangalore - 064</Text>
                                                </View>
                                        </View>

                                        {/* Horizontal Divider under both sections */}
                                        <View style={styles.horizontalLine1} />

                                        <View>
                                                <Text>
                                                        Mob : 9964644424 EMAIL : sadashri.Yel@gmail.com
                                                </Text>
                                        </View>


                                        <View style={styles.boxContainer}>
                                                <View style={styles.table}>
                                                        <View style={[styles.tableRow, { fontFamily: 'Times-Bold' }]}>
                                                                <Text style={[styles.tableCell, styles.tableCellHeader]}>SI</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellDescription]}>Description</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellHSN]}>HSN</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellQty]}>Qty</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellPurity]}>Purity</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellGrossWt]}>Gross.Wt
                                                                        <Text style={{ fontFamily: 'Times-Roman', fontSize: 7 }}>  In Gms</Text>
                                                                </Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellStoneWt]}>Stone.Wt
                                                                        <Text style={{ fontFamily: 'Times-Roman', fontSize: 7 }}>   In Gms</Text>
                                                                </Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellNetWt]}>Net.Wt
                                                                        <Text style={{ fontFamily: 'Times-Roman', fontSize: 7 }}>             In Gms</Text>
                                                                </Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellRate]}>Rate</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellMC]}>MC</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellStAmt]}>St.Amt</Text>
                                                                <View style={styles.divider1} />

                                                                <Text style={[styles.tableCell, styles.tableCellTotal]}>Total</Text>
                                                        </View>
                                                        <View style={styles.horizontalLine} />

                                                        {/* Add rows of data below */}
                                                        {repairDetails.map((item, index) => (
                                                                <View style={[styles.tableRow, { fontFamily: 'Times-Roman' }]} key={index}>
                                                                        <Text style={[styles.tableCell, styles.tableCellHeader]}>{index + 1}</Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellDescription]}>
                                                                                {item.product_name || "N/A"}
                                                                        </Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellHSN]}>{item.hsn_code}</Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellQty]}>
                                                                                {item.qty || "0"}
                                                                        </Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellPurity]}>
                                                                                {item.purity || "N/A"}
                                                                        </Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellGrossWt]}>
                                                                                {item.gross_weight || "0.00"}
                                                                        </Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellStoneWt]}>
                                                                                {item.stone_weight || "0.00"}
                                                                        </Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellNetWt]}>
                                                                                {item.total_weight_av || "0.00"}
                                                                        </Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellRate]}>
                                                                                {item.rate || "0.00"}
                                                                        </Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellMC]}>
                                                                                {item.making_charges || "0.00"}
                                                                        </Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellStAmt]}>
                                                                                {item.stone_price || "0.00"}
                                                                        </Text>
                                                                        <View style={[styles.divider1, { marginTop: -2 }]} />

                                                                        <Text style={[styles.tableCell, styles.tableCellTotal]}>
                                                                                {(parseFloat(item.rate_amt || 0) + parseFloat(item.stone_price || 0) + parseFloat(item.making_charges || 0)).toFixed(2) || "0.00"}
                                                                        </Text>
                                                                </View>
                                                        ))}


                                                </View>

                                                <View style={[styles.horizontalLine, { marginTop: -2 }]} />

                                                <View style={[styles.tableRow, { fontFamily: 'Times-Bold' }]}>
                                                        <Text style={[styles.tableCell, styles.tableCellHeader, styles.lastheight]}></Text>
                                                        <Text style={[styles.tableCell, styles.tableCellDescription, styles.lastheight]}></Text>
                                                        <Text style={[styles.tableCell, styles.tableCellHSN, styles.lastheight]}></Text>
                                                        <Text style={[styles.tableCell, styles.tableCellQty, styles.lastheight]}>
                                                                {Math.round(totalValues.qty)}
                                                        </Text>
                                                        <Text style={[styles.tableCell, styles.tableCellPurity, styles.lastheight]}></Text>
                                                        <Text style={[styles.tableCell, styles.tableCellGrossWt, styles.lastheight]}>
                                                                {totalValues.grossWeight.toFixed(2)}
                                                        </Text>
                                                        <Text style={[styles.tableCell, styles.tableCellStoneWt, styles.lastheight]}>
                                                                {/* {totalValues.stoneWeight.toFixed(2)} */}
                                                        </Text>
                                                        <Text style={[styles.tableCell, styles.tableCellNetWt, styles.lastheight]}>
                                                                {totalValues.netWeight.toFixed(2)}
                                                        </Text>
                                                        <Text style={[styles.tableCell, styles.tableCellRate, styles.lastheight]}>
                                                                {/* {totalValues.rate.toFixed(2)} */}
                                                        </Text>
                                                        <Text style={[styles.tableCell, styles.tableCellMC, styles.lastheight]}>
                                                                {/* {totalValues.makingCharges.toFixed(2)} */}
                                                        </Text>
                                                        <Text style={[styles.tableCell, styles.tableCellStAmt, styles.lastheight]}>
                                                                {/* {totalValues.stonePrice.toFixed(2)} */}
                                                        </Text>
                                                        {/* <Text style={[styles.tableCell, styles.tableCellTotal, styles.lastheight]}>
                                                                {totalValues.rateAmount.toFixed(2)}
                                                        </Text> */}
                                                        <Text style={[styles.tableCell, styles.tableCellTotal, styles.lastheight]}>
                                                                {(totalValues.rateAmount + totalValues.makingCharges + totalValues.stonePrice).toFixed(2)}
                                                        </Text>
                                                </View>


                                                <View style={[styles.horizontalLine, { marginTop: -2 }]} />


                                                <View style={{ flexDirection: "row", justifyContent: "space-between", fontFamily: 'Times-Bold' }}>
                                                        {/* Left Side Content */}
                                                        
                                                        <View style={{ paddingLeft: 10, marginTop: 20 }}>
                                                                <Text style={[styles.bold, { marginBottom: 3 }]}>
                                                                Cash Recd: {cash_amount ?? "0.00"}
                                                                </Text>
                                                                <Text style={[styles.bold, { marginBottom: 3 }]}>
                                                                Card Recd: {card_amt ?? "0.00"}
                                                                </Text>
                                                                <Text style={[styles.bold, { marginBottom: 3 }]}>
                                                                Cheque Recd: {chq_amt ?? "0.00"}
                                                                </Text>
                                                                <Text style={[styles.bold]}>
                                                                NEFT Recd: {online_amt ?? "0.00"} #: Bank:
                                                                </Text>
                                                        </View>

                                                        
                                                        {/* {repairDetails.map((item, index) => ( */}
                                                        <View style={{ paddingRight: 10, marginTop: 5 }}>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>Discount:</Text>
                                                                        <Text style={{ textAlign: "right" }}>0</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>GST Value:</Text>
                                                                        <Text style={{ textAlign: "right" }}>
                                                                                {(totalValues.rateAmount + totalValues.makingCharges + totalValues.stonePrice).toFixed(2)}
                                                                        </Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>CGST @1.50%:</Text>
                                                                        <Text style={{ textAlign: "right" }}>
                                                                                {(taxAmount / 2).toFixed(2)}
                                                                        </Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>SGST @1.50%:</Text>
                                                                        <Text style={{ textAlign: "right" }}>
                                                                                {(taxAmount / 2).toFixed(2)}
                                                                        </Text>
                                                                </View>

                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text style={[styles.bold]}>Net Bill Value: </Text>
                                                                        <Text style={{ textAlign: "right" }}>
                                                                        {/* {(totalValues.rateAmount + totalValues.makingCharges + totalValues.stonePrice + taxAmount).toFixed(2)} */}
                                                                        {netBillValue.toFixed(2)}
                                                                        </Text>

                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>(-) OLD:</Text>
                                                                        <Text style={{ textAlign: "right" }}>{oldItemsAmount.toFixed(2)}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text>(-) SCHEME:</Text>
                                                                        <Text style={{ textAlign: "right" }}>{schemeAmount.toFixed(2)}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                                                                        <Text style={[styles.bold]}>Net Amount:</Text>
                                                                        <Text style={{ textAlign: "right" }}>
                                                                        {netPayableAmount.toFixed(2)}
                                                                        </Text>
                                                                </View>
                                                        </View>


                                                </View>
                                                <View style={{ alignItems: "center", fontFamily: 'Times-Bold' }}>
                                                <Text>
                                                        (Rupees {netBillValueInWords} Only)
                                                </Text>
                                                </View>

                                                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between", marginBottom: 3, fontFamily: 'Times-Bold' }}>
                                                        {/* Left Side */}
                                                        <View style={{ alignItems: "flex-start", paddingLeft: 10 }}>
                                                                <Text style={[styles.bold]}>For Customer</Text>
                                                        </View>

                                                        {/* Right Side */}
                                                        <View style={{ alignItems: "flex-end", paddingRight: 10 }}>
                                                                <Text style={[styles.bold]}>For SADASHRI VENTURES PRIVATE LIMITED</Text>
                                                        </View>
                                                </View>



                                        </View>

                                </View>

                                <View></View>
                        </Page>
                </Document>
        );
};

export default TaxINVoiceReceipt;
