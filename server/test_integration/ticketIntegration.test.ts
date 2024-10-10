import request from 'supertest';
import { app } from '../index'; 

describe('Ticket API Integration Tests', () => {
  it('should return ticket for a given service_id', async () => {
    const serviceId = 3; 

    const response = await request(app).get(`/api/tickets/${serviceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBe(35);
    
   
  });

  it('should return 400 if service_id is not provided', async () => {
    const response = await request(app).get('/api/tickets/');

    expect(response.status).toBe(404); 
  });

  it('should return 500 if there is a database error', async () => {
    
    const invalidServiceId = 'invalid';

    const response = await request(app).get(`/api/tickets/${invalidServiceId}`);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message');
  });
});