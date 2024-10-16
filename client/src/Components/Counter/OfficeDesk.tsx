import React, { useEffect, useState } from 'react';
import API from '../../API'; // Adjust the import path according to your project structure
import { Alert, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function OfficeDesk() {
    const { number } = useParams<{ number: string }>();
    const [ticket_number, setTicketNumber] = useState<string | undefined>(undefined);
    const [service_type, setServiceType] = useState<string | undefined>(undefined);
    const [showAlert, setShowAlert] = useState(false);
    const handleShow = () => setShowAlert(true);
    const handleClose = () => setShowAlert(false);

    useEffect(() => {
        // This effect will run every time ticket_number or service_type changes, but not on the initial render
        if (ticket_number !== undefined) {
            handleShow();
        }
    }, [ticket_number, service_type]);

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>You are the counter {number}</h1>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showAlert ? (
                    <Alert variant="success" >
                        {service_type && ticket_number ? (
                            <>
                                <Alert.Heading className="large-heading">Next Customer is {ticket_number} for service S-{service_type}</Alert.Heading>
                                <p>
                                    When the customer arrives, please click on the button below to proceed.
                                </p>
                            </>
                        ) : (
                            <Alert.Heading className="large-heading">There is no customer to serve</Alert.Heading>
                        )}
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
                                    const response = await API.getNextCustomer();
                                    console.log(response);
                                    if (response) {
                                        if (response.ticketNumber == 0) {
                                            setTicketNumber(undefined);
                                            setServiceType(undefined);
                                            handleShow();
                                        } else {
                                            setTicketNumber(response.ticketNumber);
                                            setServiceType(response.serviceType);
                                        }
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
