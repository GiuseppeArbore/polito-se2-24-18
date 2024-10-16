import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import QRCode from "qrcode";

function GetTicket() {
    const url = window.location.href;
    const [dataUrl, setDataUrl] = useState("");
  
    const { service_type, ticket_number } = useParams<{ service_type: string, ticket_number: string }>();
    const handleQRCodeGeneration = () => {
        QRCode.toDataURL(url, { width: 300 }, (err, dataUrl) => {
            if (err) console.error(err);
            // set dataUrl state to dataUrl
            setDataUrl(dataUrl);
        });
    };
    useEffect(() => {
        handleQRCodeGeneration();
    }, [dataUrl]);
    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>You are the number {ticket_number}</h1>
            <h2 style={{ textAlign: 'center' }}>for S{service_type}</h2>
            <Alert variant="info" style={{ textAlign: 'center' }}>Please wait for your turn</Alert>
            <img src={dataUrl} alt="qr code" />
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Scan the QR code above to get all  the information about your ticket
            </p>
        </>
    );
}

export default GetTicket;