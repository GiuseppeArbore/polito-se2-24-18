import { Request, Response } from 'express';
import LineDAO from '../dao/lineDao';

class LineController {
  private lineDAO: LineDAO;

  constructor() {
    this.lineDAO = new LineDAO();
  }

  async getNextCustomer(req: Request, res: Response): Promise<void> {
    const serviceIds: number[] = req.body.service_ids;
    if (!serviceIds || !Array.isArray(serviceIds)) {
      res.status(400).send({ error: 'Invalid service_ids' });
      return;
    }

    try {
      const nextCustomerId = await this.lineDAO.getNextCustomer(serviceIds);
      res.status(200).send({ nextCustomerId });
    } catch (error) {
      const status = (error as any).status || 500;
      const message = (error as any).message || 'An unexpected error occurred';
      res.status(status).send({ message });
    }
  }
}

export default LineController;