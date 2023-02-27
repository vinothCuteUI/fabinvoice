import { useRef, useState } from 'react';
import classes from './Pricecals.module.css';

const Pricecals = (props)=>{

    const [amount, setAmount] = useState("");
    const [calsTxt, setcalsTxt] = useState("CALS");
    const [taxPercent, setTaxPercent] = useState(18);
    const taxAmount = useRef();
    const productPrice = useRef();
    const onChangeInput = (event)=>{
        if(event.target.name === "AMOUNT"){
            setAmount(event.target.value);
          
            let gettaxAmount = event.target.value-(event.target.value/(1+(taxPercent/100)));
            taxAmount.current.value = gettaxAmount.toFixed(2);
            // taxAmount.current.value = Math.round(gettaxAmount * 100) / 100;
            let getPrPrice = event.target.value - gettaxAmount;
            productPrice.current.value = getPrPrice.toFixed(2);
        }
        if(event.target.name === "PERCENT"){
            setTaxPercent(event.target.value);
            let gettaxAmount = amount-(amount/(1+(Number(event.target.value)/100)));
            taxAmount.current.value = gettaxAmount;
            productPrice.current.value = amount - gettaxAmount;
        }
        
    }
    const [showCals, setShowCals] = useState(""); 
    const [isCals, setisCals] = useState(true); 
    
    const onCalsShow = ()=>{
        
        isCals ? setisCals(false) : setisCals(true);
        if(isCals){
            setShowCals('active-cals');
            setcalsTxt("X");
        }else{
            setShowCals('');
            setcalsTxt("CALS")
        }
        setAmount("");
        setTaxPercent(18);
        taxAmount.current.value = "";
        productPrice.current.value = "";
    }


    return(
        <div className={`${classes["price-cals"]} ${classes[showCals]}`} id={'price-cals'}>
            <div className={`${classes.gstcals} bg-primary`} onClick={onCalsShow}>
               {calsTxt}
            </div>
            <div className={`${classes.title} bg-primary`}>
                GST Calculations
            </div>
            <form>
                <div className={classes['input-group']}>
                    <label className={classes["form-label"]}>Amount</label> 
                    <input type="number" className={classes['input-controls']} name="AMOUNT" value={amount} onChange={onChangeInput}/>
                </div>
                <div className={classes['input-group']}>
                    <label className={classes["form-label"]}>Tax Percentage</label> 
                    <input type="number" value={taxPercent} name="PERCENT" className={classes['input-controls']} onChange={onChangeInput}/>
                </div>
                <div className={classes['input-group']}>
                    <label className={classes["form-label"]}>Tax Amount</label> 
                    <input type="number" ref={taxAmount} className={classes['input-controls']} />
                </div>
                <div className={classes['input-group']}>
                    <label className={classes["form-label"]}>Product Price </label> 
                    <input type="number" ref={productPrice} className={classes['input-controls']}/>
                </div>
            </form>
        </div>
    )
}
export default Pricecals;