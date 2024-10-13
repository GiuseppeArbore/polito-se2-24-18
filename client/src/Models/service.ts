/**
 * Represents a Service Type in the system.
 */
class Service {
    description: string;
    queue_length: number;
    current_number: number;
    service_time: number

    /**
     * Creates a new instance of the Service class.
     * @param description - The description of the Service. This is unique for each service.
     * @param queue_length 
     * @param current_number 
     * @param service_time 
     */
    constructor(description: string, queue_length: number, current_number: number, service_time: number) {
        this.description = description
        this.queue_length = queue_length
        this.current_number = current_number
        this.service_time = service_time
    }
}

export { Service }