
import { promisify } from 'util';
import db from "../db/db"
import { Service } from "../components/service";
import { ServiceAlreadyExistsError }  from "../errors/servicesError"

class ServiceDAO {

    async createService(description: string, queue_length: number, current_number: number, service_time: number): Promise<boolean> {
        try {
            const sql = "INSERT INTO services(description, queue_length, current_number, service_time) VALUES(?, ?, ?, ?)";
            const res = await db.run(sql, [description, queue_length, current_number, service_time]);
            return true;
        } catch (err ) {
            if (err instanceof Error) {
                if (err.message.includes("UNIQUE constraint failed: services.description")) {
                    throw new ServiceAlreadyExistsError();
                }
                throw err;
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }

    async getAllServices(): Promise<Service[]> {
        try {
            // Query to select all records from the services table
            const sql = "SELECT * FROM services";
            
            // Execute the query and get all rows
            const rows = await db.all(sql, []);
            
            // Return the retrieved rows
            return rows;
        } catch (error) {
            if (error instanceof Error) {
                // Throw a descriptive error message
                throw new Error(`Failed to retrieve services: ${error.message}`);
            } else {
                // Throw a generic error message
                throw new Error("Failed to retrieve services due to an unknown error");
            }
        }
    }
}

export default ServiceDAO