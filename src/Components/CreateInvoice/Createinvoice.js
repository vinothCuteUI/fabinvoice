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
        <>
            <Header />
            <Container className={`container-fluid`} >
                <Flexbox>
                    <div style={{marginTop:'55px'}}>
                        <Invoicelayout />
                    </div>
                </Flexbox>
            </Container>
        </>
    )
}

export default Createinvoice;
