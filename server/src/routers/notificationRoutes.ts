import { Router } from "websocket-express";
import NotificationController from "../controllers/notificationController";
import { param } from 'express-validator'
import { validateRequest } from "../errorHandlers";

const router = new Router()
const notificationController = new NotificationController()

router.ws("/tickets/:ticketId", [
        param("ticketId").exists().isInt()
    ],
    validateRequest,
    async (req: any, res: any) => {
        const ticketId = Number(req.params.ticketId);

        const ws = await res.accept();
        notificationController.add(ticketId, ws)
        ws.on('close', () => {
            notificationController.remove(ticketId);
        });
    }
);

export default router;