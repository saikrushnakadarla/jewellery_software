import React from 'react'
import Salesform from'./SaleReturnSaleform'

const SaleReturnForm = ({invoiceDetails, filteredInvoices, setFilteredInvoices, uniqueInvoice,handleInvoiceChange,setReturnData,
  returnData,
  isAllSelected,
        handleCheckboxChange,
        handleSelectAllChange,
        salesTaxableAmount,
                salesTaxAmount,
                salesNetAmount,
                selectedRows,
}) => {
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
      selectedRows={selectedRows}
                isAllSelected={isAllSelected}
                handleCheckboxChange={handleCheckboxChange}
                handleSelectAllChange={handleSelectAllChange}
                salesTaxableAmount={salesTaxableAmount}
                salesTaxAmount={salesTaxAmount}
                salesNetAmount={salesNetAmount}
      />
    </div>
  )
}

export default SaleReturnForm