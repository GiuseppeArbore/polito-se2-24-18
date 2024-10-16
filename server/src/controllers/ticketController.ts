import { Request, Response } from 'express';
import TicketDAO from '../dao/ticketDao';
import notificationController from './notificationController';

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
            const ticket = await this.dao.getTicket(Number(service_id));
            notificationController.addTicket(Number(service_id), ticket)
            res.status(200).json("S"+ service_id + "-" + ticket);
        } catch (error) {
            const status = (error as any).status || 500;
            res.status(status).json({ message: (error as Error).message });
        }
    }

    async resetServiceCounters(req: Request, res: Response): Promise<void> {
       
        try {
          await this.dao.resetServiceCounters();
          notificationController.removeAll();
          res.status(200).json({ message: 'Service counters reset successfully' });
        } catch (error) {
            const status = (error as any).status || 500;
          res.status(status).json({ message: (error as Error).message });
        }
      }

  
}

export default TicketController;