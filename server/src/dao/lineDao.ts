import db from '../db/db';

class LineDAO {
  
  async validateServiceIds(serviceIds: number[]): Promise<void> {
    const serviceExistsQuery = 'SELECT id FROM services';
    const rows = await db.all(serviceExistsQuery);

    const existingServiceIds = rows.map(row => row.id);
    const invalidServiceIds = serviceIds.filter(id => !existingServiceIds.includes(id));

    if (invalidServiceIds.length > 0) {
      const error = new Error(`Invalid service IDs: ${invalidServiceIds.join(', ')}`);
      (error as any).status = 404;
      throw error;
    }
  }

  async getNextCustomer(service_ids: number[]): Promise<{ serviceType: number, ticketNumber: number }> {

    const placeholders = service_ids.map(() => '?').join(',');
  
    const selectQuery = `SELECT id, current_number,queue_length FROM services WHERE id IN (${placeholders}) ORDER BY (queue_length - current_number) DESC, service_time ASC LIMIT 1`;
  
    const updateQuery = 'UPDATE services SET current_number = current_number + 1 WHERE id = ?';
  
    // Verifica che gli ID di servizio siano validi
    await this.validateServiceIds(service_ids);
  
    // Esegui la query per ottenere il servizio con il prossimo cliente
    const row = await db.get(selectQuery, [...service_ids]);

   
  
    // Controlla che sia stato trovato un servizio
    if (!row) {
      throw new Error('No service found for the provided service IDs');
    }


    if(row.current_number >= row.queue_length){
      return {
        serviceType:  row.id,
        ticketNumber: 0
    };
    }
  
    // Aggiorna il numero corrente del servizio selezionato
    await db.run(updateQuery, [row.id]);
  
    // Restituisci il nuovo valore di current_number + 1
    let nextCustomer = row.current_number + 1;
    return {
      serviceType:  row.id,
      ticketNumber: nextCustomer
  };
  }
  

  
}

export default LineDAO;