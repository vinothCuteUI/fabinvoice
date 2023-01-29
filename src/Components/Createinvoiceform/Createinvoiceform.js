import React, { useEffect, useReducer, useState, useContext } from "react";
import { VALIDATOR_REQUIRE, VALIDATOR_GST  } from "../Validation/Invoicevalidation";
import classes from "./Createinvoiceform.module.css";
import Flexbox from "../Flexbox/Flexbox";
import flexclasses from '../Flexbox/Flexbox.module.css';
import invoiceClasses from '../Invoicelayout/Invoicelayout.module.css';
import Createtextinvoce from "../Data-store/CreateText-invoice";


const Createinvoiceform = (props)=>{
    const setInvoiceContext = useContext(Createtextinvoce);

    const [descriptionInput, dispatchdescriptionInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [hsnInput, dispatchHsnInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [qtyInput, dispatchQtyInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [rateInput, dispatchrateInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [cgstInput, dispatchcgstInput] = useReducer(VALIDATOR_GST, {value:'9', isValid: true});
    const [sgstInput, dispatchsgstInput] = useReducer(VALIDATOR_GST, {value:'9', isValid: true});
    const [cgstAmt, setCgstAmt] = useState(0);
    const [sgstAmt, setSgstAmt] = useState(0);
    const [addAmount, setaddAmount] = useState(0);
    const [formIsValid, setFormIsValid] = useState(false);

 
    const {isValid: isdecription} = descriptionInput; 
    const {isValid: ishsnInput} = hsnInput; 
    const {isValid: isQty} = qtyInput; 
    const {isValid: israteInput} = rateInput; 
    const {isValid: iscgstInput} = cgstInput; 
    const {isValid: issgstInput} = sgstInput;

    useEffect(()=>{
        const identifier = setTimeout(()=>{
            setFormIsValid(isdecription && ishsnInput && isQty && israteInput && iscgstInput && issgstInput)
        }, 500)    
        return ()=>{
            clearTimeout(identifier);
        }
    }, [isdecription && ishsnInput && isQty && israteInput && iscgstInput && issgstInput])
    
    const onInputHandler = (event)=> {

        if(event.target.name === "DESCRIPT") {
            dispatchdescriptionInput({type: "REQUIRE", val: event.target.value});
        }
        if(event.target.name === "HSNSAC") {
            dispatchHsnInput({type: "REQUIRE", val: event.target.value});
        }
        if(event.target.name === "QTY") {
            dispatchQtyInput({type: "REQUIRE", val: event.target.value});
            setaddAmount(parseInt(rateInput.value * event.target.value));
        }
        if(event.target.name === "RATE") {
            dispatchrateInput({type: "REQUIRE", val: event.target.value});
            setCgstAmt(parseInt(event.target.value * cgstInput.value)/100);
            setSgstAmt(parseInt(event.target.value * cgstInput.value)/100);
            setaddAmount(parseInt(event.target.value * qtyInput.value));
        }
        if(event.target.name === "CGSTPERSNT") {
            dispatchcgstInput({type: "INPT_GST", val: event.target.value});
            setCgstAmt(parseInt(rateInput.value * event.target.value)/100);
        }
        if(event.target.name === "SGSTPERSNT") {
            dispatchsgstInput({type: "INPT_GST", val: event.target.value});
            setSgstAmt(parseInt(rateInput.value * event.target.value)/100);
        }
        
        setFormIsValid(isdecription && ishsnInput && isQty && israteInput && iscgstInput && issgstInput)
        
    }
    
    const ontouchHandler = (event)=> {
    
        if(event.target.name === "DESCRIPT") {
            dispatchdescriptionInput({type: "ON_BLUR"});
        }
        if(event.target.name === "HSNSAC") {
            dispatchHsnInput({type: "ON_BLUR"});
        }
        if(event.target.name === "QTY") {
            dispatchQtyInput({type: "ON_BLUR"});
        }
        if(event.target.name === "RATE") {
            dispatchrateInput({type: "ON_BLUR"});
        }
        if(event.target.name === "CGSTPERSNT") {
            dispatchcgstInput({type: "ON_BLUR"});
        }
        if(event.target.name === "SGSTPERSNT") {
            dispatchsgstInput({type: "ON_BLUR"});
        }
    }
   
    const onSubmitInoiceForm = (event)=>{
        event.preventDefault();
        const getInvoiceData = {
            itemDescription: descriptionInput.value,
            hsnSac: hsnInput.value,
            qty: qtyInput.value,
            rate: rateInput.value,
            cgstPersent: cgstInput.value,
            cgstAmt: cgstAmt,
            sgstPersent: sgstInput.value,
            sgstAmt: sgstAmt,
            amount: addAmount
        }
        setInvoiceContext.onAddInvoice({...getInvoiceData, id: Math.random().toString()});
        setFormIsValid(false);
        dispatchdescriptionInput({type:""});
        dispatchHsnInput({type:""});
        dispatchQtyInput({type:""});
        dispatchrateInput({type:""});
        dispatchcgstInput({type:""});
        dispatchsgstInput({type:""});
        setCgstAmt(0);
        setSgstAmt(0);
        setaddAmount(0);
    }

    return(
        <form className={`${flexclasses["row"]} ${invoiceClasses["bill-item-row"]}`} onSubmit={onSubmitInoiceForm}>
            <div className={`${flexclasses["col"]} ${invoiceClasses["bill-item-title"]} ${invoiceClasses["bill-item-no"]} align-items-stretch`}>
                <span>0</span>
            </div>
            <div className={`${flexclasses["col-3"]} ${invoiceClasses["bill-item-title"]} align-items-stretch`}>
                <textarea className={`${classes["input-controls"]} ${isdecription === false ? classes["invalid-input"] : ''}`} name="DESCRIPT" 
                value={descriptionInput.value} onChange={onInputHandler} onBlur={ontouchHandler} ></textarea>
            </div>
            <div className={`${flexclasses["col"]} ${invoiceClasses["bill-item-title"]} align-items-stretch`}>
                <input type="number" className={`${classes["input-controls"]} ${ishsnInput === false ? classes["invalid-input"] : ''}`} name="HSNSAC" value={hsnInput.value} onChange={onInputHandler} onBlur={ontouchHandler} />
            </div>
            <div className={`${flexclasses["col"]} ${invoiceClasses["bill-item-title"]} align-items-stretch`}>
                <input type="number" className={`${classes["input-controls"]} ${isQty === false ? classes["invalid-input"] : ''}`} name="QTY" value={qtyInput.value} onChange={onInputHandler} onBlur={ontouchHandler} />
            </div>
            <div className={`${flexclasses["col"]} ${invoiceClasses["bill-item-title"]} align-items-stretch`}>
                <input type="number" className={`${classes["input-controls"]} ${israteInput === false ? classes["invalid-input"] : ''}`} name="RATE" value={rateInput.value} onChange={onInputHandler} onBlur={ontouchHandler} />
            </div>
            <div className={`${flexclasses["col-2"]} ${invoiceClasses["bill-item-title"]} p-0 align-items-stretch`}>
            
                <div className={`${flexclasses["col"]} ${invoiceClasses["bill-gst-bx"]} text-right b-t-0`}>
                    <input type="number" className={`${classes["input-controls"]} ${iscgstInput === false ? classes["invalid-input"] : ''}`} name="CGSTPERSNT" value={cgstInput.value} min= "1" max="100" onChange={onInputHandler} onBlur={ontouchHandler} />    
                </div>
                <div className={`${flexclasses["col"]} ${invoiceClasses["bill-gst-bx"]} text-right b-t-0`}>
                    <input type="text" value={cgstAmt} className={classes["input-controls"]}  disabled />  
                </div>
                
            </div>
            <div className={`${flexclasses["col-2"]} ${invoiceClasses["bill-item-title"]} p-0 align-items-stretch`}>
                    
                <div className={`${flexclasses["col"]} ${invoiceClasses["bill-gst-bx"]} text-right b-t-0`}>
                    <input type="number" className={`${classes["input-controls"]} ${issgstInput === false ? classes["invalid-input"] : ''}`} name="SGSTPERSNT" value={sgstInput.value} min= "1" max="100" onChange={onInputHandler} onBlur={ontouchHandler} />
                </div>
                <div className={`${flexclasses["col"]} ${invoiceClasses["bill-gst-bx"]} text-right b-t-0`}>
                    <input type="text" value={sgstAmt} className={classes["input-controls"]} disabled />   
                </div>
                
            </div>
            <div className={`${flexclasses["col"]} ${invoiceClasses["bill-item-title"]} ${invoiceClasses["bill-item-amt"]} align-items-stretch`}>
                
                <input type="text" value={addAmount} className={classes["input-controls"]} disabled />
                <div className={`${invoiceClasses["action-btns"]} d-flex`}>
                    <button type="submit" className={`${classes["btns"]}`} disabled={!formIsValid} >Add</button>
                    {/* <button className={`${classes["btns"]} ${classes["btns-secondary"]}`}>Hide</button> */}
                </div>
            </div>
        </form>
    )
}

export default Createinvoiceform;