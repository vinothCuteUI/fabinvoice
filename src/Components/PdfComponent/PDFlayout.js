import React, { useContext, useState, useEffect } from "react";
import invoicelogo from "../../assets/images/invoice-logo.png";
import Createtextinvoce from "../Data-store/CreateText-invoice";
import { Convertnumberstr } from "../Validation/ConvertNumberStr";


const PDFlayout = (props)=>{

    const getTextInvoice = useContext(Createtextinvoce);

    const [totalAmt, setTotalAmt] = useState(0);
    const [subtotalAmt, setsubTotalAmt] = useState(0);
    const [amtWrd, setAmtWrd] = useState("");
    const [cgstAmt, setcgstAmt] = useState(0);
    const [sgstAmt, setsgstAmt] = useState(0);
    const [esDate, setEsDate] = useState('');

    useEffect(()=>{
        const getTotal = new Intl.NumberFormat('en-IN').format(getTextInvoice.totalAmt)
        const getSubTotal = new Intl.NumberFormat('en-IN').format(getTextInvoice.subTotal)
        const getcgst = new Intl.NumberFormat('en-IN').format(getTextInvoice.cgst)
        const getsgst = new Intl.NumberFormat('en-IN').format(getTextInvoice.sgst)
        const amountWords = Convertnumberstr(getTextInvoice.totalAmt);
        setTotalAmt(getTotal);
        setsubTotalAmt(getSubTotal);
        setAmtWrd(amountWords);
        setcgstAmt(getcgst);
        setsgstAmt(getsgst);
        const esdd = (getTextInvoice.item.estDate).split('-').reverse().join("-");
        setEsDate(esdd);
        // console.log(getTextInvoice.item);
    }, [getTextInvoice.totalAmt]);

    const setStyles = {
        row:{
            display: 'flex',
            flexWrap: 'wrap',
        },
        col:{
            flex: '1 0 0%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col1:{
            flex:'0 0 auto',
            width: '8.33%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col2:{
            flex:'0 0 auto',
            width: '16.66%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col3:{
            flex:'0 0 auto',
            width: '25%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col4:{
            flex:'0 0 auto',
            width: '33.33%'
        },
        col5:{
            flex:'0 0 auto',
            width: '41.66%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col6:{
            flex:'0 0 auto',
            width: '50%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col7:{
            flex:'0 0 auto',
            width: '58.33%'
        },
        col8:{
            flex:'0 0 auto',
            width: '66.66%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col9:{
            flex:'0 0 auto',
            width: '75%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col10:{
            flex:'0 0 auto',
            width: '83.33%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col11:{
            flex:'0 0 auto',
            width: '91.66%',
            paddingLeft:'15px',
            paddingRight:'15px'
        },
        col12:{
            flex:'0 0 auto',
            width: '100%',
            paddingLeft:'15px',
            paddingRight:'15px'
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
            paddingLeft:'15px',
            paddingRight:'15px'
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
            fontSize: '38px',
            fontWeight: 'normal'
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
            borderWidth: '0px 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc'
        },
        billtotitle:{
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft:'15px',
            paddingRight:'15px',
            borderBottom: 'solid 1px #ccc',
            fontWeight: 'bold',
            backgroundColor:'#f5f5f5',
            fontSize:'16px'
        },
        billtocontent:{
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft:'15px',
            paddingRight:'15px',
            fontSize:'16px'
        },
        billitemrow:{
            display:"flex",
            backgroundColor:'#f5f5f5',
            fontWeight:'bold',
            fontSize:'16px'
        },
        billcontentrow:{
            display:"flex",
            backgroundColor:'#fff',
            fontWeight:'normal',
            fontSize:'16px'
        },
        billitemDesc:{
            borderWidth: '0px 0px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft:'15px',
            paddingRight:'15px',
            flex:'1 0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            color: '#000',
            width:"230px"
        },
        billitemtitle:{
            borderWidth: '0px 0px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft:'15px',
            paddingRight:'15px',
            flex:'1 0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            color: '#000'
        },
        billitemhsn:{
            borderWidth: '0px 0px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft:'15px',
            paddingRight:'15px',
            flex:'1 0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            color: '#000',
            width:'120px'
        },
        billitemQty:{
            borderWidth: '0px 0px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft:'15px',
            paddingRight:'15px',
            flex:'1 0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            color: '#000',
            width:'45px'
        },
        billitemrate:{
            borderWidth: '0px 0px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft:'15px',
            paddingRight:'15px',
            flex:'1 0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            color: '#000',
            width:'120px'
        },
        billitemviewspan:{
            fontWeight:'normal'
        },
        billitemtitlecgst:{
            borderWidth: '0px 0px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            paddingTop: '0px',
            paddingBottom: '0px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            color: '#000',
            width:'16.66%'
        },
        billitemtitlesgst:{
            
            borderWidth: '0px 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc',
            paddingTop: '0px',
            paddingBottom: '0px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            color: '#000',
            width:'16.66%'
        },
        billitemno:{
            flex: '0 0 auto',
            width: '38px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: '0 10px 8px',
            borderWidth:'0 0 1px 1px',
            borderStyle:'solid',
            borderColor:'#ccc'        
        
        },
        billgsttitle:{
            width:"100%",
            paddingLeft: '15px',
            paddingRight: '15px',
            paddingBottom: '10px',
            paddingTop:'8px',
            textAlign:'center'
        },
        billgstbxlt:{
            flex:'1 0 0%',
            padding: '8px 15px',
            borderTop: 'solid 1px #ccc',
            textAlign:"right"
        },
        billgstbxrt:{
            flex:'1 0 0%',
            padding: '8px 15px',
            borderTop: 'solid 1px #ccc',
            borderLeft:'solid 1px #ccc',
            textAlign:"right",
        },
        billgstcntlt:{
            flex:'1 0 0%',
            padding: '8px 15px',
            borderTop: 'solid 0px #ccc',
            textAlign:"right"
        },
        billgstcntrt:{
            flex:'1 0 0%',
            padding: '8px 15px',
            borderTop: 'solid 0px #ccc',
            borderLeft:'solid 1px #ccc',
            textAlign:"right",
        },
        billgstbxlastelm:{
            padding: '8px 15px',
            borderLeft:'solid 1px #ccc'
        },
        invoiceFooter:{
            display:'flex',
            flexWrap:'wrap',
            alignItems:"flex-start",
            borderWidth: '0 1px 1px 1px',
            borderStyle: 'solid',
            borderColor: '#ccc'
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
            paddingLeft:'15px',
            paddingRight:'15px',
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
            paddingLeft:'15px',
            paddingRight:'15px'
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
            fontSize: '20px',
            padding: '0px 0 20px',
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
                        Fabevy&nbsp;Technologies&nbsp;(OPC)<br/> 
                        Private&nbsp;Limited
                    </p>
                    <p>
                        Tirunalveli Tamil Nadu 627806<br/>
                        India<br/>
                        GSTIN: 33AADCF7286K1ZA
                    </p>
                </div>
                <div style={setStyles.col12}>
                    <h2 style={setStyles.h2Title}>Proforma Invoice</h2>
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
                            <p style={setStyles.pb1}>Place of Supplay</p>
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
                
                <div style={setStyles.billitemrow}>
                    <div style={setStyles.billitemno}>
                        <span>#</span>
                    </div>
                    <div style={setStyles.billitemDesc}>
                        <span>Item & Description</span>
                    </div>
                    <div style={setStyles.billitemhsn}>
                        <span>HSN/SAC</span>
                    </div>
                    <div style={setStyles.billitemQty}>
                        <span>Qty</span>
                    </div>
                    <div style={setStyles.billitemrate}>
                        <span>Rate</span>
                    </div>
                    <div style={setStyles.billitemtitlecgst}>
                        <div style={setStyles.billgsttitle}>CGST</div>  
                        <div style={setStyles.billgstbxlt}>
                            <span>%</span>    
                        </div>
                        <div style={setStyles.billgstbxrt}>
                            <span>Amt</span>    
                        </div>
                    </div>
                    <div style={setStyles.billitemtitlesgst}>
                        <div style={setStyles.billgsttitle}>SGST</div>  
                        <div style={setStyles.billgstbxlt}>
                            <span>%</span>    
                        </div>
                        <div style={setStyles.billgstbxrt}>
                            <span>Amt</span>    
                        </div>
                    </div>
                    <div style={setStyles.billitemamt}>
                        <span>Amount</span>
                    </div>
                </div>
                {getTextInvoice.invoiceitems.map((item, indx) =>{
                    
                    return <div key={item.id} style={setStyles.billcontentrow}>
                                <div style={setStyles.billitemno}>
                                    <span>{indx+1}</span>
                                </div>
                                <div style={setStyles.billitemDesc}>
                                    <span>{item.itemDescription}</span>
                                </div>
                                <div style={setStyles.billitemhsn}>
                                    <span>{item.hsnSac}</span>
                                </div>
                                <div style={setStyles.billitemQty}>
                                    <span>{item.qty}.00</span>
                                </div>
                                <div style={setStyles.billitemrate}>
                                    <span>{item.rate}.00</span>
                                </div>
                                <div style={setStyles.billitemtitlecgst}> 
                                    <div style={setStyles.billgstcntlt}>
                                        <span>{item.cgstPersent}%</span>    
                                    </div>
                                    <div style={setStyles.billgstcntrt}>
                                        <span>{item.cgstAmt}.00</span>    
                                    </div>
                                </div>
                                <div style={setStyles.billitemtitlesgst}>  
                                    <div style={setStyles.billgstcntlt}>
                                        <span>{item.sgstPersent}%</span>    
                                    </div>
                                    <div style={setStyles.billgstcntrt}>
                                        <span>{item.sgstAmt}.00</span>    
                                    </div>
                                </div>
                                <div style={setStyles.billitemamt}>
                                    <span>{item.amount}.00</span>
                                </div>
                            </div>
                    })
                }
                
            </div>

            <div  style={setStyles.invoiceFooter}>
                <div style={setStyles.billtextamout}>
                    <h3 style={setStyles.txtTotal}>Total In Words</h3>
                    <p style={setStyles.txtWord}>Indian Rupee {amtWrd}</p>

                    <p style={setStyles.ftrtxt}>Looking forward for your business.</p>
                    <p style={setStyles.ftrtxt}>Account Details:</p>
                    <p style={setStyles.ftrtxt}>
                        Name of the Beneficiary: Fabevy Technologies (OPC) Private Limited
                        <br/>
                        Bank A/C No: 270805000541<br/>
                        Bank Name: ICICI Bank<br/>
                        Branch Name: SIRUSERI<br/>
                        A/C Type: CURRENT<br/>
                        MICR Code: 600229118<br/>
                        IFSC Code: ICIC0002708
                    </p>
                </div>
                <div style={setStyles.billmathamout}>
                    <div style={setStyles.finalamtlist}>
                        <div style={setStyles.col6}>
                            Sub Total
                        </div>
                        <div style={setStyles.col6}>
                            {subtotalAmt}.00
                        </div>
                    </div>
                    <div style={setStyles.finalamtlist}>
                        <div style={setStyles.col6}>
                            CGST 
                        </div>
                        <div style={setStyles.col6}>
                            {cgstAmt}.00
                        </div>
                    </div>
                    <div style={setStyles.finalamtlist}>
                        <div style={setStyles.col6}>
                            SGST
                        </div>
                        <div style={setStyles.col6}>
                            {sgstAmt}.00
                        </div>
                    </div>
                    <div style={setStyles.finalamtlist}>
                        <div style={setStyles.col6}>
                            <b>Total</b>
                        </div>
                        <div style={setStyles.col6}>
                            <b>{totalAmt}.00</b>
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