import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function OfficeDesk() {
    const { number } = useParams<{ number: string }>();
    const [ticket_number, setTicketNumber] = useState<string | undefined>(undefined);
    const [showAlert, setShowAlert] = useState(false);
    const handleShow = () => setShowAlert(true);
    const handleClose = () => setShowAlert(false);

    

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>You are the counter {number}</h1>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showAlert ? (
                    <Alert variant="success" onClose={handleClose}>
                        <Alert.Heading className="large-heading">Next Customer is {ticket_number}</Alert.Heading>
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
                        <Button variant="primary" onClick={async () => {
                            try {
                               const response = "6";  //await API.getNextCustomer();
                                if (response /*&& response.ticket_number*/) {
                                    // Assuming you have a way to update the ticket_number in your component state
                                    // You might need to lift the state up or use a context
                                    setTicketNumber(response/*.ticket_number*/);
                                    handleShow();
                                }
                            } catch (error) {
                                console.error("Failed to fetch next customer", error);
                            }
                        }}>Next Customer</Button>
                    </div>
                </>
            )}

            </div>
        </>
    );
}

export default OfficeDesk;
