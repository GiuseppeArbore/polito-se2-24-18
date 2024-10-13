import { Service } from "../components/service";
import ServiceDAO from "../daos/serviceDAO";

/**
 * Represents a controller for managing services.
 * All methods of this class must interact with the corresponding DAO class to retrieve or store data.
 */
class ServiceController {

    private dao: ServiceDAO

    constructor() {
        this.dao = new ServiceDAO
    }

    async createService(description: string, queue_length: number, current_number: number, service_time: number) { }

    async getAllServices() { Promise<Service[]> }

}

export default ServiceController;