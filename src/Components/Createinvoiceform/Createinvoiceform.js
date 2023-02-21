import React, { useEffect, useReducer, useState, useContext, useRef } from "react";
import { VALIDATOR_REQUIRE, VALIDATOR_GST, VALIDATOR_QTY  } from "../Validation/Invoicevalidation";
import classes from "./Createinvoiceform.module.css";
import flexclasses from '../Flexbox/Flexbox.module.css';
import invoiceClasses from '../Invoicelayout/Invoicelayout.module.css';
import Createtextinvoce from "../Data-store/CreateText-invoice";


const Createinvoiceform = (props)=>{
    const setInvoiceContext = useContext(Createtextinvoce);

    const [descriptionInput, dispatchdescriptionInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [hsnInput, dispatchHsnInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [qtyInput, dispatchQtyInput] = useReducer(VALIDATOR_QTY, {value:'1', isValid: true});
    const [rateInput, dispatchrateInput] = useReducer(VALIDATOR_REQUIRE, {value:'', isValid: null});
    const [cgstInput, dispatchcgstInput] = useReducer(VALIDATOR_GST, {value:'9', isValid: true});
    const [sgstInput, dispatchsgstInput] = useReducer(VALIDATOR_GST, {value:'9', isValid: true});
    const cgstAmtRef = useRef(0);
    const sgstAmtRef = useRef(0);
    const addAmountRef = useRef(0);
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
            let setQtyRate = event.target.value * Number(rateInput.value);
            let setCgst = ((event.target.value * setQtyRate) * cgstInput.value)/100;
            let setSgst = ((event.target.value * setQtyRate) * sgstInput.value)/100;
            cgstAmtRef.current.value = setCgst.toFixed(2);
            sgstAmtRef.current.value = setSgst.toFixed(2);
            addAmountRef.current.value = Number(setQtyRate).toFixed(2);
        
        }
        if(event.target.name === "RATE") {
            dispatchrateInput({type: "REQUIRE", val: event.target.value});
            let setCgst = Number(event.target.value * cgstInput.value)/100;
            let setSgst = Number(event.target.value * sgstInput.value)/100;
            cgstAmtRef.current.value = setCgst.toFixed(2);
            sgstAmtRef.current.value = setSgst.toFixed(2);
            // setSgstAmt(Number(event.target.value * sgstInput.value)/100);
            let setQtyRate = qtyInput.value * Number(event.target.value);;
            addAmountRef.current.value = setQtyRate.toFixed(2); 
           
            // console.log(Math.ceil(qtyInput.value * (Number(event.target.value) + cgstAmt + sgstAmt)))
            
        }
        if(event.target.name === "CGSTPERSNT") {
            dispatchcgstInput({type: "INPT_GST", val: event.target.value});
            cgstAmtRef.current.value = Number(rateInput.value * event.target.value)/100;
        }
        if(event.target.name === "SGSTPERSNT") {
            dispatchsgstInput({type: "INPT_GST", val: event.target.value});
            sgstAmtRef.current.value = Number(rateInput.value * event.target.value)/100;
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
            hsnSac: Number(hsnInput.value),
            qty: Number(qtyInput.value),
            rate: Number(rateInput.value),
            cgstPersent: Number(cgstInput.value),
            cgstAmt: Number(cgstAmtRef.current.value),
            sgstPersent: Number(sgstInput.value),
            sgstAmt: Number(sgstAmtRef.current.value),
            amount: Number(addAmountRef.current.value)
        }
        
        setInvoiceContext.onAddInvoice({...getInvoiceData, id: Math.random().toString()});
        setFormIsValid(false);
        dispatchdescriptionInput({type:""});
        dispatchHsnInput({type:""});
        dispatchQtyInput({type:""});
        dispatchrateInput({type:""});
        dispatchcgstInput({type:""});
        dispatchsgstInput({type:""});
        cgstAmtRef.current.value = 0;
        sgstAmtRef.current.value = 0;
        addAmountRef.current.value = 0;
    }

    return(
        <tr>
            <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>0</td>
            <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px", width:"360px"}}>
                <textarea className={`${classes["input-controls"]} ${isdecription === false ? classes["invalid-input"] : ''}`} name="DESCRIPT" value={descriptionInput.value} onChange={onInputHandler} onBlur={ontouchHandler} ></textarea>
            </td>
            <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>
                <input type="number" className={`${classes["input-controls"]} ${ishsnInput === false ? classes["invalid-input"] : ''}`} name="HSNSAC" value={hsnInput.value} onChange={onInputHandler} onBlur={ontouchHandler} />
            </td>
            <td style={{textAlign:"right",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px", width:"100px"}}>
                <input type="number" min="1" className={`${classes["input-controls"]} ${isQty === false ? classes["invalid-input"] : ''}`} name="QTY" value={qtyInput.value} onChange={onInputHandler} onBlur={ontouchHandler} />
            </td>
            <td style={{textAlign:"right",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>
                <input type="number" className={`${classes["input-controls"]} ${israteInput === false ? classes["invalid-input"] : ''}`} name="RATE" value={rateInput.value} onChange={onInputHandler} onBlur={ontouchHandler} />
            </td>
            <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"0px 0px 0px", fontSize:"16px", position:"relative", width:"260px"}}>

                <table style={{width:"100%", height:"100%", position:"absolute"}}>
                    <tbody>
                        <tr>
                            <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 1px 0px 0px", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px", width:"100px"}}>
                                <input type="number" className={`${classes["input-controls"]} ${iscgstInput === false ? classes["invalid-input"] : ''}`} name="CGSTPERSNT" value={cgstInput.value} min= "1" max="100" onChange={onInputHandler} onBlur={ontouchHandler} /> 
                            </td>
                            <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 0px 0px 0px", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>
                                <input type="text" ref={cgstAmtRef} className={classes["input-controls"]}  disabled />  
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td style={{textAlign:"left",border:"solid 1px #ccc", verticalAlign:"top", padding:"0px 0px 0px", fontSize:"16px", position:"relative", width:"260px"}}>
                
                <table style={{width:"100%", height:"100%", position:"absolute"}}>
                    <tbody>
                        <tr>
                            <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 1px 0px 0px", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px", width:"100px"}}>
                                <input type="number" className={`${classes["input-controls"]} ${issgstInput === false ? classes["invalid-input"] : ''}`} name="SGSTPERSNT" value={sgstInput.value} min= "1" max="100" onChange={onInputHandler} onBlur={ontouchHandler} />
                            </td>
                            <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 0px 0px 0px", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>
                                <input type="text" ref={sgstAmtRef} className={classes["input-controls"]} disabled />  
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td style={{textAlign:"right",border:"solid 1px #ccc", verticalAlign:"top", padding:"10px 15px 8px", fontSize:"16px"}}>
                <input type="text" ref={addAmountRef} className={classes["input-controls"]} disabled />
                <div className={`${invoiceClasses["action-btns"]} d-flex`}>
                    <button type="submit" className={`${classes["btns"]}`} disabled={!formIsValid} onClick={onSubmitInoiceForm}>Add</button>
                    {/* <button className={`${classes["btns"]} ${classes["btns-secondary"]}`}>Hide</button> */}
                </div>
            </td>
        </tr>
            
    )
}

export default Createinvoiceform;