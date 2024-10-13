import React from 'react'
import "./Service.scss"
import API from "../../../API/API"


import { useEffect, useState } from "react"
import { Service } from '../../../Models/service'
function GetServices() {

    const [serviceList, setServiceList] = useState<Service[]>([]);
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const getServices = async () => {
            try {
                const services = await API.getAllServices()
                let srvs: string[] = []
                services.forEach((p: Service) => {
                    if (!srvs.includes(p.description)) srvs.push(p.description)
                })
                setServiceList(services)
                setError("")
            } catch (error: any) {
                console.log(error)
                setError(error.error ? error.error : error.message ? error.message : typeof error === 'string' ? error : "An error occurred")
            }
        }
        getServices()
    }, [])


    return (
        <>

            {serviceList.map((service: Service) => 
                <div className='container' >
                    <h2> Select Your Desired Service Type</h2>
                    <ul key={service.description} >
                        <li>
                            {service.description}
                        </li>
                    </ul>
                </div>
                )
            }
        
        </>
    )
}

export default GetServices