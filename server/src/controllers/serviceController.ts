import { Service } from "../components/service";
import ServiceDAO from "../dao/serviceDAO";
import { Request, Response } from 'express';
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

    public async getAllServices(req: Request, res: Response): Promise<void> {
     
        try {
            console.log("getAllServices in serviceController");
            const services = await this.dao.getAllServices();
            console.log("services resp in serviceController", services);

            res.status(200).json(services);
        } catch (error) {
            const status = (error as any).status || 500;
            res.status(status).json({ message: (error as Error).message });
        }
    }

}

export default ServiceController;