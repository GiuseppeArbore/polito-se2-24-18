import LineDAO from '../src/dao/lineDao';
import db from '../src/db/db';

jest.mock('../src/db/db', () => ({
  get: jest.fn(),
  run: jest.fn()
}));

describe('LineDAO', () => {
  let lineDAO: LineDAO;

  beforeEach(() => {
    lineDAO = new LineDAO();
    jest.clearAllMocks();
  });

  it('Test 1: should throw an error if no service is found', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce(null);

    await expect(lineDAO.getNextCustomer()).rejects.toThrow('No service found for the provided service IDs');
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

  it('Test 2: should return ticketNumber 0 if current_number is greater than or equal to queue_length', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 10, queue_length: 10 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 0 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

  it('Test 3: should update the queue and return the next customer ID', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 5, queue_length: 10 });
    (db.run as jest.Mock).mockResolvedValueOnce({ changes: 1 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 6 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
    expect(db.run).toHaveBeenCalledWith(expect.any(String), [1]);
  });



  it('Test 5: should handle database connection errors', async () => {
    (db.get as jest.Mock).mockRejectedValueOnce(new Error('Database connection error'));

    await expect(lineDAO.getNextCustomer()).rejects.toThrow('Database connection error');
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

  it('Test 6: should handle database query errors', async () => {
    (db.get as jest.Mock).mockRejectedValueOnce(new Error('Database query error'));

    await expect(lineDAO.getNextCustomer()).rejects.toThrow('Database query error');
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

  it('Test 7: should handle database update errors', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 5, queue_length: 10 });
    (db.run as jest.Mock).mockRejectedValueOnce(new Error('Database update error'));

    await expect(lineDAO.getNextCustomer()).rejects.toThrow('Database update error');
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
    expect(db.run).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  it('Test 8: should handle service with zero queue length', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 0, queue_length: 0 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 0 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

  it('Test 9: should handle service with negative queue length', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 0, queue_length: -1 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 0 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

  it('Test 10: should handle service with null queue length', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 0, queue_length: null });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 0 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

 

  it('Test 12: should handle service with large integer queue length', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 0, queue_length: 2147483647 });
    (db.run as jest.Mock).mockResolvedValueOnce({ changes: 1 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 1 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
    expect(db.run).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  it('Test 13: should handle service with zero current number', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 0, queue_length: 10 });
    (db.run as jest.Mock).mockResolvedValueOnce({ changes: 1 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 1 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
    expect(db.run).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  it('Test 14: should handle service with negative current number', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: -1, queue_length: 10 });
    (db.run as jest.Mock).mockResolvedValueOnce({ changes: 1 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 0 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
    expect(db.run).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  it('Test 15: should handle service with null current number', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: null, queue_length: 10 });
    (db.run as jest.Mock).mockResolvedValueOnce({ changes: 1 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 1 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
    expect(db.run).toHaveBeenCalledWith(expect.any(String), [1]);
  });

 

  it('Test 17: should handle service with large integer current number', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 2147483647, queue_length: 2147483648 });
    (db.run as jest.Mock).mockResolvedValueOnce({ changes: 1 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 2147483648 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
    expect(db.run).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  it('Test 18: should handle service with zero queue length and current number', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: 0, queue_length: 0 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 0 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

  it('Test 19: should handle service with negative queue length and current number', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: -1, queue_length: -1 });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 0 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

  it('Test 20: should handle service with null queue length and current number', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ id: 1, current_number: null, queue_length: null });

    const result = await lineDAO.getNextCustomer();
    expect(result).toEqual({ serviceType: 1, ticketNumber: 0 });
    expect(db.get).toHaveBeenCalledWith(expect.any(String), []);
  });

 
});