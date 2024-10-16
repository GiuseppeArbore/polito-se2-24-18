import React from 'react'
import API from "../../../API"
import { useEffect, useState } from "react"
import { Service } from '../../../Models/service'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function GetServices() {
    const navigator = useNavigate();

    const [serviceList, setServiceList] = useState<Service[]>([]);
    const [error, setError] = useState<string>("");
    const [ticket, setTicket] = useState<string>("");
    const [ticketIsRequested, setticketIsRequested] = useState<boolean>(false);
    const [serviceId, setServiceId] = useState<number>(0);
    const [isReset, setIsReset] = useState<boolean>(false);

    useEffect(() => {
        const getServices = async () => {
            try {
                const services = await API.getAllServices();
                setServiceList(services);
                setError("");
                setIsReset(false)
            } catch (error: any) {
                console.log("Error fetching services: ", error);
                setError(error.error || error.message || "An error occurred");
            }
        };
        getServices();
    }, [isReset]);

    const generateTicket = (serviceId: number) => {
        setServiceId(serviceId);
        setticketIsRequested(true)
    }

    useEffect(() => {
        const getTicket = async (service_id: number) => {

            try {
                const tkt = await API.getTicket(service_id);
                setTicket(tkt);
                setError("");
                setticketIsRequested(false)

            } catch (error: any) {
                console.log("Error fetching services: ", error);
                setError(error.error || error.message || "An error occurred");
            }
        };
        if (serviceId > 0 && ticketIsRequested)
            getTicket(serviceId);
    }, [ticketIsRequested]);

    const returnToList = () => {
        setTicket("");
        setticketIsRequested(false);
        setServiceId(0);
        setError("");
        setIsReset(true);
    }

    return (
        <>

            <div>
                {error == "" && ticket == "" &&
                    <>
                        <h1>Select Your Desired Service</h1>
                        {serviceList.map((service: Service) =>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }} key={service.id}>

                                <Card key={service.description} style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Button value={service.id} variant="primary" onClick={() => generateTicket(service.id)}>
                                            {service.description}
                                        </Button>
                                    </Card.Body>
                                </Card>

                            </div>
                        )}
                    </>
                }
                {
                    ticket != "" &&
                    <>
                        <h1>Your turn is {ticket}</h1>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }}>
                            <Button variant="danger" onClick={() => { returnToList() }}>Return</Button>

                            <Button variant="primary" onClick={() => navigator(`/ticket/${ticket.split("-")[0].substr(1)}/${ticket.split('-')[1]}`)} >
                                Show qr code
                            </Button>
                        </div>
                    </>
                }
            </div>

        </>
    )
}

export default GetServices