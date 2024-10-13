import { Router } from "websocket-express";
import ticketRoutes from './routers/ticketRoutes';
<<<<<<< HEAD
import serviceRoutes from "./routers/serviceRoutes";
import wsRoutes from './routers/notificationRoutes';
=======
import lineRoutes from './routers/lineRoutes';
>>>>>>> 95b71e1 (changes and fix)

function initRoutes(app: Router) {
    app.get("/queue/number", async (req, res) => {
        res.status(200).json({ ok: "ok" });
    });

    app.use('/api', ticketRoutes);
<<<<<<< HEAD
    app.use('/api', serviceRoutes);
    app.use('/api', wsRoutes);
=======
    app.use('/api', lineRoutes);
>>>>>>> 95b71e1 (changes and fix)
}

export default initRoutes