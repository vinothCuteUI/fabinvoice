import React, { useContext, useEffect, useReducer, useState, Fragment } from "react";
import { VALIDATOR_REQUIRE  } from "../Validation/Invoicevalidation";
import Createinvoiceform from "../Createinvoiceform/Createinvoiceform";
import classes from "./Invoicelayout.module.css";
import Container from "../Container/Container";
import formclasses from "../Createinvoiceform/Createinvoiceform.module.css";
import flexclasses from "../Flexbox/Flexbox.module.css";
import Createtextinvoce from "../Data-store/CreateText-invoice";
import { Convertnumberstr } from "../Validation/ConvertNumberStr";
import {SetNumCnvrt, ConvertNumberFormat} from '../Validation/SetNumConvert';
import PDFComponent from "../PdfComponent/PDFComponent";
import Pricecals from "../Pricecals/Pricecals";


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
        const getTotal = ConvertNumberFormat(setInvoiceContext.totalAmt);
        const getSubTotal = ConvertNumberFormat(setInvoiceContext.subTotal);
        const getcgst = ConvertNumberFormat(setInvoiceContext.cgst);
        const getsgst = ConvertNumberFormat(setInvoiceContext.sgst);
        // console.log(setInvoiceContext.totalAmt);
        
        let amountWords = null;
        if(setInvoiceContext.totalAmt){
            amountWords = Convertnumberstr(setInvoiceContext.totalAmt);
        }
        
        setTotalAmt(SetNumCnvrt(getTotal));
        setsubTotalAmt(SetNumCnvrt(getSubTotal));
        setAmtWrd(amountWords);
        setcgstAmt(SetNumCnvrt(getcgst));
        setsgstAmt(SetNumCnvrt(getsgst));
        // console.log(setInvoiceContext.item);
    }, [setInvoiceContext.subTotal, setInvoiceContext.cgst, setInvoiceContext.sgst]);


    useEffect(()=>{
        const identifier = setTimeout(()=>{
            setFormIsValid(isESTInput && isESTDate && isBillToInput)
        }, 500)    
        return ()=>{
            clearTimeout(identifier);
        }
    }, [isESTInput && isESTDate && isBillToInput]);
   
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
                    estId: inputEST.value,
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
    const onNewInvoice = ()=>{
        setInvoiceContext.onRemoveAll();
        dispatchInputESTInput({type:""})
        dispatchEsDateInput({type:""})
        dispatchBillToInput({type:""})
    }
    const onCancelPdf = ()=>{
        setIsGenerate(false)
    }

    return(
        <Fragment>

            <div className={`${classes["inovice-container"]}`}>
                <Container className={`container-fluid`} >
                    <div className={`${flexclasses["row"]} ${classes["estimate-tab"]}`}>
                        <div className={`${flexclasses["col-md-6"]} ${classes["estimate-col"]}`}>
                            <div className={`${flexclasses["row"]}`}>
                                <div className={`${flexclasses["col-md-6"]}`}>
                                    <span>#</span>
                                </div>
                                <div className={`${flexclasses["col-md-6"]} ${classes.estGroup}` }>

                                    <input type="text" name="ESTID" className={formclasses["input-controls"]} placeholder="Ex: 00014" 
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
                </Container>
                <div className={`${classes["bill-item-tab"]}`}>
                    <table style={{width:"100%", borderCollapse:"collapse"}}>
                        <tbody>
                            <tr style={{backgroundColor:"rgb(241 242 244)"}}>
                                <th style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px"}}>#</th>
                                <th style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px"}}>Item & Description</th>
                                <th style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px"}}>HSN/SAC</th>
                                <th style={{textAlign:"right",border:"solid 1px #ccc", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px"}}>Qty</th>
                                <th style={{textAlign:"right",border:"solid 1px #ccc", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px"}}>Rate</th>
                                <th style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"bottom", padding:"10px 0px 0px", fontSize:"16px"}}>
                                    <table style={{width:"100%"}}>
                                        <tbody>
                                            <tr>
                                                <th style={{textAlign:"center", padding:"0 0 10px 0"}}>CGST</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table style={{width:"100%"}}>
                                        <tbody>
                                            <tr>
                                                <th style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"1px 1px 0px 0px", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px", width:"100px"}}>%</th>
                                                <th style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"1px 0px 0px 0px", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px"}}>Amt</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </th>
                                <th style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"bottom", padding:"10px 0px 0px", fontSize:"16px"}}>
                                    <table style={{width:"100%"}}>
                                        <tbody>
                                            <tr>
                                                <th style={{textAlign:"center", padding:"0 0 10px 0"}}>SGST</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table style={{width:"100%"}}>
                                        <tbody>
                                            <tr>
                                                <th style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"1px 1px 0px 0px", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px", width:"100px"}}>%</th>
                                                <th style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"1px 0px 0px 0px", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px"}}>Amt</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </th>
                                <th style={{textAlign:"right",border:"solid 1px #ccc", verticalAlign:"bottom", padding:"10px 15px 8px", fontSize:"16px"}}>Amount</th>
                            </tr>
                            <Createinvoiceform />

                            {setInvoiceContext.invoiceitems.length > 0 && 
                                setInvoiceContext.invoiceitems.map((item, indx) =>{
                                    
                                    return <tr key={item.id}>
                                    <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>{indx+1}</td>
                                    <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px", width:"360px"}}>
                                        {item.itemDescription}
                                    </td>
                                    <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>
                                        {item.hsnSac}
                                    </td>
                                    <td style={{textAlign:"right",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px", width:"100px"}}>
                                        {item.qty}.00
                                    </td>
                                    <td style={{textAlign:"right",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>
                                        {SetNumCnvrt(ConvertNumberFormat(item.rate))}
                                    </td>
                                    <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"0px 0px 0px", fontSize:"16px", position:"relative"}}>

                                        <table style={{width:"100%", height:"100%", position:"absolute"}}>
                                            <tbody>
                                                <tr>
                                                    <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 1px 0px 0px", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px", width:"100px"}}>
                                                        {item.cgstPersent}%
                                                    </td>
                                                    <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 0px 0px 0px", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>
                                                        {SetNumCnvrt(ConvertNumberFormat(item.cgstAmt))}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"0px 0px 0px", fontSize:"16px", position:"relative"}}>
                                        
                                        <table style={{width:"100%", height:"100%", position:"absolute"}}>
                                            <tbody>
                                                <tr>
                                                    <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 1px 0px 0px", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px", width:"100px"}}>
                                                        {item.sgstPersent}%
                                                    </td>
                                                    <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 0px 0px 0px", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>
                                                        {SetNumCnvrt(ConvertNumberFormat(item.sgstAmt))}  
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td className={`${classes["bill-item-action"]}`} style={{textAlign:"right",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 40px 8px 15px", fontSize:"16px"}}>
                                        {SetNumCnvrt(ConvertNumberFormat(item.amount))}
                                        <button className={`${formclasses["btns"]} btn-secondary ${classes["delete-btn"]}`} onClick={onRemoveItem.bind(null, item.id)} >-</button>
                                    </td>
                                </tr>
                                })
                                
                            }
                        </tbody>
                    </table>
                    
                    
                    <Container className={`container-fluid`} >
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
                                        {subtotalAmt}
                                    </div>
                                </div>
                                <div className={`d-flex ${classes["final-amt-list"]}`}>
                                    <div className={`${flexclasses["col-6"]} text-right`}>
                                        CGST 
                                    </div>
                                    <div className={`${flexclasses["col-6"]} text-right`}>
                                        {cgstAmt}
                                    </div>
                                </div>
                                <div className={`d-flex ${classes["final-amt-list"]}`}>
                                    <div className={`${flexclasses["col-6"]} text-right`}>
                                        SGST
                                    </div>
                                    <div className={`${flexclasses["col-6"]} text-right`}>
                                        {sgstAmt}
                                        
                                    </div>
                                </div>
                                <div className={`d-flex ${classes["final-amt-list"]} text-bold`}>
                                    <div className={`${flexclasses["col-6"]} text-right`}>
                                        Total
                                    </div>
                                    <div className={`${flexclasses["col-6"]} text-right`}>
                                        {totalAmt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                    
                    
                    
                </div>
                <div className={classes.invoiceBtn}>
                
                    <button className={`${formclasses.btns} btn-primary`} disabled={!formIsValid} onClick={onGenerate}>Generate PDF</button>
                    {setInvoiceContext.invoiceitems.length > 0 && <button className={`${formclasses.btns} btn-secondary`} style={{marginLeft:"10px"}} 
                        onClick={onNewInvoice}>New Invoice</button>}
                    
                    {!formIsValid && <p style={{marginTop:'20px', padding:'15px 10px', color: '#664d03',backgroundColor: '#fff3cd', borderColor: '#ffecb5'}}>(Invoice No, EST Date and Bill to) Should not be empty.!</p>}
                            
                </div>
            </div>
            {isGenerate &&
                <PDFComponent cancelPdf={onCancelPdf} />
            }

            <Pricecals />
        
        </Fragment>
    )
}

export default Invoicelayout;