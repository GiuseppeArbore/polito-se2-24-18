import { Request, Response } from 'express';
import TicketDAO from '../dao/ticketDao';

class TicketController {
    private dao: TicketDAO;

    constructor() {
        this.dao = new TicketDAO();
    }

    public async getTickets(req: Request, res: Response): Promise<void> {
        const { service_id } = req.params;

        if (!service_id) {
            res.status(400).json({ error: 'service_id is required' });
            return;
        }

        try {
            const tickets = await this.dao.getTicket(Number(service_id));
            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

  
}

export default TicketController;