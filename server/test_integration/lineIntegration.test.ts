import request from 'supertest';
import { describe, test, beforeAll } from '@jest/globals';
import { app } from '../index';
import db from '../src/db/db';






describe('Line API Integration Tests', () => {

  beforeAll(async () => {
    
    await db.run('CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY,description TEXT NOT NULL,queue_length INTEGER NOT NULL,current_number INTEGER NOT NULL,service_time INTEGER NOT NULL)');
    await db.run('DELETE FROM services');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (1,"servizio 1", 10, 5, 30)');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (2,"servizio 2", 15, 10, 20)');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (3,"servizio 3", 20, 15, 10)');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (4,"servizio 4", 20, 15, 5)');
  });


  describe('POST /api/line/next-customer', () => {

    
    it('Test 1: should return the next customer ID', async () => {
     

      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [1, 2, 3] });

      expect(response.status).toBe(200);
      expect(response.body.nextCustomerId).toBe("S3"+ "-" + 16); // Based on test data
    },10000);

    it('Test 2: should return 400 if service_ids is not provided', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });

    it('Test 3: should return 400 if service_ids is not an array', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: 'not-an-array' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });

    it('Test 4: should return 404 if invalid service IDs are provided', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [5] });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Invalid service IDs: 5');
    });

    it('Test 5: should return 500 if there is an internal server error', async () => {
      // Simulate a server error by dropping the table
      await db.run('DROP TABLE services');

      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [1, 2, 3] });

      expect(response.status).toBe(500);

      // Recreate the table for subsequent tests
    await db.run('DELETE FROM services');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (1,servizio 1, 10, 5, 30)');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (2,servizio 2, 15, 10, 20)');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (3,servizio 3, 20, 15, 10)');
    await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (3,servizio 4, 20, 15, 5)');
    });

    it('Test 6: should handle multiple service IDs correctly', async () => {


      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [2, 3, 4] });

      expect(response.status).toBe(200);
      expect(response.body.nextCustomerId).toBe(3);
    });

    it('Test 7: should return 404 if no row is found for the given service_id', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [4] });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Invalid service IDs: 4');
    });

    it('Test 8: should handle empty service_ids array', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [] });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });

    it('Test 9: should handle large number of service_ids', async () => {
      const largeServiceIds = Array.from({ length: 1000 }, (_, i) => i + 1);

      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: largeServiceIds });

      expect(response.status).toBe(200);
      expect(response.body.nextCustomerId).toBe(3);
    });

    it('Test 10: should handle invalid JSON in request body', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .set('Content-Type', 'application/json')
        .send('invalid-json');

      expect(response.status).toBe(400);
    });

    it('Test 11:  should handle missing Content-Type header', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [1, 2, 3] });

      expect(response.status).toBe(200);
    });

    it('Test 12: should handle unexpected errors gracefully', async () => {
      // Simulate an unexpected error by dropping the table
      await db.run('DROP TABLE services');

      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [1, 2, 3] });

      expect(response.status).toBe(500);

      // Recreate the table for subsequent tests
      await db.run('DELETE FROM services');
      await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (1,servizio 1, 10, 5, 30)');
      await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (2,servizio 2, 15, 10, 20)');
      await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (3,servizio 3, 20, 15, 10)');
      await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (3,servizio 4, 20, 15, 5)');
    });

    it('Test 13: should handle database connection errors', async () => {
      // Simulate a database connection error by closing the database
      await db.close();

      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [1, 2, 3] });

      expect(response.status).toBe(500);

      // Reopen the database for subsequent tests
      await db.open();
    });

    it('Test 14: should handle invalid service_ids with special characters', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: ['@', '#', '$'] });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });

    it('Test 15: should handle valid service_ids with special characters', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [1, 2, 3] });

      expect(response.status).toBe(200);
      expect(response.body.nextCustomerId).toBe(3);
    });

    it('Test 16: should handle valid service_ids with negative numbers', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [-1, -2, -3] });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid service_ids');
    });

    it('Test 17: should handle valid service_ids with zero', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [0, 1, 2] });

      expect(response.status).toBe(200);
      expect(response.body.nextCustomerId).toBe(3);
    });

    it('Test 18: should handle valid service_ids with large numbers', async () => {
      const response = await request(app)
        .post('/api/line/next-customer')
        .send({ service_ids: [999999999, 1000000000] });

      expect(response.status).toBe(200);
      expect(response.body.nextCustomerId).toBe(3);
    });
  });

  describe('POST /api/line/reset-counters', () => {
    it('Test 19: should reset service counters successfully', async () => {
      const response = await request(app)
        .post('/api/line/reset-counters')
        .send();

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Service counters reset successfully');
    });

    it('Test 20: should return 500 if there is an internal server error', async () => {
      // Simulate a server error by dropping the table
      await db.run('DROP TABLE services');

      const response = await request(app)
        .post('/api/line/reset-counters')
        .send();

      expect(response.status).toBe(500);

      // Recreate the table for subsequent tests
      await db.run('DELETE FROM services');
      await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (1,servizio 1, 10, 5, 30)');
      await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (2,servizio 2, 15, 10, 20)');
      await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (3,servizio 3, 20, 15, 10)');
      await db.run('INSERT INTO services (id, description, queue_length, current_number, service_time) VALUES (3,servizio 4, 20, 15, 5)');
    });
  });
});