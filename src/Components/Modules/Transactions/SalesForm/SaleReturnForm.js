import React from 'react'
import Salesform from'./SaleReturnSaleform'

const SaleReturnForm = ({invoiceDetails, filteredInvoices, setFilteredInvoices, uniqueInvoice,handleInvoiceChange,setReturnData,
  returnData,}) => {
  console.log("FilteredInvoices=",filteredInvoices)
  return (
    <div>
    {/* <h4>SaleReturn Form</h4> */}
    <Salesform 
      filteredInvoices={filteredInvoices} 
      invoiceDetails={invoiceDetails}
      uniqueInvoice={uniqueInvoice}
      handleInvoiceChange={handleInvoiceChange}
      returnData={returnData}
      setReturnData={setReturnData}
      />
    </div>
  )
}

export default SaleReturnForm