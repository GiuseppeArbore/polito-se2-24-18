import db from '../db/db';

class TicketDAO {
  
  async getTicket(service_id: number): Promise<number> {
    const updateQuery = 'UPDATE services SET current_number = current_number + 1, queue_length = queue_length + 1 WHERE id = ?';

    const res = await db.run(updateQuery, [service_id]);
    if (res.changes === 0)
      throw new Error('No rows updated');

    const selectQuery = 'SELECT current_number FROM services WHERE id = ?';
    const row = await db.get(selectQuery, [service_id]);
    return row.current_number;
  }
}

export default TicketDAO;