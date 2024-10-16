import React from 'react'
import { useEffect, useState } from "react"
import { Button, Card } from 'react-bootstrap';

function SeeCounter() {

    const [counter, setCounter] = useState<string>("NUM 3"); // this value will be updated
    const [error, setError] = useState<string>("");


    useEffect(() => {
        const getCounter = async () => {
            try {
                //const counter = await API.listenTotheCounterAnnouncement();
                setCounter(counter);
                setError("");
            } catch (error: any) {
                console.log("Error fetching counter number: ", error);
                setError(error.error || error.message || "An error occurred");
            }
        };
        getCounter();
    }, []);

    return (
        <>

            <div>
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