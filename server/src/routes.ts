import express from "express"
import ErrorHandler from "./helper"
import ServiceRoutes from "./routers/serviceRoutes"


const morgan = require("morgan")
const prefix = "/group18"

/**
 * Initializes the routes for the application.
 * 
 * @remarks
 * This function sets up the routes for the application.
 * It defines the routes for the user, authentication, product, and cart resources.
 * 
 * @param {express.Application} app - The express application instance.
 */
function initRoutes(app: express.Application) {
    app.use(morgan("dev")) // Log requests to the console
    app.use(express.json({ limit: "25mb" }))
    app.use(express.urlencoded({ limit: '25mb', extended: true }))

    const serviceRoutes = new ServiceRoutes()

    app.use(`${prefix}/services`, serviceRoutes.getRouter())

    ErrorHandler.registerErrorHandler(app)
}

export default initRoutes