import React from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function OfficeDesk() {
    const { numero } = useParams<{ numero: string }>();

    return (
        <div>
            <h1>Counter Number: {numero}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }}>
                <Button variant="primary" >Stop</Button>
                <Button variant="primary" >Next Customer</Button>
            </div>
        </div>
    );
}

export default OfficeDesk;