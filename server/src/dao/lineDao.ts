import db from '../db/db';

class LineDAO {
  
  

  async getNextCustomer(): Promise<{ serviceType: number, ticketNumber: number }> {

 
  
    const selectQuery = `SELECT id, current_number,queue_length FROM services ORDER BY (queue_length - current_number) DESC, service_time ASC LIMIT 1`;
  
    const updateQuery = 'UPDATE services SET current_number = current_number + 1 WHERE id = ?';
  
    
    const row = await db.get(selectQuery,[]);

    if (!row) {
      throw new Error('No service found for the provided service IDs');
    }


    if(row.current_number >= row.queue_length){
      return {
        serviceType:  row.id,
        ticketNumber: 0
    };
    }
  
   
    await db.run(updateQuery, [row.id]);
  
    
    let nextCustomer = row.current_number + 1;
    return {
      serviceType:  row.id,
      ticketNumber: nextCustomer
  };
  }
  

  
}

export default LineDAO;