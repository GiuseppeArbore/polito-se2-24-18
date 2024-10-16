import { Request, Response } from 'express';
import LineController from '../src/controllers/lineController';
import LineDAO from '../src/dao/lineDao';

jest.mock('../src/dao/lineDao');

describe('LineController', () => {
  let lineController: LineController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    lineController = new LineController();
    req = {};
    statusMock = jest.fn().mockReturnThis();
    sendMock = jest.fn();
    res = {
      status: statusMock,
      send: sendMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Test 1: should return the next customer ID when getNextCustomer is successful', async () => {
    const mockNextCustomerId = 'S3-16';
    (LineDAO.prototype.getNextCustomer as jest.Mock).mockResolvedValue(mockNextCustomerId);

    await lineController.getNextCustomer(req as Request, res as Response);

    expect(LineDAO.prototype.getNextCustomer).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith({ nextCustomerId: mockNextCustomerId });
  });

  it('Test 2: should return a 500 error when getNextCustomer throws a general error', async () => {
    const mockError = new Error('Database error');
    (LineDAO.prototype.getNextCustomer as jest.Mock).mockRejectedValue(mockError);

    await lineController.getNextCustomer(req as Request, res as Response);

    expect(LineDAO.prototype.getNextCustomer).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith({ message: 'Database error' });
  });



  it('Test 8: should handle a case where getNextCustomer returns a large number of customers (stress test)', async () => {
    const largeData = new Array(1000).fill('S3-16');
    (LineDAO.prototype.getNextCustomer as jest.Mock).mockResolvedValue(largeData);

    await lineController.getNextCustomer(req as Request, res as Response);

    expect(LineDAO.prototype.getNextCustomer).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith({ nextCustomerId: largeData });
  });



  it('Test 10: should handle a case where getNextCustomer throws a network-related error', async () => {
    const mockNetworkError = { status: 503, message: 'Service unavailable' };
    (LineDAO.prototype.getNextCustomer as jest.Mock).mockRejectedValue(mockNetworkError);

    await lineController.getNextCustomer(req as Request, res as Response);

    expect(LineDAO.prototype.getNextCustomer).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(503);
    expect(sendMock).toHaveBeenCalledWith({ message: 'Service unavailable' });
  });

});
