import { Router, WSResponse } from "websocket-express";
import notificationController from "../controllers/notificationController";
import { param } from 'express-validator'
import { validateWsRequest } from "../errorHandlers";

const router = new Router()

router.ws("/tickets/notification/:serviceType/:ticketId", [
        param("ticketId").exists().isInt({min: 0}),
        param("serviceType").exists().isInt({min: 0})
    ],
    validateWsRequest,
    async (req: any, res: WSResponse) => {
        const ticketId = Number(req.params.ticketId);
        const serviceType = Number(req.params.serviceType);
        if (!notificationController.hasTicket(serviceType, ticketId)) {
            return res.status(422);
        }

        const ws = await res.accept();
        notificationController.addConnection(serviceType, ticketId, ws)
        ws.on('close', () => {
            notificationController.removeConnection(serviceType, ticketId);
        });
    }
);

export default router;