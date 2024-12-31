import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles for the PDF document
const styles = StyleSheet.create({
        page: {
                padding: 20,
                fontSize: 12,
                fontFamily: "Helvetica",
                lineHeight: 1.5,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f9f9f9",
        },
        heading: {
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
                color: "#333",
                textTransform: "uppercase",
                borderBottom: "1px solid #ccc",
                paddingBottom: 5,
        },
        row: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
        },
        leftText: {
                fontSize: 12,
                color: "#444",
        },
        rightText: {
                fontSize: 12,
                color: "#444",
                textAlign: "right",
        },
        columnAlign: {
                flexDirection: "column",
                alignItems: "flex-end", // Aligns text to the right
        },
        footer: {
                fontSize: 12,
                color: "#888",
                textAlign: "center",
                marginTop: 20,
                borderTop: "1px solid #ccc",
                paddingTop: 10,
        },


        tableHeader: {
                flexDirection: "row",
                borderTopWidth: 1,
                borderTopColor: "#000",
                borderBottomWidth: 1,
                borderBottomColor: "#000",
                marginBottom: 5,
                marginTop: 5,
        },
        tableRow: {
                flexDirection: "row",

        },

        tableCell: {
                fontSize: 12,
                paddingHorizontal: 3,
                paddingVertical: 2,
        },
        snHeader: { width: "5%", fontWeight: "bold" },
        itemHeader: { width: "40%", fontWeight: "bold" },
        weightHeader: { width: "10%", fontWeight: "bold", textAlign: "center" },
        vaHeader: { width: "10%", fontWeight: "bold", textAlign: "center" },
        mcHeader: { width: "10%", fontWeight: "bold", textAlign: "center" },
        stAmtHeader: { width: "10%", fontWeight: "bold", textAlign: "center" },
        amtHeader: { width: "15%", fontWeight: "bold", textAlign: "right" },

        snCell: { width: "5%" },
        itemCell: { width: "40%" },
        weightCell: { width: "10%", textAlign: "center" },
        vaCell: { width: "10%", textAlign: "center" },
        mcCell: { width: "10%", textAlign: "center" },
        stAmtCell: { width: "10%", textAlign: "center" },
        amtCell: { width: "15%", textAlign: "right" },

        footerRow: {
                flexDirection: "row",
                marginTop: 5,
                borderTopWidth: 1,
                borderTopColor: "#000",
                borderBottomWidth: 1, // Bottom border
                borderBottomColor: "#000",
                paddingTop: 5,
                marginBottom: 5,

        },
        footerCell: {
                fontSize: 12,
                fontWeight: "bold",
                paddingHorizontal: 3,
                paddingVertical: 2,
        },
        summaryCell: {
                textAlign: "right",
        },




        container: {
                padding: 2,
                alignItems: 'flex-end', // Align the container to the right side of the screen
        },
        keyvaluerow: {
                flexDirection: 'row',
                justifyContent: 'space-between', // Ensures key and value are spaced out
                marginBottom: 3,
                gap: 10,
        },
        key: {
                fontSize: 12,
                fontWeight: 'bold',
        },
        value: {
                fontSize: 12,
        }
});

// PDF Document Component
const PDFContent = () => (
        <Document>
                <Page size="A4" style={styles.page}>
                        {/* Main content */}
                        <View>
                                {/* Heading */}
                                <Text style={styles.heading}>Estimation</Text>

                                {/* Content Rows */}
                                <View style={styles.row}>
                                        <Text style={styles.leftText}>Est No : 02</Text>
                                        <Text style={styles.rightText}>S.E : Sadashri Jewels</Text>
                                </View>
                                <View style={styles.row}>
                                        <Text style={styles.leftText}>Rate : 7125.00</Text>
                                        <Text style={styles.rightText}>Date : 26-12-24</Text>
                                </View>
                                <View style={styles.columnAlign} >
                                        <Text >01:03:19PM</Text>
                                </View>
                        </View>

                        <View>
                                {/* Table Header */}
                                <View style={styles.tableHeader}>
                                        <Text style={[styles.tableCell, styles.snHeader]}>S.N</Text>
                                        <Text style={[styles.tableCell, styles.itemHeader]}>Item</Text>
                                        <Text style={[styles.tableCell, styles.weightHeader]}>Gr.wt</Text>
                                        <Text style={[styles.tableCell, styles.weightHeader]}>Nt wt</Text>
                                        <Text style={[styles.tableCell, styles.vaHeader]}>VA</Text>
                                        <Text style={[styles.tableCell, styles.mcHeader]}>MC</Text>
                                        <Text style={[styles.tableCell, styles.mcHeader]}>St.Amt</Text>
                                        <Text style={[styles.tableCell, styles.amtHeader]}>Amt</Text>
                                </View>

                                {/* Table Rows */}
                                <View style={styles.tableRow}>
                                        <Text style={[styles.tableCell, styles.snCell]}>1</Text>
                                        <Text style={[styles.tableCell, styles.itemCell]}>PENDENT #:BVIF1,BVIF1</Text>
                                        <Text style={[styles.tableCell, styles.weightCell]}>6.974</Text>
                                        <Text style={[styles.tableCell, styles.weightCell]}>6.086</Text>
                                        <Text style={[styles.tableCell, styles.vaCell]}>14.99%</Text>
                                        <Text style={[styles.tableCell, styles.mcCell]}></Text>
                                        <Text style={[styles.tableCell, styles.stAmtCell]}>888</Text>
                                        <Text style={[styles.tableCell, styles.amtCell]}>51749</Text>
                                </View>
                                <View style={styles.tableRow}>
                                        <Text style={[styles.tableCell, styles.snCell]}>2</Text>
                                        <Text style={[styles.tableCell, styles.itemCell]}>PENDENT #:EEWNS2,EEWNS2</Text>
                                        <Text style={[styles.tableCell, styles.weightCell]}>3.938</Text>
                                        <Text style={[styles.tableCell, styles.weightCell]}>3.789</Text>
                                        <Text style={[styles.tableCell, styles.vaCell]}>14.99%</Text>
                                        <Text style={[styles.tableCell, styles.mcCell]}></Text>
                                        <Text style={[styles.tableCell, styles.stAmtCell]}>149</Text>
                                        <Text style={[styles.tableCell, styles.amtCell]}>31402</Text>
                                </View>
                                <View style={styles.tableRow}>
                                        <Text style={[styles.tableCell, styles.snCell]}>3</Text>
                                        <Text style={[styles.tableCell, styles.itemCell]}>EARRINGS #:GYZDRL,53ENBE</Text>
                                        <Text style={[styles.tableCell, styles.weightCell]}>2.411</Text>
                                        <Text style={[styles.tableCell, styles.weightCell]}>2.357</Text>
                                        <Text style={[styles.tableCell, styles.vaCell]}>14.99%</Text>
                                        <Text style={[styles.tableCell, styles.mcCell]}></Text>
                                        <Text style={[styles.tableCell, styles.stAmtCell]}>54</Text>
                                        <Text style={[styles.tableCell, styles.amtCell]}>19473</Text>
                                </View>

                                <View style={styles.footerRow}>
                                        <Text style={[styles.tableCell, styles.snCell]}></Text> {/* Empty for S.N */}
                                        <Text style={[styles.tableCell, styles.itemCell]}>Total</Text> {/* Label for totals */}
                                        <Text style={[styles.tableCell, styles.weightCell]}>13.323</Text> {/* Gr.wt Total */}
                                        <Text style={[styles.tableCell, styles.weightCell]}>12.232</Text> {/* Nt wt Total */}
                                        <Text style={[styles.tableCell, styles.vaCell]}></Text> {/* Empty for VA */}
                                        <Text style={[styles.tableCell, styles.mcCell]}></Text> {/* Empty for MC */}
                                        <Text style={[styles.tableCell, styles.stAmtCell]}></Text> {/* Empty for St.Amt */}
                                        <Text style={[styles.tableCell, styles.amtCell]}>102623</Text> {/* Amt Total */}
                                </View>

                        </View>

                        <View style={styles.container}>
                                <View style={styles.keyvaluerow}>
                                        <Text style={styles.key}>Round off:</Text>
                                        <Text style={styles.value}>-0.31</Text>
                                </View>
                                <View style={styles.keyvaluerow}>
                                        <Text style={styles.key}>GST Value:</Text>
                                        <Text style={styles.value}>102623.30</Text>
                                </View>
                                <View style={styles.keyvaluerow}>
                                        <Text style={styles.key}>CGST@1.50%:</Text>
                                        <Text style={styles.value}>1539.35</Text>
                                </View>
                                <View style={styles.keyvaluerow}>
                                        <Text style={styles.key}>SGST@1.50%:</Text>
                                        <Text style={styles.value}>1539.35</Text>
                                </View>
                                <View style={styles.keyvaluerow}>
                                        <Text style={styles.key}>Final Amt=</Text>
                                        <Text style={styles.value}>105702.00</Text>
                                </View>
                        </View>




                </Page>
        </Document>
);

export default PDFContent;


















// import React from "react";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// // Styles for the PDF document
// const styles = StyleSheet.create({
//         page: {
//                 padding: 20,
//                 fontSize: 12,
//                 fontFamily: "Helvetica",
//                 lineHeight: 1.5,
//                 display: "flex",
//                 flexDirection: "column",
//                 backgroundColor: "#f9f9f9",
//         },
//         heading: {
//                 fontSize: 18,
//                 fontWeight: "bold",
//                 marginBottom: 20,
//                 textAlign: "center",
//                 color: "#333",
//                 textTransform: "uppercase",
//                 borderBottom: "1px solid #ccc",
//                 paddingBottom: 5,
//         },
//         row: {
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 marginBottom: 5,
//         },
//         leftText: {
//                 fontSize: 12,
//                 color: "#444",
//         },
//         rightText: {
//                 fontSize: 12,
//                 color: "#444",
//                 textAlign: "right",
//         },
//         columnAlign: {
//                 flexDirection: "column",
//                 alignItems: "flex-end", // Aligns text to the right
//         },
//         footer: {
//                 fontSize: 12,
//                 color: "#888",
//                 textAlign: "center",
//                 marginTop: 20,
//                 borderTop: "1px solid #ccc",
//                 paddingTop: 10,
//         },





//         tableHeader: {
//                 flexDirection: "row",
//                 borderTopWidth: 1,
//                 borderTopColor: "#000",

//                 marginBottom: 2,
//                 marginTop: 5,
//                 paddingTop: 5,
//         },

//         tableHeader1: {
//                 flexDirection: "row",
//                 marginBottom: 2,
//                 marginTop: 1,
//         },


//         tableHeader10: {
//                 flexDirection: "row",
//                 marginBottom: 2,
//                 marginTop: 1,
//         },






//         snHeader: {
//                 width: "10%",
//                 fontWeight: "bold"
//         },
//         itemHeader: {
//                 width: "80%",
//                 fontWeight: "bold"
//         },
//         weightHeader: {
//                 width: "20%",
//                 fontWeight: "bold",
//         },
//         vaHeader: {
//                 width: "20%",
//                 fontWeight: "bold",
//         },
//         mcHeader: {
//                 width: "20%",
//                 fontWeight: "bold",
//         },
//         stAmtHeader: {
//                 width: "10%",
//                 fontWeight: "bold",
                
//         },
//         stAmtrow:{
//                 marginLeft:10,
//         },


//         amtHeader: {
//                 width: "10%",
//                 fontWeight: "bold",
//                 textAlign: "right",
//                 marginRight: 20,
//         },

//         footerRow: {
//                 flexDirection: "row",
//                 marginTop: 5,
//                 borderTopWidth: 1,
//                 borderTopColor: "#000",
//                 borderBottomWidth: 1, // Bottom border
//                 borderBottomColor: "#000",
//                 paddingTop: 5,
//                 marginBottom: 5,

//         },
//         footerCell: {
//                 fontSize: 12,
//                 fontWeight: "bold",
//                 paddingHorizontal: 3,
//                 paddingVertical: 2,
//         },
//         summaryCell: {
//                 textAlign: "right",
//         },

      


//         container: {
//                 padding: 2,
//                 alignItems: 'flex-end', 
//         },
//         keyvaluerow: {
//                 flexDirection: 'row',
//                 justifyContent: 'space-between', // Ensures key and value are spaced out
//                 marginBottom: 3,
//                 gap:10,
//         },
//         key: {
//                 fontSize: 12,
//                 fontWeight: 'bold',
//         },
//         value: {
//                 fontSize: 12,
//         }
// });

// // PDF Document Component
// const PDFContent = () => (
//         <Document>
//                 <Page size="A4" style={styles.page}>
//                         {/* Main content */}
//                         <View>
//                                 {/* Heading */}
//                                 <Text style={styles.heading}>Estimation</Text>

//                                 {/* Content Rows */}
//                                 <View style={styles.row}>
//                                         <Text style={styles.leftText}>Est No : 02</Text>
//                                         <Text style={styles.rightText}>S.E : Sadashri Jewels</Text>
//                                 </View>
//                                 <View style={styles.row}>
//                                         <Text style={styles.leftText}>Rate : 7125.00</Text>
//                                         <Text style={styles.rightText}>Date : 26-12-24</Text>
//                                 </View>
//                                 <View style={styles.columnAlign} >
//                                         <Text >01:03:19PM</Text>
//                                 </View>
//                         </View>

//                          <View>
//                                                       {/* First Table Header Row */}
//                                                       <View style={styles.tableHeader}>
//                                                               <Text style={[styles.tableCell, styles.snHeader]}>S.N</Text>
//                                                               <Text style={[styles.tableCell, styles.itemHeader]}>Item</Text>
//                                                               <Text style={[styles.tableCell, styles.stAmtHeader]}>St.Amt</Text>
//                                                       </View>
                      
//                                                       {/* Second Table Header Row for remaining columns */}
//                                                       <View style={styles.tableHeader1}>
//                                                               <Text style={[styles.tableCell, styles.snHeader]}></Text>
                      
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>Gr.wt</Text>
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>Nt wt</Text>
//                                                               <Text style={[styles.tableCell, styles.vaHeader]}>VA</Text>
//                                                               <Text style={[styles.tableCell, styles.mcHeader]}>MC</Text>
//                                                               <Text style={[styles.tableCell, styles.amtHeader]}>Amt</Text>
//                                                       </View>
                      
                      
//                                                       <View style={styles.tableHeader}>
//                                                               <Text style={[styles.tableCell, styles.snHeader]}>1</Text>
//                                                               <Text style={[styles.tableCell, styles.itemHeader]}>PENDENT #:BVIF1,BVIF1</Text>
//                                                               <Text style={[styles.tableCell, styles.stAmtHeader,  { marginLeft: 10 }]}>888</Text>
//                                                       </View>
//                                                       <View style={styles.tableHeader10}>
//                                                               <Text style={[styles.tableCell, styles.snHeader]}></Text>
                      
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>6.974</Text>
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>6.086</Text>
//                                                               <Text style={[styles.tableCell, styles.vaHeader]}>14.99%</Text>
//                                                               <Text style={[styles.tableCell, styles.mcHeader]}></Text>
//                                                               <Text style={[styles.tableCell, styles.amtHeader]}>51749</Text>
//                                                       </View>
                      
                      
//                                                       <View style={styles.tableHeader10}>
//                                                               <Text style={[styles.tableCell, styles.snHeader]}>2</Text>
//                                                               <Text style={[styles.tableCell, styles.itemHeader]}>PENDENT #:EEWNS2,EEWNS2</Text>
//                                                               <Text style={[styles.tableCell, styles.stAmtHeader,  { marginLeft: 10 }]}>149</Text>
//                                                       </View>
//                                                       <View style={styles.tableHeader10}>
//                                                               <Text style={[styles.tableCell, styles.snHeader]}></Text>
                      
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>3.938</Text>
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>3.789</Text>
//                                                               <Text style={[styles.tableCell, styles.vaHeader]}>14.99%</Text>
//                                                               <Text style={[styles.tableCell, styles.mcHeader]}></Text>
//                                                               <Text style={[styles.tableCell, styles.amtHeader]}>31402</Text>
//                                                       </View>
                      
//                                                       <View style={styles.tableHeader10}>
//                                                               <Text style={[styles.tableCell, styles.snHeader]}>3</Text>
//                                                               <Text style={[styles.tableCell, styles.itemHeader]}>EARRINGS #:GYZDRL,53ENBE</Text>
//                                                               <Text style={[styles.tableCell, styles.stAmtHeader,  { marginLeft: 10 }]}>54</Text>
//                                                       </View>
//                                                       <View style={styles.tableHeader10}>
//                                                               <Text style={[styles.tableCell, styles.snHeader]}></Text>
                      
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>2.411</Text>
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>2.357</Text>
//                                                               <Text style={[styles.tableCell, styles.vaHeader]}>14.99%</Text>
//                                                               <Text style={[styles.tableCell, styles.mcHeader]}></Text>
//                                                               <Text style={[styles.tableCell, styles.amtHeader]}>19473</Text>
//                                                       </View>
                      
                      
                      
                      
//                                                       <View style={styles.footerRow}>
//                                                               <Text style={[styles.tableCell, styles.snHeader]}></Text>
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>13.323</Text>
//                                                               <Text style={[styles.tableCell, styles.weightHeader]}>12.232</Text>
//                                                               <Text style={[styles.tableCell, styles.vaHeader]}></Text>
//                                                               <Text style={[styles.tableCell, styles.mcHeader]}></Text>
//                                                               <Text style={[styles.tableCell, styles.amtHeader]}>102623</Text>
                      
//                                                       </View>
                      
//                                               </View>
                      
//                         <View style={styles.container}>
//                                 <View style={styles.keyvaluerow}>
//                                         <Text style={styles.key}>Round off:</Text>
//                                         <Text style={styles.value}>-0.31</Text>
//                                 </View>
//                                 <View style={styles.keyvaluerow}>
//                                         <Text style={styles.key}>GST Value:</Text>
//                                         <Text style={styles.value}>102623.30</Text>
//                                 </View>
//                                 <View style={styles.keyvaluerow}>
//                                         <Text style={styles.key}>CGST@1.50%:</Text>
//                                         <Text style={styles.value}>1539.35</Text>
//                                 </View>
//                                 <View style={styles.keyvaluerow}>
//                                         <Text style={styles.key}>SGST@1.50%:</Text>
//                                         <Text style={styles.value}>1539.35</Text>
//                                 </View>
//                                 <View style={styles.keyvaluerow}>
//                                         <Text style={styles.key}>Final Amt=</Text>
//                                         <Text style={styles.value}>105702.00</Text>
//                                 </View>
//                         </View>




//                 </Page>
//         </Document>
// );

// export default PDFContent;
