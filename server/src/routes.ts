import { Application } from "express";
import ticketRoutes from './routers/ticketRoutes';

function initRoutes(app: Application) {
    app.get("/queue/number", async (req, res) => {
        res.status(200).json({ ok: "ok" });
    });

    app.use('/api', ticketRoutes);
}

export default initRoutes;