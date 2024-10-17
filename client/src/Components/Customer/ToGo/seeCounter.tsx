import React, { useMemo, useRef } from 'react'
import { useEffect, useState } from "react"
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function SeeCounter() {

    const [counter, setCounter] = useState<string>(""); // this value will be updated
    const [error, setError] = useState<string>("");
    const [ticketId, setTicketId] = useState<number>(1);
    const { service_type, ticket_number } = useParams<{ service_type: string, ticket_number: string }>();
    const once  = useRef(false);

    useEffect(() => {
        if(once.current)
             return;
        once.current = true;
        const server_url='ws://localhost:3001/api/tickets/notification';
        const ws = new WebSocket(`${server_url}/${service_type}/${ticket_number}/`);
        ws.onopen = () => {
            console.log("WebSocket connected");
        };
        ws.onclose = (err) => {
            console.log("WebSocket closed: ", err);
        };
        ws.onmessage = (event) => {
            const counter_ = event.data;
            setCounter(counter_);
            console.log("Message received:", counter_);
        };

        ws.onerror = (err) => {
            console.log("WebSocket error:", err);
            setError("Failed to connect to the server.");
        };
    }, []);
    return (
        <>

            <div>
            {
                    counter == "" && 
                    <>
                     <h3>Please wait to be called by a counter... </h3>
                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }} >
                       
                        <Card key={counter} >
                            <Card.Body>
                               <img src="../../../../public/loading.gif"/>
                            </Card.Body>
                        </Card>
                        </div>
                    </>
                }
                {
                    counter != "" && 
                    <>
                     <h1>Please go to the counter:  </h1>
                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }} >
                       
                        <Card key={counter} >
                            <Card.Body>
                                <Button value={counter} variant="primary">
                                    {counter}
                                </Button>
                            </Card.Body>
                        </Card>
                        </div>
                    </>
                }
            </div>
            
        </>
    )
}

export default SeeCounter