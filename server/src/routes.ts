import { Router } from "websocket-express";
import ticketRoutes from './routers/ticketRoutes';
import serviceRoutes from "./routers/serviceRoutes";
import lineRoutes from './routers/lineRoutes';
import wsRoutes from './routers/notificationRoutes';

function initRoutes(app: Router) {
    app.get("/queue/number", async (req, res) => {
        res.status(200).json({ ok: "ok" });
    });

    app.use('/api', ticketRoutes);
    app.use('/api', serviceRoutes);
    app.use('/api', wsRoutes);
    app.use('/api', lineRoutes);
}

export default initRoutes