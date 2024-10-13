import { Application } from "express";
import ticketRoutes from './routers/ticketRoutes';
import { app } from '../index';
import serviceRoutes from "./routers/serviceRoutes";


function initRoutes(app: Application) {
    // app.get("/queue/number", async (req, res) => {
    //     res.status(200).json({ ok: "ok" });
    // });

    app.use('/api', ticketRoutes);
    app.use('/api', serviceRoutes);
}

export default initRoutes