import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface GetCounterProps {
    // Define the expected props here, for example:
    // someProp: string;
    total_counter: number;
}

function GetCounter(props: GetCounterProps) {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Which counter are you?</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }}>
            {Array.from({ length: props.total_counter }, (_, index) => (
                <Card key={index} style={{ width: '18rem', marginBottom: '1rem' }}>
                <Card.Img variant="top" src={`/numbers/${index + 1}.png`} style={{ height: '180px', objectFit: 'contain' }} />
                <Card.Body>
                    <Card.Title>Counter {index + 1}</Card.Title>
                    <Card.Text>
                    We could add the list of services that this counter should offer
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate(`/counter/${index + 1}`)}>Go to Counter {index + 1}</Button>
                </Card.Body>
                </Card>
            ))}
            </div>
        </div>
    );
}

export default GetCounter;