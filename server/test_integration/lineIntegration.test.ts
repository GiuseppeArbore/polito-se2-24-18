import request from 'supertest';
import { describe, test, beforeAll } from '@jest/globals';
import { server } from '../index';
import db from '../src/db/db';






describe('Line API Integration Tests', () => {

  beforeEach(async () => {
    
    await db.run('CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY,description TEXT NOT NULL,queue_length INTEGER NOT NULL,current_number INTEGER NOT NULL,service_time INTEGER NOT NULL)');
    await db.run('DELETE FROM services');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (1,"servizio 1", 10, 5, 30)');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (2,"servizio 2", 15, 10, 20)');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (3,"servizio 3", 20, 15, 10)');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (4,"servizio 4", 20, 15, 5)');
  });


  test('Test 1: should return the next customer ID', async () => {
    const response = await request(server)
      .post('/api/line/next-customer');

    expect(response.status).toBe(200);
    expect(response.body.nextCustomerId).toStrictEqual({ "serviceType": 4, "ticketNumber": 16 }); // Based on test data
  });

 

  

  test('Test 4: should return 500 for database errors', async () => {
    await db.close(); // Simulate database error

    const response = await request(server)
      .post('/api/line/next-customer');

    expect(response.status).toBe(500);

    await db.open(); // Reopen database for subsequent tests
  });

  test('Test 5: should handle empty request body', async () => {
    const response = await request(server)
      .post('/api/line/next-customer');

    expect(response.status).toBe(200);
    expect(response.body.nextCustomerId).toBeDefined();
  });

  test('Test 6: should handle non-empty request body', async () => {
    const response = await request(server)
      .post('/api/line/next-customer')
      .send({ serviceId: 1 });

    expect(response.status).toBe(200);
    expect(response.body.nextCustomerId).toBeDefined();
  });

  test('Test 7: should handle query parameters', async () => {
    const response = await request(server)
      .post('/api/line/next-customer?param=value');

    expect(response.status).toBe(200);
    expect(response.body.nextCustomerId).toBeDefined();
  });

  test('Test 8: should handle headers', async () => {
    const response = await request(server)
      .post('/api/line/next-customer')
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(200);
    expect(response.body.nextCustomerId).toBeDefined();
  });

  test('Test 9: should handle cookies', async () => {
    const response = await request(server)
      .post('/api/line/next-customer')
      .set('Cookie', ['sessionId=12345']);

    expect(response.status).toBe(200);
    expect(response.body.nextCustomerId).toBeDefined();
  });

  test('Test 10: should handle different HTTP methods', async () => {
    const response = await request(server)
      .get('/api/line/next-customer');

    expect(response.status).toBe(404); // Endpoint only supports POST
  });

  test('Test 11: should return JSON response', async () => {
    const response = await request(server)
      .post('/api/line/next-customer');

    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('Test 12: should return correct service type and ticket number', async () => {
    const response = await request(server)
      .post('/api/line/next-customer');

    expect(response.body.nextCustomerId.serviceType).toBeDefined();
    expect(response.body.nextCustomerId.ticketNumber).toBeDefined();
  });

  test('Test 13: should handle database connection errors', async () => {
    await db.close(); // Simulate database connection error

    const response = await request(server)
      .post('/api/line/next-customer');

    expect(response.status).toBe(500);

    await db.open(); // Reopen database for subsequent tests
  });

  test('Test 14: should handle large number of requests', async () => {
    for (let i = 0; i < 100; i++) {
      const response = await request(server)
        .post('/api/line/next-customer');

      expect(response.status).toBe(200);
    }
  });


  test('Test 16: should handle service with no customers', async () => {
    await db.run('UPDATE services SET queue_length = 0,current_number = 0 WHERE id = 1');
    await db.run('UPDATE services SET queue_length = 0,current_number = 0 WHERE id = 2');
    await db.run('UPDATE services SET queue_length = 0,current_number = 0 WHERE id = 3');
    await db.run('UPDATE services SET queue_length = 0,current_number = 0 WHERE id = 4');

    const response = await request(server)
      .post('/api/line/next-customer');

    expect(response.status).toBe(200);
    expect(response.body.nextCustomerId.ticketNumber).toBe(0);
  });

  test('Test 17: should handle service with maximum customers', async () => {
    await db.run('UPDATE services SET queue_length = 1000,current_number= 10 WHERE id = 1');

    const response = await request(server)
      .post('/api/line/next-customer');

    expect(response.status).toBe(200);
    expect(response.body.nextCustomerId.ticketNumber).toBe(11);
  });

  
});

