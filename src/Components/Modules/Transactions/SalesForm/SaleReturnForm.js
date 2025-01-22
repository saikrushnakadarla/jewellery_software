import React from 'react'
import Salesform from'./SaleReturnSaleform'

const SaleReturnForm = ({invoiceDetails, filteredInvoices, setFilteredInvoices, uniqueInvoice}) => {
  console.log("FilteredInvoices=",filteredInvoices)
  return (
    <div>
    {/* <h4>SaleReturn Form</h4> */}
    <Salesform filteredInvoices={filteredInvoices}/>
    </div>
  )
}

export default SaleReturnForm