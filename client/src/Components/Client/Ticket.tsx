import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import ProgressBar from "@ramonak/react-progress-bar";
import { useParams } from 'react-router-dom';
import QRCode from "qrcode";
import { useNavigate } from 'react-router-dom';
function GetTicket() {
    //const url = window.location.href;
    const url = window.location.origin;
    const [dataUrl, setDataUrl] = useState("");
  
    const navigator = useNavigate();
    const timer = useRef(0);
    const [progress, setProgress] = useState(0);
    const [progressColor, setProgressColor] = useState("#3b82f6")
    useEffect(() => {
        timer.current = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 5;
                if (newProgress >= 100) {
                 navigator('/services');
                }
                return newProgress;
            });
        }, 1500);

        return () => {
            clearInterval(timer.current);
        };
    }, [progress]);
    const { service_type, ticket_number } = useParams<{ service_type: string, ticket_number: string }>();
    const handleQRCodeGeneration = () => {
        QRCode.toDataURL(`${url}/customer/togo/${service_type}/${ticket_number}`, { width: 300 }, (err, dataUrl) => {
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
            <Card>
                <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>You are the number {ticket_number}</h1>
                <h2 style={{ textAlign: 'center' }}>for S{service_type}</h2>
                <Alert variant="info" style={{ textAlign: 'center' }}>Please wait for your turn</Alert>
                <img src={dataUrl} alt="qr code" />
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Scan the QR code above to get all  the information about your ticket
                </p>
                <Button variant="danger" className='mt-2' onClick={() => { navigator('/') }}>Select new ticket</Button>
            </ Card>
            <ProgressBar className='mt-2' completed={progress} bgColor={progressColor} height={"0.7rem"} isLabelVisible={false} />
        </>
    );
}

export default GetTicket;