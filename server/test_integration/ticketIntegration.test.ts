import request from 'supertest';
import { app } from '../index'; 

describe('Ticket API Integration Tests', () => {
  it('should return ticket for a given service_id', async () => {
    const serviceId = 3; 

    const response = await request(app).get(`/api/tickets/${serviceId}`);

    expect(response.status).toBe(200);
   
  });

  it('should return 400 if service_id is not provided', async () => {
    const response = await request(app).get('/api/tickets/');

    expect(response.status).toBe(404); // La route non esiste senza service_id
  });

  it('should return 500 if there is a database error', async () => {
    // Simula un errore del database, ad esempio, passando un ID di servizio non valido
    const invalidServiceId = 'invalid';

    const response = await request(app).get(`/api/tickets/${invalidServiceId}`);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message');
  });
});