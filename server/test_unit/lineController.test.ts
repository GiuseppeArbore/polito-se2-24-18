import { Request, Response } from 'express';
import LineController from '../src/controllers/lineController';
import LineDAO from '../src/dao/lineDao';

jest.mock('../src/dao/lineDao');

describe('LineController', () => {
  let lineController: LineController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let lineDAOMock: jest.Mocked<LineDAO>;

  beforeEach(() => {
    lineDAOMock = new LineDAO() as jest.Mocked<LineDAO>;
    lineController = new LineController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    (LineDAO as jest.Mock).mockImplementation(() => lineDAOMock);
  });

  describe('getNextCustomer', () => {
    it('1 - should return 400 for invalid service_ids', async () => {
      req.body = { service_ids: 'invalid' };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('2 - should return 400 for empty service_ids array', async () => {
      req.body = { service_ids: [] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('3 - should return 400 for non-numeric service_ids', async () => {
      req.body = { service_ids: [1, 'two', 3] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('4 - should return 200 with next customer ID for valid service_ids', async () => {
      req.body = { service_ids: [1, 2] };
      lineDAOMock.getNextCustomer.mockResolvedValue('S1-6');

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ nextCustomerId: 'S1-6' });
    });


    it('6 - should return specific error message and status from DAO', async () => {
      req.body = { service_ids: [1, 2] };
      const error = new Error('Specific error');
      (error as any).status = 404;
      lineDAOMock.getNextCustomer.mockRejectedValue(error);

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Specific error' });
    });


    it('8 - should return 400 for service_ids with negative numbers', async () => {
      req.body = { service_ids: [1, -2, 3] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('9 - should return 400 for service_ids with zero', async () => {
      req.body = { service_ids: [0, 2, 3] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('10 - should return 400 for service_ids with non-integer numbers', async () => {
      req.body = { service_ids: [1.5, 2, 3] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('11 - should return 400 for service_ids with non-positive numbers', async () => {
      req.body = { service_ids: [1, 2, -3] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('12 - should return 400 for service_ids with non-numeric values', async () => {
      req.body = { service_ids: [1, 'two', 3] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('13 - should return 400 for service_ids with null values', async () => {
      req.body = { service_ids: [1, null, 3] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('14 - should return 400 for service_ids with undefined values', async () => {
      req.body = { service_ids: [1, undefined, 3] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });

    it('15 - should return 400 for service_ids with empty strings', async () => {
      req.body = { service_ids: [1, '', 3] };

      await lineController.getNextCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid service_ids' });
    });
  });
});