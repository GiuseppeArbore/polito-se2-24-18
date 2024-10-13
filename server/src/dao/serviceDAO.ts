import crypto from "crypto"; 
import db from "../db/db"
import { Service } from "../components/service";
import { ServiceAlreadyExistsError }  from "../errors/servicesError"

class ServiceDAO {

    createService(description: string, queue_length: number, current_number: number, service_time: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                const sql = "INSERT INTO services(description, queue_length, current_number, service_time) VALUES(?, ?, ?, ?)"
                db.run(sql, [description, queue_length, current_number, service_time], (err: Error | null) => {
                    if (err) {
                        if (err.message.includes("UNIQUE constraint failed: services.description")) reject(new ServiceAlreadyExistsError)
                        reject(err)
                    }
                    resolve(true)
                })
            } catch (error) {
                reject(error)
            }

        })
    }

    async getAllServices(): Promise<Service[]> {
        console.log("getAllServices in serviceDAO");
        console.log("DB instance:", db);
        return new Promise<Service[]>((resolve, reject) => {
            try {
                console.log("before selecting...");
                const sql = "select * from services";
                
                db.all(sql, [], (err: Error | null, rows: Service[]) => {  // Use db.all to get all rows from a SELECT query
                    if (err) {
                        console.log("error in try: ", err);
                        reject(err);
                    } else {
                        console.log("SUCCES");
                        resolve(rows);  // Resolve with the fetched rows
                    }
                });
            } catch (error) {
                console.log("error in getAllServices in serviceDAO", error);
                reject(error);
            }
        });
    }
}

export default ServiceDAO