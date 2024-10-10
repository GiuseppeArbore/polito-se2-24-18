import db from '../db/db';

class TicketDAO {
  
  getTicket(service_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const updateQuery = 'UPDATE services SET current_number = current_number + 1, queue_length = queue_length + 1 WHERE id = ?';
      
      
      db.run(updateQuery, [service_id], function(err: Error) {
        if (err) {
          return reject(err);
        }

       
        const selectQuery = 'SELECT current_number FROM services WHERE id = ?';
        
        db.get(selectQuery, [service_id], (err: Error, row: { current_number: number }) => {
          if (err) {
            return reject(err);
          }
          
          
          resolve(row.current_number);
        });
      });
    });
  }
}

export default TicketDAO;