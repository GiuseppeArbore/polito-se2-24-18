import db from '../db/db';

class TicketDAO {
  
  async getTicket(service_id: number): Promise<number> {
    const updateQuery = 'UPDATE services SET current_number = current_number + 1, queue_length = queue_length + 1 WHERE id = ?';
    const selectQuery = 'SELECT current_number FROM services WHERE id = ?';

    
      const serviceExistsQuery = 'SELECT 1 FROM services WHERE id = ?';
      const serviceExists = await db.get(serviceExistsQuery, [service_id]);
    
      if (!serviceExists) {
        const error = new Error('Service not found');
        (error as any).status = 404;
        throw error;
      }
      
      const res = await db.run(updateQuery, [service_id]);
      if (res.changes === 0) {
        throw new Error('No rows updated');
      }

      const row = await db.get(selectQuery, [service_id]);
      if (!row) {
        throw new Error('No row found for the given service_id');
      }
      return row.current_number;
   
  }

  async resetServiceCounters(): Promise<void> {
    const resetQuery = 'UPDATE services SET current_number = 0, queue_length = 0';

    try {
      const res = await db.run(resetQuery, []);
      if (res.changes === 0) {
        throw new Error('No rows updated');
      }
    } catch (err) {
      throw err;
    }
  }
  
}

export default TicketDAO;