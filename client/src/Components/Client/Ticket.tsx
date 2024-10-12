import React from 'react';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function GetTicket() {
    const { ticket_number } = useParams<{ ticket_number: string }>();

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>You are the number {ticket_number}</h1>
            <Alert variant="info" style={{ textAlign: 'center' }}>Please wait for your turn</Alert>
        </>
    );
}

export default GetTicket;