import React from "react";
import classes from './Createinvoice.module.css';
import Container from "../Container/Container";
import Flexbox from "../Flexbox/Flexbox";
import flexclass from "../Flexbox/Flexbox.module.css";
import Header from "../Header/Header";
import Createinvoiceform from "../Createinvoiceform/Createinvoiceform";
import Invoicelayout from "../Invoicelayout/Invoicelayout";

const Createinvoice = (props) => {
    return(
        <div >
            <Header />
            <Container className={`container-fluid`}>
                <Flexbox>
                    <div className={`${flexclass["col-md-12"]}`}>
                        <Invoicelayout />
                    </div>
                    <div className={`${flexclass['col-md-4']} `} style={{display:"none"}}>
                        <Createinvoiceform />                        
                    </div>
                </Flexbox>
            </Container>
        </div>
    )
}

export default Createinvoice;
