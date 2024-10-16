import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Select who are you?</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }}>
                <Card style={{ width: '18rem', marginBottom: '1rem' }}>
                    <Card.Img variant="top" src={`/icons/desk.png`} style={{ height: '180px', objectFit: 'contain', borderRadius: '8px' }} />
                    <Card.Body>
                        <Card.Text>
                            Click here if you are an officer and you want to select your counter
                        </Card.Text>
                        <Button variant="primary" onClick={() => navigate(`/counter`)}>Officer</Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', marginBottom: '1rem' }}>
                    <Card.Img variant="top" src={`/icons/ticket.png`} style={{ height: '180px', objectFit: 'contain', borderRadius: '8px' }} />
                    <Card.Body>
                        <Card.Text>
                            Click here if you are a client and you want to get a ticket
                        </Card.Text>
                        <Button variant="primary" onClick={() => navigate(`/services`)}>Client</Button>
                    </Card.Body>
                </Card>

            </div>
        </div>
    );
}

export default HomePage;