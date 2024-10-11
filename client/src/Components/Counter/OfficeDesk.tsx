import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function OfficeDesk() {
    const { number, ticket_number } = useParams<{ number: string, ticket_number?: string }>();
    const [showAlert, setShowAlert] = useState(false);

    const handleShow = () => setShowAlert(true);
    const handleClose = () => setShowAlert(false);

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>You are the counter {number}</h1>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showAlert ? (
                    <Alert variant="success" onClose={handleClose}>
                        <Alert.Heading>Next Customer is 123</Alert.Heading>
                        <p>
                            When the customer arrives, please click on the button below to proceed.
                        </p>
                        <Button onClick={handleClose} variant="outline-success">
                            Close
                        </Button>
                    </Alert>
            ) : (
                <>
                    {ticket_number && <h2>Current Customer: {ticket_number}</h2>}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }}>
                        <Button variant="primary" onClick={handleShow}>Next Customer</Button>
                    </div>
                </>
            )}

            </div>
        </>
    );
}

export default OfficeDesk;
