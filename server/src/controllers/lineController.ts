import { Request, Response } from 'express';
import LineDAO from '../dao/lineDao';

class LineController {
  private lineDAO: LineDAO;

  constructor() {
    this.lineDAO = new LineDAO();
  }

  async getNextCustomer(req: Request, res: Response): Promise<void> {
  
    try {
      const nextCustomerId = await this.lineDAO.getNextCustomer();
      res.status(200).send({ nextCustomerId });
    } catch (error) {
      const status = (error as any).status || 500;
      const message = (error as any).message || 'An unexpected error occurred';
      res.status(status).send({ message });
    }
  }
}

export default LineController;