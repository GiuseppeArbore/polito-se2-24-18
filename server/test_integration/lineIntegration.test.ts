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

  const counter = 1;

  describe('POST /api/line/next-customer', () => {

    
    it('Test 1: should return the next customer ID', async () => {
     

      const response = await request(server)
        .post(`/api/line/next-customer/${counter}`)
        .send();

      expect(response.status).toBe(200);
      expect(response.body.nextCustomerId).toStrictEqual({"serviceType": 4, "ticketNumber": 16}); // Based on test data
    },10000);

   


    it('Test 13: should handle database connection errors', async () => {
      // Simulate a database connection error by closing the database
      await db.close();

      const response = await request(server)
        .post(`/api/line/next-customer/${counter}`)
        .send();

      expect(response.status).toBe(500);

      // Reopen the database for subsequent tests
      await db.open();
    });

   

  });

});