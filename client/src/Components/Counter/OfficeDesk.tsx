import React from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


function OfficeDesk() {
    const { number, ticket_number } = useParams<{ number: string, ticket_number?: string }>();

    return (
        <div>
            <h1>Counter Number: {number}</h1>
            {ticket_number && <h2>Current Customer: {ticket_number}</h2>}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }}>
                <Button variant="primary" >Next Customer</Button>   
                {/* Button to proceed to the next customer (OnClick we need to call Alberto's function) */}

            </div>
        </div>
    );
}

export default OfficeDesk;