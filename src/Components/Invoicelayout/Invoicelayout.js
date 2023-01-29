import React, { useContext, useEffect, useReducer, useState, Fragment } from "react";
import { VALIDATOR_REQUIRE  } from "../Validation/Invoicevalidation";
import Createinvoiceform from "../Createinvoiceform/Createinvoiceform";
import classes from "./Invoicelayout.module.css";
import formclasses from "../Createinvoiceform/Createinvoiceform.module.css";
import flexclasses from "../Flexbox/Flexbox.module.css";
import Createtextinvoce from "../Data-store/CreateText-invoice";
import { Convertnumberstr } from "../Validation/ConvertNumberStr";
import PDFComponent from "../PdfComponent/PDFComponent";

const Invoicelayout = (props)=>{
    const setInvoiceContext = useContext(Createtextinvoce);
    const setNewDate = new Date();
    setNewDate.toLocaleDateString();
    
    const [inputEST, dispatchInputESTInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [esDateInput, dispatchEsDateInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [billToInput, dispatchBillToInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [formIsValid, setFormIsValid] = useState(false);
    const [isGenerate, setIsGenerate] = useState(false);
    const [totalAmt, setTotalAmt] = useState(0);
    const [subtotalAmt, setsubTotalAmt] = useState(0);
    const [amtWrd, setAmtWrd] = useState("");
    const [cgstAmt, setcgstAmt] = useState(0);
    const [sgstAmt, setsgstAmt] = useState(0);

    const {isValid: isESTInput} = inputEST; 
    const {isValid: isESTDate} = esDateInput; 
    const {isValid: isBillToInput} = billToInput; 

    useEffect(()=>{
        const getTotal = new Intl.NumberFormat('en-IN').format(setInvoiceContext.totalAmt)
        const getSubTotal = new Intl.NumberFormat('en-IN').format(setInvoiceContext.subTotal)
        const getcgst = new Intl.NumberFormat('en-IN').format(setInvoiceContext.cgst)
        const getsgst = new Intl.NumberFormat('en-IN').format(setInvoiceContext.sgst)
        const amountWords = Convertnumberstr(setInvoiceContext.totalAmt);
        setTotalAmt(getTotal);
        setsubTotalAmt(getSubTotal);
        setAmtWrd(amountWords);
        setcgstAmt(getcgst);
        setsgstAmt(getsgst);
        // console.log(setInvoiceContext.item);
    }, [setInvoiceContext.totalAmt]);



    useEffect(()=>{
        const identifier = setTimeout(()=>{
            setFormIsValid(isESTInput && isESTDate && isBillToInput)
        }, 500)    
        return ()=>{
            clearTimeout(identifier);
        }
    }, [isESTInput && isESTDate && isBillToInput])
   
    const onInputHandler = (event)=> {

        if(event.target.name === "ESTID") {
            dispatchInputESTInput({type: "REQUIRE", val: event.target.value});
        }
        if(event.target.name === "ESTDATE") {
            dispatchEsDateInput({type: "REQUIRE", val: event.target.value});
        }
        if(event.target.name === "BILLTO") {
            dispatchBillToInput({type: "REQUIRE", val: event.target.value});
        }
        
        setFormIsValid(isESTInput && isESTDate && isBillToInput)
        
    }
    
    const ontouchHandler = (event)=> {
    
        if(event.target.name === "ESTID") {
            dispatchInputESTInput({type: "ON_BLUR"})
        }
        if(event.target.name === "ESTDATE") {
            dispatchEsDateInput({type: "ON_BLUR"})
        }
        if(event.target.name === "BILLTO") {
            dispatchBillToInput({type: "ON_BLUR"})
        }
        
    }

    const onGenerate = (event)=>{
        event.preventDefault();
        if(setInvoiceContext.invoiceitems.length <= 0){
            alert("Invoice is Empty...");
        }else{
            if(formIsValid){
                const getItems = {
                    estId: "EST"+inputEST.value,
                    estDate: esDateInput.value,
                    billto: billToInput.value
                }
                setInvoiceContext.onItemBill(getItems);
                //setFormIsValid(false);
                setIsGenerate(true);
            }
        }
        
        
    }

    const onRemoveItem = id => {
        setInvoiceContext.onRemoveItem(id);
    }
   
    const onCancelPdf = ()=>{
        setIsGenerate(false)
    }

    return(
        <Fragment>

        
            <div className={`${classes["inovice-container"]}`}>
                <div className={`${flexclasses["row"]} ${classes["estimate-tab"]}`}>
                    <div className={`${flexclasses["col-md-6"]} ${classes["estimate-col"]}`}>
                        <div className={`${flexclasses["row"]}`}>
                            <div className={`${flexclasses["col-md-6"]}`}>
                                <span>#</span>
                            </div>
                            <div className={`${flexclasses["col-md-6"]}`}>
                                <input type="number" name="ESTID" className={formclasses["input-controls"]} placeholder="Ex: 00014" 
                                value={inputEST.value} onChange={onInputHandler} onBlur={ontouchHandler} />
                            </div>
                        </div>
                        <div className={`${flexclasses["row"]}`}>
                            <div className={`${flexclasses["col-md-6"]}`}>
                                <span>Estimate Date</span>
                            </div>
                            <div className={`${flexclasses["col-md-6"]}`}>
                            <input type="date" name="ESTDATE" value={esDateInput.value} onChange={onInputHandler} onBlur={ontouchHandler} className={formclasses["input-controls"]} />
                            </div>
                        </div>
                    </div>
                    <div className={`${flexclasses["col-md-6"]} ${classes["estimate-col"]}`}>
                        <div className={`${flexclasses["row"]}`}>
                            <div className={`${flexclasses["col-md-6"]}`}>
                                <span>Place of Supplay</span>
                            </div>
                            <div className={`${flexclasses["col-md-6"]}`}>
                                <span><b>Tami Nadu(33)</b></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${flexclasses["row"]} ${classes["bill-to-tab"]}`}>
                    <div className={`${flexclasses["col-md-12"]} ${classes["bill-to-title"]} bg-light`}>
                        <span>Bill To</span>
                    </div>
                    <div className={`${flexclasses["col-md-12"]} ${classes["bill-to-content"]}`}>
                        <input type="text" className={formclasses["input-controls"]} name="BILLTO" value={billToInput.value} onChange={onInputHandler} onBlur={ontouchHandler}  />
                    </div>
                </div>

                <div className={`${classes["bill-item-tab"]}`}>
                    <div className={`${flexclasses["row"]} ${classes["bill-item-row"]}`}>
                        <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} ${classes["bill-item-no"]} bg-light`}>
                            <span>#</span>
                        </div>
                        <div className={`${flexclasses["col-3"]} ${classes["bill-item-title"]} bg-light`}>
                            <span>Item & Description</span>
                        </div>
                        <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} bg-light`}>
                            <span>HSN/SAC</span>
                        </div>
                        <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} bg-light justify-content-end`}>
                            <span>Qty</span>
                        </div>
                        <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} bg-light justify-content-end`}>
                            <span>Rate</span>
                        </div>
                        <div className={`${flexclasses["col-2"]} ${classes["bill-item-title"]} bg-light p-r-0 p-b-0 p-l-0`}>
                            <div className={`${flexclasses["col-12"]} ${classes["bill-gst-title"]} text-center`}>CGST</div>  
                            <div className={`${flexclasses["col"]} ${classes["bill-gst-bx"]} text-right`}>
                                <span>%</span>    
                            </div>
                            <div className={`${flexclasses["col"]} ${classes["bill-gst-bx"]} text-right`}>
                                <span>Amt</span>    
                            </div>
                            
                        </div>
                        <div className={`${flexclasses["col-2"]} ${classes["bill-item-title"]} bg-light p-r-0 p-b-0 p-l-0`}>
                            <div className={`${flexclasses["col-12"]} ${classes["bill-gst-title"]} text-center`}>SGST</div>  
                            <div className={`${flexclasses["col"]} ${classes["bill-gst-bx"]} text-right`}>
                                <span>%</span>    
                            </div>
                            <div className={`${flexclasses["col"]} ${classes["bill-gst-bx"]} text-right`}>
                                <span>Amt</span>    
                            </div>
                            
                        </div>
                        <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} ${classes["bill-item-amt"]} bg-light justify-content-end`}>
                            <span>Amount</span>
                        </div>
                    </div>

                    <Createinvoiceform />

                    {setInvoiceContext.invoiceitems.length > 0 && 
                        setInvoiceContext.invoiceitems.map((item, indx) =>{

                            return <div key={item.id} className={`${flexclasses["row"]} ${classes["bill-item-row"]} ${classes["bill-item-view"]}`}>
                                <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} ${classes["bill-item-no"]}`}>
                                    <span>{indx+1}</span>
                                </div>
                                <div className={`${flexclasses["col-3"]} ${classes["bill-item-title"]} align-items-start`}>
                                    <span>{item.itemDescription}</span>
                                </div>
                                <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} align-items-start`}>
                                    <span>{item.hsnSac}</span>
                                </div>
                                <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} align-items-start justify-content-end`}>
                                    <span>{item.qty}.00</span>
                                </div>
                                <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} align-items-start justify-content-end`}>
                                    <span>{item.rate}.00</span>
                                </div>
                                <div className={`${flexclasses["col-2"]} ${classes["bill-item-title"]} p-0 align-items-stretch`}>
                                    
                                    <div className={`${flexclasses["col"]} ${classes["bill-gst-bx"]} text-right b-t-0`}>
                                        <span>{item.cgstPersent}%</span>    
                                    </div>
                                    <div className={`${flexclasses["col"]} ${classes["bill-gst-bx"]} text-right b-t-0`}>
                                        <span>{item.cgstAmt}.00</span>    
                                    </div>
                                    
                                </div>
                                <div className={`${flexclasses["col-2"]} ${classes["bill-item-title"]} p-0 align-items-stretch`}>
                                    
                                    <div className={`${flexclasses["col"]} ${classes["bill-gst-bx"]} text-right b-t-0`}>
                                        <span>{item.sgstPersent}%</span>    
                                    </div>
                                    <div className={`${flexclasses["col"]} ${classes["bill-gst-bx"]} text-right b-t-0`}>
                                        <span>{item.sgstAmt}.00</span>    
                                    </div>
                                    
                                </div>
                                <div className={`${flexclasses["col"]} ${classes["bill-item-title"]} ${classes["bill-item-action"]} align-items-start justify-content-end`}>
                                    <span>{item.amount}.00</span>
                                    <button className={`${formclasses["btns"]} ${formclasses["btns-secondary"]} ${classes["delete-btn"]}`} onClick={onRemoveItem.bind(null, item.id)} >-</button>
                                </div>
                            </div>
                        })
                            
                    }

                    <div  className={`${flexclasses["row"]} `}>
                        <div className={`${flexclasses["col-8"]} ${classes["bill-text-amout"]}`}>
                            <h3>Total In Words</h3>
                            {amtWrd && 
                                <p>Indian Rupee {amtWrd}</p>
                            }
                            
                        </div>
                        <div className={`${flexclasses["col-4"]} ${classes["bill-math-amout"]}`}>
                            <div className={`d-flex ${classes["final-amt-list"]}`}>
                                <div className={`${flexclasses["col-6"]} text-right`}>
                                    Sub Total
                                </div>
                                <div className={`${flexclasses["col-6"]} text-right`}>
                                    {subtotalAmt}.00
                                </div>
                            </div>
                            <div className={`d-flex ${classes["final-amt-list"]}`}>
                                <div className={`${flexclasses["col-6"]} text-right`}>
                                    CGST 
                                </div>
                                <div className={`${flexclasses["col-6"]} text-right`}>
                                    {cgstAmt}.00
                                </div>
                            </div>
                            <div className={`d-flex ${classes["final-amt-list"]}`}>
                                <div className={`${flexclasses["col-6"]} text-right`}>
                                    SGST
                                </div>
                                <div className={`${flexclasses["col-6"]} text-right`}>
                                    {sgstAmt}.00
                                </div>
                            </div>
                            <div className={`d-flex ${classes["final-amt-list"]} text-bold`}>
                                <div className={`${flexclasses["col-6"]} text-right`}>
                                    Total
                                </div>
                                <div className={`${flexclasses["col-6"]} text-right`}>
                                    {totalAmt}.00
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                <div className={classes.invoiceBtn}>
                
                    <button className={formclasses.btns} disabled={!formIsValid} onClick={onGenerate}>Generate PDF</button>
                    {!formIsValid && <p>Please fill the Invoice No, EST Date and Bill to..</p>}
                </div>
            </div>
            {isGenerate &&
                <PDFComponent cancelPdf={onCancelPdf} />
            }
        
        </Fragment>
    )
}

export default Invoicelayout;