import express, { Router } from "express"
import ErrorHandler from "../helper"
import ServiceController from "../controllers/serviceController"


/**
 * Represents a class that defines the routes for handling proposals.
 */
class ServiceRoutes {

    private router: Router
    private errorHandler: ErrorHandler
    private controller: ServiceController
    /**
     * Constructs a new instance of the ServiceRoutes class.
     */
    constructor() {
        this.router = express.Router()
        this.errorHandler = new ErrorHandler()
        this.controller = new ServiceController()
        this.initRoutes()
    }

    /**
     * Returns the router instance.
     * @returns The router instance.
     */
    getRouter(): Router {
        return this.router
    }

    /**
     * Initializes the routes for the service router.
     * 
     * @remarks
     * This method sets up the HTTP routes for handling service-related operations.
     * It can (and should!) apply authentication, authorization, and validation middlewares to protect the routes.
     * 
     */
    initRoutes() {

        this.router.get(
            "/",
            (req: any, res: any, next: any) => this.controller.getAllServices()
                .then(() => res.status(200).end())
                .catch((err: any) => next(err))
        )





    }
}

export default ServiceRoutes