import React from 'react'
import "./Service.scss"
import API from "../../../API"
import { useEffect, useState } from "react"
import { Service } from '../../../Models/service'
import { Button, Card } from 'react-bootstrap';

function GetServices() {

    const [serviceList, setServiceList] = useState<Service[]>([]);
    const [error, setError] = useState<string>("")

    // useEffect(() => {
    //     const getServices = async () => {
    //         try {
    //             const services = await API.getAllServices()
    //             let srvs: string[] = []
    //             services.forEach((p: Service) => {
    //                 if (!srvs.includes(p.description)) srvs.push(p.description)
    //             })
    //             console.log("srvs: ", srvs);
    //             setServiceList(services)
    //             setError("")
    //         } catch (error: any) {
    //             console.log(error)
    //             setError(error.error ? error.error : error.message ? error.message : typeof error === 'string' ? error : "An error occurred")
    //         }
    //     }
    //     getServices()
    // }, [])

    useEffect(() => {
        const getServices = async () => {
            console.log("Fetching services...");
            try {
                const services = await API.getAllServices();
                console.log("Services fetched: ", services);
                setServiceList(services);
                setError("");
            } catch (error: any) {
                console.log("Error fetching services: ", error);
                setError(error.error || error.message || "An error occurred");
            }
        };
        getServices();
    }, []);


    return (
        <>

        <div>
            <h1>Select Your Desired Service</h1>
            {serviceList.map((service: Service) => 
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-around' }}>
           
                <Card key={service.description} style={{ width: '18rem', marginBottom: '1rem' }}>
                {/* <Card.Img variant="top" src={`/numbers/${service. + 1}.png`} style={{ height: '180px', objectFit: 'contain', borderRadius: '8px' }} /> */}
                <Card.Body>
                    <Button variant="primary">{service.description}</Button>
                </Card.Body>
                </Card>
           
                </div>
            )}
        </div>
            
        </>
    )
}

export default GetServices