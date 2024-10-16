import { Router, WSResponse } from "websocket-express";
import notificationController from "../controllers/notificationController";
import { param } from 'express-validator'
import { validateWsRequest } from "../errorHandlers";

const router = new Router()

router.ws("/tickets/notification/:ticketId", [
        param("ticketId").exists().isInt({min: 0})
    ],
    validateWsRequest,
    async (req: any, res: WSResponse) => {
        const ticketId = Number(req.params.ticketId);
        if (!notificationController.hasTicket(ticketId)) {
            return res.status(422);
        }

        const ws = await res.accept();
        notificationController.addConnection(ticketId, ws)
        ws.on('close', () => {
            notificationController.removeConnection(ticketId);
        });
    }
);

export default router;