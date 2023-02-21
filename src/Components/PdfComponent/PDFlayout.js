import React, { useContext, useState, useEffect } from "react";
import invoicelogo from "../../assets/images/invoice-logo.png";
import rupeesymbol from '../../assets/images/rupee-symbol.png';
import Createtextinvoce from "../Data-store/CreateText-invoice";
import { Convertnumberstr } from "../Validation/ConvertNumberStr";
import {SetNumCnvrt, ConvertNumberFormat} from '../Validation/SetNumConvert';

const PDFlayout = (props)=>{

    const getTextInvoice = useContext(Createtextinvoce);

    const [totalAmt, setTotalAmt] = useState(0);
    const [subtotalAmt, setsubTotalAmt] = useState(0);
    const [amtWrd, setAmtWrd] = useState("");
    const [cgstAmt, setcgstAmt] = useState(0);
    const [sgstAmt, setsgstAmt] = useState(0);
    const [esDate, setEsDate] = useState('');

    useEffect(()=>{
        
        const getTotal = ConvertNumberFormat(getTextInvoice.totalAmt)
        const getSubTotal = ConvertNumberFormat(getTextInvoice.subTotal)
        const getcgst = ConvertNumberFormat(getTextInvoice.cgst)
        const getsgst = ConvertNumberFormat(getTextInvoice.sgst)
        const amountWords = Convertnumberstr(getTextInvoice.totalAmt);
        
        setTotalAmt(getTotal);
        setsubTotalAmt(SetNumCnvrt(getSubTotal));
        setAmtWrd(amountWords);
        setcgstAmt(SetNumCnvrt(getcgst));
        setsgstAmt(SetNumCnvrt(getsgst));
        const esdd = (getTextInvoice.item.estDate).split('-').reverse().join("-");
        setEsDate(esdd);
    }, [getTextInvoice.item.estDate, getTextInvoice.totalAmt, getTextInvoice.subTotal, getTextInvoice.cgst, getTextInvoice.sgst]);

    const setStyles = {
        row:{
            display: 'flex',
            flexWrap: 'wrap',
        },
        col:{
            flex: '1 0 0%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col1:{
            flex:'0 0 auto',
            width: '8.33%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col2:{
            flex:'0 0 auto',
            width: '16.66%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col3:{
            flex:'0 0 auto',
            width: '25%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col4:{
            flex:'0 0 auto',
            width: '33.33%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col5:{
            flex:'0 0 auto',
            width: '41.66%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col6:{
            flex:'0 0 auto',
            width: '50%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col7:{
            flex:'0 0 auto',
            width: '58.33%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col8:{
            flex:'0 0 auto',
            width: '66.66%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col9:{
            flex:'0 0 auto',
            width: '75%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col10:{
            flex:'0 0 auto',
            width: '83.33%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col11:{
            flex:'0 0 auto',
            width: '91.66%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        col12:{
            flex:'0 0 auto',
            width: '100%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        img100:{
            width:'100%',
            height:'auto'
        },
        txtLeft:{
            textAlign:'left'
        },
        txtCenter:{
            textAlign:'center'
        },
        txtRight:{
            textAlign:'right'
        },
        p1:{
            padding:"0.75rem"
        },
        pt1:{
            paddingTop:"0.75rem"
        },
        pr1:{
            paddingRight:"0.75rem"
        },
        pb1:{
            paddingBottom:"0.75rem"
        },
        pl1:{
            paddingLeft:"0.75rem"
        },
        
        inovicecontainer:{
            backgroundColor:'#fff',
            fontSize:'14px',
            padding:'20px',
            width:'1140px',
            'page-break-after': 'always'
        },
        invoiceHeader:{
            display:'flex',
            flexWrap:'wrap',
            alignItems:'center',
            borderWidth:'1px 1px 0px 1px',
            borderStyle:'solid',
            borderColor:'#ccc',
            padding:'30px 25px 10px'
        },
        logo:{
            width:'22%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        hTitle:{
            fontSize: '30px',
            textTransform: 'uppercase',
            lineHeight: '28px',
            marginBottom: '10px',
            lettetSpacing:'1px',
            fontWeight:'bold'
        },
        h2Title:{
            textAlign: 'right',
            fontSize: '34px',
            fontWeight: 'bold',
            textTransform:"uppercase"
        },
        estimatetab:{
            display: 'flex',
            flexWrap: 'wrap',
            border:'solid 1px #ccc'
        },
        estimatecollt:{
            paddingTop:'10px',
            paddingBottom: '0px',
            borderRight:'solid 1px #ccc',
            flex:'0 0 auto',
            width: '50%',
            fontSize:"18px"
        },
        estimatecolrt:{
            paddingTop:'10px',
            paddingBottom: '0px',
            flex:'0 0 auto',
            width: '50%',
            fontSize:"18px"
        },
        billtotab:{
            borderWidth: '0px 1px 0px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc'
        },
        billtotitle:{
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft:'10px',
            paddingRight:'10px',
            borderBottom: 'solid 1px #ccc',
            fontWeight: 'bold',
            backgroundColor:'#f5f5f5',
            fontSize:'16px'
        },
        billtocontent:{
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft:'10px',
            paddingRight:'10px',
            fontSize:'16px'
        },
        invoiceFooter:{
            display:'flex',
            flexWrap:'wrap',
            alignItems:"flex-start",
            borderWidth: '0 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            minHeight:'600px'
        },
        billmathamout:{
            borderWidth: '0px 0px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            width:'33.33%',
            flex:'0 0 auto',
            padding:'10px 0 0'
        },
        finalamtlist:{
            display:'flex',
            padding: '5px 0',
            textAlign:'right',
            fontSize:'16px'
        },
        billitemamt:{
            width: '14%',
            flex: '0 0 auto',
            borderWidth: '0px 1px 1px 0px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft:'10px',
            paddingRight:'10px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            color: '#000'
            
        },
        billitemaction:{
            paddingRight: '40px',
            overflow: 'hidden',
            maxWidth: '200px',
            flex: '0 0 auto'
        },
        
        billtextamout:{
            flex:'1 0 0%',
            paddingLeft:'10px',
            paddingRight:'10px'
        },
        txtTotal:{
            paddingTop: '20px',
            fontSize: '20px',
            fontWeight: 'normal'
        },
        txtWord:{
            fontSize: '20px',
            fontWeight: 'bold',
            fontStyle: 'italic',
            padding: '0px 0 40px',
            textTransform: 'capitalize'
        },
        ftrtxt:{
            fontSize: '18px',
            padding: '0px 0 20px',
            lineHeight: '24px'
        },
        ftrtxt2:{
            fontSize: '18px',
            padding: '0px 0 5px',
            lineHeight: '24px'
        },
        signature:{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            height: '140px',
            borderTop: 'solid 1px #ccc',
            fontSize: '18px',
            marginTop:'15px',
            paddingBottom:'5px'
        }

    }
    
   
    return(
        
        <div style={setStyles.inovicecontainer}>
            <div style={setStyles.invoiceHeader}>
                <div style={setStyles.logo}>
                    <img src={invoicelogo} style={setStyles.img100} />
                </div>
                <div style={setStyles.col}>
                    <p style={setStyles.hTitle}>
                        Fabevy software services private limited
                    </p>
                    <p style={{lineHeight:"22px", fontSize:"16px"}}>
                        Tirunelveli Tamil Nadu 627806<br/>
                        India<br/>
                        GSTIN: 33AAFCF1382A1Z8
                    </p>
                </div>
                <div style={setStyles.col12}>
                    <h2 style={setStyles.h2Title}>Tax Invoice</h2>
                </div>
            </div>

            <div style={setStyles.estimatetab}>
                <div style={setStyles.estimatecollt}>
                    <div style={setStyles.row}>
                        <div style={setStyles.col6}>
                            <p style={setStyles.pb1}>#</p>
                        </div>
                        <div style={setStyles.col6}>
                            <p style={setStyles.pb1}><b>: {getTextInvoice.item.estId}</b></p>
                        </div>
                    </div>
                    <div style={setStyles.row}>
                        <div style={setStyles.col6}>
                            <p style={setStyles.pb1}>Estimate Date</p>
                        </div>
                        <div style={setStyles.col6}>
                            <p style={setStyles.pb1}><b>: {esDate}</b></p>
                        </div>
                    </div>
                </div>
                <div style={setStyles.estimatecolrt}>
                    <div style={setStyles.row}>
                        <div style={setStyles.col6}>
                            <p style={setStyles.pb1}>Place of Supply</p>
                        </div>
                        <div style={setStyles.col6}>
                            <p style={setStyles.pb1}><b>:Tami Nadu(33)</b></p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={setStyles.billtotab}>
                <div style={setStyles.billtotitle}>
                    <p><b>Bill To</b></p>
                </div>
                <div style={setStyles.billtocontent}>
                    <p><b>{getTextInvoice.item.billto}</b></p>
                </div>
            </div>

            <div style={setStyles.billitemtab}>
                <table style={{width:"100%", borderCollapse:"collapse"}}>
                    <tbody>
                        <tr style={{backgroundColor:"rgb(241 242 244)"}}>
                            <th style={{textAlign:"left",borderWidth:"1px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px"}}>#</th>
                            <th style={{textAlign:"left",borderWidth:"1px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px"}}>Item & Description</th>
                            <th style={{textAlign:"left",borderWidth:"1px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px"}}>HSN/SAC</th>
                            <th style={{textAlign:"right",borderWidth:"1px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px"}}>Qty</th>
                            <th style={{textAlign:"right",borderWidth:"1px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px"}}>Rate</th>
                            <th style={{textAlign:"left",borderWidth:"1px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"bottom", padding:"10px 0px 0px", fontSize:"16px"}}>
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
                                            <th style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"1px 1px 0px 0px", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px", width:"100px"}}>%</th>
                                            <th style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"1px 0px 0px 0px", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px"}}>Amt</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </th>
                            <th style={{textAlign:"left",borderWidth:"1px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"bottom", padding:"10px 0px 0px", fontSize:"16px"}}>
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
                                            <th style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"1px 1px 0px 0px", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px", width:"100px"}}>%</th>
                                            <th style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"1px 0px 0px 0px", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px"}}>Amt</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </th>
                            <th style={{textAlign:"right",borderWidth:"1px 1px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"bottom", padding:"10px 10px 8px", fontSize:"16px"}}>Amount</th>
                        </tr>
                    
                        {getTextInvoice.invoiceitems.map((item, indx) =>{
                                
                                return <tr key={item.id}>
                                <td style={{textAlign:"left",borderWidth:"0px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px"}}>{indx+1}</td>
                                <td style={{textAlign:"left",borderWidth:"0px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px", width:"320px", lineHeight: "22px"}}>
                                    {item.itemDescription}
                                </td>
                                <td style={{textAlign:"left",borderWidth:"0px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px"}}>
                                    {item.hsnSac}
                                </td>
                                <td style={{textAlign:"right",borderWidth:"0px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px", width:"100px"}}>
                                    {item.qty}.00
                                </td>
                                <td style={{textAlign:"right",borderWidth:"0px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px"}}>
                                    {SetNumCnvrt(ConvertNumberFormat(item.rate))}
                                </td>
                                <td style={{textAlign:"left",borderWidth:"0px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"top", padding:"0px 0px 0px", fontSize:"16px", width:"182px", position:"relative"}}>

                                    <table style={{width:"100%", height:"100%", position:"absolute"}}>
                                        <tbody>
                                            <tr>
                                                <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 1px 0px 0px", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px", width:"100px"}}>
                                                    {item.cgstPersent}%
                                                </td>
                                                <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 0px 0px 0px", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px"}}>
                                                    {SetNumCnvrt(ConvertNumberFormat(item.cgstAmt))}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{textAlign:"left",borderWidth:"0px 0px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"top", padding:"0px 0px 0px", fontSize:"16px", width:"182px", position:"relative"}}>
                                    
                                    <table style={{width:"100%", height:"100%", position:"absolute"}}>
                                        <tbody>
                                            <tr>
                                                <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 1px 0px 0px", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px", width:"100px"}}>
                                                    {item.sgstPersent}%
                                                </td>
                                                <td style={{textAlign:"right",borderStyle:"solid", borderColor:"#ccc",borderWidth:"0px 0px 0px 0px", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px"}}>
                                                    {SetNumCnvrt(ConvertNumberFormat(item.sgstAmt))}  
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{textAlign:"right",borderWidth:"0px 1px 1px 1px", borderStyle:"solid", borderColor:"#ccc", verticalAlign:"top", padding:"10px 10px 8px", fontSize:"16px"}}>
                                    {SetNumCnvrt(ConvertNumberFormat(item.amount))}
                                    
                                </td>
                            </tr>
                            })
                            
                        }
                    </tbody>
                </table> 
                
            </div>

            <div  style={setStyles.invoiceFooter}>
                <div style={setStyles.billtextamout}>
                    <h3 style={setStyles.txtTotal}>Amount In Words</h3>
                    <p style={setStyles.txtWord}>Indian Rupee {amtWrd}</p>
                    <p style={setStyles.ftrtxt}>Thanks for your business.</p>
                    <p style={setStyles.ftrtxt2}>Please make the payment to:</p>
                    <p style={setStyles.ftrtxt}>
                        Name: FABEVY SOFTWARE SERVICES PVT LTD
                        <br/>
                        Account Number: 0699360000000751<br/>
                        IFSC CODE: DBSS0IN0699<br/>
                        A/C Type: CURRENT
                    </p>
                </div>
                <div style={setStyles.billmathamout}>
                    <div style={setStyles.finalamtlist}>
                        <div style={setStyles.col6}>
                            Sub Total
                        </div>
                        <div style={setStyles.col6}>
                            {subtotalAmt}
                        </div>
                    </div>
                    <div style={setStyles.finalamtlist}>
                        <div style={setStyles.col6}>
                            CGST(9%)
                        </div>
                        <div style={setStyles.col6}>
                            {cgstAmt}
                        </div>
                    </div>
                    <div style={setStyles.finalamtlist}>
                        <div style={setStyles.col6}>
                            SGST(9%)
                        </div>
                        <div style={setStyles.col6}>
                            {sgstAmt}
                        </div>
                    </div>
                    <div style={setStyles.finalamtlist}>
                        <div style={setStyles.col6}>
                            <b>Total</b>
                        </div>
                        <div style={setStyles.col6}>
                            <b><img src={rupeesymbol} style={{width:'7.5px', height:'auto'}} />{totalAmt}.00</b>
                        </div>
                    </div>

                    <div style={setStyles.signature}>
                        <span>Authorized Signature</span>
                    </div>
                </div>
            </div>

        </div>  
        
    )
}

export default PDFlayout;