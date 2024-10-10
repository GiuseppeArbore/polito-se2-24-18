import express from 'express';
import TicketController from '../controllers/ticketController';

const router = express.Router();
const ticketController = new TicketController();

router.get('/tickets/:service_id', (req, res) => ticketController.getTickets(req, res));

export default router;