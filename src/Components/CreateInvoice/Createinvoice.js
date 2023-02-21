import React from "react";
import classes from './Createinvoice.module.css';
import Header from "../Header/Header";
import Invoicelayout from "../Invoicelayout/Invoicelayout";

const Createinvoice = (props) => {
    return(
        <>
            <Header />
            <div style={{marginTop:'55px'}}>
                <Invoicelayout />
            </div>
        </>
    )
}

export default Createinvoice;
