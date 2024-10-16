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


  describe('POST /api/line/next-customer', () => {

    
    it('Test 1: should return the next customer ID', async () => {
     

      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: [1,2,3] });

      expect(response.status).toBe(200);
      expect(response.body.nextCustomerId).toStrictEqual({"serviceType": 3, "ticketNumber": 16}); // Based on test data
    },10000);

    it('Test 2: should return 400 if service_ids is not provided', async () => {
      const response = await request(server)
        .post('/api/line/next-customer')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });

    it('Test 3: should return 400 if service_ids is not an array', async () => {
      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: 'not-an-array' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });

    it('Test 4: should return 404 if invalid service IDs are provided', async () => {
      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: [5] });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Invalid service IDs: 5');
    });


    it('Test 6: should handle multiple service IDs correctly', async () => {


      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: [2, 3, 4] });

      expect(response.status).toBe(200);
      expect(response.body.nextCustomerId).toStrictEqual({"serviceType": 4, "ticketNumber": 16}); // Based on test data
    });

    it('Test 7: should return 404 if no row is found for the given service_id', async () => {
      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: [5] });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Invalid service IDs: 5');
    });

    it('Test 8: should handle empty service_ids array', async () => {
      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: [] });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });


    it('Test 10: should handle invalid JSON in request body', async () => {
      const response = await request(server)
        .post('/api/line/next-customer')
        .set('Content-Type', 'application/json')
        .send('invalid-json');

      expect(response.status).toBe(400);
    });

    it('Test 11:  should handle missing Content-Type header', async () => {
      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: [1, 2, 3] });

      expect(response.status).toBe(200);
    });


    it('Test 13: should handle database connection errors', async () => {
      // Simulate a database connection error by closing the database
      await db.close();

      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: [1, 2, 3] });

      expect(response.status).toBe(500);

      // Reopen the database for subsequent tests
      await db.open();
    });

    it('Test 14: should handle invalid service_ids with special characters', async () => {
      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: ['@', '#', '$'] });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });


    it('Test 16: should handle valid service_ids with negative numbers', async () => {
      const response = await request(server)
        .post('/api/line/next-customer')
        .send({ service_ids: [-1, -2, -3] });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });


  });

});