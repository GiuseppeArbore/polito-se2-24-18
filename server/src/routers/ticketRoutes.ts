import express from 'express';
import TicketController from '../controllers/ticketController';


const router = express.Router();
const ticketController = new TicketController();

router.get('/tickets/:service_id', (req, res, next) => {
  const serviceId = Number(req.params.service_id);
  if (isNaN(serviceId)) {
    const error = new Error('service_id must be a number');
    (error as any).status = 400;
    return next(error);
  }
  next();
}, (req, res) => ticketController.getTickets(req, res));

router.post('/tickets/reset/:service_id', (req, res) => ticketController.resetServiceCounters(req, res));

export default router;