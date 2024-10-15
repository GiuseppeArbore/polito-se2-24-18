import { Application } from "express";
import ticketRoutes from './routers/ticketRoutes';
import { app } from '../index';
import serviceRoutes from "./routers/serviceRoutes";


function initRoutes(app: Application) {
   
    app.use('/api', ticketRoutes);
    app.use('/api', serviceRoutes);
}

export default initRoutes