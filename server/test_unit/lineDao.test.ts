import LineDAO from '../src/dao/lineDao';
import db from '../src/db/db'; // Adjust the import according to your project structure

jest.mock('../src/db/db', () => ({
  all: jest.fn(),
  get: jest.fn(),
  run: jest.fn(),
}));

describe('LineDAO', () => {
  let lineDAO: LineDAO;

  beforeEach(() => {
    lineDAO = new LineDAO();
  });

  describe('validateServiceIds', () => {
    it('1 - should not throw an error for valid service IDs', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      await expect(lineDAO['validateServiceIds']([1, 2])).resolves.not.toThrow();
    });

    it('2 - should throw an error for invalid service IDs', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }]);
      await expect(lineDAO['validateServiceIds']([1, 2])).rejects.toThrow('Invalid service IDs: 2');
    });

    it('6 - should not throw an error for an empty array of service IDs', async () => {
      (db.all as jest.Mock).mockResolvedValue([]);
      await expect(lineDAO['validateServiceIds']([])).resolves.not.toThrow();
    });

    it('7 - should throw an error if db.all throws an error', async () => {
      (db.all as jest.Mock).mockRejectedValue(new Error('Database error'));
      await expect(lineDAO['validateServiceIds']([1, 2])).rejects.toThrow('Database error');
    });

    it('8 - should handle large arrays of service IDs', async () => {
      const serviceIds = Array.from({ length: 1000 }, (_, i) => i + 1);
      const dbResponse = serviceIds.map(id => ({ id }));
      (db.all as jest.Mock).mockResolvedValue(dbResponse);
      await expect(lineDAO['validateServiceIds'](serviceIds)).resolves.not.toThrow();
    });
  });

  describe('getNextCustomer', () => {
    it('3 - should return the next customer for valid service IDs', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      (db.get as jest.Mock).mockResolvedValue({ id: 1, current_number: 5 });
      (db.run as jest.Mock).mockResolvedValue(undefined);

      const result = await lineDAO.getNextCustomer([1, 2]);
      expect(result).toBe('S1-6');
    });

    it('4 - should throw an error for invalid service IDs', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }]);
      await expect(lineDAO.getNextCustomer([1, 2])).rejects.toThrow('Invalid service IDs: 2');
    });

    it('5 - should throw an error if no service is found', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      (db.get as jest.Mock).mockResolvedValue(undefined);

      await expect(lineDAO.getNextCustomer([1, 2])).rejects.toThrow('No service found for the provided service IDs');
    });


    it('8 - should return the next customer for a single valid service ID', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }]);
      (db.get as jest.Mock).mockResolvedValue({ id: 1, current_number: 3 });
      (db.run as jest.Mock).mockResolvedValue(undefined);

      const result = await lineDAO.getNextCustomer([1]);
      expect(result).toBe('S1-4');
    });

    it('9 - should select the correct service based on queue length and service time', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      (db.get as jest.Mock).mockResolvedValue({ id: 2, current_number: 2 });
      (db.run as jest.Mock).mockResolvedValue(undefined);

      const result = await lineDAO.getNextCustomer([1, 2]);
      expect(result).toBe('S2-3');
    });

    it('10 - should throw an error if db.get throws an error', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      (db.get as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(lineDAO.getNextCustomer([1, 2])).rejects.toThrow('Database error');
    });

    it('11 - should throw an error if db.run throws an error', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      (db.get as jest.Mock).mockResolvedValue({ id: 1, current_number: 5 });
      (db.run as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(lineDAO.getNextCustomer([1, 2])).rejects.toThrow('Database error');
    });

    it('12 - should handle large arrays of service IDs', async () => {
      const serviceIds = Array.from({ length: 1000 }, (_, i) => i + 1);
      const dbResponse = serviceIds.map(id => ({ id }));
      (db.all as jest.Mock).mockResolvedValue(dbResponse);
      (db.get as jest.Mock).mockResolvedValue({ id: 1, current_number: 5 });
      (db.run as jest.Mock).mockResolvedValue(undefined);

      const result = await lineDAO.getNextCustomer(serviceIds);
      expect(result).toBe('S1-6');
    });

    it('13 - should return the next customer for services with the same queue length and service time', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      (db.get as jest.Mock).mockResolvedValue({ id: 1, current_number: 5 });
      (db.run as jest.Mock).mockResolvedValue(undefined);

      const result = await lineDAO.getNextCustomer([1, 2]);
      expect(result).toBe('S1-6');
    });

    it('14 - should return the next customer for services with different queue lengths and same service time', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      (db.get as jest.Mock).mockResolvedValue({ id: 2, current_number: 2 });
      (db.run as jest.Mock).mockResolvedValue(undefined);

      const result = await lineDAO.getNextCustomer([1, 2]);
      expect(result).toBe('S2-3');
    });

    it('15 - should return the next customer for services with same queue lengths and different service times', async () => {
      (db.all as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
      (db.get as jest.Mock).mockResolvedValue({ id: 1, current_number: 5 });
      (db.run as jest.Mock).mockResolvedValue(undefined);

      const result = await lineDAO.getNextCustomer([1, 2]);
      expect(result).toBe('S1-6');
    });
  });
});