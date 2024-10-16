import React from 'react';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function GetTicket() {
    const { service_type, ticket_number } = useParams<{ service_type: string, ticket_number: string }>();

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>You are the number {ticket_number}</h1>
            <h2 style={{ textAlign: 'center' }}>for S{service_type}</h2>
            <Alert variant="info" style={{ textAlign: 'center' }}>Please wait for your turn</Alert>
        </>
    );
}

export default GetTicket;