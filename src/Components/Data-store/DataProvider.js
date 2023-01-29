import { useEffect, useReducer, useState  } from "react";
import Createtextinvoce from './CreateText-invoice';


const INVOICE_DATA = [];
const INVOICE_BILL = {};
const INVOICE_ITEM_DATA = [];
const defaultItemState = {
  items: [],
  subTotal:0,
  cgst:0,
  sgst:0,
  totalAmt:0,
};
const itemInvoiceReducer = (state, action) => {
  if(action.type === "ADDITEMINVOICE"){
    const updateItem = state.items.concat(action.items);
    const upateSubTotal = state.subTotal + action.items.amount;
    const updateCgst = state.cgst + action.items.cgstAmt;
    const updateSgst = state.sgst + action.items.sgstAmt;
    const totalAmt = upateSubTotal + updateCgst + updateSgst;
    // const isExitsItem = state.item.findIndex(e => e.id === action.items.id);
    return {
      items: updateItem,
      subTotal:upateSubTotal,
      cgst:updateCgst,
      sgst:updateSgst,
      totalAmt:totalAmt,
    }

  }
  if(action.type === "REMOVEITEM"){
    const isExistItem = state.items.findIndex(e => e.id === action.id);
    const existItem = state.items[isExistItem];
    const upateSubTotal = state.subTotal - existItem.amount;
    const updateCgst = state.cgst - existItem.cgstAmt;
    const updateSgst = state.sgst - existItem.sgstAmt;
    const updatetotalAmt = upateSubTotal + updateCgst + updateSgst;
    
    
    if(existItem){
      const updateItems = state.items.filter(e => e.id !== action.id);
      return {
        items: updateItems,
        subTotal:upateSubTotal,
        cgst:updateCgst,
        sgst:updateSgst,
        totalAmt:updatetotalAmt,
      }
    }
    
  }
  return defaultItemState;
}

const itemReducer = (state, action)=>{
  if(action.type === "ADDITEM"){
    return action.item;
  }
  return {};
}

const DataProvider = (props) => {
   
    const [invoiceBill, setInvoiceBill] = useState(INVOICE_BILL);
    const [invoiceItemData, setInvoiceItemData] = useState(INVOICE_ITEM_DATA);
    const [itemState, dispatchItemAction] = useReducer(itemReducer, {});
    const [iteminvoiceState, dispatchItemInvoiceAction] = useReducer(itemInvoiceReducer, defaultItemState);

    useEffect(()=>{
        setInvoiceItemData(iteminvoiceState.items);
        setInvoiceBill(itemState);
        
    }, [iteminvoiceState]);
    
    const onAddInvoiceData = (invoiceItem)=>{
    
        dispatchItemInvoiceAction({type:"ADDITEMINVOICE", items: invoiceItem})
    
    }

    const removeItem = (id)=>{
        dispatchItemInvoiceAction({type:"REMOVEITEM", id: id});

    }

    const onAddItemBill = (item)=>{
        dispatchItemAction({type:"ADDITEM", item: item});
        setInvoiceBill(item);
    }

    
    
    const invoiceCartContext = {
        item:itemState,
        invoiceitems:iteminvoiceState.items,
        subTotal:iteminvoiceState.subTotal,
        cgst:iteminvoiceState.cgst,
        sgst:iteminvoiceState.sgst,
        totalAmt:iteminvoiceState.totalAmt,
        onAddInvoice: onAddInvoiceData,
        onRemoveItem:removeItem,
        onItemBill:onAddItemBill
    }
    
    return <Createtextinvoce.Provider value={invoiceCartContext}>{props.children}</Createtextinvoce.Provider>
};

export default DataProvider;