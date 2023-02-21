import React, { createContext } from "react"

const Createtextinvoce = createContext(
    {
        item:{},
        invoiceitems:[],
        subTotal:0,
        cgst:0,
        sgst:0,
        totalAmt:0,
        onAddInvoice: ()=>{},
        onRemoveItem: ()=>{},
        onItemBill: () => {},
        onRemoveAll: ()=>{}
    }
);

export default Createtextinvoce;