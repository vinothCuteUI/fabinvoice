import React, { useRef } from "react";
import classes from './PDFComponent.module.css'
import PDFlayout from "./PDFlayout";
import jsPDF from 'jspdf';

const PDFComponent = (props) => {

    const reportTemplateRef = useRef(null);

	const handleGeneratePdf = () => {
		const doc = new jsPDF({
			orientation:'p',
			format: 'a3',
			unit: 'px',
		});

		// Adding the fonts.
		doc.setFont('Inter-Regular', 'normal');

		doc.html(reportTemplateRef.current, {
			
			// async callback(doc) {
			// 	await doc.save('fabevy-invoice');
			// },
			html2canvas: {
				scale: .553
			},
			callback: function (doc) {
				doc.save('fabevy-invoice');
			}
		});
	};

	const cancelPdf = ()=>{
		props.cancelPdf();
	}

    return(
        <section className={classes.inovicesection}>
            <div ref={reportTemplateRef}>
                <PDFlayout />
            </div>
            
            <div className={classes.pdfDownload}>
                <button className={classes.pdfBtn} onClick={handleGeneratePdf}>Download PDF</button>
                <button className={classes.cancelBtn} onClick={cancelPdf}>Close</button>
            </div>

        </section>
    )
} 

export default PDFComponent;